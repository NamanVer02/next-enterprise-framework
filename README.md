# HyAct Enterprise Framework CLI

<div align="center">
  <p>A CLI tool for generating production-ready Next.js enterprise applications</p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-15.x-000000)](https://nextjs.org/)
</div>

## 📋 About

HyAct CLI tool provides a simple way to generate a comprehensive, production-ready Next.js enterprise application with all the features needed for modern web development.

## 🚀 Features

The generated application includes:

- **Modern Stack** - Built with Next.js 15+, React 19, TypeScript 5, and Tailwind CSS
- **App Router Ready** - Full support for Next.js App Router architecture
- **Enterprise Project Structure** - Optimized folder organization for large codebases
- **Type Safety** - End-to-end type safety with TypeScript and Zod
- **Component Library** - Pre-built UI components with Radix UI and shadcn/ui
- **State Management** - Multiple integrated solutions (Zustand, Jotai, React Query)
- **Form Handling** - Type-safe forms with React Hook Form and Zod validation
- **Authentication** - Complete auth system with NextAuth.js
- **API Layer** - Structured API client with error handling
- **Internationalization** - i18n support with next-intl
- **Testing** - Unit, integration, and E2E testing setup
- **Performance Optimization** - Built-in tools for analyzing and improving performance
- **SEO Optimized** - SEO best practices with next-seo
- **Progressive Web App** - PWA support with next-pwa
- **CI/CD Ready** - Pre-configured for continuous integration

## 🚦 Installation

You can use the CLI directly with npx without installing it:

```bash
npx create-hyact-app my-project
```

This will create a new directory with all the necessary files and dependencies installed.

## 📂 Generated Project Structure

The generated project follows a well-organized folder structure:

```
src/
├── app/              # App Router pages and layouts
├── components/       # React components
│   ├── ui/           # Base UI components
│   ├── features/     # Feature-specific components
│   ├── layout/       # Layout components
│   ├── forms/        # Form components
│   └── icons/        # Icon components
├── hooks/            # Custom React hooks
├── lib/              # Library code
│   ├── api/          # API client & utilities
│   ├── auth/         # Authentication utilities
│   └── validation/   # Schema validation
├── services/         # Service layer
├── stores/           # State management stores
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── contexts/         # React contexts
├── config/           # Configuration files
├── middleware/       # Next.js middleware
├── i18n/             # Internationalization
└── theme/            # Theme configuration
```

## 💻 CLI Usage

The CLI tool currently supports creating a new project:

```bash
npx create-hyact-app [project-name]
```

Options:
- `project-name`: The name of the directory where the project will be created (required)

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