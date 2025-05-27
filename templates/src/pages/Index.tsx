
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  Zap, 
  Shield, 
  Settings, 
  Star, 
  Play,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Award,
  Users,
  Globe,
  Gauge,
  Battery,
  Wifi,
  Quote,
  Calendar,
  DollarSign,
  Check,
  Camera,
  Monitor,
  Smartphone,
  Clock,
  Target,
  TrendingUp,
  Building,
  Wrench,
  Wind,
  Thermometer,
  Volume2,
  Navigation,
  ShieldCheck
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Tri-Motor Powertrain",
      description: "Revolutionary tri-motor configuration delivering 1,200 horsepower with instant torque distribution to all four wheels."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Autonomous Driving Level 4",
      description: "Advanced AI-powered self-driving system with 12 cameras, LiDAR, and radar sensors for complete autonomy."
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Adaptive Interior",
      description: "Premium cabin with sustainable materials, 22-speaker sound system, and ambient lighting that adapts to driving conditions."
    },
    {
      icon: <Wind className="h-8 w-8" />,
      title: "Active Aerodynamics",
      description: "Intelligent aerodynamic elements that adjust in real-time for optimal performance and efficiency."
    },
    {
      icon: <Battery className="h-8 w-8" />,
      title: "Ultra-Fast Charging",
      description: "800V architecture enables 10-80% charging in just 18 minutes with our Apex Supercharger network."
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "5-Star Safety",
      description: "Industry-leading safety with carbon fiber crumple zones and predictive collision avoidance."
    }
  ];

  const specifications = [
    {
      icon: <Gauge className="h-6 w-6" />,
      label: "Top Speed",
      value: "200 mph",
      description: "Electronically limited"
    },
    {
      icon: <Battery className="h-6 w-6" />,
      label: "Range",
      value: "516 miles",
      description: "EPA estimated"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      label: "Acceleration",
      value: "0-60 in 2.1s",
      description: "With launch control"
    },
    {
      icon: <Wifi className="h-6 w-6" />,
      label: "Autopilot",
      value: "Level 4",
      description: "Full Self-Driving"
    }
  ];

  const detailedSpecs = [
    { category: "Performance", specs: [
      { label: "Motor Configuration", value: "Tri-Motor AWD" },
      { label: "Total Power Output", value: "1,200 HP" },
      { label: "Total Torque", value: "1,420 lb-ft" },
      { label: "0-60 mph", value: "2.1 seconds" },
      { label: "0-100 mph", value: "4.8 seconds" },
      { label: "Quarter Mile", value: "9.9 seconds" },
      { label: "Top Speed", value: "200 mph" },
      { label: "Braking 60-0", value: "95 feet" }
    ]},
    { category: "Battery & Charging", specs: [
      { label: "Battery Capacity", value: "120 kWh" },
      { label: "Battery Type", value: "4680 Lithium-Ion" },
      { label: "Range (EPA)", value: "516 miles" },
      { label: "Charging Speed", value: "350 kW DC" },
      { label: "10-80% Charge Time", value: "18 minutes" },
      { label: "Home Charging", value: "48A / 11.5 kW AC" },
      { label: "Efficiency", value: "95 MPGe" },
      { label: "Cold Weather Range", value: "440 miles" }
    ]},
    { category: "Dimensions & Weight", specs: [
      { label: "Length", value: "185.0 inches" },
      { label: "Width", value: "77.3 inches" },
      { label: "Height", value: "51.4 inches" },
      { label: "Wheelbase", value: "116.5 inches" },
      { label: "Curb Weight", value: "4,560 lbs" },
      { label: "Ground Clearance", value: "5.5 inches" },
      { label: "Drag Coefficient", value: "0.20 Cd" },
      { label: "Cargo Capacity", value: "25.3 cu ft" }
    ]}
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

  const testimonials = [
    {
      name: "James Morrison",
      role: "Automotive Journalist, Motor Trend",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote: "The Aurora GT-S doesn't just redefine electric performance—it obliterates every preconception about what an EV can be. This is automotive nirvana.",
      rating: 5
    },
    {
      name: "Dr. Sarah Chen",
      role: "Technology Executive, Former Tesla",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b932?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote: "After two decades in automotive technology, the Aurora GT-S represents the single greatest leap forward I've witnessed. The integration is flawless.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Professional Racing Driver, Formula E",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote: "In 15 years of professional racing, nothing has prepared me for the Aurora GT-S. The precision, the power, the control—it's in a league of its own.",
      rating: 5
    }
  ];

  const companyStats = [
    {
      icon: <Award className="h-8 w-8" />,
      number: "25+",
      label: "Industry Awards",
      description: "2024 recognition"
    },
    {
      icon: <Users className="h-8 w-8" />,
      number: "500K+",
      label: "Pre-Orders",
      description: "Global demand"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      number: "50+",
      label: "Countries",
      description: "Worldwide launch"
    },
    {
      icon: <Building className="h-8 w-8" />,
      number: "12",
      label: "Manufacturing",
      description: "Global facilities"
    }
  ];

  const technologyHighlights = [
    {
      icon: <Monitor className="h-6 w-6" />,
      title: "Neural Processing Unit",
      description: "Custom AI chip processing 2.5 petaops for real-time decision making"
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "360° Vision System",
      description: "12 high-resolution cameras with night vision capabilities"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Digital Key Technology",
      description: "Seamless phone-as-key with biometric authentication"
    },
    {
      icon: <Volume2 className="h-6 w-6" />,
      title: "Immersive Audio",
      description: "22-speaker system with Dolby Atmos spatial sound"
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
              <Car className="h-8 w-8 text-navy-900" />
              <span className="text-2xl font-bold text-navy-900">APEX</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#design" className="text-gray-700 hover:text-navy-700 transition-colors">Design</a>
              <a href="#performance" className="text-gray-700 hover:text-navy-700 transition-colors">Performance</a>
              <a href="#technology" className="text-gray-700 hover:text-navy-700 transition-colors">Technology</a>
              <a href="#specifications" className="text-gray-700 hover:text-navy-700 transition-colors">Specifications</a>
              <a href="#pricing" className="text-gray-700 hover:text-navy-700 transition-colors">Pricing</a>
              <a href="#gallery" className="text-gray-700 hover:text-navy-700 transition-colors">Gallery</a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-navy-900 text-navy-900 hover:bg-navy-50">Test Drive</Button>
              <Button size="sm" className="bg-navy-900 hover:bg-navy-800">Configure</Button>
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
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 to-navy-800/70"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-6">
          <Badge className="mb-6 bg-navy-700/30 text-white border-navy-400/30 text-sm px-4 py-2">
            World Premiere • Limited Edition
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
            Aurora
            <span className="block text-white">GT-S</span>
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-200 animate-fade-in">
            The pinnacle of electric hypercar engineering
          </p>
          <p className="text-lg mb-8 text-gray-300 animate-fade-in">
            1,200 HP • 516 miles range • 0-60 in 2.1 seconds • Level 4 Autonomy
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in">
            <Button size="lg" className="bg-white text-navy-900 hover:bg-gray-100 text-lg px-8 py-4">
              <DollarSign className="mr-2 h-5 w-5" />
              Reserve Now • $5,000
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-navy-900 text-lg px-8 py-4">
              <Play className="mr-2 h-5 w-5" />
              Watch World Premiere
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            First deliveries Q4 2024 • Only 2,500 units worldwide
          </p>
        </div>
      </section>

      {/* Company Heritage */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white">Since 2019</Badge>
            <h2 className="text-4xl font-bold mb-6">Five Years of Innovation</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From Silicon Valley startup to global automotive leader, APEX has revolutionized 
              electric vehicle technology with breakthrough innovations in battery chemistry, 
              autonomous driving, and sustainable manufacturing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {companyStats.map((stat, index) => (
              <div key={index} className="animate-fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                  {stat.icon}
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
            <div className="animate-slide-in-left">
              <Badge className="mb-4 bg-navy-100 text-navy-800">Design Philosophy</Badge>
              <h2 className="text-4xl font-bold text-navy-900 mb-6">Form Follows Function</h2>
              <p className="text-xl text-gray-700 mb-6">
                Every curve, every line, every surface of the Aurora GT-S serves a purpose. 
                Our design team spent over 3,000 hours in wind tunnel testing to achieve 
                the industry's lowest drag coefficient of 0.20 Cd.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-navy-700 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Carbon Fiber Monocoque</h4>
                    <p className="text-gray-600">Aerospace-grade carbon fiber chassis reduces weight by 40% while increasing structural rigidity.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-navy-700 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Active Aerodynamics</h4>
                    <p className="text-gray-600">Intelligent rear spoiler and front splitter adjust automatically for optimal downforce.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-navy-700 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Signature LED Matrix</h4>
                    <p className="text-gray-600">Adaptive LED headlights with 84 individual elements provide precision illumination.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Aurora GT-S Design"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl">
                <div className="text-navy-900 text-2xl font-bold">0.20</div>
                <div className="text-gray-600 text-sm">Drag Coefficient</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section id="performance" className="py-20 bg-navy-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white">Performance</Badge>
            <h2 className="text-4xl font-bold mb-6">Hypercar Performance, Zero Emissions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Three independent motors deliver instant torque vectoring and unmatched acceleration. 
              The Aurora GT-S doesn't just compete with supercars—it redefines what's possible.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {specifications.map((spec, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                  {spec.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2">{spec.value}</h3>
                <p className="text-white text-lg mb-1">{spec.label}</p>
                <p className="text-gray-400 text-sm">{spec.description}</p>
              </div>
            ))}
          </div>

          <div className="relative rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Aurora GT-S Performance Testing"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-navy-900/50 flex items-center justify-center">
              <div className="text-center">
                <Button size="lg" className="bg-white text-navy-900 hover:bg-gray-100 mb-4">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Track Performance
                </Button>
                <p className="text-gray-300">Nürburgring lap record: 6:47.32</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Features */}
      <section id="technology" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-navy-100 text-navy-800">Advanced Technology</Badge>
            <h2 className="text-4xl font-bold text-navy-900 mb-6">AI-Powered Intelligence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The Aurora GT-S features the most advanced automotive AI system ever created, 
              with real-time learning capabilities and predictive performance optimization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-100 text-navy-700 rounded-full mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {technologyHighlights.map((tech, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-navy-100 rounded-lg">
                    {tech.icon}
                  </div>
                  <h4 className="font-semibold text-navy-900">{tech.title}</h4>
                </div>
                <p className="text-gray-600 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Specifications */}
      <section id="specifications" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-navy-100 text-navy-800">Technical Specifications</Badge>
            <h2 className="text-4xl font-bold text-navy-900 mb-6">Engineering Excellence</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every specification represents years of research and development by our world-class engineering team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {detailedSpecs.map((category, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-navy-900 mb-6">{category.category}</h3>
                  <div className="space-y-4">
                    {category.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-600">{spec.label}</span>
                        <span className="font-semibold text-navy-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-navy-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white">Pricing & Packages</Badge>
            <h2 className="text-4xl font-bold mb-6">Choose Your Configuration</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Three carefully curated packages designed to meet different performance and luxury preferences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPackages.map((pkg, index) => (
              <Card key={index} className={`${pkg.popular ? 'ring-2 ring-white scale-105' : ''} bg-white text-navy-900 shadow-xl`}>
                <CardContent className="p-8">
                  {pkg.popular && (
                    <Badge className="mb-4 bg-navy-900 text-white">Most Popular</Badge>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold mb-4">{pkg.price}</div>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-navy-900 hover:bg-navy-800">
                    Configure & Order
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-navy-100 text-navy-800">Visual Gallery</Badge>
            <h2 className="text-4xl font-bold text-navy-900 mb-6">Every Angle Perfected</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the Aurora GT-S through high-resolution imagery showcasing its stunning design and innovative features.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-xl font-bold mb-2">{image.title}</h4>
                  <p className="text-gray-300">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-navy-100 text-navy-800">Expert Reviews</Badge>
            <h2 className="text-4xl font-bold text-navy-900 mb-6">Industry Recognition</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Leading automotive experts and professional drivers share their first-hand experience with the Aurora GT-S.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-navy-700 mb-4" />
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-navy-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Order Section */}
      <section id="order" className="py-20 bg-navy-900 text-white text-center">
        <div className="container mx-auto px-6">
          <Badge className="mb-6 bg-white/10 text-white">Exclusive Launch</Badge>
          <h2 className="text-4xl font-bold mb-6">Secure Your Aurora GT-S</h2>
          <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Join an exclusive group of automotive enthusiasts. Reserve your Aurora GT-S today with a fully refundable $5,000 deposit. 
            First deliveries begin Q4 2024 with priority given to reservation holders.
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Limited to 2,500 units globally • VIN assignment based on reservation order
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <Button size="lg" className="bg-white text-navy-900 hover:bg-gray-100 text-lg px-8 py-4">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Private Preview
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-navy-900 text-lg px-8 py-4">
              <DollarSign className="mr-2 h-5 w-5" />
              Reserve Now • $5,000
            </Button>
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">
              Base MSRP: $129,900 • Performance: $149,900 • First Edition: $189,900
            </p>
            <p className="text-xs text-gray-500">
              * Prices exclude taxes, delivery, and options. Final pricing may vary by market.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Car className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold">APEX</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                APEX Electric Vehicles is pioneering the future of sustainable high-performance transportation. 
                The Aurora GT-S represents five years of innovation in electric vehicle technology, 
                autonomous systems, and sustainable manufacturing.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-navy-700 rounded-full flex items-center justify-center hover:bg-navy-600 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-navy-700 rounded-full flex items-center justify-center hover:bg-navy-600 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-navy-700 rounded-full flex items-center justify-center hover:bg-navy-600 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">in</span>
                </div>
                <div className="w-10 h-10 bg-navy-700 rounded-full flex items-center justify-center hover:bg-navy-600 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">yt</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Aurora GT-S</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Technical Specifications</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Build & Price</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Schedule Test Drive</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Owner's Manual</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Download Brochure</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Find a Service Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Financing Options</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Warranty Information</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Insurance Partners</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5" />
                  <span>1-800-AURORA-S</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5" />
                  <span>aurora@apex-ev.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5" />
                  <span>1 Hacker Way<br/>Palo Alto, CA 94301</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5" />
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-navy-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p>&copy; 2024 APEX Electric Vehicles. All rights reserved. Aurora GT-S and APEX are registered trademarks.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Legal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
