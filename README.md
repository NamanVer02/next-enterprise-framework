# HyAct Website Builder CLI

<div align="center">
  <p>A CLI tool for generating full-stack automotive websites with Aurora GT-S car showcase and Strapi CMS</p>
  
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6" alt="TypeScript">
  <img src="https://img.shields.io/badge/Next.js-15.x-000000" alt="Next.js">
  <img src="https://img.shields.io/badge/Strapi-5.x-2F2E8B" alt="Strapi">
</div>

## 📋 About

HyAct Website Builder CLI is a tool for generating a full-stack automotive website featuring the Aurora GT-S electric hypercar showcase. It provides a modern Next.js frontend and a Strapi CMS backend, with a one-click database linking feature for instant content setup.

---

## 🚀 Features

### Frontend (Next.js)

- Modern stack: Next.js 15+, React 19, TypeScript 5, Tailwind CSS
- Aurora GT-S hypercar showcase with dynamic content
- Responsive, animated design
- API integration with Strapi CMS
- One-click "Link to DB" button for instant content population

### Backend (Strapi CMS)

- Strapi v5 headless CMS
- Pre-configured content types: Cars, Features, Testimonials, Pricing Packages, Gallery, Company Stats
- RESTful API for all content types
- Easy admin panel

### Automation

- **Link to DB:** After setup, a single button in the frontend will:
  - Create all required Strapi collections
  - Set public permissions
  - Seed demo data (cars, features, testimonials, etc.)

---

## 📦 Important Libraries

- **Frontend:** `next`, `react`, `typescript`, `tailwindcss`, `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `lucide-react`, `tailwind-merge`
- **Backend:** `strapi` (auto-installed in backend)
- **Dev:** `vitest`, `@types/node`, `@types/react`, `@types/react-dom`

---

## ⚡ How to Create a New Project

```bash
npx create-hyact-website my-automotive-site
```

This will scaffold both frontend and backend in a new directory.

---

## ▶️ How to Run

```bash
cd my-automotive-site

# Start both frontend and backend
npm run dev

# Or start them separately:
npm run dev:frontend   # Frontend (http://localhost:3000)
npm run dev:backend    # Backend (http://localhost:1337)
```

---

## 🔗 How to Link the Database (Strapi) to the Frontend

1. **Start the backend**  
   Make sure Strapi is running:

   ```bash
   npm run dev:backend
   ```

2. **Create a Strapi Super Admin Account**

   - Visit [http://localhost:1337/admin](http://localhost:1337/admin)
   - Register a super admin account (email & password)

3. **Configure Frontend Environment Variables**  
   In the frontend's `.env.local` file, add:

   ```
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   STRAPI_SUPERADMIN_EMAIL=your-superadmin-email@example.com
   STRAPI_SUPERADMIN_PASSWORD=your-superadmin-password
   ```

   Replace with your actual super admin credentials.

4. **Restart the frontend** (if it was running)

5. **Link the Database**
   - Open [http://localhost:3000](http://localhost:3000)
   - Click the **"Link to DB"** button in the navigation bar.
   - Wait for the process to finish (collections will be created, permissions set, and demo data seeded).

---

## 📝 Notes

- The "Link to DB" button automates Strapi setup—no manual collection or data entry needed!
- If you change your super admin credentials, update `.env.local` and restart the frontend.

---

## 🛠️ Development Commands

- `npm run dev` – Start both frontend and backend
- `npm run dev:frontend` – Start only frontend
- `npm run dev:backend` – Start only backend
- `npm run build` – Build frontend for production

---

## ⚠️ Node.js Compatibility

Strapi requires Node.js >=18.0.0 <=22.x.x.  
If you're using Node.js v23 or higher, use `nvm` to switch to Node.js 22.

---

<div align="center">
  <p>Made with ❤️ by the HyAct Team</p>
  <p>🚗 Building the future of automotive web experiences</p>
</div>
