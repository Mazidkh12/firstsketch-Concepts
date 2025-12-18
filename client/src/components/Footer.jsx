import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import apiService from "../services/api";

export default function Footer() {
  const [contactInfo, setContactInfo] = useState({});
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await apiService.getCompanyInfo();
        if (response.success) {
          setContactInfo(response.data.contact || {});
          setSocialLinks(response.data.social || {});
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
        // Use fallback data
        setContactInfo({
          email: 'firstskechconcepts@gmail.com',
          phone: '+91-6282570226',
          address: {
            company: 'Firstsketch concepts',
            street: 'Beach road, Tanur',
            city: 'Malappuram',
            state: 'Kerala'
          }
        });
        setSocialLinks({
          instagram: 'https://www.instagram.com/firstsketch_concepts?igsh=dzFuYmN2Y2d2anRl',
          facebook: 'https://www.facebook.com/profile.php?id=100076768826494',
          youtube: 'https://www.youtube.com/@firstsketch_concepts'
        });
      }
    };

    fetchFooterData();
  }, []);
  return (
    <footer className="relative bg-stone-100 border-t border-stone-200 transition-colors duration-500">
      
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              FirstSketch
            </h3>
            <p className="text-sm text-gray-600">
              Creating exceptional spaces through innovative design and expert execution.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="text-gray-600 hover:text-gray-900 transition">Architecture</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-gray-900 transition">Interior Design</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-gray-900 transition">Planning</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-gray-900 transition">Construction</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-gray-900 transition">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900 transition">About Us</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-gray-900 transition">Services</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-gray-900 transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>{contactInfo.email || 'firstskechconcepts@gmail.com'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>{contactInfo.phone || '+91-6282570226'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>
                  <strong>Office Address:</strong><br />
                  {contactInfo.address?.company || 'Firstsketch concepts'}<br />
                  {contactInfo.address?.street || 'Beach road, Tanur'}<br />
                  {contactInfo.address?.city || 'Malappuram'}, {contactInfo.address?.state || 'Kerala'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">&copy; 2025 FirstSketch. All rights reserved.</p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a
                href={socialLinks.instagram || "https://www.instagram.com/firstsketch_concepts?igsh=dzFuYmN2Y2d2anRl"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              >
                <span className="sr-only">Instagram</span>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.929.01 7.712.058 4.901.167 2.84 2.228 2.731 5.039 2.683 5.256 2.673 5.723 2.673 9.344v5.312c0 3.621.01 4.088.058 4.305.109 2.811 2.17 4.872 4.981 4.981.217.048.684.058 4.305.058h5.312c3.621 0 4.088-.01 4.305-.058 2.811-.109 4.872-2.17 4.981-4.981.048-.217.058-.684.058-4.305V9.344c0-3.621-.01-4.088-.058-4.305C21.506 2.228 19.445.167 16.634.058 16.417.01 15.95 0 12.329 0h-.312zm-.312 2.169c3.621 0 4.025.016 5.441.063 1.314.06 2.028.278 2.506.463.63.245 1.078.537 1.549 1.008.471.471.763.919 1.008 1.549.185.478.403 1.192.463 2.506.047 1.416.063 1.82.063 5.441s-.016 4.025-.063 5.441c-.06 1.314-.278 2.028-.463 2.506-.245.63-.537 1.078-1.008 1.549-.471.471-.919.763-1.549 1.008-.478.185-1.192.403-2.506.463-1.416.047-1.82.063-5.441.063s-4.025-.016-5.441-.063c-1.314-.06-2.028-.278-2.506-.463-.63-.245-1.078-.537-1.549-1.008-.471-.471-.763-.919-1.008-1.549-.185-.478-.403-1.192-.463-2.506-.047-1.416-.063-1.82-.063-5.441s.016-4.025.063-5.441c.06-1.314.278-2.028.463-2.506.245-.63.537-1.078 1.008-1.549.471-.471.919-.763 1.549-1.008.478-.185 1.192-.403 2.506-.463 1.416-.047 1.82-.063 5.441-.063zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.44 1.44-1.44.793-.001 1.44.645 1.44 1.44z"/>
                </svg>
              </a>
              
              <a
                href={socialLinks.facebook || "https://www.facebook.com/profile.php?id=100076768826494"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              >
                <span className="sr-only">Facebook</span>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a
                href={socialLinks.youtube || "https://www.youtube.com/@firstsketch_concepts"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              >
                <span className="sr-only">YouTube</span>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900 transition">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900 transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
