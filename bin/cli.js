#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const readline = require("readline");
const process = require("process");

// Function to check Node.js version compatibility with Strapi requirements
function checkNodeVersion() {
  const currentVersion = process.version;
  const versionNumber = currentVersion.slice(1); // Remove the 'v' prefix
  const majorVersion = parseInt(versionNumber.split(".")[0], 10);

  // Strapi requires Node.js >=18.0.0 <=22.x.x
  if (majorVersion < 18 || majorVersion > 22) {
    console.error(`\n\x1b[41m⚠️  Node.js Version Error ⚠️\x1b[0m\n`);
    console.error(`You are running Node.js ${currentVersion}`);
    console.error(`Strapi requires Node.js >=18.0.0 <=22.x.x\n`);
    console.error(
      `Please install a compatible Node.js version to use create-hyact-app.`
    );
    console.log(`\nSuggestion: Install nvm (Node Version Manager) and run:`);
    console.log(`  nvm install 22`);
    console.log(`  nvm use 22`);
    console.log(`  npx create-hyact-website my-website\n`);
    return false;
  }
  return true;
}

// Function to clean up project directory if creation needs to be aborted
function cleanupProjectDirectory(projectPath) {
  console.log(`Cleaning up and removing directory: ${projectPath}`);
  try {
    // Use rimraf-like recursive deletion
    if (fs.existsSync(projectPath)) {
      // Go back to parent directory before deleting
      process.chdir(path.dirname(projectPath));
      fs.rmSync(projectPath, { recursive: true, force: true });
      console.log(
        "Cleanup completed successfully. Please try again with a compatible Node.js version."
      );
    }
  } catch (error) {
    console.error(`Failed to clean up directory: ${error.message}`);
    console.log(`Please manually remove the directory: ${projectPath}`);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Get project name from command line arguments
const projectName = process.argv[2];

if (!projectName) {
  console.error("\n\x1b[41m❌ Please provide a project name\x1b[0m\n");
  console.log("Example: npx create-hyact-website my-website\n");
  process.exit(1);
}

// Check Node.js version compatibility before proceeding
if (!checkNodeVersion()) {
  process.exit(1);
}

console.log(
  `\n==============================\n🚀 \x1b[1mCreating a new HyAct Website with Strapi CMS\x1b[0m\n==============================\n`
);
console.log(`Project: \x1b[36m${projectName}\x1b[0m\n`);

// Store the absolute path to the project directory for potential cleanup
const projectPath = path.resolve(process.cwd(), projectName);

// Create main project directory
fs.mkdirSync(projectName, { recursive: true });
process.chdir(projectPath);

console.log("\n--- [1/6] Setting up frontend (Next.js)...\n");
// Create Next.js app in frontend folder
try {
  execSync(
    `npx create-next-app@latest frontend --typescript --eslint --tailwind --app --src-dir --yes`,
    { stdio: "inherit" }
  );
} catch (error) {
  console.error("Failed to create Next.js app");
  cleanupProjectDirectory(projectPath);
  process.exit(1);
}

console.log("\n--- [2/6] Setting up backend (Strapi CMS)...\n");
// Create Strapi app in backend folder
let usingManualBackend = false;

try {
  execSync(`npx create-strapi-app@latest backend --quickstart --no-run`, {
    stdio: "inherit",
  });
} catch (error) {
  console.error(
    "Failed to create Strapi app - this might be due to Node.js version compatibility"
  );

  // Check if it's a Node.js version issue
  if (!checkNodeVersion()) {
    console.error(
      "Detected incompatible Node.js version. Aborting project creation."
    );
    cleanupProjectDirectory(projectPath);
    process.exit(1);
  }

  // Create a basic package.json for backend
  const backendPackageJson = {
    name: "backend",
    private: true,
    version: "0.1.0",
    description: "Strapi CMS backend for Aurora GT-S showcase",
    scripts: {
      develop: "strapi develop",
      start: "strapi start",
      build: "strapi build",
      strapi: "strapi",
    },
    dependencies: {
      "@strapi/strapi": "5.13.1",
      "@strapi/plugin-users-permissions": "5.13.1",
      "@strapi/plugin-upload": "5.13.1",
    },
    engines: {
      node: ">=18.0.0 <=22.x.x",
      npm: ">=6.0.0",
    },
  };

  fs.writeFileSync(
    path.join(process.cwd(), "backend/package.json"),
    JSON.stringify(backendPackageJson, null, 2)
  );

  // Create basic server.js
  const serverContent = `const strapi = require('@strapi/strapi');

const app = strapi({
  name: 'backend',
  favicon: '/favicon.ico',
  url: 'http://localhost:1337',
});

app.start();
`;

  fs.writeFileSync(
    path.join(process.cwd(), "backend/server.js"),
    serverContent
  );
}

// Verify Node.js version compatibility again before proceeding with Strapi-related setup
if (!checkNodeVersion()) {
  console.error(
    "Aborting project creation. Please use a compatible Node.js version (>=18.0.0 <=22.x.x)."
  );
  cleanupProjectDirectory(projectPath);
  process.exit(1);
}

// Update frontend tsconfig.json to include path aliases
const tsconfigPath = path.resolve(process.cwd(), "frontend/tsconfig.json");
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"));
tsconfig.compilerOptions.paths = {
  "@/*": ["./src/*"],
};
fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));

// Create next.config.js to allow external images from Unsplash
const nextConfigContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
`;

fs.writeFileSync(
  path.join(process.cwd(), "frontend/next.config.js"),
  nextConfigContent
);

console.log("\n--- [3/6] Creating car showcase page...\n");
// Copy template files to frontend
try {
  // Copy the car page from template instead of hardcoding it
  const templateCarPagePath = path.join(
    __dirname,
    "../templates/next-template/src/app/page.tsx"
  );
  const templateNextConfigPath = path.join(
    __dirname,
    "../templates/next-template/next.config.js"
  );
  const templateAppReadmePath = path.join(
    __dirname,
    "../templates/README.md"
  );
  const templateFrontendReadmePath = path.join(
    __dirname,
    "../templates/next-template/README.md"
  );
  const templateBackendReadmePath = path.join(
    __dirname,
    "../templates/strapi-template/README.md"
  );

  // Create necessary directories
  fs.mkdirSync(path.join(process.cwd(), "frontend/src/app"), {
    recursive: true,
  });

  // Copy the car page from template
  fs.copyFileSync(
    templateCarPagePath,
    path.join(process.cwd(), "frontend/src/app/page.tsx")
  );

  // Copy the next.config.js from template
  fs.copyFileSync(
    templateNextConfigPath,
    path.join(process.cwd(), "frontend/next.config.js")
  );

  // Copy the readme.md from template
  fs.copyFileSync(
    templateAppReadmePath,
    path.join(process.cwd(), "README.md")
  );

  // Copy the readme.md (frontend) from the template
  fs.copyFileSync(
    templateFrontendReadmePath,
    path.join(process.cwd(), "frontend/README.md")
  );

  // Copy the readme.md (backend) from the template 
  fs.copyFileSync(
    templateBackendReadmePath,
    path.join(process.cwd(), "backend/README.md")
  );

  // Copy the link-to-db API route
  try {
    const apiRouteSrc = path.join(
      __dirname,
      "../templates/next-template/src/app/api/link-to-db/route.ts"
    );
    const apiRouteDestDir = path.join(
      process.cwd(),
      "frontend/src/app/api/link-to-db"
    );
    fs.mkdirSync(apiRouteDestDir, { recursive: true });
    fs.copyFileSync(apiRouteSrc, path.join(apiRouteDestDir, "route.ts"));
  } catch (error) {
    console.error("Failed to copy link-to-db API route:", error);
  }

  console.log("\n✅ Car showcase page created successfully!\n");
} catch (error) {
  console.error("Failed to create car showcase page:", error);
  process.exit(1);
}

// Create additional frontend structure
console.log("\n--- [4/6] Setting up frontend structure...\n");
const frontendDirectories = [
  "frontend/src/components",
  "frontend/src/types",
  "frontend/src/utils",
  "frontend/src/contexts",
  "frontend/src/config",
  "frontend/src/lib",
  "frontend/public/images",
  "frontend/public/icons",
  "frontend/src/components/ui",
  "frontend/src/components/features",
  "frontend/src/components/layout",
  "frontend/src/components/icons",
  "frontend/src/components/forms",
  "frontend/src/hooks",
  "frontend/src/lib/validation",
  "frontend/src/lib/auth",
  "frontend/src/lib/api",
  "frontend/src/services",
  "frontend/src/stores",
  "frontend/src/utils/helpers",
  "frontend/src/utils/formatters",
  "frontend/src/middleware",
  "frontend/src/i18n",
  "frontend/src/theme",
  "frontend/public/locales",
  "frontend/public/locales/en",
  "frontend/public/locales/es",
  "frontend/public/fonts",
  "frontend/tests/unit",
  "frontend/tests/integration",
  "frontend/tests/e2e",
  "frontend/tests/mocks",
];

frontendDirectories.forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, ".gitkeep"), "");
});

// Setup Strapi integration
console.log("\n--- [5/6] Setting up Strapi CMS integration...\n");
setupStrapiIntegration();

// Function to enhance frontend structure with additional dependencies and examples
function enhanceFrontendStructure() {
  // Install additional dependencies for enhanced structure
  try {
    console.log("Installing additional dependencies...");
    process.chdir("frontend");

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

    process.chdir("..");
    console.log("Dependencies installed successfully!");
  } catch (error) {
    console.error("Failed to install some dependencies", error);
    console.log("Continuing with setup...");
    // Make sure we're back in the project root directory
    try {
      process.chdir(projectPath);
    } catch (err) {
      // Already in the right directory, ignore
    }
  }

  // Create example files
  console.log("Creating example files...");

  // Define template paths and destination paths
  const templateFiles = [
    {
      src: path.join(
        __dirname,
        "../templates/next-template/src/hooks/useUser.ts"
      ),
      dest: "frontend/src/hooks/useUser.ts",
    },
    {
      src: path.join(
        __dirname,
        "../templates/next-template/src/lib/api/trpc.ts"
      ),
      dest: "frontend/src/lib/api/trpc.ts",
    },
    {
      src: path.join(
        __dirname,
        "../templates/next-template/playwright.config.ts"
      ),
      dest: "frontend/playwright.config.ts",
    },
    {
      src: path.join(
        __dirname,
        "../templates/next-template/src/contexts/ThemeContext.tsx"
      ),
      dest: "frontend/src/contexts/ThemeContext.tsx",
    },
    {
      src: path.join(
        __dirname,
        "../templates/next-template/src/components/ui/index.ts"
      ),
      dest: "frontend/src/components/ui/index.ts",
    },
    {
      src: path.join(
        __dirname,
        "../templates/next-template/src/components/features/UserProfileContainer.tsx"
      ),
      dest: "frontend/src/components/features/UserProfileContainer.tsx",
    },
    {
      src: path.join(
        __dirname,
        "../templates/next-template/src/components/features/UserProfile.tsx"
      ),
      dest: "frontend/src/components/features/UserProfile.tsx",
    },
    {
      src: path.join(
        __dirname,
        "../templates/next-template/src/components/ui/Button.tsx"
      ),
      dest: "frontend/src/components/ui/Button.tsx",
    },
    {
      src: path.join(
        __dirname,
        "../templates/next-template/src/components/ui/Input.tsx"
      ),
      dest: "frontend/src/components/ui/Input.tsx",
    },
    {
      src: path.join(__dirname, "../templates/next-template/src/lib/utils.ts"),
      dest: "frontend/src/lib/utils.ts",
    },
  ];

  // Copy each template file to its destination
  templateFiles.forEach((file) => {
    try {
      // Ensure directory exists
      const dirPath = path.dirname(path.join(process.cwd(), file.dest));
      fs.mkdirSync(dirPath, { recursive: true });

      // Copy file
      fs.copyFileSync(file.src, path.join(process.cwd(), file.dest));
    } catch (error) {
      console.error(
        `Failed to copy template file ${file.src}: ${error.message}`
      );
    }
  });

  console.log("\n✅ Enhanced frontend structure completed!\n");
}

// Now call the enhanceFrontendStructure function
console.log("\n--- [6/6] Setting up enhanced frontend structure...\n");
enhanceFrontendStructure();

console.log(
  "\n==============================\n�� \x1b[32mFull-stack setup complete!\x1b[0m 🎉\n==============================\n"
);
console.log(
  `\n\x1b[1mNext Steps:\x1b[0m\n\n  1. \x1b[36mStart your Strapi backend\x1b[0m: cd backend && npm run develop\n  2. \x1b[36mStart your Next.js frontend\x1b[0m: cd frontend && npm run dev\n  3. Open \x1b[4mhttp://localhost:3000\x1b[0m in your browser\n  4. Click the \x1b[33m'Link to DB'\x1b[0m button on the homepage\n`
);

rl.close();

// Function to setup Strapi integration
function setupStrapiIntegration() {
  // Check Node.js version compatibility first
  if (!checkNodeVersion()) {
    console.error(
      "Cannot proceed with Strapi integration due to incompatible Node.js version."
    );
    console.error(
      "The project structure has been created, but Strapi integration might not work correctly."
    );
    console.error(
      "Please use a compatible Node.js version (>=18.0.0 <=22.x.x) to continue working with this project."
    );

    // We're not cleaning up here since the user might want to keep the project structure
    // But we'll warn them and exit to prevent further issues
    process.exit(1);
  }

  // Install axios for API calls in frontend
  try {
    process.chdir("frontend");
    execSync("npm install axios", { stdio: "inherit" });
    process.chdir("..");
  } catch (error) {
    console.error("Failed to install axios in frontend");
  }

  // Copy template files for Strapi integration
  const strapiTemplateFiles = [
    {
      src: path.join(__dirname, "../templates/next-template/src/lib/strapi.ts"),
      dest: "frontend/src/lib/strapi.ts",
    },
    {
      src: path.join(__dirname, "../templates/next-template/.env.local"),
      dest: "frontend/.env.local",
    },
  ];

  // Copy each template file to its destination
  strapiTemplateFiles.forEach((file) => {
    try {
      // Ensure directory exists
      const dirPath = path.dirname(path.join(process.cwd(), file.dest));
      fs.mkdirSync(dirPath, { recursive: true });

      // Copy file
      fs.copyFileSync(file.src, path.join(process.cwd(), file.dest));
    } catch (error) {
      console.error(
        `Failed to copy template file ${file.src}: ${error.message}`
      );
    }
  });

  // Create root package.json from template but replace project name
  try {
    // Read template package.json
    const templatePackageJsonPath = path.join(
      __dirname,
      "../templates/next-template/package.json"
    );
    const templatePackageJson = JSON.parse(
      fs.readFileSync(templatePackageJsonPath, "utf8")
    );

    // Update project name
    templatePackageJson.name = projectName;

    // Write to project directory
    fs.writeFileSync(
      path.join(process.cwd(), "package.json"),
      JSON.stringify(templatePackageJson, null, 2)
    );
  } catch (error) {
    console.error(`Failed to create package.json: ${error.message}`);
  }

  // Create README from template but replace project name
  try {
    // Read template README
    const templateReadmePath = path.join(
      __dirname,
      "../templates/next-template/README.md"
    );
    let templateReadme = fs.readFileSync(templateReadmePath, "utf8");

    // Replace PROJECT_NAME with actual project name
    templateReadme = templateReadme.replace(/PROJECT_NAME/g, projectName);

    // Write to project directory
    fs.writeFileSync(path.join(process.cwd(), "README.md"), templateReadme);
  } catch (error) {
    console.error(`Failed to create README.md: ${error.message}`);
  }

  // Install concurrently for running both apps
  try {
    execSync("npm install", { stdio: "inherit" });
  } catch (error) {
    console.error("Failed to install concurrently");
  }
}
