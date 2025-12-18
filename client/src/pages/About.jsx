import { useState, useEffect } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import apiService from "../services/api";

export default function About() {
  const [aboutStats, setAboutStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useScrollAnimation();

  // Fallback stats
  const fallbackStats = [
    { key: 'projects', value: { label: 'Projects Completed', value: '500', suffix: '+' } },
    { key: 'team_members', value: { label: 'Team Members', value: '50', suffix: '+' } },
    { key: 'experience', value: { label: 'Years Experience', value: '15', suffix: '+' } },
    { key: 'satisfaction', value: { label: 'Client Satisfaction', value: '98', suffix: '%' } }
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
              We are a team of passionate designers and builders dedicated to creating exceptional spaces that inspire and endure.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">Our Story</h2>
              <p className="text-gray-700 tracking-wide leading-relaxed mb-4">
                Founded with a vision to transform spaces and elevate experiences, FirstSketch has been at the forefront of architectural innovation and design excellence.
              </p>
              <p className="text-gray-700 tracking-wide leading-relaxed mb-4">
                Our journey began with a simple belief: that great design has the power to improve lives and communities. Today, we continue to push boundaries and create spaces that inspire.
              </p>
              <p className="text-gray-700 tracking-wide leading-relaxed">
                With a team of talented architects, designers, and builders, we bring together creativity, technical expertise, and a commitment to sustainability in every project we undertake.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 tracking-wide">Excellence</h3>
              <p className="text-gray-700 tracking-wide leading-relaxed">
                We strive for excellence in every project, delivering quality that exceeds expectations.
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
                Environmental responsibility is at the core of our design philosophy and practices.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-white border-2 border-stone-200 hover:border-stone-400 transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 tracking-wide">Collaboration</h3>
              <p className="text-gray-700 tracking-wide leading-relaxed">
                We work closely with clients and partners to bring visions to life through teamwork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white transition-colors duration-300">
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
