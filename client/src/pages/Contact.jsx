import { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import apiService from "../services/api";

export default function Contact() {
  useScrollAnimation();
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await apiService.submitContactForm(formData);
      
      if (response.success) {
        setSubmitMessage("Thank you for your message! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
        setTimeout(() => {
          setShowModal(false);
          setSubmitMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitMessage("Sorry, there was an error sending your message. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCallAdmin = () => {
    window.location.href = "tel:+916282570226";
  };

  return (
    <div className="min-h-screen bg-stone-50 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Get In Touch</h1>
            <p className="mt-6 text-lg text-gray-700 tracking-wide leading-relaxed">
              Ready to start your project? Let's discuss how we can bring your vision to life.
            </p>
          </div>

          {/* Contact Options Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Map Location Card */}
            <a
              href="https://maps.app.goo.gl/QFqdPsMdTBkA6aCh8?g_st=iw"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 rounded-2xl bg-white hover:bg-stone-100 border-2 border-gray-200 hover:border-stone-400 transition-all hover:shadow-xl hover:scale-105 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 tracking-wide">Map Location</h3>
              <p className="text-sm text-gray-600 tracking-wide">View our office location</p>
            </a>

            {/* Call Admin Card */}
            <button
              onClick={handleCallAdmin}
              className="group p-8 rounded-2xl bg-white hover:bg-stone-100 border-2 border-gray-200 hover:border-stone-400 transition-all hover:shadow-xl hover:scale-105 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 tracking-wide">Call Admin</h3>
              <p className="text-sm text-gray-600 tracking-wide">Call Us</p>
            </button>

            {/* Email Card */}
            <a
              href="mailto:firstsketchconcepts@gmail.com"
              className="group p-8 rounded-2xl bg-white hover:bg-stone-100 border-2 border-gray-200 hover:border-stone-400 transition-all hover:shadow-xl hover:scale-105 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 tracking-wide">Email Us</h3>
              <p className="text-sm text-gray-600 tracking-wide">firstsketchconcepts@gmail.com</p>
            </a>

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/916282570226"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 rounded-2xl bg-white hover:bg-stone-100 border-2 border-gray-200 hover:border-stone-400 transition-all hover:shadow-xl hover:scale-105 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 tracking-wide">Contact Admin</h3>
              <p className="text-sm text-gray-600 tracking-wide">Chat with us on WhatsApp</p>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Contact Information</h2>
            <p className="mt-4 text-gray-700 text-lg tracking-wide">We're here to help with your project needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Office Hours */}
            <div className="p-6 rounded-xl bg-gray-50 border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 tracking-wide">Business Hours</h3>
              </div>
              <div className="space-y-2 text-gray-700 tracking-wide">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            {/* Address */}
            <div className="p-6 rounded-xl bg-gray-50 border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 tracking-wide">Office Address</h3>
              </div>
              <div className="text-gray-700 tracking-wide">
                <p><strong>Firstsketch concepts</strong></p>
                <p>Beach road, Tanur</p>
                <p>Malappuram, Kerala</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="p-6 rounded-xl bg-gray-50 border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Follow Us</h3>
              </div>
              <div className="flex gap-3">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/firstsketch_concepts?igsh=dzFuYmN2Y2d2anRl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.929.01 7.712.058 4.901.167 2.84 2.228 2.731 5.039 2.683 5.256 2.673 5.723 2.673 9.344v5.312c0 3.621.01 4.088.058 4.305.109 2.811 2.17 4.872 4.981 4.981.217.048.684.058 4.305.058h5.312c3.621 0 4.088-.01 4.305-.058 2.811-.109 4.872-2.17 4.981-4.981.048-.217.058-.684.058-4.305V9.344c0-3.621-.01-4.088-.058-4.305C21.506 2.228 19.445.167 16.634.058 16.417.01 15.95 0 12.329 0h-.312zm-.312 2.169c3.621 0 4.025.016 5.441.063 1.314.06 2.028.278 2.506.463.63.245 1.078.537 1.549 1.008.471.471.763.919 1.008 1.549.185.478.403 1.192.463 2.506.047 1.416.063 1.82.063 5.441s-.016 4.025-.063 5.441c-.06 1.314-.278 2.028-.463 2.506-.245.63-.537 1.078-1.008 1.549-.471.471-.919.763-1.549 1.008-.478.185-1.192.403-2.506.463-1.416.047-1.82.063-5.441.063s-4.025-.016-5.441-.063c-1.314-.06-2.028-.278-2.506-.463-.63-.245-1.078-.537-1.549-1.008-.471-.471-.763-.919-1.008-1.549-.185-.478-.403-1.192-.463-2.506-.047-1.416-.063-1.82-.063-5.441s.016-4.025.063-5.441c.06-1.314.278-2.028.463-2.506.245-.63.537-1.078 1.008-1.549.471-.471.919-.763 1.549-1.008.478-.185 1.192-.403 2.506-.463 1.416-.047 1.82-.063 5.441-.063zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.44 1.44-1.44.793-.001 1.44.645 1.44 1.44z"/>
                  </svg>
                </a>
                
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=100076768826494"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@firstsketch_concepts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                >
                  <span className="sr-only">YouTube</span>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-slideUp">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-2 text-gray-900">Contact Admin</h2>
            <p className="text-gray-600 mb-6">Send a message to the administrator or call them directly for urgent matters.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                  placeholder="+91-1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Service Interest</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                >
                  <option value="">Select a service</option>
                  <option value="architecture">Architecture</option>
                  <option value="interior-design">Interior Design</option>
                  <option value="planning">Planning</option>
                  <option value="construction">Construction</option>
                  <option value="consultation">Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Message *</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <div className={`p-4 rounded-lg ${submitMessage.includes('error') || submitMessage.includes('Sorry') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  <p className="text-sm">{submitMessage}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCallAdmin}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Admin Now
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
