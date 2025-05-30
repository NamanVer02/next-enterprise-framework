# Frontend (Next.js)

## Overview

The frontend is a modern React application built with Next.js, providing a fast, SEO-friendly, and interactive user experience for the electric hypercar showcase.

## Table of Contents

- [Frontend (Next.js)](#frontend-nextjs)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [Features](#features)
  - [Usage](#usage)
  - [Configuration](#configuration)
  - [Dependencies](#dependencies)
    - [UI \& Styling](#ui--styling)
    - [State Management \& Data Fetching](#state-management--data-fetching)
    - [Forms \& Validation](#forms--validation)
    - [API \& Authentication](#api--authentication)
    - [Utilities](#utilities)
    - [Testing \& Development](#testing--development)
  - [Examples](#examples)
  - [Troubleshooting](#troubleshooting)

## Installation

```bash
cd frontend
npm install
```

## Quick Start

- Start the frontend:
  ```bash
  npm run dev
  ```
- Visit [http://localhost:3000](http://localhost:3000)

## Features

- Built with Next.js 15 (App Router)
- TypeScript, Tailwind CSS, and Radix UI for modern UI
- State management with Zustand, Jotai, and React Query
- Forms with React Hook Form and Zod validation
- Internationalization (i18n) support
- API integration with Strapi backend

## Usage

- Edit pages in `src/app/`
- Add UI components in `src/components/`
- Use hooks from `src/hooks/`
- Update API logic in `src/lib/api/`

## Configuration

- Set `NEXT_PUBLIC_STRAPI_URL` in `.env.local` to point to your backend
- Additionally add the `STRAPI_SUPERADMIN_EMAIL` and `STRAPI_SUPERADMIN_PASSWORD` for the 'Link to DB' button to work

## Dependencies

### UI & Styling

- [next](https://nextjs.org/) – The React framework for server-side rendering and static site generation.
- [react](https://react.dev/) / [react-dom](https://react.dev/) – The core React library for building user interfaces.
- [tailwindcss](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development.
- [@tailwindcss/postcss](https://tailwindcss.com/docs/using-with-preprocessors) – PostCSS plugin for Tailwind integration.
- [class-variance-authority](https://cva.style/docs) – Utility for managing complex Tailwind class combinations.
- [clsx](https://github.com/lukeed/clsx) – Utility for conditionally joining CSS class names.
- [@radix-ui/react-slot](https://www.radix-ui.com/primitives/docs/utilities/slot) – Primitive for advanced component composition.
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) – Merges Tailwind CSS classes intelligently to avoid conflicts.
- [next-seo](https://github.com/garmeeh/next-seo) – SEO management for Next.js apps.
- [next-pwa](https://github.com/shadowwalker/next-pwa) – Adds Progressive Web App support to Next.js.
- [next-sitemap](https://github.com/iamvishnusankar/next-sitemap) – Generates sitemaps for Next.js projects.

### State Management & Data Fetching

- [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) – Global state management library, great for app-wide state.
- [jotai](https://jotai.org/docs/introduction) – Atomic state management, best for small, isolated pieces of state.
- [@tanstack/react-query](https://tanstack.com/query/latest/docs/framework/react/overview) – Data fetching, caching, and synchronization for server state.
- [@tanstack/react-query-devtools](https://tanstack.com/query/latest/docs/framework/react/devtools) – Devtools for React Query.
- [immer](https://immerjs.github.io/immer/) – Immutable state management helper, often used with Zustand or Jotai.
- [swr](https://swr.vercel.app/) – React Hooks for remote data fetching (stale-while-revalidate strategy).

### Forms & Validation

- [react-hook-form](https://react-hook-form.com/) – Performant, flexible form state management.
- [@hookform/error-message](https://react-hook-form.com/docs/useform/seterror) – Error message helper for React Hook Form.
- [@hookform/resolvers](https://react-hook-form.com/docs/useform/#resolver) – Integrates external validation libraries with React Hook Form.
- [zod](https://zod.dev/) – TypeScript-first schema validation for form and API data.

### API & Authentication

- [axios](https://axios-http.com/) – Promise-based HTTP client for making API requests.
- [@trpc/client](https://trpc.io/docs/client/nextjs) / [@trpc/react-query](https://trpc.io/docs/reactjs/quickstart) / [@trpc/server](https://trpc.io/docs/server/nextjs) – End-to-end typesafe API communication between frontend and backend.
- [iron-session](https://github.com/vvo/iron-session) – Stateless session utility for authentication.
- [next-auth](https://next-auth.js.org/) – Authentication for Next.js apps.
- [@auth/core](https://authjs.dev/getting-started/introduction) – Core authentication library used by NextAuth.js.

### Utilities

- [date-fns](https://date-fns.org/) – Modern JavaScript date utility library.
- [schema-dts](https://github.com/google/schema-dts) – TypeScript types for Schema.org structured data.
- [sharp](https://sharp.pixelplumbing.com/) – High-performance image processing library.
- [next-i18n-router](https://github.com/i18nexus/next-i18n-router) – Internationalization routing for Next.js.
- [next-intl](https://next-intl-docs.vercel.app/) – Internationalization (i18n) for Next.js apps.

### Testing & Development

- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) – Utilities for testing React components.
- [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) – Custom Jest matchers for DOM assertions.
- [@testing-library/user-event](https://testing-library.com/docs/user-event/intro/) – Simulates user interactions in tests.
- [vitest](https://vitest.dev/) – Fast unit testing framework.
- [playwright](https://playwright.dev/) – End-to-end browser testing.
- [msw](https://mswjs.io/) – API mocking for tests and development.
- [eslint](https://eslint.org/) / [prettier](https://prettier.io/) – Linting and code formatting.
- [typescript](https://www.typescriptlang.org/) – Type safety for JavaScript.
- [jsdom](https://github.com/jsdom/jsdom) – JavaScript implementation of the DOM for testing.
- [cross-env](https://github.com/kentcdodds/cross-env) – Set environment variables across platforms.
- [@vitejs/plugin-react](https://vitejs.dev/plugins/) – Vite plugin for React.
- [@next/bundle-analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer) – Bundle analysis for Next.js apps.

## Examples

### 1. Creating a Custom Component

To add a new UI component:

1. Create a file in `src/components/ui/`, e.g. `MyButton.tsx`:
   ```tsx
   import { ButtonHTMLAttributes } from "react";
   export function MyButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
     return (
       <button
         {...props}
         className="px-4 py-2 bg-blue-600 text-white rounded"
       />
     );
   }
   ```
2. Use your component in a page or another component:
   ```tsx
   import { MyButton } from "@/components/ui/MyButton";
   // ...
   <MyButton onClick={() => alert("Clicked!")}>Click Me</MyButton>;
   ```

### 2. Creating a New Page

To add a new route/page:

1. Create a file in `src/app/`, e.g. `src/app/about/page.tsx`:
   ```tsx
   export default function AboutPage() {
     return <div className="p-8 text-2xl">About the Aurora GT-S</div>;
   }
   ```
2. Visit `/about` in your browser to see the new page.

### 3. Using State Management (Zustand Example)

To use global state:

1. Create a store in `src/stores/`, e.g. `counterStore.ts`:
   ```ts
   import { create } from "zustand";
   type CounterState = { count: number; inc: () => void };
   export const useCounter = create<CounterState>((set) => ({
     count: 0,
     inc: () => set((state) => ({ count: state.count + 1 })),
   }));
   ```
2. Use the store in a component:
   ```tsx
   import { useCounter } from "@/stores/counterStore";
   export function Counter() {
     const { count, inc } = useCounter();
     return <button onClick={inc}>Clicked {count} times</button>;
   }
   ```

### 4. Fetching Data from Strapi

To fetch data from the backend:

```ts
import axios from "axios";
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
export async function getCars() {
  const res = await axios.get(`${strapiUrl}/api/cars`);
  return res.data;
}
```

### 5. Adding a Form with Validation

To add a form with validation:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const schema = z.object({ email: z.string().email() });
export function EmailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  return (
    <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Troubleshooting

- **API errors:** Check that Strapi backend is running and `NEXT_PUBLIC_STRAPI_URL` is correct
- **Styling issues:** Ensure Tailwind CSS is properly configured
- **Type errors:** Run `npm run lint` and `npm run type-check` for diagnostics
