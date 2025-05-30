"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";


export default function HomePage() {
  // Hardcoded fallback data
  const fallback = {
    features: [
      {
        title: "Tri-Motor Powertrain",
        description:
          "Revolutionary tri-motor configuration delivering 1,200 horsepower with instant torque distribution to all four wheels.",
      },
      {
        title: "Autonomous Driving Level 4",
        description:
          "Advanced AI-powered self-driving system with 12 cameras, LiDAR, and radar sensors for complete autonomy.",
      },
      {
        title: "Adaptive Interior",
        description:
          "Premium cabin with sustainable materials, 22-speaker sound system, and ambient lighting that adapts to driving conditions.",
      },
      {
        title: "Active Aerodynamics",
        description:
          "Intelligent aerodynamic elements that adjust in real-time for optimal performance and efficiency.",
      },
      {
        title: "Ultra-Fast Charging",
        description:
          "800V architecture enables 10-80% charging in just 18 minutes with our Apex Supercharger network.",
      },
      {
        title: "5-Star Safety",
        description:
          "Industry-leading safety with carbon fiber crumple zones and predictive collision avoidance.",
      },
    ],
    specifications: [
      {
        label: "Top Speed",
        value: "200 mph",
        description: "Electronically limited",
      },
      { label: "Range", value: "516 miles", description: "EPA estimated" },
      {
        label: "Acceleration",
        value: "0-60 in 2.1s",
        description: "With launch control",
      },
      {
        label: "Autopilot",
        value: "Level 4",
        description: "Full Self-Driving",
      },
    ],
    cars: [
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
          "8-year battery warranty",
        ],
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
          "Enhanced autopilot",
        ],
        popular: true,
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
          "Concierge service",
        ],
      },
    ],
    companystats: [
      {
        number: "25+",
        label: "Industry Awards",
        description: "2024 recognition",
      },
      { number: "500K+", label: "Pre-Orders", description: "Global demand" },
      { number: "50+", label: "Countries", description: "Worldwide launch" },
      {
        number: "12",
        label: "Manufacturing",
        description: "Global facilities",
      },
    ],
    testimonials: [
      {
        name: "James Morrison",
        role: "Automotive Journalist, Motor Trend",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        quote:
          "The Aurora GT-S doesn&apos;t just redefine electric performance—it obliterates every preconception about what an EV can be. This is automotive nirvana.",
      },
      {
        name: "Dr. Sarah Chen",
        role: "Technology Executive, Former Tesla",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        quote:
          "After two decades in automotive technology, the Aurora GT-S represents the single greatest leap forward I&apos;ve witnessed. The integration is flawless.",
      },
      {
        name: "Michael Rodriguez",
        role: "Professional Racing Driver, Formula E",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        quote:
          "In 15 years of professional racing, nothing has prepared me for the Aurora GT-S. The precision, the power, the control—it&apos;s in a league of its own.",
      },
    ],
    galleryimages: [
      {
        url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "Exterior Design",
        description: "Aerodynamic perfection",
      },
      {
        url: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "Interior Luxury",
        description: "Premium materials and craftsmanship",
      },
      {
        url: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "Performance Mode",
        description: "Track-ready configuration",
      },
      {
        url: "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "Charging Technology",
        description: "Ultra-fast charging capability",
      },
    ],
  };

  const [features, setFeatures] = useState(fallback.features);
  const [specifications, setSpecifications] = useState(fallback.specifications);
  const [pricingPackages, setPricingPackages] = useState(fallback.cars);
  const [companyStats, setCompanyStats] = useState(fallback.companystats);
  const [testimonials, setTestimonials] = useState(fallback.testimonials);
  const [galleryImages, setGalleryImages] = useState(fallback.galleryimages);

  // Add loading state for Link to DB
  const [isLinkingToDb, setIsLinkingToDb] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [f, s, c, cs, t, g] = await Promise.all([
          fetch("http://localhost:1337/api/features").then((r) => r.json()),
          fetch("http://localhost:1337/api/specifications").then((r) =>
            r.json()
          ),
          fetch("http://localhost:1337/api/cars").then((r) => r.json()),
          fetch("http://localhost:1337/api/companystats").then((r) => r.json()),
          fetch("http://localhost:1337/api/testimonials").then((r) => r.json()),
          fetch("http://localhost:1337/api/galleryimages").then((r) =>
            r.json()
          ),
        ]);
        if (f.data) setFeatures(f.data.map((item) => item));
        if (s.data) setSpecifications(s.data.map((item) => item));
        if (c.data) setPricingPackages(c.data.map((item) => item));
        if (cs.data) setCompanyStats(cs.data.map((item) => item));
        if (t.data) setTestimonials(t.data.map((item) => item));
        if (g.data) setGalleryImages(g.data.map((item) => item));
      } catch (e) {
        // If Strapi is down, fallback data is already set
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Loading Overlay */}
      {isLinkingToDb && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-12 w-12 text-white mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span className="text-white text-lg font-semibold">
              Linking to database...
            </span>
          </div>
        </div>
      )}

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
              <a
                href="#design"
                className="text-gray-700 hover:text-blue-700 transition-colors"
              >
                Design
              </a>
              <a
                href="#performance"
                className="text-gray-700 hover:text-blue-700 transition-colors"
              >
                Performance
              </a>
              <a
                href="#technology"
                className="text-gray-700 hover:text-blue-700 transition-colors"
              >
                Technology
              </a>
              <a
                href="#specifications"
                className="text-gray-700 hover:text-blue-700 transition-colors"
              >
                Specifications
              </a>
              <a
                href="#pricing"
                className="text-gray-700 hover:text-blue-700 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#gallery"
                className="text-gray-700 hover:text-blue-700 transition-colors"
              >
                Gallery
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="border border-blue-900 text-blue-900 hover:bg-blue-50 px-4 py-2 rounded text-sm font-medium transition-colors">
                Test Drive
              </button>
              <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                Configure
              </button>
              <button
                onClick={async () => {
                  setIsLinkingToDb(true);
                  try {
                    const res = await fetch("/api/link-to-db", {
                      method: "POST",
                    });
                    const data = await res.json();
                    alert(data.message || "Done!");
                  } catch (e) {
                    alert("An error occurred while linking to DB.");
                  } finally {
                    setIsLinkingToDb(false);
                  }
                }}
                className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                Link to DB
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
            backgroundImage:
              "url('https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
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
            <div className="mb-4 inline-block bg-white/10 text-white text-sm px-3 py-1 rounded">
              Since 2019
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Five Years of Innovation
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From Silicon Valley startup to global automotive leader, APEX has
              revolutionized electric vehicle technology with breakthrough
              innovations in battery chemistry, autonomous driving, and
              sustainable manufacturing.
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
              <div className="mb-4 inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
                Design Philosophy
              </div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                Form Follows Function
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Every curve, every line, every surface of the Aurora GT-S serves
                a purpose. Our design team spent over 3,000 hours in wind tunnel
                testing to achieve the industry's lowest drag coefficient of
                0.20 Cd.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-700 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Carbon Fiber Monocoque
                    </h4>
                    <p className="text-gray-600">
                      Aerospace-grade carbon fiber chassis reduces weight by 40%
                      while increasing structural rigidity.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-700 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Active Aerodynamics
                    </h4>
                    <p className="text-gray-600">
                      Dynamic spoilers and air dams adjust automatically for
                      optimal performance and efficiency.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-blue-700 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      LED Matrix Lighting
                    </h4>
                    <p className="text-gray-600">
                      Adaptive lighting system with 84 individual LED elements
                      for perfect illumination.
                    </p>
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
            <div className="mb-4 inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
              Technology
            </div>
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Revolutionary Features
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Every detail of the Aurora GT-S has been meticulously engineered
              to deliver an unparalleled driving experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
              >
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
            <div className="mb-4 inline-block bg-white/10 text-white text-sm px-3 py-1 rounded">
              Performance
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Performance Specifications
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Numbers that speak for themselves. The Aurora GT-S redefines
              what's possible.
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
                <div className="text-sm text-gray-400">{spec.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="mb-4 inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
              Testimonials
            </div>
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              What Experts Say
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Industry leaders and automotive experts share their thoughts on
              the Aurora GT-S.
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
                    <h4 className="font-semibold text-blue-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
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
            <div className="mb-4 inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
              Gallery
            </div>
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Experience Aurora GT-S
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore every detail of our revolutionary electric hypercar
              through our curated gallery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg"
              >
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
            <div className="mb-4 inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
              Pricing
            </div>
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Choose Your Aurora
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Three carefully crafted configurations to match your vision of
              perfect performance.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPackages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl border-2 ${
                  pkg.popular
                    ? "border-blue-500 shadow-2xl"
                    : "border-gray-200 shadow-lg"
                } p-8 hover:shadow-xl transition-shadow`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">
                    {pkg.name}
                  </h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {pkg.price}
                  </div>
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

                <button
                  className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 ${
                    pkg.popular
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                      : "border-2 border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white"
                  }`}
                >
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience Aurora?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the future of automotive excellence. Schedule your test drive
            today and be among the first to experience the revolution.
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
              <p className="text-blue-200">
                Pioneering the future of electric mobility with cutting-edge
                technology and uncompromising performance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Aurora GT-S
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Specifications
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Configure
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Test Drive
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Investors
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Warranty
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-blue-800">
            <p className="text-blue-300">
              © 2024 APEX Motors. All rights reserved. | Privacy Policy | Terms
              of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
