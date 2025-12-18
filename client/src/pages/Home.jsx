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
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      alt: "Modern architectural design"
    },
    {
      url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
      alt: "Interior design showcase"
    },
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      alt: "Construction project"
    },
    {
      url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80",
      alt: "Planning and design"
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
    { label: "Projects Completed", value: "150", suffix: "+" },
    { label: "Years Experience", value: "12", suffix: "+" },
    { label: "Client Satisfaction", value: "98", suffix: "%" }
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
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
              />
              <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 to-stone-900/50"></div>
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
              <div className="mt-8 flex gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/services"
                  className="px-8 py-4 rounded-full border-2 border-white text-white font-medium hover:bg-white/10 transition-colors"
                >
                  View Work
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

      {/* CTA Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-stone-800 rounded-3xl p-12 md:p-16 text-center text-white">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Project?</h2>
              <p className="text-base md:text-lg text-gray-300">
                Let's discuss how we can bring your vision to life
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
