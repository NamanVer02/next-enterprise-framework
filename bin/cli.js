#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const readline = require("readline");
const process = require("process");

// Function to check Node.js version compatibility with Strapi requirements
function checkNodeVersion() {
  const currentVersion = process.version;
  const versionNumber = currentVersion.slice(1); // Remove the 'v' prefix
  const majorVersion = parseInt(versionNumber.split(".")[0], 10);

  // Strapi requires Node.js >=18.0.0 <=22.x.x
  if (majorVersion < 18 || majorVersion > 22) {
    console.error(`
⚠️  Node.js Version Error ⚠️
You are running Node.js ${currentVersion}
Strapi requires Node.js >=18.0.0 <=22.x.x

Please install a compatible Node.js version to use create-hyact-app.
Suggestion: Install nvm (Node Version Manager) and run:
  nvm install 22
  nvm use 22
  npx create-hyact-website my-website
`);
    return false;
  }
  return true;
}

// Function to clean up project directory if creation needs to be aborted
function cleanupProjectDirectory(projectPath) {
  console.log(`Cleaning up and removing directory: ${projectPath}`);
  try {
    // Use rimraf-like recursive deletion
    if (fs.existsSync(projectPath)) {
      // Go back to parent directory before deleting
      process.chdir(path.dirname(projectPath));
      fs.rmSync(projectPath, { recursive: true, force: true });
      console.log(
        "Cleanup completed successfully. Please try again with a compatible Node.js version."
      );
    }
  } catch (error) {
    console.error(`Failed to clean up directory: ${error.message}`);
    console.log(`Please manually remove the directory: ${projectPath}`);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Get project name from command line arguments
const projectName = process.argv[2];

if (!projectName) {
  console.error("Please provide a project name");
  console.log("Example: npx create-hyact-website my-website");
  process.exit(1);
}

// Check Node.js version compatibility before proceeding
if (!checkNodeVersion()) {
  process.exit(1);
}

console.log(
  `Creating a new HyAct Website with Strapi CMS in ${projectName}...`
);

// Store the absolute path to the project directory for potential cleanup
const projectPath = path.resolve(process.cwd(), projectName);

// Create main project directory
fs.mkdirSync(projectName, { recursive: true });
process.chdir(projectPath);

console.log("Setting up frontend (Next.js)...");
// Create Next.js app in frontend folder
try {
  execSync(
    `npx create-next-app@latest frontend --typescript --eslint --tailwind --app --src-dir --yes`,
    { stdio: "inherit" }
  );
} catch (error) {
  console.error("Failed to create Next.js app");
  cleanupProjectDirectory(projectPath);
  process.exit(1);
}

console.log("Setting up backend (Strapi CMS)...");
// Create Strapi app in backend folder
let usingManualBackend = false;

try {
  execSync(`npx create-strapi-app@latest backend --quickstart --no-run`, {
    stdio: "inherit",
  });
} catch (error) {
  console.error(
    "Failed to create Strapi app - this might be due to Node.js version compatibility"
  );

  // Check if it's a Node.js version issue
  if (!checkNodeVersion()) {
    console.error(
      "Detected incompatible Node.js version. Aborting project creation."
    );
    cleanupProjectDirectory(projectPath);
    process.exit(1);
  }

  console.log("Creating manual backend setup...");
  usingManualBackend = true;

  // Create basic backend folder structure if Strapi installation fails
  const backendDirs = [
    "backend",
    "backend/config",
    "backend/src",
    "backend/src/api",
  ];

  backendDirs.forEach((dir) => {
    fs.mkdirSync(dir, { recursive: true });
  });

  // Create a basic package.json for backend
  const backendPackageJson = {
    name: "backend",
    private: true,
    version: "0.1.0",
    description: "Strapi CMS backend for Aurora GT-S showcase",
    scripts: {
      develop: "strapi develop",
      start: "strapi start",
      build: "strapi build",
      strapi: "strapi",
    },
    dependencies: {
      "@strapi/strapi": "5.13.1",
      "@strapi/plugin-users-permissions": "5.13.1",
      "@strapi/plugin-upload": "5.13.1",
    },
    engines: {
      node: ">=18.0.0 <=22.x.x",
      npm: ">=6.0.0",
    },
  };

  fs.writeFileSync(
    path.join(process.cwd(), "backend/package.json"),
    JSON.stringify(backendPackageJson, null, 2)
  );

  // Create basic server.js
  const serverContent = `const strapi = require('@strapi/strapi');

const app = strapi({
  name: 'backend',
  favicon: '/favicon.ico',
  url: 'http://localhost:1337',
});

app.start();
`;

  fs.writeFileSync(
    path.join(process.cwd(), "backend/server.js"),
    serverContent
  );
}

// Verify Node.js version compatibility again before proceeding with Strapi-related setup
if (usingManualBackend && !checkNodeVersion()) {
  console.error(
    "Manual backend setup was created, but Node.js version is still incompatible."
  );
  console.error(
    "Aborting project creation. Please use a compatible Node.js version (>=18.0.0 <=22.x.x)."
  );
  cleanupProjectDirectory(projectPath);
  process.exit(1);
}

// Update frontend tsconfig.json to include path aliases
const tsconfigPath = path.resolve(process.cwd(), "frontend/tsconfig.json");
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"));
tsconfig.compilerOptions.paths = {
  "@/*": ["./src/*"],
};
fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));

// Create next.config.js to allow external images from Unsplash
const nextConfigContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
`;

fs.writeFileSync(
  path.join(process.cwd(), "frontend/next.config.js"),
  nextConfigContent
);

// Create simplified car page content that only uses basic Next.js dependencies
const createSimplifiedCarPage = () => {
  return `/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';

export default function HomePage() {
  const features = [
    {
      title: "Tri-Motor Powertrain",
      description: "Revolutionary tri-motor configuration delivering 1,200 horsepower with instant torque distribution to all four wheels."
    },
    {
      title: "Autonomous Driving Level 4",
      description: "Advanced AI-powered self-driving system with 12 cameras, LiDAR, and radar sensors for complete autonomy."
    },
    {
      title: "Adaptive Interior",
      description: "Premium cabin with sustainable materials, 22-speaker sound system, and ambient lighting that adapts to driving conditions."
    },
    {
      title: "Active Aerodynamics",
      description: "Intelligent aerodynamic elements that adjust in real-time for optimal performance and efficiency."
    },
    {
      title: "Ultra-Fast Charging",
      description: "800V architecture enables 10-80% charging in just 18 minutes with our Apex Supercharger network."
    },
    {
      title: "5-Star Safety",
      description: "Industry-leading safety with carbon fiber crumple zones and predictive collision avoidance."
    }
  ];

  const specifications = [
    { label: "Top Speed", value: "200 mph", description: "Electronically limited" },
    { label: "Range", value: "516 miles", description: "EPA estimated" },
    { label: "Acceleration", value: "0-60 in 2.1s", description: "With launch control" },
    { label: "Autopilot", value: "Level 4", description: "Full Self-Driving" }
  ];

  const pricingPackages = [
    {
      name: "Aurora GT-S Base",
      price: "$129,900",
      description: "The essential Aurora GT-S experience",
      features: [
        "Dual-Motor AWD (800 HP)",
        "450-mile range",
        "17-inch touchscreen",
        "Premium audio system",
        "Glass panoramic roof",
        "Autopilot included",
        "Over-the-air updates",
        "8-year battery warranty"
      ]
    },
    {
      name: "Aurora GT-S Performance",
      price: "$149,900",
      description: "Maximum performance configuration",
      features: [
        "Tri-Motor AWD (1,200 HP)",
        "516-mile range",
        "Carbon fiber package",
        "Track mode",
        "Performance brakes",
        "Adaptive suspension",
        "Sport seats",
        "Enhanced autopilot"
      ],
      popular: true
    },
    {
      name: "Aurora GT-S First Edition",
      price: "$189,900",
      description: "Limited production luxury variant",
      features: [
        "All Performance features",
        "Exclusive paint options",
        "22-speaker premium audio",
        "Massaging seats",
        "Full self-driving capability",
        "Exclusive interior materials",
        "Numbered badge",
        "Concierge service"
      ]
    }
  ];

  const companyStats = [
    { number: "25+", label: "Industry Awards", description: "2024 recognition" },
    { number: "500K+", label: "Pre-Orders", description: "Global demand" },
    { number: "50+", label: "Countries", description: "Worldwide launch" },
    { number: "12", label: "Manufacturing", description: "Global facilities" }
  ];

  const testimonials = [
    {
      name: "James Morrison",
      role: "Automotive Journalist, Motor Trend",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote: "The Aurora GT-S doesn&apos;t just redefine electric performance—it obliterates every preconception about what an EV can be. This is automotive nirvana."
    },
    {
      name: "Dr. Sarah Chen",
      role: "Technology Executive, Former Tesla",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b932?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote: "After two decades in automotive technology, the Aurora GT-S represents the single greatest leap forward I&apos;ve witnessed. The integration is flawless."
    },
    {
      name: "Michael Rodriguez",
      role: "Professional Racing Driver, Formula E",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote: "In 15 years of professional racing, nothing has prepared me for the Aurora GT-S. The precision, the power, the control—it&apos;s in a league of its own."
    }
  ];

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Exterior Design",
      description: "Aerodynamic perfection"
    },
    {
      url: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Interior Luxury", 
      description: "Premium materials and craftsmanship"
    },
    {
      url: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Performance Mode",
      description: "Track-ready configuration"
    },
    {
      url: "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Charging Technology",
      description: "Ultra-fast charging capability"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <span className="text-2xl font-bold text-blue-900">APEX</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#design" className="text-gray-700 hover:text-blue-700 transition-colors">Design</a>
              <a href="#performance" className="text-gray-700 hover:text-blue-700 transition-colors">Performance</a>
              <a href="#technology" className="text-gray-700 hover:text-blue-700 transition-colors">Technology</a>
              <a href="#specifications" className="text-gray-700 hover:text-blue-700 transition-colors">Specifications</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-700 transition-colors">Pricing</a>
              <a href="#gallery" className="text-gray-700 hover:text-blue-700 transition-colors">Gallery</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="border border-blue-900 text-blue-900 hover:bg-blue-50 px-4 py-2 rounded text-sm font-medium transition-colors">
                Test Drive
              </button>
              <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                Configure
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-6">
          <div className="mb-6 inline-block bg-blue-700/30 text-white border border-blue-400/30 text-sm px-4 py-2 rounded-full">
            World Premiere • Limited Edition
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            Aurora
            <span className="block text-white">GT-S</span>
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-200">
            The pinnacle of electric hypercar engineering
          </p>
          <p className="text-lg mb-8 text-gray-300">
            1,200 HP • 516 miles range • 0-60 in 2.1 seconds • Level 4 Autonomy
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-4 rounded font-medium transition-colors">
              💰 Reserve Now • $5,000
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-blue-900 text-lg px-8 py-4 rounded font-medium transition-colors">
              ▶️ Watch World Premiere
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            First deliveries Q4 2024 • Only 2,500 units worldwide
          </p>
        </div>
      </section>

      {/* Company Heritage */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="mb-4 inline-block bg-white/10 text-white text-sm px-3 py-1 rounded">Since 2019</div>
            <h2 className="text-4xl font-bold mb-6">Five Years of Innovation</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From Silicon Valley startup to global automotive leader, APEX has revolutionized 
              electric vehicle technology with breakthrough innovations in battery chemistry, 
              autonomous driving, and sustainable manufacturing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {companyStats.map((stat, index) => (
              <div key={index}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                  <div className="w-8 h-8 bg-white/20 rounded"></div>
                </div>
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-white text-lg mb-2">{stat.label}</p>
                <p className="text-gray-400 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section id="design" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-4 inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">Design Philosophy</div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">Form Follows Function</h2>
              <p className="text-xl text-gray-700 mb-6">
                Every curve, every line, every surface of the Aurora GT-S serves a purpose. 
                Our design team spent over 3,000 hours in wind tunnel testing to achieve 
                the industry's lowest drag coefficient of 0.20 Cd.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-700 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Carbon Fiber Monocoque</h4>
                    <p className="text-gray-600">Aerospace-grade carbon fiber chassis reduces weight by 40% while increasing structural rigidity.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-700 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Active Aerodynamics</h4>
                    <p className="text-gray-600">Dynamic spoilers and air dams adjust automatically for optimal performance and efficiency.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-700 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">LED Matrix Lighting</h4>
                    <p className="text-gray-600">Adaptive lighting system with 84 individual LED elements for perfect illumination.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image 
                src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Aurora GT-S Interior"
                width={800}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary Features */}
      <section id="performance" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="mb-4 inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">Technology</div>
            <h2 className="text-4xl font-bold text-blue-900 mb-6">Revolutionary Features</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Every detail of the Aurora GT-S has been meticulously engineered to deliver an unparalleled driving experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mb-6 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded opacity-80"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-900 group-hover:text-blue-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Specifications */}
      <section id="specifications" className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="mb-4 inline-block bg-white/10 text-white text-sm px-3 py-1 rounded">Performance</div>
            <h2 className="text-4xl font-bold mb-6">Performance Specifications</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Numbers that speak for themselves. The Aurora GT-S redefines what's possible.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {specifications.map((spec, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/30 rounded"></div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {spec.value}
                </div>
                <div className="text-lg font-semibold text-gray-300 mb-2">
                  {spec.label}
                </div>
                <div className="text-sm text-gray-400">
                  {spec.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="mb-4 inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">Testimonials</div>
            <h2 className="text-4xl font-bold text-blue-900 mb-6">What Experts Say</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Industry leaders and automotive experts share their thoughts on the Aurora GT-S.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-blue-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="mb-4 inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">Gallery</div>
            <h2 className="text-4xl font-bold text-blue-900 mb-6">Experience Aurora GT-S</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore every detail of our revolutionary electric hypercar through our curated gallery.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                <Image 
                  src={image.url} 
                  alt={image.title}
                  width={400}
                  height={256}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-semibold">{image.title}</h4>
                    <p className="text-sm text-gray-300">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="mb-4 inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">Pricing</div>
            <h2 className="text-4xl font-bold text-blue-900 mb-6">Choose Your Aurora</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Three carefully crafted configurations to match your vision of perfect performance.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPackages.map((pkg, index) => (
              <div key={index} className={\`relative bg-white rounded-2xl border-2 \${pkg.popular ? 'border-blue-500 shadow-2xl' : 'border-gray-200 shadow-lg'} p-8 hover:shadow-xl transition-shadow\`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{pkg.price}</div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="w-5 h-5 bg-green-500 rounded-full mr-3 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={\`w-full py-4 rounded-lg font-semibold transition-all duration-300 \${pkg.popular ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white' : 'border-2 border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white'}\`}>
                  Configure This Model
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience Aurora?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the future of automotive excellence. Schedule your test drive today and be among the first to experience the revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Schedule Test Drive
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
              Contact Sales Team
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-blue-900 text-white border-t border-blue-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-blue-900 text-sm font-bold">A</span>
                </div>
                <span className="text-2xl font-bold">APEX</span>
              </div>
              <p className="text-blue-200">Pioneering the future of electric mobility with cutting-edge technology and uncompromising performance.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Aurora GT-S</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Specifications</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Configure</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Test Drive</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">News</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investors</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-blue-800">
            <p className="text-blue-300">
              © 2024 APEX Motors. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}`;
};

// Copy template files to frontend
console.log("Creating car showcase page...");
try {
  // Create the simplified car page
  const carPageContent = createSimplifiedCarPage();

  // Write to Next.js frontend app directory
  fs.writeFileSync(
    path.join(process.cwd(), "frontend/src/app/page.tsx"),
    carPageContent
  );

  console.log("Car showcase page created successfully!");
} catch (error) {
  console.error("Failed to create car showcase page:", error);
  process.exit(1);
}

// Create additional frontend structure
console.log("Setting up frontend structure...");
const frontendDirectories = [
  "frontend/src/components",
  "frontend/src/types",
  "frontend/src/utils",
  "frontend/src/contexts",
  "frontend/src/config",
  "frontend/src/lib",
  "frontend/public/images",
  "frontend/public/icons",
];

frontendDirectories.forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, ".gitkeep"), "");
});

// Setup Strapi integration
console.log("Setting up Strapi CMS integration...");
setupStrapiIntegration();

// Implement enhanceFrontendStructure with directories and example files from old-cli.js
function enhanceFrontendStructure() {
  console.log("Setting up enhanced frontend structure...");

  // Create all directories from old-cli.js
  const enhancedDirectories = [
    "frontend/src/components/ui",
    "frontend/src/components/features",
    "frontend/src/components/layout",
    "frontend/src/components/icons",
    "frontend/src/components/forms",
    "frontend/src/hooks",
    "frontend/src/lib/validation",
    "frontend/src/lib/auth",
    "frontend/src/lib/api",
    "frontend/src/services",
    "frontend/src/stores",
    "frontend/src/utils/helpers",
    "frontend/src/utils/formatters",
    "frontend/src/middleware",
    "frontend/src/i18n",
    "frontend/src/theme",
    "frontend/public/locales",
    "frontend/public/locales/en",
    "frontend/public/locales/es",
    "frontend/public/fonts",
    "frontend/tests/unit",
    "frontend/tests/integration",
    "frontend/tests/e2e",
    "frontend/tests/mocks",
  ];

  enhancedDirectories.forEach((dir) => {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, ".gitkeep"), "");
  });

  // Install additional dependencies for enhanced structure
  try {
    console.log("Installing additional dependencies...");
    process.chdir("frontend");

    // Core dependencies
    execSync(
      "npm install zustand @tanstack/react-query zod react-hook-form @hookform/resolvers date-fns",
      { stdio: "inherit" }
    );

    // State management - enhanced
    execSync("npm install jotai immer @tanstack/react-query-devtools", {
      stdio: "inherit",
    });

    // UI components and styling
    execSync(
      "npm install class-variance-authority tailwind-merge clsx @radix-ui/react-slot",
      { stdio: "inherit" }
    );

    // Form and validation - enhanced
    execSync("npm install @hookform/error-message", { stdio: "inherit" });

    // Internationalization
    execSync("npm install next-intl next-i18n-router", { stdio: "inherit" });

    // Auth and security
    execSync("npm install next-auth @auth/core iron-session", {
      stdio: "inherit",
    });

    // Performance and PWA
    execSync("npm install next-pwa sharp", { stdio: "inherit" });

    // SEO and analytics
    execSync("npm install schema-dts next-sitemap next-seo", {
      stdio: "inherit",
    });

    // Testing dependencies
    execSync(
      "npm install -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom @testing-library/user-event msw",
      { stdio: "inherit" }
    );

    // Development tools
    execSync(
      "npm install -D @next/bundle-analyzer cross-env prettier eslint-config-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser",
      { stdio: "inherit" }
    );

    // Install missing features
    execSync("npm install swr @trpc/server @trpc/client @trpc/react-query", {
      stdio: "inherit",
    });
    execSync("npm install -D playwright", { stdio: "inherit" });

    process.chdir("..");
    console.log("Dependencies installed successfully!");
  } catch (error) {
    console.error("Failed to install some dependencies", error);
    console.log("Continuing with setup...");
    // Make sure we're back in the project root directory
    try {
      process.chdir(projectPath);
    } catch (err) {
      // Already in the right directory, ignore
    }
  }

  // Create example files
  console.log("Creating example files...");

  // SWR example
  fs.writeFileSync(
    "frontend/src/hooks/useUser.ts",
    `import useSWR from 'swr';\n\nexport function useUser(id: string) {\n  const { data, error, isLoading, mutate } = useSWR(id ? '/users/' + id : null, fetcher);\n  return { user: data, isLoading, error, mutate };\n}\n\nfunction fetcher(url: string) {\n  return fetch(url).then(res => res.json());\n}\n`
  );

  // tRPC example
  fs.writeFileSync(
    "frontend/src/lib/api/trpc.ts",
    `import { createTRPCReact } from '@trpc/react-query';\nimport type { AppRouter } from './server';\n\nexport const trpc = createTRPCReact<AppRouter>();\n`
  );

  // Playwright config example
  fs.writeFileSync(
    "frontend/playwright.config.ts",
    `import { defineConfig, devices } from '@playwright/test';\n\nexport default defineConfig({\n  projects: [\n    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },\n    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },\n    { name: 'webkit', use: { ...devices['Desktop Safari'] } },\n  ],\n});\n`
  );

  // React Context example
  fs.writeFileSync(
    "frontend/src/contexts/ThemeContext.tsx",
    `import { createContext, useContext, useState, ReactNode } from 'react';\n\ntype Theme = 'light' | 'dark';\ninterface ThemeContextType { theme: Theme; toggleTheme: () => void; }\nconst ThemeContext = createContext<ThemeContextType | undefined>(undefined);\nexport function ThemeProvider({ children }: { children: ReactNode }) {\n  const [theme, setTheme] = useState<Theme>('light');\n  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');\n  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;\n}\nexport function useTheme() {\n  const context = useContext(ThemeContext);\n  if (!context) throw new Error('useTheme must be used within a ThemeProvider');\n  return context;\n}\n`
  );

  // Barrel file example
  fs.writeFileSync(
    "frontend/src/components/ui/index.ts",
    `export * from './Button';\nexport * from './Card';\nexport * from './Input';\n`
  );

  // Container/Presentational pattern example
  fs.writeFileSync(
    "frontend/src/components/features/UserProfileContainer.tsx",
    `import { UserProfile } from './UserProfile';\nimport { useUser } from '@/hooks/useUser';\n\nexport function UserProfileContainer({ userId }: { userId: string }) {\n  const { user, isLoading, error } = useUser(userId);\n  if (isLoading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error.message}</div>;\n  return <UserProfile user={user} />;\n}\n`
  );

  fs.writeFileSync(
    "frontend/src/components/features/UserProfile.tsx",
    `interface UserProfileProps { user: any; }\nexport function UserProfile({ user }: UserProfileProps) {\n  return <div>{user?.name}</div>;\n}\n`
  );

  // Create empty UI components
  fs.writeFileSync(
    "frontend/src/components/ui/Button.tsx",
    `import { ButtonHTMLAttributes, forwardRef } from 'react';\nimport { cva, type VariantProps } from 'class-variance-authority';\nimport { cn } from '@/lib/utils';\n\nconst buttonVariants = cva(\n  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',\n  {\n    variants: {\n      variant: {\n        default: 'bg-slate-900 text-white hover:bg-slate-900/90',\n        destructive: 'bg-red-500 text-white hover:bg-red-500/90',\n        outline: 'border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900',\n        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-100/80',\n        ghost: 'hover:bg-slate-100 hover:text-slate-900',\n        link: 'text-slate-900 underline-offset-4 hover:underline',\n      },\n      size: {\n        default: 'h-10 px-4 py-2',\n        sm: 'h-9 rounded-md px-3',\n        lg: 'h-11 rounded-md px-8',\n        icon: 'h-10 w-10',\n      },\n    },\n    defaultVariants: {\n      variant: 'default',\n      size: 'default',\n    },\n  }\n);\n\nexport interface ButtonProps\n  extends ButtonHTMLAttributes<HTMLButtonElement>,\n    VariantProps<typeof buttonVariants> {}\n\nconst Button = forwardRef<HTMLButtonElement, ButtonProps>((\n  { className, variant, size, ...props },\n  ref\n) => {\n  return (\n    <button\n      className={cn(buttonVariants({ variant, size, className }))}\n      ref={ref}\n      {...props}\n    />\n  );\n});\nButton.displayName = 'Button';\n\nexport { Button, buttonVariants };\n`
  );

  fs.writeFileSync(
    "frontend/src/components/ui/Card.tsx",
    `import { HTMLAttributes, forwardRef } from 'react';\nimport { cn } from '@/lib/utils';\n\nconst Card = forwardRef<\n  HTMLDivElement,\n  HTMLAttributes<HTMLDivElement>\n>(({ className, ...props }, ref) => (\n  <div\n    ref={ref}\n    className={cn(\n      'rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm',\n      className\n    )}\n    {...props}\n  />\n));\nCard.displayName = 'Card';\n\nconst CardHeader = forwardRef<\n  HTMLDivElement,\n  HTMLAttributes<HTMLDivElement>\n>(({ className, ...props }, ref) => (\n  <div\n    ref={ref}\n    className={cn('flex flex-col space-y-1.5 p-6', className)}\n    {...props}\n  />\n));\nCardHeader.displayName = 'CardHeader';\n\nconst CardTitle = forwardRef<\n  HTMLParagraphElement,\n  HTMLAttributes<HTMLHeadingElement>\n>(({ className, ...props }, ref) => (\n  <h3\n    ref={ref}\n    className={cn(\n      'text-2xl font-semibold leading-none tracking-tight',\n      className\n    )}\n    {...props}\n  />\n));\nCardTitle.displayName = 'CardTitle';\n\nconst CardDescription = forwardRef<\n  HTMLParagraphElement,\n  HTMLAttributes<HTMLParagraphElement>\n>(({ className, ...props }, ref) => (\n  <p\n    ref={ref}\n    className={cn('text-sm text-slate-500', className)}\n    {...props}\n  />\n));\nCardDescription.displayName = 'CardDescription';\n\nconst CardContent = forwardRef<\n  HTMLDivElement,\n  HTMLAttributes<HTMLDivElement>\n>(({ className, ...props }, ref) => (\n  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />\n));\nCardContent.displayName = 'CardContent';\n\nconst CardFooter = forwardRef<\n  HTMLDivElement,\n  HTMLAttributes<HTMLDivElement>\n>(({ className, ...props }, ref) => (\n  <div\n    ref={ref}\n    className={cn('flex items-center p-6 pt-0', className)}\n    {...props}\n  />\n));\nCardFooter.displayName = 'CardFooter';\n\nexport { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };\n`
  );

  fs.writeFileSync(
    "frontend/src/components/ui/Input.tsx",
    `import { InputHTMLAttributes, forwardRef } from 'react';\nimport { cn } from '@/lib/utils';\n\nexport interface InputProps\n  extends InputHTMLAttributes<HTMLInputElement> {}\n\nconst Input = forwardRef<HTMLInputElement, InputProps>((\n  { className, type, ...props },\n  ref\n) => {\n  return (\n    <input\n      type={type}\n      className={cn(\n        'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',\n        className\n      )}\n      ref={ref}\n      {...props}\n    />\n  );\n});\nInput.displayName = 'Input';\n\nexport { Input };\n`
  );

  // Create utils file
  fs.writeFileSync(
    "frontend/src/lib/utils.ts",
    `import { type ClassValue, clsx } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n\nexport function formatDate(date: Date) {\n  return date.toLocaleDateString('en-US', {\n    day: 'numeric',\n    month: 'long',\n    year: 'numeric',\n  });\n}\n\nexport function formatPrice(price: number) {\n  return new Intl.NumberFormat('en-US', {\n    style: 'currency',\n    currency: 'USD',\n  }).format(price);\n}\n`
  );

  console.log("Enhanced frontend structure completed!");
}

// Now call the enhanceFrontendStructure function
console.log("Setting up enhanced frontend structure...");
enhanceFrontendStructure();

console.log("Full-stack setup complete!");
console.log(`
🎉 Your HyAct Website with Strapi CMS is ready!

📁 Project Structure:
   ${projectName}/
   ├── frontend/     # Next.js app (Aurora GT-S showcase)
   │   ├── src/
   │   │   ├── app/            # Next.js App Router pages
   │   │   ├── components/     # React components (UI, features, layout)
   │   │   ├── contexts/       # React contexts (including ThemeContext)
   │   │   ├── hooks/          # Custom React hooks
   │   │   ├── lib/            # Utilities and API clients
   │   │   ├── types/          # TypeScript type definitions
   │   │   └── utils/          # Helper functions
   │   ├── public/             # Static assets
   │   └── tests/              # Test files (unit, integration, e2e)
   ├── backend/      # Strapi CMS
   │   ├── src/
   │   │   └── api/  # API routes and controllers
   │   └── config/   # Strapi configuration
   └── package.json  # Root scripts

🚀 Quick Start:
1. cd ${projectName}
2. npm run dev

🌐 Access your applications:
   - Frontend: http://localhost:3000
   - Strapi Admin: http://localhost:1337/admin

📝 Next Steps:
   - Set up your Strapi admin account
   - Create content types for dynamic data
   - Customize the Aurora GT-S showcase
   - Check README.md for detailed instructions

⚠️  Node.js Compatibility:
   - Strapi REQUIRES Node.js >=18.0.0 <=22.x.x
   - Running with Node.js v23+ will ABORT project creation & REMOVE all files
   - If you're using a compatible version, you won't encounter any issues
   - Using nvm is recommended: nvm install 22 && nvm use 22

Happy coding! 🚗✨
`);

rl.close();

// Function to setup Strapi integration
function setupStrapiIntegration() {
  // Check Node.js version compatibility first
  if (!checkNodeVersion()) {
    console.error(
      "Cannot proceed with Strapi integration due to incompatible Node.js version."
    );
    console.error(
      "The project structure has been created, but Strapi integration might not work correctly."
    );
    console.error(
      "Please use a compatible Node.js version (>=18.0.0 <=22.x.x) to continue working with this project."
    );

    // We're not cleaning up here since the user might want to keep the project structure
    // But we'll warn them and exit to prevent further issues
    process.exit(1);
  }

  // Install axios for API calls in frontend
  try {
    process.chdir("frontend");
    execSync("npm install axios", { stdio: "inherit" });
    process.chdir("..");
  } catch (error) {
    console.error("Failed to install axios in frontend");
  }

  // Create Strapi API client
  const apiClientContent = `import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const strapiApi = axios.create({
  baseURL: \`\${API_URL}/api\`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token if available
strapiApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

export default strapiApi;

// API functions for Aurora GT-S data
export const carsApi = {
  // Get all cars
  getCars: () => strapiApi.get('/cars?populate=*'),
  
  // Get single car
  getCar: (id: string) => strapiApi.get(\`/cars/\${id}?populate=*\`),
  
  // Get features
  getFeatures: () => strapiApi.get('/features?populate=*'),
  
  // Get testimonials
  getTestimonials: () => strapiApi.get('/testimonials?populate=*'),
  
  // Get pricing packages
  getPricingPackages: () => strapiApi.get('/pricing-packages?populate=*'),
};
`;

  fs.writeFileSync(
    path.join(process.cwd(), "frontend/src/lib/strapi.ts"),
    apiClientContent
  );

  // Create environment file for frontend
  const envContent = `# Strapi CMS Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
`;

  fs.writeFileSync(path.join(process.cwd(), "frontend/.env.local"), envContent);

  // Create root package.json for managing both apps
  const rootPackageJson = {
    name: projectName,
    private: true,
    scripts: {
      dev: 'concurrently "npm run dev:frontend" "npm run dev:backend"',
      "dev:frontend": "cd frontend && npm run dev",
      "dev:backend": "cd backend && npm run develop",
      build: "npm run build:frontend",
      "build:frontend": "cd frontend && npm run build",
      start: "npm run start:frontend",
      "start:frontend": "cd frontend && npm run start",
    },
    devDependencies: {
      concurrently: "^8.2.2",
    },
  };

  fs.writeFileSync(
    path.join(process.cwd(), "package.json"),
    JSON.stringify(rootPackageJson, null, 2)
  );

  // Install concurrently for running both apps
  try {
    execSync("npm install", { stdio: "inherit" });
  } catch (error) {
    console.error("Failed to install concurrently");
  }

  // Create README for the project
  const readmeContent = `# ${projectName}

A full-stack automotive website with Aurora GT-S showcase powered by Next.js and Strapi CMS.

## Project Structure

\`\`\`
${projectName}/
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
\`\`\`

## Quick Start

1. **Start both applications:**
   \`\`\`bash
   npm run dev
   \`\`\`

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
- \`name\` (Text)
- \`description\` (Rich Text)
- \`price\` (Number)
- \`image\` (Media)
- \`specifications\` (JSON)

### 2. Feature
- \`title\` (Text)
- \`description\` (Text)
- \`icon\` (Text)

### 3. Testimonial
- \`name\` (Text)
- \`role\` (Text)
- \`quote\` (Text)
- \`image\` (Media)
- \`rating\` (Number)

### 4. Pricing Package
- \`name\` (Text)
- \`price\` (Text)
- \`description\` (Text)
- \`features\` (JSON)
- \`popular\` (Boolean)

## Development Commands

- \`npm run dev\` - Start both frontend and backend
- \`npm run dev:frontend\` - Start only frontend
- \`npm run dev:backend\` - Start only backend
- \`npm run build\` - Build frontend for production

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
\`\`\`
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
\`\`\`

## Node.js Compatibility

⚠️ **Important**: Strapi requires Node.js >=18.0.0 <=22.x.x

If you're using Node.js v23 or higher:
1. Install nvm: \`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash\`
2. Switch to Node.js 22: \`nvm install 22 && nvm use 22\`
3. Install backend dependencies: \`cd backend && npm install\`

## Troubleshooting

- **Strapi installation fails**: This is usually due to Node.js version compatibility
- **Frontend works but backend doesn't**: Check Node.js version and install backend dependencies manually
- **API calls fail**: Ensure Strapi is running on http://localhost:1337

Enjoy building your automotive showcase website! 🚗
`;

  fs.writeFileSync(path.join(process.cwd(), "README.md"), readmeContent);
}
