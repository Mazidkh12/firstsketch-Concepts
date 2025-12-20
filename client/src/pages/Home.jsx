import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import apiService from "../services/api";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroImages, setHeroImages] = useState([]);
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback data in case API fails
  const fallbackHeroImages = [
    {
      url: "/projects/firstsketch-modern-villa.jpg",
      alt: "Modern Villa by FirstSketch Concepts - Tropical contemporary design with seamless indoor-outdoor living",
      title: "Modern Tropical Villa",
      credit: "Design: FirstSketch Concepts | Rendering: RenderStudio by Shabeeb Sara"
    },
    {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      alt: "Contemporary architectural design with natural materials"
    },
    {
      url: "/projects/nice_public_school_1.webp",
      alt: "Nice Public School Tanur - Modern educational architecture by FirstSketch Concepts",
      title: "Nice Public School Tanur",
      credit: "Design: FirstSketch Concepts"
    },
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      alt: "Sustainable construction practices"
    }
  ];

  const fallbackServices = [
    {
      title: "Architecture",
      desc: "Innovative architectural designs",
      path: "/services",
    },
    {
      title: "Interior Design",
      desc: "Transform spaces elegantly",
      path: "/services",
    },
    {
      title: "Planning",
      desc: "Strategic space planning",
      path: "/services",
    },
    {
      title: "Construction",
      desc: "End-to-end construction",
      path: "/services",
    },
  ];

  const fallbackStats = [
    { label: "Projects Completed", value: "50", suffix: "+" },
    { label: "Years Experience", value: "5", suffix: "+" },
    { label: "Client Satisfaction", value: "100", suffix: "%" }
  ];

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getHomeData();
        
        if (response.success) {
          setHeroImages(response.data.heroImages || fallbackHeroImages);
          setServices(response.data.services || fallbackServices);
          setStats(response.data.stats || fallbackStats);
        } else {
          throw new Error('Failed to fetch home data');
        }
      } catch (err) {
        console.error('Error fetching home data:', err);
        setError(err.message);
        // Use fallback data
        setHeroImages(fallbackHeroImages);
        setServices(fallbackServices);
        setStats(fallbackStats);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  useEffect(() => {
    if (heroImages.length > 0) {
      const slideInterval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(slideInterval);
    }
  }, [heroImages.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto animate-pulse text-gray-900">
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="96" height="96" stroke="currentColor" strokeWidth="2" fill="none"/>
              <line x1="12" y1="15" x2="85" y2="12" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="20" x2="88" y2="18" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="25" x2="88" y2="25" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="30" x2="85" y2="32" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="35" x2="88" y2="35" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="40" x2="88" y2="40" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="48" x2="88" y2="48" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="52" x2="85" y2="54" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="56" x2="88" y2="56" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="60" x2="88" y2="60" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="64" x2="85" y2="66" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="72" x2="88" y2="72" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="76" x2="85" y2="78" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="80" x2="88" y2="80" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="84" x2="85" y2="86" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="12" y1="88" x2="88" y2="88" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Image Slideshow */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={image._id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image.url || image}
                alt={image.alt || `Slide ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 to-stone-900/50"></div>
              {image.credit && (
                <div className="absolute bottom-4 right-4 text-white/80 text-xs bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                  {image.credit}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Designing Spaces,
                <br />
                Building Dreams
              </h1>
              <p className="mt-6 text-lg md:text-xl text-white/90">
                FirstSketch brings your vision to life with expert architecture, interior design, planning, and construction services.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/portfolio"
                  className="px-8 py-4 rounded-full border-2 border-white text-white font-medium hover:bg-white/10 transition-colors"
                >
                  View Portfolio
                </Link>
                <Link
                  to="/services"
                  className="px-8 py-4 rounded-full border-2 border-white/70 text-white/90 font-medium hover:bg-white/10 transition-colors"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-gray-600 text-lg">
              Comprehensive design and construction solutions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.path}
                className="group p-8 bg-white/80 backdrop-blur-sm rounded-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-gray-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.desc}</p>
                <div className="mt-4 flex items-center text-gray-900 text-sm font-medium">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {stats.map((stat, index) => (
              <div key={stat._id || index}>
                <h3 className="text-5xl font-bold text-gray-900">
                  {stat.value}{stat.suffix}
                </h3>
                <p className="mt-2 text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Featured Project</h2>
            <p className="mt-4 text-gray-600 text-lg">
              Our latest architectural achievement showcasing our design philosophy
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/projects/firstsketch-modern-villa.jpg"
                alt="Modern Tropical Villa by FirstSketch Concepts"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 text-white/90 text-xs bg-black/40 px-3 py-2 rounded-lg backdrop-blur-sm">
                Design: FirstSketch Concepts | Rendering: RenderStudio by Shabeeb Sara
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <span className="px-3 py-1 text-sm font-semibold bg-stone-200 text-gray-800 rounded-full">
                  Featured Project
                </span>
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight mt-4 mb-2">Modern Tropical Villa</h3>
                <p className="text-gray-600 font-medium">Residential Architecture • Kerala, India • 2024</p>
              </div>
              
              <p className="text-gray-700 tracking-wide leading-relaxed text-lg">
                A contemporary villa that embodies our philosophy of harmony between nature, light, and human experience. The design features seamless indoor-outdoor living, natural materials, and tropical landscaping integration.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Natural light optimization
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Indoor-outdoor living
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sustainable materials
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Tropical integration
                </div>
              </div>
              
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
              >
                View Full Portfolio
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-stone-800 rounded-3xl p-12 md:p-16 text-center text-white">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Project?</h2>
              <p className="text-base md:text-lg text-gray-300">
                Let's discuss how we can bring your vision to life with our nature-inspired design approach
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-3 rounded-full bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Contact Us Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
