import { useState, useEffect } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  
  useScrollAnimation();

  const projects = [
    {
      id: 1,
      title: "Modern Tropical Villa",
      category: "Residential Architecture",
      location: "Kerala, India",
      year: "2024",
      image: "/projects/firstsketch-modern-villa.jpg",
      description: "A contemporary villa design that embodies FirstSketch Concepts' philosophy of harmony between nature, light, and human experience. The design features seamless indoor-outdoor living spaces, natural material integration, and tropical landscaping that creates a breathable, calm environment.",
      features: [
        "Seamless indoor-outdoor living spaces",
        "Natural material integration",
        "Tropical landscape integration", 
        "Sustainable design principles",
        "Optimal natural lighting",
        "Contemporary tropical architecture"
      ],
      credit: "Design: FirstSketch Concepts | Rendering: RenderStudio by Shabeeb Sara",
      featured: true
    },
    {
      id: 2,
      title: "Nice Public School Tanur",
      category: "Educational Architecture",
      location: "Tanur, Kerala",
      year: "2024",
      image: "/projects/nice_public_school_1.webp",
      description: "A modern educational facility designed to inspire learning through thoughtful architecture. The design emphasizes natural light, open learning spaces, and sustainable building practices to create an environment that enhances the educational experience.",
      features: [
        "Natural light optimization in classrooms",
        "Open and flexible learning spaces",
        "Sustainable building materials",
        "Energy-efficient design systems",
        "Safe and accessible design",
        "Integration with outdoor learning areas"
      ],
      credit: "Design: FirstSketch Concepts",
      gallery: [
        "/projects/nice_public_school_1.webp",
        "/projects/nice_public_school_2.webp", 
        "/projects/nice_public_school_3.webp",
        "/projects/nice_public_school_4.webp"
      ],
      featured: true
    },
    {
      id: 3,
      title: "Sustainable Family Home",
      category: "Residential Architecture",
      location: "Malappuram, Kerala",
      year: "2023",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      description: "A family residence designed with sustainability at its core, featuring natural ventilation, rainwater harvesting, and locally sourced materials.",
      features: [
        "Natural ventilation systems",
        "Rainwater harvesting",
        "Local material usage",
        "Energy-efficient design",
        "Green roof integration"
      ]
    },
    {
      id: 4,
      title: "Contemporary Office Space",
      category: "Commercial Architecture",
      location: "Tanur, Kerala",
      year: "2023",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      description: "Modern office design focusing on natural light, open collaboration spaces, and biophilic design elements.",
      features: [
        "Open collaboration spaces",
        "Biophilic design elements",
        "Natural light optimization",
        "Flexible workspace design",
        "Sustainable materials"
      ]
    }
  ];

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-stone-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Our Portfolio</h1>
            <p className="mt-6 text-lg text-gray-700 tracking-wide leading-relaxed">
              Discover our collection of thoughtfully designed spaces that harmonize nature, light, and human experience.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Featured Project</h2>
            <p className="mt-4 text-gray-700 tracking-wide">Our latest architectural achievement</p>
          </div>

          {projects.filter(p => p.featured).map((project) => (
            <div key={project.id} className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 text-white/90 text-xs bg-black/40 px-3 py-2 rounded-lg backdrop-blur-sm">
                  {project.credit}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 text-sm font-semibold bg-stone-200 text-gray-800 rounded-full">
                      Featured
                    </span>
                    <span className="text-sm text-gray-600">{project.year}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{project.title}</h3>
                  <p className="text-gray-600 font-medium">{project.category} • {project.location}</p>
                </div>
                
                <p className="text-gray-700 tracking-wide leading-relaxed text-lg">
                  {project.description}
                </p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <svg className="w-4 h-4 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">All Projects</h2>
            <p className="mt-4 text-gray-700 tracking-wide">Explore our complete portfolio</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 text-xs font-semibold bg-white text-gray-900 rounded-full shadow-lg">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-600">{project.category}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-wide mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{project.location}</p>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-64 md:h-96">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {selectedProject.credit && (
                <div className="absolute bottom-4 right-4 text-white/90 text-sm bg-black/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                  {selectedProject.credit}
                </div>
              )}
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-sm font-semibold bg-stone-200 text-gray-800 rounded-full">
                  {selectedProject.category}
                </span>
                <span className="text-sm text-gray-600">{selectedProject.year}</span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{selectedProject.title}</h3>
              <p className="text-gray-600 font-medium mb-6">{selectedProject.location}</p>
              
              <p className="text-gray-700 tracking-wide leading-relaxed mb-6">
                {selectedProject.description}
              </p>
              
              {selectedProject.gallery && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Project Gallery</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {selectedProject.gallery.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedProject.title} - View ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {selectedProject.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <svg className="w-4 h-4 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}