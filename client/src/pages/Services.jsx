import { useState, useEffect } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import apiService from "../services/api";

export default function Services() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("architecture");
  const [services, setServices] = useState({});
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useScrollAnimation();

  // Fallback data
  const fallbackProjects = {
    architecture: [
    {
      id: 1,
      title: "Modern Tropical Villa",
      category: "Residential",
      image: "/projects/firstsketch-modern-villa.jpg",
      description: "Contemporary villa design inspired by nature with seamless indoor-outdoor living, natural materials, and tropical landscaping integration",
      credit: "Design: FirstSketch Concepts | Rendering: RenderStudio by Shabeeb Sara",
      featured: true
    },
    {
      id: 2,
      title: "Nice Public School Tanur",
      category: "Educational",
      image: "/projects/nice_public_school_1.webp",
      description: "Modern educational facility designed with natural light, open learning spaces, and sustainable architecture for enhanced learning environment",
      credit: "Design: FirstSketch Concepts",
      featured: true
    },
    {
      id: 3,
      title: "Sustainable Residential Complex",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      description: "Contemporary living spaces with sustainable design principles and natural light optimization",
    },
    {
      id: 4,
      title: "Corporate Office Design",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      description: "Modern office building with innovative facade design and energy-efficient systems",
    },
    ],
    interior: [
    {
      id: 1,
      title: "Modern Living Room",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      description: "Minimalist design with warm tones and natural materials",
    },
    {
      id: 2,
      title: "Executive Office Suite",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      description: "Professional workspace with ergonomic design elements",
    },
    {
      id: 3,
      title: "Luxury Bedroom",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
      description: "Elegant bedroom design with custom furniture and lighting",
    },
    ],
    planning: [
    {
      id: 1,
      title: "Urban Development Plan",
      category: "Urban Planning",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      description: "Comprehensive master plan for mixed-use development",
    },
    {
      id: 2,
      title: "Site Analysis & Feasibility",
      category: "Site Planning",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      description: "Detailed site assessment and development feasibility study",
    },
    {
      id: 3,
      title: "Residential Layout",
      category: "Space Planning",
      image: "https://images.unsplash.com/photo-1503594384566-461fe158e797?auto=format&fit=crop&w=800&q=80",
      description: "Efficient floor plan design for residential complex",
    },
    ],
    construction: [
    {
      id: 1,
      title: "High-Rise Construction",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
      description: "Multi-story commercial building construction",
    },
    {
      id: 2,
      title: "Residential Development",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      description: "Complete residential complex construction management",
    },
    {
      id: 3,
      title: "Renovation Project",
      category: "Renovation",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      description: "Historic building restoration and modernization",
    },
    ]
  };

  const fallbackServices = {
    architecture: {
      title: "Architecture",
      description: "Creating innovative architectural designs that harmonize form, function, and sustainability. Our portfolio showcases diverse projects from residential to commercial spaces.",
      offerings: [
        { title: "Concept Design", desc: "Initial sketches and 3D visualizations" },
        { title: "Detailed Planning", desc: "Complete architectural drawings and specifications" },
        { title: "Project Management", desc: "Oversight from concept to completion" },
      ],
      projects: [],
    },
    interior: {
      title: "Interior Design",
      description: "Transforming interiors into beautiful, functional spaces that reflect your personality and lifestyle. From concept to completion, we handle every detail with precision and creativity.",
      offerings: [
        { title: "Space Planning", desc: "Optimal layout design for functionality and flow" },
        { title: "Custom Furniture", desc: "Bespoke furniture design and selection" },
        { title: "Lighting Design", desc: "Strategic lighting to enhance ambiance" },
      ],
      projects: [],
    },
    planning: {
      title: "Planning",
      description: "Strategic planning services that lay the foundation for successful projects. From site analysis to master planning, we ensure every detail is carefully considered.",
      offerings: [
        { title: "Site Analysis", desc: "Comprehensive site evaluation and feasibility studies" },
        { title: "Master Planning", desc: "Long-term development strategies and zoning" },
        { title: "Space Optimization", desc: "Efficient layout design for maximum functionality" },
      ],
      projects: [],
    },
    construction: {
      title: "Construction",
      description: "Delivering quality construction with precision and expertise. From groundbreaking to final handover, we manage every phase with dedication to excellence.",
      offerings: [
        { title: "Project Management", desc: "End-to-end construction oversight and coordination" },
        { title: "Quality Control", desc: "Rigorous quality assurance at every stage" },
        { title: "Safety Compliance", desc: "Strict adherence to safety standards and regulations" },
      ],
      projects: [],
    },
  };

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        setLoading(true);
        const [servicesResponse, projectsResponse] = await Promise.all([
          apiService.getAllServices(),
          apiService.getProjectsByService()
        ]);

        if (servicesResponse.success && projectsResponse.success) {
          // Transform services data
          const servicesData = {};
          servicesResponse.data.forEach(service => {
            servicesData[service.slug] = {
              title: service.title,
              description: service.description,
              offerings: service.features?.map(feature => ({
                title: feature,
                desc: `Professional ${feature.toLowerCase()} services`
              })) || [],
              projects: []
            };
          });

          setServices({ ...fallbackServices, ...servicesData });
          setProjects(projectsResponse.data);
        } else {
          throw new Error('Failed to fetch services data');
        }
      } catch (err) {
        console.error('Error fetching services data:', err);
        setError(err.message);
        // Use fallback data
        setServices(fallbackServices);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesData();
  }, []);

  const currentService = services[activeTab];
  const currentProjects = projects[activeTab] || fallbackProjects[activeTab] || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center pt-20">
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
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20">
      {/* Service Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-2 py-4">
            {Object.keys(services).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 tracking-wide ${
                  activeTab === key
                    ? "bg-gray-900 text-white"
                    : "bg-stone-100 text-gray-700 hover:bg-stone-200"
                }`}
              >
                {services[key].title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-16 bg-stone-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">{currentService.title}</h2>
            <p className="text-lg text-gray-700 tracking-wide leading-relaxed">
              {currentService.description}
            </p>
          </div>

          {/* Service Offerings */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {currentService.offerings.map((offering) => (
              <div key={offering.title} className="p-6 rounded-xl bg-white border-2 border-stone-200 hover:border-stone-400 transition-all hover:shadow-lg">
                <h3 className="text-xl font-bold mb-2 text-gray-900 tracking-wide">{offering.title}</h3>
                <p className="text-gray-700 tracking-wide leading-relaxed">{offering.desc}</p>
              </div>
            ))}
          </div>

          {/* Projects Gallery */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-8">Featured Projects</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProjects.map((project) => (
                <div
                  key={project.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(project)}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={project.image?.url || project.image}
                      alt={project.image?.alt || project.title}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <span className="text-xs font-semibold bg-gray-900 px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                        <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg text-gray-900 tracking-wide">{project.title}</h3>
                      {project.featured && (
                        <span className="px-2 py-1 text-xs font-semibold bg-stone-200 text-gray-800 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mt-1 tracking-wide leading-relaxed">{project.description}</p>
                    {project.credit && (
                      <p className="text-xs text-gray-500 mt-2 italic">{project.credit}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-5xl w-full">
            <img
              src={selectedImage.image?.url || selectedImage.image}
              alt={selectedImage.image?.alt || selectedImage.title}
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-4 text-white text-center">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
              <p className="mt-2 text-gray-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
