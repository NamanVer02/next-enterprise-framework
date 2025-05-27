# Create HyAct App

A CLI tool for creating Next.js applications with a comprehensive enterprise framework.

## Features

- Next.js App Router with TypeScript, ESLint, and Tailwind CSS
- PocketBase integration for backend functionality
- State management with Zustand, Jotai, and React Query
- Form handling with React Hook Form and Zod
- UI components with shadcn/ui style utilities
- Internationalization with next-intl
- Testing with Vitest and Playwright

## Usage

```bash
# Using npx (recommended)
npx create-hyact-app my-app

# Or install globally
npm install -g create-hyact-app
create-hyact-app my-app
```

## Project Structure

The CLI creates a new project with the following structure:

```
my-app/
├── pocketbase-server/    # PocketBase backend
├── public/               # Static assets
├── scripts/              # Utility scripts
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   └── ...               # Other directories for organization
└── ...
```

## Getting Started

After creating your project:

1. Navigate to your project directory:

   ```bash
   cd my-app
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Start PocketBase:

   ```bash
   npm run pocketbase
   ```

4. Access your application at [http://localhost:3000](http://localhost:3000)
5. Access PocketBase admin at [http://127.0.0.1:8090/\_/](http://127.0.0.1:8090/_/)

## License

MIT
