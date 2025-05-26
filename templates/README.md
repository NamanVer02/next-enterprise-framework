# Next Enterprise Framework

A modern, feature-rich Next.js application template with built-in PocketBase integration.

## Features

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint and Prettier for code quality
- PocketBase for backend database and authentication
- Dashboard template with PocketBase data integration
- Responsive design with mobile-first approach

## Getting Started

1. Start the development server:
```bash
npm run dev
```

2. Set up PocketBase using the helper script:
```bash
npm run setup-pocketbase
```
This script will:
- Check if PocketBase is running and attempt to start it if not
- Guide you through creating the necessary collections
- Provide instructions for adding sample data

Alternatively, you can manually start PocketBase:
```bash
# Windows
pocketbase\pocketbase.exe serve

# macOS/Linux
./pocketbase/pocketbase serve
```

3. Access the PocketBase admin UI at http://127.0.0.1:8090/_/ and create an admin account.

4. Import the schema from pocketbase/pb_schema.json or manually create a car_models collection with these fields:
   - name (text, required)
   - tagline (text, required)
   - description (text, required)
   - badge_text (text, optional)
   - hero_image (file, optional)

5. Add at least one car model to display on the dashboard.

6. Visit http://localhost:3000/dashboard to see your car model data displayed.

## Project Structure

- `/src/app` - Next.js application routes
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and shared code
- `/pocketbase` - PocketBase executable and configuration
- `/scripts` - Utility scripts for project setup

# HyAct Templates

This directory contains template files that are used by the CLI tool to generate the project structure. The templates provide a starting point for various components, configurations, and utility functions.

## Structure

- `components/` - UI component templates
- `pages/` - Page templates
- `config/` - Configuration file templates
- `hooks/` - Custom hook templates
- `lib/` - Library code templates 