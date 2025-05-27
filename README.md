# HyAct Website Builder CLI

<div align="center">
  <p>A CLI tool for generating professional automotive websites with Aurora GT-S car showcase</p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-15.x-000000)](https://nextjs.org/)
</div>

## 📋 About

HyAct Website Builder CLI provides a simple way to generate a professional automotive website featuring the Aurora GT-S electric hypercar showcase. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

The generated website includes:

- **Modern Stack** - Built with Next.js 15+, React 19, TypeScript 5, and Tailwind CSS
- **Automotive Showcase** - Professional Aurora GT-S electric hypercar presentation
- **Responsive Design** - Mobile-first responsive layout with beautiful animations
- **Hero Section** - Stunning hero with background images and branding
- **Car Features** - Detailed feature cards showcasing vehicle capabilities
- **Performance Specs** - Technical specifications and performance metrics
- **Pricing Tiers** - Three-tier pricing structure with detailed feature lists
- **Testimonials** - Expert reviews and customer testimonials
- **Image Gallery** - Professional automotive photography gallery
- **Navigation** - Fixed navigation bar with smooth scrolling
- **No Dependencies** - Uses only standard Next.js and Tailwind CSS
- **Ready to Deploy** - Instantly deployable professional website

## 🚦 Installation

You can use the CLI directly with npx without installing it:

```bash
npx create-hyact-website my-website
```

This will create a new directory with all the necessary files and dependencies installed.

## 📂 Generated Website Structure

The generated website follows a clean, professional structure:

```
src/
├── app/              # Next.js App Router
│   ├── page.tsx      # Aurora GT-S showcase homepage
│   ├── layout.tsx    # Root layout
│   └── globals.css   # Global styles
├── components/       # React components (ready for expansion)
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── contexts/         # React contexts
├── config/           # Configuration files
public/
├── images/           # Image assets
└── icons/            # Icon assets
```

## 💻 CLI Usage

The CLI tool currently supports creating a new automotive website:

```bash
npx create-hyact-website [website-name]
```

Options:

- `website-name`: The name of the directory where the website will be created (required)

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
</div>
