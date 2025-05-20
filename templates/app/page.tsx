import { Layout } from "../components/layout/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import Link from "next/link";

type IconType = "code" | "lock" | "zap" | "refresh";

interface Feature {
  title: string;
  description: string;
  icon: IconType;
  color: string;
}

const icons: Record<IconType, React.ReactElement> = {
  code: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 xl:h-6 xl:w-6"
    >
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  ),
  lock: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 xl:h-6 xl:w-6"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  zap: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 xl:h-6 xl:w-6"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  refresh: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 xl:h-6 xl:w-6"
    >
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"></path>
    </svg>
  ),
};

export default function Home() {
  const features: Feature[] = [
    {
      title: "Modern Stack",
      description: "Built with Next.js, TypeScript, and Tailwind CSS",
      icon: "code",
      color: "from-blue-500 via-blue-600 to-blue-700",
    },
    {
      title: "Type Safety",
      description: "End-to-end type safety with TypeScript",
      icon: "lock",
      color: "from-indigo-500 via-indigo-600 to-indigo-700",
    },
    {
      title: "Fast Development",
      description: "Hot reloading and optimized build process",
      icon: "zap",
      color: "from-violet-500 via-violet-600 to-violet-700",
    },
    {
      title: "Best Practices",
      description: "Follows React and Next.js best practices",
      icon: "refresh",
      color: "from-purple-500 via-purple-600 to-purple-700",
    },
  ];

  return (
    <Layout fullWidth hideSidebar>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 100% 0%, rgba(124, 58, 237, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(124, 58, 237, 0.08) 0%, transparent 50%),
            linear-gradient(to bottom right, rgba(59, 130, 246, 0.03), rgba(124, 58, 237, 0.03))
          `,
          zIndex: -1,
        }}
      ></div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: -1,
        }}
      ></div>

      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto flex flex-col items-center space-y-8 py-10 md:py-16 lg:py-20 xl:py-24 text-center px-4 sm:px-6 lg:px-8">
          <Badge className="px-4 py-2 animate-in bg-gradient-to-r from-blue-500/10 to-violet-500/10 hover:from-blue-500/20 hover:to-violet-500/20 transition-all duration-300">
            <span className="text-sm font-medium bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Powered by Next.js
            </span>
          </Badge>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent tracking-tight animate-up">
            Create HyAct Page
          </h1>
          <p className="max-w-[42rem] 2xl:max-w-[50rem] text-muted-foreground text-lg md:text-xl xl:text-2xl animate-up animation-delay-100">
            A powerful CLI tool to scaffold modern React applications with
            Next.js, TypeScript, and best practices.
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-up animation-delay-200">
            <Button
              asChild
              size="lg"
              className="h-12 xl:h-14 px-6 xl:px-8 relative overflow-hidden shadow-lg group text-base xl:text-lg"
            >
              <Link href="/docs/getting-started">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 xl:h-5 xl:w-5"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 transition-all duration-300"></span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 transition-all duration-300"></span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 xl:h-14 px-6 xl:px-8 gap-2 border-primary/20 hover:border-primary/60 transition-all duration-300 text-base xl:text-lg"
            >
              <Link
                href="https://github.com/NamanVer02/next-enterprise-framework"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 xl:h-5 xl:w-5"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
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
                <div className="mx-auto pr-8 text-xs font-mono text-muted-foreground">
                  terminal
                </div>
              </div>
              <div className="p-6 font-mono text-sm">
                <span className="text-primary">$</span>{" "}
                <span>npx create-hyact-page my-app</span>
                <div className="mt-2 text-muted-foreground">
                  <span className="text-green-500">✓</span> Creating a new
                  Next.js application...
                </div>
                <div className="text-muted-foreground">
                  <span className="text-green-500">✓</span> Installing
                  dependencies...
                </div>
                <div className="text-muted-foreground">
                  <span className="text-green-500">✓</span> Setting up project
                  structure...
                </div>
                <div className="mt-1">
                  Your application is ready! Next steps:
                </div>
                <div className="mt-1">
                  <span className="text-primary">$</span> <span>cd my-app</span>
                </div>
                <div>
                  <span className="text-primary">$</span>{" "}
                  <span>npm run dev</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 xl:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="font-heading text-3xl md:text-4xl xl:text-5xl font-bold gradient-text mb-4">
              Features
            </h2>
            <p className="text-muted-foreground md:text-lg xl:text-xl max-w-2xl xl:max-w-3xl mx-auto">
              Everything you need to build modern React applications with
              confidence
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div key={feature.title} className="group">
                <Card className="h-full pb-6 overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/20 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader className="relative pb-0">
                    <div
                      className={`absolute top-0 right-0 h-24 w-24 bg-gradient-to-br ${feature.color} opacity-5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300`}
                    ></div>
                    <div
                      className={`h-10 w-10 xl:h-12 xl:w-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${feature.color} text-white shadow-md mb-3`}
                    >
                      {icons[feature.icon]}
                    </div>
                    <CardTitle className="font-heading text-xl xl:text-2xl group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground xl:text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 xl:py-32 bg-gradient-to-b from-transparent to-slate-50/10 dark:to-slate-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 xl:mb-16">
            <h2 className="font-heading text-3xl md:text-4xl xl:text-5xl font-bold gradient-text mb-4">
              Why Choose Create HyAct Page?
            </h2>
            <p className="text-muted-foreground md:text-lg xl:text-xl max-w-2xl xl:max-w-3xl mx-auto">
              The fastest way to start building modern React applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/40 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-4 shadow-md">
                  {icons["zap"]}
                </div>
                <CardTitle className="text-xl font-heading">
                  Quick Start
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get started in seconds with a single command. No configuration
                  needed - just start coding.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/40 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-violet-500 to-purple-500 text-white mb-4 shadow-md">
                  {icons["lock"]}
                </div>
                <CardTitle className="text-xl font-heading">
                  Type Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built-in TypeScript support ensures type safety throughout
                  your application.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
