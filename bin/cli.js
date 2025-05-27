#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const readline = require("readline");
const https = require("https");
const os = require("os");
const { createWriteStream } = require("fs");
const { exec } = require("child_process");
const { spawn } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Get project name from command line arguments
const projectName = process.argv[2];

if (!projectName) {
  console.error("Please provide a project name");
  console.log("Example: npx create-hyact-app my-app");
  process.exit(1);
}

console.log(`Creating a new HyAct App in ${projectName}...`);

// Create Next.js app with TypeScript, ESLint, and Tailwind
try {
  execSync(
    `npx create-next-app@latest ${projectName} --typescript --eslint --tailwind --app --src-dir`,
    { stdio: "inherit" }
  );
} catch (error) {
  console.error("Failed to create Next.js app");
  process.exit(1);
}

// Change directory to the new project
process.chdir(path.resolve(projectName));

// Update tsconfig.json to include path aliases
const tsconfigPath = path.resolve(process.cwd(), "tsconfig.json");
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"));
tsconfig.compilerOptions.paths = {
  "@/*": ["./src/*"],
};
fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));

// Copy template files
console.log("Copying template files...");
const templateDir = path.resolve(__dirname, "../templates");
const targetDir = path.resolve(process.cwd(), "src");

// Function to copy directory recursively
function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      copyDir(srcPath, destPath);
    } else {
      // Copy files
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy template files
try {
  copyDir(templateDir, targetDir);

  // Create the scripts directory
  const scriptsDir = path.join(process.cwd(), "scripts");
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
  }

  // Create the setup-pocketbase.js script directly
  const setupScriptDest = path.join(scriptsDir, "setup-pocketbase.js");

  // Write the setup script content
  const setupScriptContent = `#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('PocketBase Setup Helper');
console.log('======================');

// Check if PocketBase is running
function checkPocketBaseRunning() {
  return new Promise((resolve) => {
    const http = require('http');
    const options = {
      hostname: '127.0.0.1',
      port: 8090,
      path: '/',
      method: 'GET',
      timeout: 2000,
    };

    const req = http.request(options, (res) => {
      resolve(res.statusCode === 200);
    });

    req.on('error', () => {
      resolve(false);
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

// Start PocketBase if not running
async function startPocketBase() {
  console.log('Checking if PocketBase is running...');
  
  const isRunning = await checkPocketBaseRunning();
  
  if (isRunning) {
    console.log('PocketBase is already running.');
    return true;
  }
  
  console.log('PocketBase is not running. Attempting to start...');
  
  const platform = process.platform;
  const pocketbasePath = path.join(process.cwd(), 'pocketbase-server');
  
  try {
    let pbProcess;
    
    if (platform === 'win32') {
      // Windows - use spawn to start the process
      const pbExePath = path.join(pocketbasePath, 'pocketbase.exe');
      
      if (!fs.existsSync(pbExePath)) {
        console.error(\`PocketBase executable not found at \${pbExePath}\`);
        console.log('Please ensure you have downloaded PocketBase correctly.');
        return false;
      }
      
      // Start PocketBase in a new window to avoid blocking this script
      console.log(\`Starting PocketBase from \${pbExePath}\`);
      execSync(\`start cmd /c "\\""\${pbExePath}\\" serve\\""\`, { 
        windowsHide: false,
        stdio: 'ignore'
      });
    } else {
      // macOS/Linux
      const pbBinPath = path.join(pocketbasePath, 'pocketbase');
      
      if (!fs.existsSync(pbBinPath)) {
        console.error(\`PocketBase executable not found at \${pbBinPath}\`);
        console.log('Please ensure you have downloaded PocketBase correctly.');
        return false;
      }
      
      pbProcess = spawn(pbBinPath, ['serve'], {
        detached: true,
        stdio: 'ignore'
      });
      
      // Detach the process so it keeps running
      pbProcess.unref();
    }
    
    // Wait for PocketBase to start
    console.log('Waiting for PocketBase to start...');
    
    let attempts = 0;
    while (attempts < 10) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const running = await checkPocketBaseRunning();
      if (running) {
        console.log('PocketBase started successfully!');
        return true;
      }
      attempts++;
    }
    
    console.error('Failed to start PocketBase. Please start it manually and try again.');
    console.log('You can start PocketBase manually with:');
    console.log(platform === 'win32' 
      ? '- Windows: pocketbase-server\\\\pocketbase.exe serve'
      : '- macOS/Linux: ./pocketbase-server/pocketbase serve');
    return false;
  } catch (error) {
    console.error('Failed to start PocketBase:', error.message);
    console.log('Please start PocketBase manually:');
    console.log(platform === 'win32' 
      ? '- Windows: pocketbase-server\\\\pocketbase.exe serve'
      : '- macOS/Linux: ./pocketbase-server/pocketbase serve');
    return false;
  }
}

// Create collections in PocketBase
async function createCollections() {
  console.log('Creating collections in PocketBase...');
  
  // Read the schema file
  const schemaPath = path.join(process.cwd(), 'pocketbase-server', 'pb_schema.json');
  
  if (!fs.existsSync(schemaPath)) {
    console.error(\`Schema file not found: \${schemaPath}\`);
    return false;
  }
  
  try {
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    
    console.log('Schema loaded successfully.');
    console.log(\`Found \${schema.collections.length} collections to create.\`);
    
    console.log('');
    console.log('Please complete the following steps manually:');
    console.log('1. Open the PocketBase Admin UI at http://127.0.0.1:8090/_/');
    console.log('2. Create an admin account if you haven\\'t already');
    console.log('3. Go to Settings > Import Collections');
    console.log(\`4. Upload the schema file from: \${schemaPath}\`);
    console.log('5. Click Import to create the collections');
    console.log('');
    console.log('After importing, create at least one car model record with:');
    console.log('- name: The Atlas (or any name you prefer)');
    console.log('- tagline: Experience the perfect fusion of luxury and performance');
    console.log('- description: A detailed description of the car model');
    console.log('- badge_text: New Launch (optional)');
    console.log('- hero_image: Upload an image (optional)');
    
    return true;
  } catch (error) {
    console.error('Failed to read or parse schema file:', error.message);
    return false;
  }
}

// Main function
async function main() {
  try {
    const pbRunning = await startPocketBase();
    
    if (!pbRunning) {
      console.log('');
      console.log('Please start PocketBase manually and run this script again.');
      process.exit(1);
    }
    
    await createCollections();
    
    console.log('');
    console.log('Setup instructions displayed. After completing these steps, your dashboard will be connected to PocketBase.');
    console.log('Visit http://localhost:3000/dashboard to see your car model data.');
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    rl.close();
  }
}

// Run the main function
main();
`;

  fs.writeFileSync(setupScriptDest, setupScriptContent);
  // Make the script executable
  fs.chmodSync(setupScriptDest, 0o755);

  console.log("Template files copied successfully!");
  console.log("Setup script created at: " + setupScriptDest);
} catch (error) {
  console.error("Failed to copy template files:", error);
  process.exit(1);
}

// Install dependencies
try {
  // Core dependencies
  execSync(
    "npm install zustand @tanstack/react-query zod react-hook-form @hookform/resolvers date-fns",
    { stdio: "inherit" }
  );

  // State management - enhanced
  execSync("npm install jotai immer @tanstack/react-query-devtools", {
    stdio: "inherit",
  });

  // UI components and styling
  execSync(
    "npm install class-variance-authority tailwind-merge clsx @radix-ui/react-slot",
    { stdio: "inherit" }
  );

  // Form and validation - enhanced
  execSync("npm install @hookform/error-message", { stdio: "inherit" });

  // Internationalization
  execSync("npm install next-intl next-i18n-router", { stdio: "inherit" });

  // Auth and security
  execSync("npm install next-auth @auth/core iron-session", {
    stdio: "inherit",
  });

  // Performance and PWA
  execSync("npm install next-pwa sharp", { stdio: "inherit" });

  // SEO and analytics
  execSync("npm install schema-dts next-sitemap next-seo", {
    stdio: "inherit",
  });

  // Testing dependencies
  execSync(
    "npm install -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom @testing-library/user-event msw",
    { stdio: "inherit" }
  );

  // Development tools
  execSync(
    "npm install -D @next/bundle-analyzer cross-env prettier eslint-config-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser",
    { stdio: "inherit" }
  );

  // Install missing features
  execSync("npm install swr @trpc/server @trpc/client @trpc/react-query", {
    stdio: "inherit",
  });
  execSync("npm install -D playwright", { stdio: "inherit" });
  execSync("npm install shadcn/ui", { stdio: "inherit" });

  // Install PocketBase
  execSync("npm install pocketbase", { stdio: "inherit" });
} catch (error) {
  console.error("Failed to install dependencies");
  process.exit(1);
}

// Create project structure
console.log("Setting up project structure...");
const directories = [
  "src/components/ui",
  "src/components/features",
  "src/components/layout",
  "src/components/icons",
  "src/components/forms",
  "src/hooks",
  "src/lib",
  "src/lib/validation",
  "src/lib/auth",
  "src/lib/api",
  "src/services",
  "src/stores",
  "src/types",
  "src/utils",
  "src/utils/helpers",
  "src/utils/formatters",
  "src/contexts",
  "src/config",
  "src/middleware",
  "src/i18n",
  "src/theme",
  "public/locales",
  "public/locales/en",
  "public/locales/es",
  "public/images",
  "public/fonts",
  "public/icons",
  "tests/unit",
  "tests/integration",
  "tests/e2e",
  "tests/mocks",
  "scripts",
];

directories.forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, ".gitkeep"), "");
});

// Create PocketBase directory
const pocketbaseDir = path.join(process.cwd(), "pocketbase-server");
if (!fs.existsSync(pocketbaseDir)) {
  fs.mkdirSync(pocketbaseDir, { recursive: true });
}

// Function to download PocketBase based on the OS
async function downloadPocketBase() {
  return new Promise((resolve, reject) => {
    console.log("Downloading PocketBase...");

    // Determine the OS and architecture
    const platform = os.platform();
    const arch = os.arch();

    let downloadUrl;
    let filename;

    // Select the appropriate download URL based on OS and architecture
    if (platform === "win32") {
      downloadUrl =
        "https://github.com/pocketbase/pocketbase/releases/download/v0.28.2/pocketbase_0.28.2_windows_amd64.zip";
      filename = "pocketbase_windows.zip";
    } else if (platform === "darwin") {
      if (arch === "arm64") {
        downloadUrl =
          "https://github.com/pocketbase/pocketbase/releases/download/v0.28.2/pocketbase_0.28.2_darwin_arm64.zip";
        filename = "pocketbase_macos_arm64.zip";
      } else {
        downloadUrl =
          "https://github.com/pocketbase/pocketbase/releases/download/v0.28.2/pocketbase_0.28.2_darwin_amd64.zip";
        filename = "pocketbase_macos_amd64.zip";
      }
    } else if (platform === "linux") {
      if (arch === "arm64") {
        downloadUrl =
          "https://github.com/pocketbase/pocketbase/releases/download/v0.28.2/pocketbase_0.28.2_linux_arm64.zip";
        filename = "pocketbase_linux_arm64.zip";
      } else {
        downloadUrl =
          "https://github.com/pocketbase/pocketbase/releases/download/v0.28.2/pocketbase_0.28.2_linux_amd64.zip";
        filename = "pocketbase_linux_amd64.zip";
      }
    } else {
      reject(new Error(`Unsupported platform: ${platform}`));
      return;
    }

    const zipFilePath = path.join(pocketbaseDir, filename);

    // Use different download approaches based on the platform
    if (platform === "win32") {
      try {
        console.log(`Downloading from ${downloadUrl}`);
        console.log(`Saving to ${zipFilePath}`);

        // Use PowerShell's Invoke-WebRequest for Windows
        const downloadCmd = `powershell -Command "Invoke-WebRequest -Uri '${downloadUrl}' -OutFile '${zipFilePath}' -UseBasicParsing"`;
        execSync(downloadCmd);
        console.log(`PocketBase downloaded to ${zipFilePath}`);
        resolve(zipFilePath);
      } catch (error) {
        reject(error);
      }
    } else {
      // For non-Windows platforms, use the regular Node.js https module
      const file = createWriteStream(zipFilePath);

      const request = https.get(downloadUrl, (response) => {
        if (response.statusCode !== 200) {
          file.close();
          fs.unlink(zipFilePath, () => {});
          reject(
            new Error(
              `Failed to download: ${response.statusCode} ${response.statusMessage}`
            )
          );
          return;
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close(() => {
            console.log(`PocketBase downloaded to ${zipFilePath}`);
            resolve(zipFilePath);
          });
        });
      });

      request.on("error", (err) => {
        fs.unlink(zipFilePath, () => {});
        reject(err);
      });

      file.on("error", (err) => {
        fs.unlink(zipFilePath, () => {});
        reject(err);
      });
    }
  });
}

// Function to extract the zip file
function extractZip(zipPath) {
  return new Promise((resolve, reject) => {
    console.log("Extracting PocketBase...");

    const platform = os.platform();

    if (platform === "win32") {
      try {
        // Verify zip file exists and has content
        const stats = fs.statSync(zipPath);
        if (stats.size === 0) {
          reject(new Error(`Downloaded zip file is empty: ${zipPath}`));
          return;
        }

        // Use PowerShell to extract on Windows
        const extractCommand = `powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${pocketbaseDir}' -Force"`;
        execSync(extractCommand);

        // Verify extraction worked
        const pbExePath = path.join(pocketbaseDir, "pocketbase.exe");
        if (!fs.existsSync(pbExePath)) {
          reject(new Error("PocketBase executable not found after extraction"));
          return;
        }

        resolve();
      } catch (error) {
        reject(error);
      }
    } else {
      // For macOS and Linux, use unzip command
      try {
        execSync(`unzip -o "${zipPath}" -d "${pocketbaseDir}"`, {
          stdio: "inherit",
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    }
  });
}

// Create a PocketBase schema file
function createPocketBaseSchema() {
  const schemaPath = path.join(pocketbaseDir, "pb_schema.json");
  const schema = {
    collections: [
      {
        name: "car_models",
        type: "base",
        schema: [
          {
            name: "name",
            type: "text",
            required: true,
          },
          {
            name: "tagline",
            type: "text",
            required: true,
          },
          {
            name: "description",
            type: "text",
            required: true,
          },
          {
            name: "badge_text",
            type: "text",
            required: false,
          },
          {
            name: "hero_image",
            type: "file",
            required: false,
            options: {
              maxSelect: 1,
              maxSize: 5242880,
              mimeTypes: ["image/jpeg", "image/png", "image/webp"],
            },
          },
        ],
      },
    ],
  };

  fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
  console.log(`PocketBase schema created at ${schemaPath}`);
}

// Create a README file for PocketBase
function createPocketBaseReadme() {
  const readmePath = path.join(pocketbaseDir, "README.md");
  const readme = `# PocketBase Setup

This directory contains the PocketBase executable and configuration for your project.

## Starting PocketBase

To start PocketBase, run the following command from the project root:

\`\`\`bash
# Windows
pocketbase-server\\pocketbase.exe serve

# macOS/Linux
./pocketbase-server/pocketbase serve
\`\`\`

This will start the PocketBase server on http://127.0.0.1:8090.

## Admin UI

Once PocketBase is running, you can access the admin UI at:

http://127.0.0.1:8090/_/

On first run, you'll need to create an admin account.

## Collections

The following collections are used by this application:

1. **car_models** - Stores information about car models displayed on the dashboard
   - name: Name of the car model
   - tagline: Short marketing tagline
   - description: Detailed description
   - badge_text: Optional badge text (e.g., "New", "Featured")
   - hero_image: Main image for the car model

You can import the schema using the \`pb_schema.json\` file in this directory.
`;

  fs.writeFileSync(readmePath, readme);
  console.log(`PocketBase README created at ${readmePath}`);
}

// Create a next.config.js file with image domains configuration
function updateNextConfig() {
  const nextConfigPath = path.join(process.cwd(), "next.config.js");
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8090',
        pathname: '/api/files/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
`;

  fs.writeFileSync(nextConfigPath, nextConfig);
  console.log(`Next.js config updated at ${nextConfigPath}`);
}

// Update package.json to add the setup-pocketbase script
function updatePackageJson() {
  const packageJsonPath = path.join(process.cwd(), "package.json");

  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

      // Add the setup-pocketbase script if it doesn't exist
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }

      packageJson.scripts["setup-pocketbase"] =
        "node scripts/setup-pocketbase.js";

      // Add PocketBase start script based on platform
      const platform = os.platform();
      if (platform === "win32") {
        packageJson.scripts["pocketbase"] =
          "cd pocketbase-server && pocketbase.exe serve";
      } else {
        packageJson.scripts["pocketbase"] =
          "cd pocketbase-server && ./pocketbase serve";
      }

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(
        "Added setup-pocketbase and pocketbase scripts to package.json"
      );
    } catch (error) {
      console.error("Failed to update package.json:", error);
    }
  }
}

// Scaffold example files for missing features
// SWR example
fs.writeFileSync(
  "src/hooks/useUser.ts",
  `import useSWR from 'swr';\n\nexport function useUser(id: string) {\n  const { data, error, isLoading, mutate } = useSWR(id ? '/users/' + id : null, fetcher);\n  return { user: data, isLoading, error, mutate };\n}\n\nfunction fetcher(url: string) {\n  return fetch(url).then(res => res.json());\n}\n`
);
// tRPC example
fs.writeFileSync(
  "src/lib/api/trpc.ts",
  `import { createTRPCReact } from '@trpc/react-query';\nimport type { AppRouter } from './server';\n\nexport const trpc = createTRPCReact<AppRouter>();\n`
);
// Playwright config example
fs.writeFileSync(
  "playwright.config.ts",
  `import { defineConfig, devices } from '@playwright/test';\n\nexport default defineConfig({\n  projects: [\n    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },\n    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },\n    { name: 'webkit', use: { ...devices['Desktop Safari'] } },\n  ],\n});\n`
);
// React Context example
fs.writeFileSync(
  "src/contexts/ThemeContext.tsx",
  `import { createContext, useContext, useState, ReactNode } from 'react';\n\ntype Theme = 'light' | 'dark';\ninterface ThemeContextType { theme: Theme; toggleTheme: () => void; }\nconst ThemeContext = createContext<ThemeContextType | undefined>(undefined);\nexport function ThemeProvider({ children }: { children: ReactNode }) {\n  const [theme, setTheme] = useState<Theme>('light');\n  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');\n  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;\n}\nexport function useTheme() {\n  const context = useContext(ThemeContext);\n  if (!context) throw new Error('useTheme must be used within a ThemeProvider');\n  return context;\n}\n`
);
// Barrel file example
fs.writeFileSync(
  "src/components/ui/index.ts",
  `export * from './Button';\nexport * from './Card';\nexport * from './Input';\n`
);
// Container/Presentational pattern example
fs.writeFileSync(
  "src/components/features/UserProfileContainer.tsx",
  `import { UserProfile } from './UserProfile';\nimport { useUser } from '@/hooks/useUser';\n\nexport function UserProfileContainer({ userId }: { userId: string }) {\n  const { user, isLoading, error } = useUser(userId);\n  if (isLoading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error.message}</div>;\n  return <UserProfile user={user} />;\n}\n`
);
fs.writeFileSync(
  "src/components/features/UserProfile.tsx",
  `interface UserProfileProps { user: any; }\nexport function UserProfile({ user }: UserProfileProps) {\n  return <div>{user?.name}</div>;\n}\n`
);

// Copy PocketBase from framework directory or download if not available
async function setupPocketBase() {
  try {
    // First try to copy from the framework directory
    const frameworkPocketBaseDir = path.resolve(
      __dirname,
      "../pocketbase-server"
    );
    const targetPocketBaseDir = path.join(process.cwd(), "pocketbase-server");

    if (fs.existsSync(frameworkPocketBaseDir)) {
      console.log("Copying PocketBase from framework directory...");
      copyDir(frameworkPocketBaseDir, targetPocketBaseDir);
      console.log("PocketBase copied successfully!");
    } else {
      console.log("Framework PocketBase not found, downloading...");
      const zipPath = await downloadPocketBase();
      await extractZip(zipPath);
    }

    createPocketBaseSchema();
    createPocketBaseReadme();
    updateNextConfig();
    updatePackageJson();
    console.log("PocketBase setup completed successfully!");
  } catch (error) {
    console.error("Failed to setup PocketBase:", error);
    console.log(
      "You can manually copy PocketBase from the framework's pocketbase-server directory"
    );
  }
}

// Run PocketBase setup
setupPocketBase().then(() => {
  console.log("Project setup complete!");
  console.log(`
Next steps:
1. cd ${projectName}
2. npm run dev
3. Start PocketBase:
   - Using npm: npm run pocketbase
   - Or manually:
     - Windows: pocketbase-server\\pocketbase.exe serve
     - macOS/Linux: ./pocketbase-server/pocketbase serve
4. Access PocketBase admin UI at http://127.0.0.1:8090/_/

Your project structure follows the Hyact App guidelines.
`);

  rl.close();
});
