#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const readline = require("readline");

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
  console.log("Template files copied successfully!");
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
];

directories.forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, ".gitkeep"), "");
});

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

console.log("Project setup complete!");
console.log(`
Next steps:
1. cd ${projectName}
2. npm run dev

Your project structure follows the Hyact App guidelines.
`);

rl.close();
