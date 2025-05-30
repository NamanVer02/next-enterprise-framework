# Full-Stack Automotive Showcase

## Overview

A modern full-stack web application featuring a sample landing page for an electric hypercar. Built with Next.js for the frontend and seamlessly integrated with Strapi CMS for content management, this sample application demonstrates dynamic content delivery, responsive design, and smooth frontend-backend integration for automotive showcases.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Features](#features)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Reference / Commands](#api-reference--commands)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

## Installation

1. Run npx create-hyact-website my-website
2. Install dependencies:
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Ensure you have Node.js 18-22 (Strapi requirement)

## Quick Start

- Start both frontend and backend together:
  ```bash
  npm run dev
  ```
- For the initial launch, Strapi requires you to setup a super admin for the CMS. Do so in the pop up window, or at [http://localhost:1337/admin](http://localhost:1337/admin)
- Access the frontend at [http://localhost:3000](http://localhost:3000)
- Access Strapi admin at [http://localhost:1337/admin](http://localhost:1337/admin)

## Features

- Next.js frontend with modern UI
- Strapi backend for content management
- One-click integration: 'Link to DB' button auto-creates collections and seeds demo data
- Dynamic car, feature, testimonial, and gallery sections

## Usage

- Use the 'Link to DB' button on the homepage to auto-setup backend collections and seed data. This button:
  1. Authenticates with Strapi as super admin (using env vars)
  2. Creates all required collections (cars, features, testimonials, etc.)
  3. Sets public permissions
  4. Seeds demo data
- After linking, the frontend loads all data from Strapi dynamically.

## Configuration

- For the 'Link to DB' button to work, set `NEXT_PUBLIC_STRAPI_URL` , `STRAPI_SUPERADMIN_EMAIL` and `STRAPI_SUPERADMIN_PASSWORD` in your frontend `.env.local` environment
- This is what the `.env.local` file should look like
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_SUPERADMIN_EMAIL=your-super-admin-email@gmail.com
STRAPI_SUPERADMIN_PASSWORD=your-super-admin-password
```

## API Reference / Commands

### Root Scripts (package.json)

- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start frontend only
- `npm run dev:backend` - Start backend only
- `npm run build` - Build frontend
- `npm run start` - Start frontend in production

## Examples

- To add a new car, use Strapi admin or update the collection via API.
- To update features, testimonials, or gallery, use Strapi admin panel.

## Troubleshooting

- **Strapi fails to start:** Check Node.js version (must be 18-22)
- **Frontend can't fetch data:** Ensure Strapi is running and collections are created
- **'Link to DB' fails:** Check super admin credentials in backend environment
