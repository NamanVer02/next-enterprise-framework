# PROJECT_NAME

A full-stack automotive website with Aurora GT-S showcase powered by Next.js and Strapi CMS.

## Project Structure

```
PROJECT_NAME/
├── frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components (UI, features, layout, etc.)
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # API clients and utilities
│   │   ├── services/      # Service layer for external APIs
│   │   ├── stores/        # State management (Zustand, Jotai)
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Helper functions
│   ├── public/            # Static assets
│   ├── tests/             # Test files (unit, integration, e2e)
│   └── package.json
├── backend/           # Strapi CMS backend
│   ├── src/
│   │   └── api/       # API routes and controllers
│   ├── config/        # Strapi configuration
│   └── package.json
└── package.json       # Root package.json for scripts
```

## Quick Start

1. **Start both applications:**

   ```bash
   npm run dev
   ```

2. **Access the applications:**

   - Frontend: http://localhost:3000
   - Strapi Admin: http://localhost:1337/admin

3. **First-time Strapi setup:**
   - Visit http://localhost:1337/admin
   - Create your admin account
   - Configure your content types

## Content Types to Create in Strapi

To make the Aurora GT-S showcase dynamic, create these content types in Strapi:

### 1. Car

- `name` (Text)
- `description` (Rich Text)
- `price` (Number)
- `image` (Media)
- `specifications` (JSON)

### 2. Feature

- `title` (Text)
- `description` (Text)
- `icon` (Text)

### 3. Testimonial

- `name` (Text)
- `role` (Text)
- `quote` (Text)
- `image` (Media)
- `rating` (Number)

### 4. Pricing Package

- `name` (Text)
- `price` (Text)
- `description` (Text)
- `features` (JSON)
- `popular` (Boolean)

## Development Commands

- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend
- `npm run build` - Build frontend for production

## Frontend Structure

The frontend follows a comprehensive, well-organized structure:

### Key directories:

- **components/**: UI components separated by type (ui, features, layout)
- **hooks/**: Custom React hooks for reusable logic
- **lib/**: Utilities, API clients, and shared functions
- **contexts/**: React Context providers
- **stores/**: State management with Zustand and Jotai
- **utils/**: Helper functions and formatters

### Installed libraries:

- **State Management**: Zustand, Jotai, React Query
- **UI Components**: Tailwind CSS, CVA, Radix UI primitives
- **Forms**: React Hook Form, Zod validation
- **API**: Axios, SWR, tRPC
- **Testing**: Vitest, React Testing Library, Playwright

## Environment Variables

### Frontend (.env.local)

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

## Node.js Compatibility

⚠️ **Important**: Strapi requires Node.js >=18.0.0 <=22.x.x

If you're using Node.js v23 or higher:

1. Install nvm: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`
2. Switch to Node.js 22: `nvm install 22 && nvm use 22`
3. Install backend dependencies: `cd backend && npm install`

## Troubleshooting

- **Strapi installation fails**: This is usually due to Node.js version compatibility
- **Frontend works but backend doesn't**: Check Node.js version and install backend dependencies manually
- **API calls fail**: Ensure Strapi is running on http://localhost:1337

Enjoy building your automotive showcase website! 🚗
