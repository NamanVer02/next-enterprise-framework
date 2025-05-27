# HyAct Website Builder CLI

<div align="center">
  <p>A CLI tool for generating full-stack automotive websites with Aurora GT-S car showcase and Strapi CMS</p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-15.x-000000)](https://nextjs.org/)
  [![Strapi](https://img.shields.io/badge/Strapi-5.x-2F2E8B)](https://strapi.io/)
</div>

## 📋 About

HyAct Website Builder CLI provides a simple way to generate a professional full-stack automotive website featuring the Aurora GT-S electric hypercar showcase. Built with Next.js frontend and Strapi CMS backend for dynamic content management.

## 🚀 Features

The generated full-stack application includes:

### Frontend (Next.js)

- **Modern Stack** - Built with Next.js 15+, React 19, TypeScript 5, and Tailwind CSS
- **Automotive Showcase** - Professional Aurora GT-S electric hypercar presentation
- **Responsive Design** - Mobile-first responsive layout with beautiful animations
- **Dynamic Content** - Connected to Strapi CMS for easy content management
- **API Integration** - Pre-configured Axios client for Strapi API calls

### Backend (Strapi CMS)

- **Headless CMS** - Strapi v5 for content management
- **Content Types** - Pre-configured structure for cars, features, testimonials, and pricing
- **Admin Panel** - Easy-to-use admin interface for content management
- **RESTful API** - Automatic API generation for all content types
- **Media Management** - Built-in media library for images and files

### Generated Website Features

- **Hero Section** - Stunning hero with background images and branding
- **Car Features** - Dynamic feature cards showcasing vehicle capabilities
- **Performance Specs** - Technical specifications and performance metrics
- **Pricing Tiers** - Dynamic pricing structure with detailed feature lists
- **Testimonials** - Expert reviews and customer testimonials
- **Image Gallery** - Professional automotive photography gallery
- **Navigation** - Fixed navigation bar with smooth scrolling

## 🚦 Installation

You can use the CLI directly with npx without installing it:

```bash
npx create-hyact-website my-automotive-site
```

This will create a new directory with both frontend and backend applications set up and ready to use.

## 📂 Generated Project Structure

The generated full-stack application follows a clean, professional structure:

```
my-automotive-site/
├── frontend/             # Next.js frontend application
│   ├── src/
│   │   ├── app/         # Next.js App Router
│   │   │   └── page.tsx # Aurora GT-S showcase homepage
│   │   ├── components/  # React components
│   │   ├── lib/         # API client and utilities
│   │   │   └── strapi.ts # Strapi API client
│   │   ├── types/       # TypeScript definitions
│   │   └── utils/       # Utility functions
│   ├── public/          # Static assets
│   └── .env.local       # Environment variables
├── backend/             # Strapi CMS backend
│   ├── src/
│   │   └── api/         # API routes and controllers
│   ├── config/          # Strapi configuration
│   └── package.json     # Backend dependencies
├── package.json         # Root scripts for managing both apps
└── README.md           # Project documentation
```

## 💻 CLI Usage

The CLI tool creates a complete full-stack automotive website:

```bash
npx create-hyact-website [project-name]
```

Options:

- `project-name`: The name of the directory where the website will be created (required)

## 🚀 Quick Start

After creating your project:

```bash
cd my-automotive-site

# Start both frontend and backend
npm run dev

# Or start them separately:
npm run dev:frontend  # Frontend only (http://localhost:3000)
npm run dev:backend   # Backend only (http://localhost:1337)
```

## 🏗️ Content Management

### First-time Strapi Setup

1. Visit http://localhost:1337/admin
2. Create your admin account
3. Set up the following content types for dynamic content:

#### Content Types to Create:

1. **Car**

   - `name` (Text)
   - `description` (Rich Text)
   - `price` (Number)
   - `image` (Media)
   - `specifications` (JSON)

2. **Feature**

   - `title` (Text)
   - `description` (Text)
   - `icon` (Text)

3. **Testimonial**

   - `name` (Text)
   - `role` (Text)
   - `quote` (Text)
   - `image` (Media)
   - `rating` (Number)

4. **Pricing Package**
   - `name` (Text)
   - `price` (Text)
   - `description` (Text)
   - `features` (JSON)
   - `popular` (Boolean)

## ⚠️ Node.js Compatibility

**Important**: Strapi requires Node.js >=18.0.0 <=22.x.x

If you're using Node.js v23 or higher:

1. Install nvm: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`
2. Switch to Node.js 22: `nvm install 22 && nvm use 22`
3. Install backend dependencies: `cd backend && npm install`

## 🛠️ Development Commands

- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start only frontend (Next.js)
- `npm run dev:backend` - Start only backend (Strapi)
- `npm run build` - Build frontend for production

## 🔧 Environment Variables

### Frontend (.env.local)

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p>Made with ❤️ by the HyAct Team</p>
  <p>🚗 Building the future of automotive web experiences</p>
</div>
