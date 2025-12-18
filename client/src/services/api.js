const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Home page APIs
  async getHomeData() {
    return this.request('/home');
  }

  async getHeroImages() {
    return this.request('/home/hero-images');
  }

  async getServices() {
    return this.request('/home/services');
  }

  async getStats() {
    return this.request('/home/stats');
  }

  // Contact APIs
  async submitContactForm(formData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  async getContactInfo() {
    return this.request('/contact/info');
  }

  // Services APIs
  async getAllServices() {
    return this.request('/services');
  }

  async getServiceBySlug(slug) {
    return this.request(`/services/${slug}`);
  }

  // Projects APIs
  async getProjects(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/projects?${params}`);
  }

  async getProjectsByService() {
    return this.request('/projects/by-service');
  }

  async getProjectById(id) {
    return this.request(`/projects/${id}`);
  }

  // Company APIs
  async getCompanyInfo() {
    return this.request('/company');
  }

  async getCompanySection(section) {
    return this.request(`/company/${section}`);
  }

  async getAboutStats() {
    return this.request('/company/about/stats');
  }
}

export default new ApiService();