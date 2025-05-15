import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ArrowRight, LayoutTemplate, Component, Database, FormInput, Server, TestTube, FolderTree, Layers, ChevronRight, Code, Github, ExternalLink, Zap, Lock, RotateCw } from "lucide-react";
import { TechTypewriter } from "../components/tech-typewriter";

export default function Home() {
  const features = [
    {
      title: "Project Structure",
      description: "Optimal folder organization for enterprise applications",
      icon: FolderTree,
      href: "/project-structure",
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Component Architecture",
      description: "Best practices for building reusable components",
      icon: Component,
      href: "/component-demos",
      color: "from-indigo-500 to-indigo-700",
    },
    {
      title: "State Management",
      description: "Patterns for managing application state at scale",
      icon: Layers,
      href: "/state-management",
      color: "from-violet-500 to-violet-700",
    },
    {
      title: "Form Handling",
      description: "Type-safe form validation with React Hook Form and Zod",
      icon: FormInput,
      href: "/form-handling",
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Data Fetching",
      description: "Efficient data fetching strategies with SWR",
      icon: Database,
      href: "/data-fetching",
      color: "from-cyan-500 to-cyan-700",
    },
    {
      title: "Dependency Injection",
      description: "Service-based architecture for better testability",
      icon: Server,
      href: "/dependency-injection",
      color: "from-sky-500 to-sky-700",
    },
    {
      title: "Testing Framework",
      description: "Comprehensive testing strategy for enterprise apps",
      icon: TestTube,
      href: "/testing-framework",
      color: "from-emerald-500 to-emerald-700",
    },
  ];

  // Tech stack logos with links
  const techLogos = [
    {
      name: "React",
      logo: "https://download.logo.wine/logo/React_(web_framework)/React_(web_framework)-Logo.wine.png",
      link: "https://reactjs.org/",
      category: "core"
    },
    {
      name: "HyAct",
      logo: "https://cdn.freelogovectors.net/wp-content/uploads/2023/09/next-js-logo-freelogovectors.net_.png",
      link: "#",
      category: "core"
    },
    {
      name: "TypeScript",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png",
      link: "https://www.typescriptlang.org/",
      category: "core"
    },
    {
      name: "Tailwind CSS",
      logo: "https://cdn.iconscout.com/icon/free/png-256/free-tailwind-css-logo-icon-download-in-svg-png-gif-file-formats--social-media-pack-logos-icons-4406745.png",
      link: "https://tailwindcss.com/",
      category: "styling"
    },
    {
      name: "shadcn/ui",
      logo: "https://mediaresource.sfo2.digitaloceanspaces.com/wp-content/uploads/2024/04/20161105/shadcn-ui-logo-EF735EC0E5-seeklogo.com.png",
      link: "https://ui.shadcn.com/",
      category: "styling"
    },
    {
      name: "Radix UI",
      logo: "https://images.seeklogo.com/logo-png/46/2/radix-ui-logo-png_seeklogo-466038.png",
      link: "https://www.radix-ui.com/",
      category: "styling"
    },
    {
      name: "Zod",
      logo: "https://miro.medium.com/v2/resize:fit:1080/1*9l9kbbiuFHWVqcjUJZcdYw.png",
      link: "https://zod.dev/",
      category: "validation"
    },
    {
      name: "React Hook Form",
      logo: "https://pbs.twimg.com/profile_images/1373527896472489987/YjVZynHb_400x400.jpg",
      link: "https://react-hook-form.com/",
      category: "validation"
    },
    {
      name: "Jest",
      logo: "https://blog.harveydelaney.com/content/images/size/w2000/2019/08/jest.jpg",
      link: "https://jestjs.io/",
      category: "testing"
    },
    {
      name: "SWR",
      logo: "https://assets.vercel.com/image/upload/v1572282926/swr/swr.png",
      link: "https://swr.vercel.app/",
      category: "data"
    },
    {
      name: "Zustand",
      logo: "https://repository-images.githubusercontent.com/180328715/7142e380-d8a8-11ea-83a0-fada8a0886fd",
      link: "https://zustand-demo.pmnd.rs/",
      category: "state"
    },
    {
      name: "Lucide React",
      logo: "https://lucide.dev/logo.svg",
      link: "https://lucide.dev/",
      category: "ui"
    },
    {
      name: "ESLint",
      link: "https://eslint.org/",
      category: "tools"
    },
    {
      name: "Prettier",
      link: "https://prettier.io/",
      category: "tools"
    },
    {
      name: "React Testing Library",
      link: "https://testing-library.com/docs/react-testing-library/intro/",
      category: "testing"
    },
    {
      name: "Storybook",
      link: "https://storybook.js.org/",
      category: "ui"
    },
    {
      name: "React Query",
      link: "https://tanstack.com/query/v4",
      category: "data"
    },
    {
      name: "Framer Motion",
      link: "https://www.framer.com/motion/",
      category: "ui"
    }
  ];

  // Group tech logos by category
  const categories = {
    core: "Core Framework",
    styling: "UI & Styling",
    validation: "Forms & Validation",
    testing: "Testing",
    data: "Data Management",
    state: "State Management",
    ui: "UI Components",
    tools: "Tools"
  };

  return (
    <Layout fullWidth hideSidebar>
      <div className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 20% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 90%, rgba(6, 182, 212, 0.08) 0%, transparent 50%)',
          zIndex: -1
        }}>
      </div>
      
      <section className="relative overflow-hidden pt-2 w-screen -mx-4 md:-mx-6 xl:-mx-8">
        <div className="relative container flex flex-col items-center space-y-8 py-10 md:py-16 lg:py-20 xl:py-24 text-center">
          <Badge className="px-4 py-2 animate-in">
            <Link href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
              <span className="text-sm font-medium">A NEXT based Framework</span>
            </Link>
          </Badge>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold gradient-text tracking-tight animate-up">
            HyAct Enterprise
          </h1>
          <p className="max-w-[42rem] 2xl:max-w-[50rem] text-muted-foreground text-lg md:text-xl xl:text-2xl animate-up animation-delay-100">
            A comprehensive enterprise-grade framework for building scalable, maintainable React applications with battle-tested patterns.
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-up animation-delay-200">
            <Button asChild size="lg" className="h-12 xl:h-14 px-6 xl:px-8 relative overflow-hidden shadow-lg group text-base xl:text-lg">
              <Link href="/project-structure">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Features <ChevronRight className="h-4 w-4 xl:h-5 xl:w-5" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-300"></span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-700 to-cyan-700 transition-all duration-300"></span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 xl:h-14 px-6 xl:px-8 gap-2 border-primary/20 hover:border-primary/60 transition-all duration-300 text-base xl:text-lg">
              <Link href="https://github.com/hyundai-autoever/hyact" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4 xl:h-5 xl:w-5" />
                GitHub Repo
              </Link>
            </Button>
          </div>
          
          <div className="w-full mt-8 max-w-3xl xl:max-w-4xl mx-auto animate-fade-in animation-delay-300">
            <div className="bg-card/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-md">
              <div className="flex items-center px-4 py-2 bg-card/60 border-b border-primary/10">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto pr-8 text-xs font-mono text-muted-foreground">terminal</div>
              </div>
              <div className="p-6 font-mono text-sm">
                <span className="text-primary">$</span> <span>npx create-hyact-app my-enterprise-app</span>
                <div className="mt-2 text-muted-foreground">
                  <span className="text-green-500">✓</span> Creating a new HyAct application...
                </div>
                <div className="text-muted-foreground">
                  <span className="text-green-500">✓</span> Installing dependencies...
                </div>
                <div className="text-muted-foreground">
                  <span className="text-green-500">✓</span> Setting up project structure...
                </div>
                <div className="mt-1">
                  Your application is ready! Next steps:
                </div>
                <div className="mt-1">
                  <span className="text-primary">$</span> <span>cd my-enterprise-app</span>
                </div>
                <div>
                  <span className="text-primary">$</span> <span>npm run dev</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section - Animated Typography */}
      <section className="py-16 md:py-20 xl:py-24 bg-gradient-to-b from-transparent to-background/95 w-screen -mx-4 md:-mx-6 xl:-mx-8">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="px-4 py-1.5 mb-3">Powered By</Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Modern Technology Stack
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              Built with industry-leading technologies
            </p>
          </div>

          <div className="tech-animation relative overflow-hidden rounded-xl bg-card/30 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 shadow-sm py-16 md:py-20 px-4">
            <div className="flex items-center justify-center">
              <TechTypewriter technologies={techLogos} />
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card/40 backdrop-blur-sm rounded-lg p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-blue-500 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/><path d="M9 9h1"/><path d="M9 13h6"/><path d="M9 17h6"/></svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Type-Safe</h3>
              <p className="text-muted-foreground text-sm">End-to-end type safety with TypeScript</p>
            </div>
            
            <div className="bg-card/40 backdrop-blur-sm rounded-lg p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-purple-500 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5l10-5l-10-5Z"/><path d="M2 17l10 5l10-5"/><path d="M2 12l10 5l10-5"/></svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Component-Based</h3>
              <p className="text-muted-foreground text-sm">Reusable, modular architecture</p>
            </div>
            
            <div className="bg-card/40 backdrop-blur-sm rounded-lg p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-amber-500 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h3 className="font-medium text-lg mb-2">Testing Framework</h3>
              <p className="text-muted-foreground text-sm">Comprehensive testing utilities</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 xl:py-32">
        <div className="container">
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="font-heading text-3xl md:text-4xl xl:text-5xl font-bold gradient-text mb-4">
              Framework Features
            </h2>
            <p className="text-muted-foreground md:text-lg xl:text-xl max-w-2xl xl:max-w-3xl mx-auto">
              Everything you need to build enterprise-grade React applications with confidence
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {features.map((feature, i) => (
              <Link href={feature.href} key={feature.title} className="group">
                <Card className="h-full overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/20 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader className="relative pb-0">
                    <div className={`absolute top-0 right-0 h-24 w-24 bg-gradient-to-br ${feature.color} opacity-5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300`}></div>
                    <div className={`h-10 w-10 xl:h-12 xl:w-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${feature.color} text-white shadow-md mb-3`}>
                      <feature.icon className="h-5 w-5 xl:h-6 xl:w-6" />
                    </div>
                    <CardTitle className="font-heading text-xl xl:text-2xl group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground xl:text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-center text-sm xl:text-base font-medium text-primary transition-colors">
                      <span>Learn more</span>
                      <ArrowRight className="h-4 w-4 xl:h-5 xl:w-5 ml-1 transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 xl:py-32">
        <div className="container">
          <div className="rounded-xl overflow-hidden bg-card/40 backdrop-blur-sm shadow-xl border border-slate-200 dark:border-slate-800">
            <div className="grid md:grid-cols-2 gap-6 xl:gap-8">
              <div className="p-8 md:p-10 xl:p-12 flex flex-col justify-center">
                <Badge className="w-fit mb-4">
                  <Code className="h-3 w-3 mr-1" />
                  <span className="text-xs xl:text-sm">Developer Experience</span>
                </Badge>
                <h2 className="font-heading text-2xl sm:text-3xl xl:text-4xl font-bold mb-4 xl:mb-6">
                  Built for Productivity
                </h2>
                <p className="text-muted-foreground mb-6 xl:text-lg">
                  The HyAct Framework provides a solid foundation for building enterprise-grade React applications with best practices, performance optimizations, and scalable architecture.
                </p>
                <ul className="space-y-3 xl:space-y-4 mb-8">
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 xl:h-6 xl:w-6 flex-shrink-0 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="xl:scale-125">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="xl:text-lg">Type-safe with TypeScript first approach</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 xl:h-6 xl:w-6 flex-shrink-0 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="xl:scale-125">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="xl:text-lg">Comprehensive testing utilities included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-5 w-5 xl:h-6 xl:w-6 flex-shrink-0 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="xl:scale-125">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="xl:text-lg">Modern authentication patterns</span>
                  </li>
                </ul>
                <Button asChild variant="outline" size="lg" className="w-fit gap-2 xl:text-lg xl:h-12 hover:shadow-md transition-all duration-300">
                  <Link href="/component-demos">
                    View Component Library
                    <ExternalLink className="h-4 w-4 xl:h-5 xl:w-5" />
                  </Link>
                </Button>
              </div>
              <div className="relative md:py-10 bg-gradient-to-br from-blue-600/5 via-cyan-600/5 to-violet-600/5 hidden md:flex items-center justify-center">
                <div 
                  className="code-block relative z-10 max-w-sm xl:max-w-md mx-auto text-xs xl:text-sm overflow-hidden border-0 bg-card/30 shadow-md hover:shadow-xl transition-all duration-300 p-4 font-mono"
                  dangerouslySetInnerHTML={{
                    __html: `<div class="code-with-colors">
<span class="text-blue-500">// Component with dependency injection</span>
<span class="text-purple-500">import</span> { inject } <span class="text-purple-500">from</span> <span class="text-green-500">'@hyact/core'</span>;
<span class="text-purple-500">import</span> { UserService } <span class="text-purple-500">from</span> <span class="text-green-500">'@/services'</span>;

<span class="text-purple-500">interface</span> <span class="text-yellow-500">UserProfileProps</span> {
  userId: <span class="text-yellow-500">string</span>;
}

<span class="text-purple-500">export const</span> <span class="text-blue-500">UserProfile</span> = inject(
  [UserService],
  (userService) <span class="text-purple-500">=></span> ({ userId }: <span class="text-yellow-500">UserProfileProps</span>) <span class="text-purple-500">=></span> {
    <span class="text-purple-500">const</span> { data: user } = userService.useUser(userId);
    
    <span class="text-purple-500">return</span> (
      <span class="text-blue-500">&lt;div</span> <span class="text-yellow-500">className</span>=<span class="text-green-500">"profile"</span><span class="text-blue-500">&gt;</span>
        <span class="text-blue-500">&lt;h2&gt;</span>{user?.name}<span class="text-blue-500">&lt;/h2&gt;</span>
        <span class="text-blue-500">&lt;div&gt;</span>{user?.email}<span class="text-blue-500">&lt;/div&gt;</span>
      <span class="text-blue-500">&lt;/div&gt;</span>
    );
  }
);
</div>`
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose HyAct Section */}
      <section className="py-16 md:py-24 xl:py-32 bg-gradient-to-b from-transparent to-slate-50/10 dark:to-slate-950/10 w-screen -mx-4 md:-mx-6 xl:-mx-8 -mb-6 md:-mb-8 xl:-mb-10">
        <div className="container">
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="font-heading text-3xl md:text-4xl xl:text-5xl font-bold gradient-text mb-4">
              Why Choose HyAct?
            </h2>
            <p className="text-muted-foreground md:text-lg xl:text-xl max-w-2xl xl:max-w-3xl mx-auto">
              Elevating beyond plain React with enterprise features, while offering the flexibility of React with the structure and robustness of Angular
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card/40 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-4 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
                </div>
                <CardTitle className="text-xl font-heading">Enterprise-Ready Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  HyAct delivers the structured architecture you'd expect from Angular—dependency injection, service patterns, and organized state management—while being built entirely on React for maximum ecosystem compatibility.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/40 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-violet-500 to-purple-500 text-white mb-4 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <CardTitle className="text-xl font-heading">Best of Both Worlds</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Enjoy React's component model and rich ecosystem with the organizational benefits you'd find in Angular. Our framework brings Angular-like structure to React without introducing any complexity or external dependencies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/40 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 text-white mb-4 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/></svg>
                </div>
                <CardTitle className="text-xl font-heading">Superior Developer Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Experience the productivity benefits of Angular's clear architecture with the flexibility of React. Our opinionated-yet-flexible approach provides structured guidance while leveraging React's performance advantages.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/40 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
              <div className="absolute -right-10 -bottom-10 w-52 h-52 opacity-10 rotate-12">
                <img 
                  src="https://cdn.iconscout.com/icon/free/png-256/free-react-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-5-pack-logos-icons-2945110.png?f=webp&w=256" 
                  alt="React Logo Background" 
                  className="w-full h-full object-contain"
                />
              </div>
              <CardHeader className="relative">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 mr-4 flex-shrink-0">
                    <img 
                      src="https://cdn.iconscout.com/icon/free/png-256/free-react-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-5-pack-logos-icons-2945110.png?f=webp&w=256" 
                      alt="React Logo" 
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <CardTitle className="text-xl font-heading">Beyond Plain React</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Pre-configured project structure eliminates configuration hell</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Built-in state management patterns prevent "prop drilling" nightmares</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Dependency injection for service-based architecture and testability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Enterprise-ready data fetching with caching and synchronization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/40 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
              <div className="absolute -right-4 -bottom-6 w-40 h-40 opacity-10 rotate-6">
                <img 
                  src="https://brandlogos.net/wp-content/uploads/2025/04/angular_icon-logo-brandlogos.net_jn7wi-512x542.png" 
                  alt="Angular Logo Background"
                  className="w-full h-full object-contain" 
                />
              </div>
              <CardHeader className="relative">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 mr-4 flex-shrink-0">
                    <img 
                      src="https://brandlogos.net/wp-content/uploads/2025/04/angular_icon-logo_brandlogos.net_jn7wi-512x542.png" 
                      alt="Angular Logo"
                      className="h-full w-full object-contain" 
                    />
                  </div>
                  <CardTitle className="text-xl font-heading">Advantages Over Angular</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Lighter bundle size with faster initial load times</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Familiar React component model with easier learning curve</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Access to the entire React ecosystem without lock-in</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Powerful type safety without complex decorators and metadata</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}