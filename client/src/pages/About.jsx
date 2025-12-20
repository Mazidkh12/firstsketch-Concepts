import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import apiService from "../services/api";

export default function About() {
  const [aboutStats, setAboutStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useScrollAnimation();

  // Fallback stats
  const fallbackStats = [
    { key: 'projects', value: { label: 'Projects Completed', value: '50', suffix: '+' } },
    { key: 'team_members', value: { label: 'Team Members', value: '10', suffix: '+' } },
    { key: 'experience', value: { label: 'Years Experience', value: '5', suffix: '+' } },
    { key: 'satisfaction', value: { label: 'Client Satisfaction', value: '100', suffix: '%' } }
  ];

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getAboutStats();
        
        if (response.success) {
          setAboutStats(response.data);
        } else {
          throw new Error('Failed to fetch about stats');
        }
      } catch (err) {
        console.error('Error fetching about stats:', err);
        setError(err.message);
        setAboutStats(fallbackStats);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-stone-50 pt-32 pb-20 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">About Us</h1>
            <p className="mt-6 text-lg text-gray-700 tracking-wide leading-relaxed">
              Firstsketch Concepts is a multidisciplinary architecture and design studio inspired by nature, light, and simplicity. We create spaces that are calm, breathable, and deeply connected to their surroundings.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">Our Philosophy</h2>
              <p className="text-gray-700 tracking-wide leading-relaxed mb-4">
                Our designs prioritize natural sunlight, greenery, open planning, and seamless indoor–outdoor relationships. Every project begins with an understanding of the site—its climate, landscape, and context—allowing architecture to grow naturally rather than overpower its environment.
              </p>
              <p className="text-gray-700 tracking-wide leading-relaxed mb-4">
                We believe in thoughtful, sustainable design that enhances everyday living. Through careful material choices, efficient planning, and a collaborative design process, we craft spaces that are timeless, functional, and environmentally responsible.
              </p>
              <p className="text-gray-700 tracking-wide leading-relaxed">
                At Firstsketch Concepts, we design environments where nature, light, and human experience exist in quiet harmony.
              </p>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                alt="Our Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-stone-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Our Values</h2>
            <p className="mt-4 text-gray-700 tracking-wide">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-white border-2 border-stone-200 hover:border-stone-400 transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 tracking-wide">Natural Light</h3>
              <p className="text-gray-700 tracking-wide leading-relaxed">
                We prioritize natural sunlight in every design, creating bright, welcoming spaces that connect with nature.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-white border-2 border-stone-200 hover:border-stone-400 transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 tracking-wide">Sustainability</h3>
              <p className="text-gray-700 tracking-wide leading-relaxed">
                Environmental responsibility guides our material choices and design process for timeless, responsible architecture.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-white border-2 border-stone-200 hover:border-stone-400 transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 tracking-wide">Contextual Design</h3>
              <p className="text-gray-700 tracking-wide leading-relaxed">
                Every project begins with understanding the site's climate, landscape, and context for naturally integrated architecture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-20 bg-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Our Philosophy in Action</h2>
            <p className="mt-4 text-gray-700 tracking-wide">See how we bring nature, light, and simplicity together</p>
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
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">Modern Tropical Villa</h3>
                <p className="text-gray-600 font-medium mb-4">Residential Architecture • Kerala, India</p>
              </div>
              
              <p className="text-gray-700 tracking-wide leading-relaxed">
                This contemporary villa perfectly embodies our design philosophy. Natural materials blend seamlessly with tropical landscaping, while large openings maximize natural light and create effortless indoor-outdoor flow. Every element reflects our commitment to creating spaces where nature, light, and human experience exist in quiet harmony.
              </p>
              
              <div className="flex gap-4">
                <Link
                  to="/portfolio"
                  className="px-6 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
                >
                  View Full Portfolio
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-full border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Start Your Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-stone-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {aboutStats.map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.value.value}{stat.value.suffix}
                </div>
                <div className="text-gray-700 tracking-wide">{stat.value.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
