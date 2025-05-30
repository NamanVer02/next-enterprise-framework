# Backend (Strapi CMS)

## Overview

The backend is powered by [Strapi](https://strapi.io), an open-source headless CMS. It manages all dynamic content for the electric hypercar showcase and provides a REST API for the frontend.

## Table of Contents

- [Backend (Strapi CMS)](#backend-strapi-cms)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [Features](#features)
  - [Usage](#usage)
  - [Configuration](#configuration)
  - [Dependencies](#dependencies)
  - [API Reference / Commands](#api-reference--commands)
  - [Examples](#examples)
  - [Troubleshooting](#troubleshooting)

## Installation

```bash
cd backend
npm install
```

## Quick Start

- Start Strapi in development mode:
  ```bash
  npm run develop
  ```
- Access the admin panel at [http://localhost:1337/admin](http://localhost:1337/admin)
- On first run, create your super admin account

## Features

- Content management for cars, features, testimonials, gallery, and more
- REST API for frontend integration
- Role-based permissions
- Easy data editing via admin panel

## Usage

- Use the admin panel to add/edit/delete content
- Collections are auto-created by the frontend's 'Link to DB' button, or can be managed manually

## Configuration

- Set environment variables in `.env` (see Strapi docs)
- For auto-setup, set `STRAPI_SUPERADMIN_EMAIL` and `STRAPI_SUPERADMIN_PASSWORD` in the `frontend/.env.local` for API authentication

## Dependencies

- [@strapi/strapi](https://docs.strapi.io/dev-docs/intro) – The core Strapi headless CMS framework for building APIs and managing content.
- [@strapi/plugin-cloud](https://docs.strapi.io/dev-docs/deployment/strapi-cloud) – Plugin for deploying Strapi projects to Strapi Cloud.
- [@strapi/plugin-users-permissions](https://docs.strapi.io/dev-docs/plugins/users-permissions) – Plugin for managing user roles, authentication, and permissions.
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) – Fast, simple SQLite3 database driver (default database for development).
- [react](https://react.dev/) / [react-dom](https://react.dev/) – Used by Strapi's admin panel for building the UI.
- [react-router-dom](https://reactrouter.com/en/main) – Routing library used in the Strapi admin panel.
- [styled-components](https://styled-components.com/) – CSS-in-JS library for styling the Strapi admin UI.
- [typescript](https://www.typescriptlang.org/) – Adds static type checking to JavaScript for safer code.
- [@types/node](https://www.npmjs.com/package/@types/node), [@types/react](https://www.npmjs.com/package/@types/react), [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) – TypeScript type definitions for Node.js and React, improving type safety and editor support.

## API Reference / Commands

- `npm run develop`

## Examples

### 1. Adding a New Car (via Strapi Admin GUI)

1. Open the Strapi admin panel at [http://localhost:1337/admin](http://localhost:1337/admin).
2. In the sidebar, click **Content Manager**.
3. Select **Car** from the list of collections.
4. Click the **Create new entry** button.
5. Fill in the car details (name, description, price, etc.).
6. Click **Save** or **Publish**.

### 2. Editing Features, Testimonials, or Gallery (GUI)

1. In the Strapi admin sidebar, select the collection you want to edit (e.g., **Feature**, **Testimonial**, **GalleryImage**).
2. Click on an existing entry to edit, or click **Create new entry** to add a new one.
3. Make your changes and click **Save** or **Publish**.

### 3. Fetching Data via API

To fetch all cars from the backend API:

```bash
curl http://localhost:1337/api/cars
```

Or in JavaScript:

```js
fetch("http://localhost:1337/api/cars")
  .then((res) => res.json())
  .then((data) => console.log(data));
```

### 4. Using the 'Link to DB' Button (Frontend)

- On the frontend homepage, click the **Link to DB** button to auto-create collections and seed demo data in Strapi.
- You must have the correct super admin credentials set in your `.env.local` file for this to work.

---

## Troubleshooting

- **Strapi fails to start:**
  - Ensure you are using Node.js version 18-22. Run `node -v` to check.
  - Delete `backend/node_modules` and reinstall dependencies if needed.
- **Cannot login to admin panel:**
  - Double-check your super admin email and password.
  - If you forgot your password, use the "Forgot your password?" link on the login page.
- **API not accessible:**
  - Make sure Strapi is running (`npm run develop`).
  - Check that the correct port (default: 1337) is open and not blocked by a firewall.
- **Frontend can't fetch data:**
  - Ensure collections exist and have public permissions enabled in Strapi.
  - Use the 'Link to DB' button or manually set permissions in the Strapi admin panel.
- **Database errors:**
  - If using SQLite, ensure you have write permissions to the `backend` directory.
  - For production, consider switching to a more robust database (see Strapi docs).
