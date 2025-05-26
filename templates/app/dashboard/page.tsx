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
import { CarModel, formatImageUrl, getCarModel } from "../../lib/pocketbase";

// Server-side data fetching function
async function getDashboardData(): Promise<{ carModel: CarModel | null }> {
  try {
    const carModel = await getCarModel();
    
    return {
      carModel
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    // Return fallback data on error
    return {
      carModel: {
        id: "fallback",
        name: "The Atlas",
        tagline: "Experience the perfect fusion of luxury, performance, and innovation.",
        description: "Crafted for those who demand excellence in every journey.",
        badge_text: "New Launch",
        created: "",
        updated: "",
      }
    };
  }
}

export default async function Dashboard() {
  const data = await getDashboardData();
  const { carModel } = data;

  // Stats data (static)
  const performanceStats = [
    { value: "4.2s", label: "0-60 MPH" },
    { value: "450hp", label: "Peak Power" },
    { value: "28mpg", label: "Fuel Economy" },
    { value: "5★", label: "Safety Rating" },
  ];

  // Features data (static)
  const features = [
    {
      icon: "🚗",
      title: "Adaptive Performance",
      description: "Intelligent drivetrain that adapts to your driving style and road conditions, delivering optimal performance and efficiency in real-time."
    },
    {
      icon: "🛡️",
      title: "Advanced Safety Suite",
      description: "Comprehensive safety system with collision avoidance, lane keeping assist, and emergency braking for ultimate peace of mind."
    },
    {
      icon: "📱",
      title: "Connected Experience",
      description: "Seamless integration with your digital life through advanced infotainment, wireless connectivity, and smart vehicle controls."
    },
    {
      icon: "⭐",
      title: "Luxury Interior",
      description: "Premium materials and meticulous craftsmanship create an environment of sophistication and comfort for every journey."
    },
    {
      icon: "🔧",
      title: "Precision Engineering",
      description: "State-of-the-art manufacturing and quality control ensure exceptional reliability and performance that exceeds expectations."
    },
    {
      icon: "🌍",
      title: "Eco-Conscious Design",
      description: "Sustainable materials and efficient engineering reduce environmental impact without compromising on luxury or performance."
    }
  ];

  // Gallery data (static)
  const galleryItems = [
    {
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Aerodynamic Excellence",
      description: "Sculpted lines that cut through air with precision"
    },
    {
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Luxurious Cabin",
      description: "Premium materials meet intuitive design"
    },
    {
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Advanced Technology",
      description: "Cutting-edge systems at your fingertips"
    },
    {
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Pure Performance",
      description: "Power and precision in perfect harmony"
    }
  ];

  // Specifications data (static)
  const specifications = [
    { label: "Engine", value: "3.0L Turbo V6" },
    { label: "Power Output", value: "450 HP" },
    { label: "Torque", value: "520 lb-ft" },
    { label: "0-60 mph", value: "4.2 seconds" },
    { label: "Top Speed", value: "155 mph" },
    { label: "Transmission", value: "8-Speed Auto" },
    { label: "Fuel Economy", value: "28 mpg combined" },
    { label: "Starting Price", value: "$65,000" },
  ];

  return (
    <Layout fullWidth hideSidebar>
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-blue-900/10 z-50 py-4 transition-all duration-300">
        <nav className="max-w-6xl mx-auto px-5 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900 tracking-tight">
            Meridian
          </div>
          <ul className="hidden md:flex space-x-10">
            <li><a href="#features" className="text-slate-800 hover:text-blue-900 font-medium text-sm transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-900 hover:after:w-full after:transition-all">Features</a></li>
            <li><a href="#gallery" className="text-slate-800 hover:text-blue-900 font-medium text-sm transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-900 hover:after:w-full after:transition-all">Gallery</a></li>
            <li><a href="#specs" className="text-slate-800 hover:text-blue-900 font-medium text-sm transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-900 hover:after:w-full after:transition-all">Specifications</a></li>
            <li><a href="#contact" className="text-slate-800 hover:text-blue-900 font-medium text-sm transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-900 hover:after:w-full after:transition-all">Contact</a></li>
          </ul>
          <Button className="bg-blue-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5">
            Reserve Now
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative bg-gradient-to-br from-slate-50 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            <div className="z-10">
              {carModel?.badge_text && (
                <Badge className="inline-block bg-blue-900 text-white px-4 py-2 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider">
                  {carModel.badge_text}
                </Badge>
              )}
              <h1 className="text-6xl lg:text-7xl font-extrabold text-slate-800 leading-tight mb-6 tracking-tight">
                {carModel?.name || "The Atlas"}
              </h1>
              <p className="text-xl text-slate-600 mb-10 font-normal leading-relaxed">
                {carModel?.tagline || "Experience the perfect fusion of luxury, performance, and innovation. Crafted for those who demand excellence in every journey."}
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button className="bg-blue-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all hover:-translate-y-1 hover:shadow-xl">
                  Discover More
                </Button>
                <Button variant="outline" className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-4 rounded-xl font-semibold text-base transition-all hover:-translate-y-1">
                  Book Test Drive
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {carModel?.hero_image ? (
                <Image
                  src={formatImageUrl('car_models', carModel.id, carModel.hero_image)}
                  alt={carModel.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
              ) : (
                <Image
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="The Atlas - Luxury Performance Vehicle"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {performanceStats.map((stat, index) => (
              <div key={index} className="p-8">
                <span className="text-4xl font-extrabold text-blue-900 block leading-none mb-2">
                  {stat.value}
                </span>
                <span className="text-base text-slate-600 font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <Badge className="inline-block bg-blue-900 text-white px-4 py-2 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
              Innovation
            </Badge>
            <h2 className="text-5xl font-bold text-slate-800 mb-4 tracking-tight">
              Advanced Engineering
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Every detail meticulously crafted to deliver an unparalleled driving experience with cutting-edge technology and premium comfort.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white p-12 rounded-3xl shadow-lg border border-blue-900/5 transition-all duration-300 hover:-translate-y-4 hover:shadow-xl">
                <CardHeader className="pb-6">
                  <div className="w-15 h-15 bg-blue-900 rounded-2xl flex items-center justify-center mb-6 text-2xl text-white">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl font-semibold text-slate-800 mb-4">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <Badge className="inline-block bg-blue-900 text-white px-4 py-2 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
              Design
            </Badge>
            <h2 className="text-5xl font-bold text-slate-800 mb-4 tracking-tight">
              Crafted to Perfection
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Every angle tells a story of precision, elegance, and performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {galleryItems.map((item, index) => (
              <div key={index} className="relative h-80 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl group">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent text-white p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="opacity-90">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section id="specs" className="py-32 bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <Badge className="inline-block bg-slate-600 text-slate-800 px-4 py-2 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
              Specifications
            </Badge>
            <h2 className="text-5xl font-bold mb-4 tracking-tight">
              Technical Excellence
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Precision engineering meets performance innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Atlas Side Profile"
                fill
                className="object-cover"
              />
            </div>
            
            <div>
              <ul className="space-y-0">
                {specifications.map((spec, index) => (
                  <li key={index} className="flex justify-between items-center py-6 border-b border-white/10 transition-all duration-300 hover:pl-4 hover:bg-white/5">
                    <span className="font-medium text-lg">{spec.label}</span>
                    <span className="font-bold text-slate-400 text-lg">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="reserve" className="py-32 bg-blue-900 text-center text-white">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-6xl font-bold mb-6 tracking-tight">
            Experience the {carModel?.name || "Atlas"}
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Schedule your test drive today and discover what sets the {carModel?.name || "Atlas"} apart from everything else on the road.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <Button className="bg-white text-blue-900 px-9 py-5 rounded-xl font-semibold text-lg border-2 border-white transition-all hover:bg-transparent hover:text-white hover:-translate-y-1">
              Schedule Test Drive
            </Button>
            <Button variant="outline" className="bg-transparent text-white px-9 py-5 rounded-xl font-semibold text-lg border-2 border-white transition-all hover:bg-white hover:text-blue-900 hover:-translate-y-1">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">Meridian Motors</h3>
              <p className="text-white/70 leading-relaxed">
                Crafting exceptional vehicles that redefine the driving experience. Excellence in every detail, innovation in every mile.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <div className="space-y-4">
                <p><a href="#" className="text-white/70 hover:text-white transition-colors">Build & Price</a></p>
                <p><a href="#" className="text-white/70 hover:text-white transition-colors">Find a Dealer</a></p>
                <p><a href="#" className="text-white/70 hover:text-white transition-colors">Service & Support</a></p>
                <p><a href="#" className="text-white/70 hover:text-white transition-colors">Financing</a></p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact</h3>
              <div className="space-y-2 text-white/70">
                <p>1-800-MERIDIAN</p>
                <p>info@meridianmotors.com</p>
                <p>Customer Service: 24/7</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
              <div className="space-y-4">
                <p><a href="#" className="text-white/70 hover:text-white transition-colors">Facebook</a></p>
                <p><a href="#" className="text-white/70 hover:text-white transition-colors">Instagram</a></p>
                <p><a href="#" className="text-white/70 hover:text-white transition-colors">Twitter</a></p>
                <p><a href="#" className="text-white/70 hover:text-white transition-colors">YouTube</a></p>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-white/10 text-white/60">
            <p>&copy; 2025 Meridian Motors. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
} 