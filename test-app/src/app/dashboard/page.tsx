import React from "react";
import { Layout } from "../../components/layout/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { CarModel } from "../../lib/pocketbase";

// Helper function to format PocketBase image URLs
function formatImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl) return "";

  // If it's already a valid URL or starts with a slash, return as is
  if (imageUrl.startsWith("http") || imageUrl.startsWith("/")) {
    return imageUrl;
  }

  // For PocketBase images, construct the full URL
  return `http://127.0.0.1:8090/api/files/${imageUrl}`;
}

// Server-side data fetching function
async function getDashboardData(): Promise<{ carModel: CarModel | null }> {
  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/dashboard`, {
      cache: "no-store", // Ensure fresh data
    });

    const result = await response.json();

    if (result.success && result.data) {
      return {
        carModel: result.data.carModel,
      };
    } else {
      // Return fallback data if CMS not available
      return {
        carModel: {
          id: "fallback",
          name: "Tesla Model S Plaid",
          tagline:
            "The quickest accelerating sedan ever built. Beyond Ludicrous.",
          description: "Experience the future of automotive engineering",
          badge_text: "New Launch 2024",
          created: "",
          updated: "",
        },
      };
    }
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    // Return fallback data on error
    return {
      carModel: {
        id: "fallback",
        name: "Tesla Model S Plaid",
        tagline:
          "The quickest accelerating sedan ever built. Beyond Ludicrous.",
        description: "Experience the future of automotive engineering",
        badge_text: "New Launch 2024",
        created: "",
        updated: "",
      },
    };
  }
}

export default async function Dashboard() {
  const data = await getDashboardData();
  const { carModel } = data;

  // Professional hardcoded data
  const performanceMetrics = [
    {
      id: "1",
      title: "Acceleration",
      description: "Zero to sixty in record time with precision engineering",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      value: "0-60",
      unit: "2.1s",
      highlight: true,
    },
    {
      id: "2",
      title: "Range",
      description: "Extended range capability for long-distance touring",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      value: "520",
      unit: "miles",
      highlight: false,
    },
    {
      id: "3",
      title: "Charging",
      description: "Ultra-fast charging technology for minimal downtime",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      value: "10-80%",
      unit: "15min",
      highlight: false,
    },
    {
      id: "4",
      title: "Top Speed",
      description: "Engineered for performance with safety as priority",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      value: "200",
      unit: "mph",
      highlight: false,
    },
  ];

  const technicalSpecs = [
    {
      category: "Powertrain",
      specs: [
        { label: "Motor Configuration", value: "Tri-Motor All-Wheel Drive" },
        { label: "Total Power Output", value: "1,020 HP" },
        { label: "Peak Torque", value: "1,050 lb-ft" },
        { label: "Transmission", value: "Single-Speed Direct Drive" },
      ],
    },
    {
      category: "Performance",
      specs: [
        { label: "0-60 mph", value: "2.1 seconds" },
        { label: "Quarter Mile", value: "9.23 seconds" },
        { label: "Top Speed", value: "200 mph" },
        { label: "Braking 60-0", value: "108 feet" },
      ],
    },
    {
      category: "Efficiency",
      specs: [
        { label: "EPA Range", value: "520 miles" },
        { label: "Battery Capacity", value: "120 kWh" },
        { label: "Energy Consumption", value: "23 kWh/100mi" },
        { label: "Charging Speed", value: "350 kW DC Fast" },
      ],
    },
  ];

  const vehicleHighlights = [
    {
      title: "Advanced Aerodynamics",
      description:
        "Precision-engineered body design achieves industry-leading drag coefficient of 0.19 Cd for optimal efficiency and performance.",
      image: "/images/aerodynamics.jpg",
    },
    {
      title: "Luxury Interior",
      description:
        "Premium materials and cutting-edge technology create an unparalleled driving experience with executive-level comfort.",
      image: "/images/interior-luxury.jpg",
    },
    {
      title: "Autonomous Capability",
      description:
        "Full self-driving hardware with advanced AI processing enables Level 4 autonomous driving capabilities.",
      image: "/images/autonomous.jpg",
    },
  ];

  return (
    <Layout fullWidth hideSidebar>
      {/* Hero Section - CMS Driven with Professional Styling */}
      <section className="relative min-h-screen bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-screen py-12">
            {/* Content Column */}
            <div className="lg:col-span-6 space-y-8">
              {carModel?.badge_text && (
                <div className="inline-flex">
                  <Badge className="px-6 py-2 bg-navy-50 text-navy-800 border border-navy-200 text-sm font-semibold tracking-wide uppercase">
                    {carModel.badge_text}
                  </Badge>
                </div>
              )}

              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-light text-navy-900 leading-tight">
                  {carModel?.name || "Vehicle Model"}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-800 font-light leading-relaxed">
                  {carModel?.tagline ||
                    "Experience the future of automotive engineering"}
                </p>
                <p className="text-lg text-gray-700 max-w-xl">
                  {carModel?.description ||
                    "Precision engineering meets uncompromising luxury in our latest automotive achievement."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-4 text-lg font-medium tracking-wide transition-all duration-200"
                >
                  Reserve Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white px-8 py-4 text-lg font-medium tracking-wide transition-all duration-200"
                >
                  Schedule Test Drive
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-navy-900">2.1s</div>
                  <div className="text-sm text-gray-700 uppercase tracking-wide">
                    0-60 MPH
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-navy-900">520mi</div>
                  <div className="text-sm text-gray-700 uppercase tracking-wide">
                    EPA Range
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-navy-900">
                    1,020hp
                  </div>
                  <div className="text-sm text-gray-700 uppercase tracking-wide">
                    Peak Power
                  </div>
                </div>
              </div>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-6">
              <div className="relative">
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                  {carModel?.hero_image ? (
                    <Image
                      src={formatImageUrl(carModel.hero_image)}
                      alt={carModel.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center">
                      <div className="text-navy-400 text-8xl">🚗</div>
                    </div>
                  )}
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-navy-900">2024</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">
                      Model Year
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-navy-900 mb-6">
              Performance Redefined
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-light">
              Every specification engineered to deliver an uncompromising
              driving experience that sets new industry standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {performanceMetrics.map((metric) => (
              <Card
                key={metric.id}
                className={`text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  metric.highlight ? "bg-navy-900 text-white" : "bg-white"
                }`}
              >
                <CardHeader className="pb-4 pt-8">
                  <div
                    className={`inline-flex justify-center mb-4 ${
                      metric.highlight ? "text-white" : "text-navy-900"
                    }`}
                  >
                    {metric.icon}
                  </div>
                  <div className="space-y-2">
                    <div
                      className={`text-3xl font-bold ${
                        metric.highlight ? "text-white" : "text-navy-900"
                      }`}
                    >
                      {metric.value}
                    </div>
                    <div
                      className={`text-lg font-medium ${
                        metric.highlight ? "text-navy-200" : "text-gray-800"
                      }`}
                    >
                      {metric.unit}
                    </div>
                  </div>
                  <CardTitle
                    className={`text-lg font-semibold ${
                      metric.highlight ? "text-white" : "text-navy-900"
                    }`}
                  >
                    {metric.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  <CardDescription
                    className={`${
                      metric.highlight ? "text-navy-200" : "text-gray-700"
                    }`}
                  >
                    {metric.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-navy-900 mb-6">
              Technical Excellence
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-light">
              Precision engineering meets advanced technology in every component
              and system.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {technicalSpecs.map((category, idx) => (
              <div key={idx} className="space-y-6">
                <h3 className="text-2xl font-semibold text-navy-900 border-b-2 border-navy-100 pb-4">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.specs.map((spec, specIdx) => (
                    <div
                      key={specIdx}
                      className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-gray-800 font-medium">
                        {spec.label}
                      </span>
                      <span className="text-navy-900 font-bold">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Highlights */}
      <section className="py-24 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light mb-6">
              Innovation in Every Detail
            </h2>
            <p className="text-xl text-navy-200 max-w-3xl mx-auto font-light">
              Advanced engineering solutions that redefine what's possible in
              automotive design.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {vehicleHighlights.map((highlight, idx) => (
              <div key={idx} className="space-y-6">
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-navy-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-700 to-navy-800 flex items-center justify-center">
                    <div className="text-navy-400 text-6xl">
                      {idx === 0 ? "🌪️" : idx === 1 ? "🏛️" : "🤖"}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">{highlight.title}</h3>
                  <p className="text-navy-200 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-light text-navy-900">
              Experience the Future Today
            </h2>
            <p className="text-xl text-gray-800 font-light leading-relaxed">
              Join the select few who will experience automotive excellence
              redefined. Reserve your place in automotive history.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
              <Button
                size="lg"
                className="bg-navy-900 hover:bg-navy-800 text-white px-12 py-4 text-lg font-medium tracking-wide"
              >
                <Link href="/reserve" className="flex items-center gap-2">
                  Reserve Now
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white px-12 py-4 text-lg font-medium tracking-wide"
              >
                <Link href="/learn-more">Learn More</Link>
              </Button>
            </div>

            <div className="pt-12 border-t border-gray-200">
              <p className="text-gray-700 text-sm">
                * Specifications and features subject to change. Images shown
                may include optional equipment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
