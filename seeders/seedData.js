const mongoose = require('mongoose');
require('dotenv').config();

const HeroImage = require('../models/HeroImage');
const Service = require('../models/Service');
const Stats = require('../models/Stats');
const Project = require('../models/Project');
const CompanyInfo = require('../models/CompanyInfo');

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/firstsketch');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      HeroImage.deleteMany({}),
      Service.deleteMany({}),
      Stats.deleteMany({}),
      Project.deleteMany({}),
      CompanyInfo.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Seed Hero Images
    const heroImages = [
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
        alt: 'Modern architectural design',
        order: 1
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
        alt: 'Interior design showcase',
        order: 2
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        alt: 'Construction project',
        order: 3
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80',
        alt: 'Planning and design',
        order: 4
      }
    ];

    await HeroImage.insertMany(heroImages);
    console.log('Seeded hero images');

    // Seed Services
    const services = [
      {
        title: 'Architecture',
        description: 'Comprehensive architectural design services from concept to completion. We create innovative, functional, and sustainable architectural solutions that reflect your vision and meet your specific needs.',
        shortDesc: 'Innovative architectural designs',
        slug: 'architecture',
        order: 1,
        features: [
          'Conceptual Design',
          'Detailed Drawings',
          '3D Visualization',
          'Building Permits',
          'Sustainable Design',
          'Project Management'
        ],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80',
            alt: 'Modern house architecture',
            caption: 'Contemporary residential design'
          }
        ]
      },
      {
        title: 'Interior Design',
        description: 'Transform your spaces with our expert interior design services. We create beautiful, functional interiors that reflect your personality and enhance your lifestyle.',
        shortDesc: 'Transform spaces elegantly',
        slug: 'interior',
        order: 2,
        features: [
          'Space Planning',
          'Color Consultation',
          'Furniture Selection',
          'Lighting Design',
          'Material Selection',
          'Project Coordination'
        ],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
            alt: 'Modern interior design',
            caption: 'Elegant living space design'
          }
        ]
      },
      {
        title: 'Planning',
        description: 'Strategic planning services to optimize your space and ensure efficient project execution. We provide comprehensive planning solutions for residential and commercial projects.',
        shortDesc: 'Strategic space planning',
        slug: 'planning',
        order: 3,
        features: [
          'Site Analysis',
          'Master Planning',
          'Zoning Compliance',
          'Feasibility Studies',
          'Timeline Planning',
          'Budget Planning'
        ],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
            alt: 'Architectural planning',
            caption: 'Strategic project planning'
          }
        ]
      },
      {
        title: 'Construction',
        description: 'End-to-end construction services with quality craftsmanship and attention to detail. We manage every aspect of construction to deliver exceptional results on time and within budget.',
        shortDesc: 'End-to-end construction',
        slug: 'construction',
        order: 4,
        features: [
          'Project Management',
          'Quality Control',
          'Timeline Management',
          'Safety Compliance',
          'Material Sourcing',
          'Final Inspection'
        ],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
            alt: 'Construction site',
            caption: 'Professional construction services'
          }
        ]
      }
    ];

    await Service.insertMany(services);
    console.log('Seeded services');

    // Seed Stats
    const stats = [
      {
        label: 'Projects Completed',
        value: '150',
        suffix: '+',
        order: 1
      },
      {
        label: 'Years Experience',
        value: '12',
        suffix: '+',
        order: 2
      },
      {
        label: 'Client Satisfaction',
        value: '98',
        suffix: '%',
        order: 3
      }
    ];

    await Stats.insertMany(stats);
    console.log('Seeded statistics');

    // Seed Projects
    const projects = [
      // Architecture Projects
      {
        title: "Modern Residential Complex",
        description: "Contemporary living spaces with sustainable design principles and innovative architectural solutions.",
        category: "Residential",
        service: "architecture",
        image: {
          url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
          alt: "Modern residential complex exterior"
        },
        status: "completed",
        location: "Kerala, India",
        featured: true,
        order: 1
      },
      {
        title: "Corporate Office Tower",
        description: "State-of-the-art office building with innovative facade design and energy-efficient systems.",
        category: "Commercial",
        service: "architecture",
        image: {
          url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
          alt: "Corporate office tower"
        },
        status: "completed",
        location: "Malappuram, Kerala",
        featured: true,
        order: 2
      },
      {
        title: "Luxury Villa",
        description: "Elegant villa design blending modern and traditional elements with premium finishes.",
        category: "Residential",
        service: "architecture",
        image: {
          url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
          alt: "Luxury villa exterior"
        },
        status: "completed",
        location: "Tanur, Kerala",
        order: 3
      },

      // Interior Design Projects
      {
        title: "Modern Living Room",
        description: "Minimalist design with warm tones and natural materials creating a cozy atmosphere.",
        category: "Residential",
        service: "interior",
        image: {
          url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
          alt: "Modern living room interior"
        },
        status: "completed",
        featured: true,
        order: 1
      },
      {
        title: "Executive Office Suite",
        description: "Professional workspace with ergonomic design elements and premium materials.",
        category: "Commercial",
        service: "interior",
        image: {
          url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
          alt: "Executive office interior"
        },
        status: "completed",
        order: 2
      },
      {
        title: "Luxury Bedroom",
        description: "Elegant bedroom design with custom furniture and sophisticated lighting solutions.",
        category: "Residential",
        service: "interior",
        image: {
          url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
          alt: "Luxury bedroom interior"
        },
        status: "completed",
        order: 3
      },

      // Planning Projects
      {
        title: "Urban Development Plan",
        description: "Comprehensive master plan for mixed-use development with sustainable infrastructure.",
        category: "Urban Planning",
        service: "planning",
        image: {
          url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
          alt: "Urban development planning"
        },
        status: "completed",
        featured: true,
        order: 1
      },
      {
        title: "Site Analysis & Feasibility",
        description: "Detailed site assessment and development feasibility study for residential project.",
        category: "Site Planning",
        service: "planning",
        image: {
          url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
          alt: "Site analysis and planning"
        },
        status: "completed",
        order: 2
      },
      {
        title: "Residential Layout",
        description: "Efficient floor plan design for residential complex optimizing space and functionality.",
        category: "Space Planning",
        service: "planning",
        image: {
          url: "https://images.unsplash.com/photo-1503594384566-461fe158e797?auto=format&fit=crop&w=800&q=80",
          alt: "Residential layout planning"
        },
        status: "completed",
        order: 3
      },

      // Construction Projects
      {
        title: "High-Rise Construction",
        description: "Multi-story commercial building construction with advanced engineering solutions.",
        category: "Commercial",
        service: "construction",
        image: {
          url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
          alt: "High-rise construction site"
        },
        status: "completed",
        featured: true,
        order: 1
      },
      {
        title: "Residential Development",
        description: "Complete residential complex construction management from foundation to finishing.",
        category: "Residential",
        service: "construction",
        image: {
          url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
          alt: "Residential construction"
        },
        status: "completed",
        order: 2
      },
      {
        title: "Renovation Project",
        description: "Historic building restoration and modernization preserving architectural heritage.",
        category: "Renovation",
        service: "construction",
        image: {
          url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
          alt: "Building renovation project"
        },
        status: "completed",
        order: 3
      }
    ];

    await Project.insertMany(projects);
    console.log('Seeded projects');

    // Seed Company Information
    const companyInfo = [
      // About Section
      {
        section: 'about',
        key: 'story',
        value: 'Founded with a vision to transform spaces and elevate experiences, FirstSketch has been at the forefront of architectural innovation and design excellence.',
        description: 'Company story',
        order: 1
      },
      {
        section: 'about',
        key: 'mission',
        value: 'Our journey began with a simple belief: that great design has the power to improve lives and communities. Today, we continue to push boundaries and create spaces that inspire.',
        description: 'Company mission',
        order: 2
      },
      {
        section: 'about',
        key: 'team',
        value: 'With a team of talented architects, designers, and builders, we bring together creativity, technical expertise, and a commitment to sustainability in every project we undertake.',
        description: 'Team description',
        order: 3
      },

      // About Stats
      {
        section: 'stats',
        key: 'projects',
        value: { label: 'Projects Completed', value: '500', suffix: '+' },
        description: 'Total completed projects',
        order: 1
      },
      {
        section: 'stats',
        key: 'team_members',
        value: { label: 'Team Members', value: '50', suffix: '+' },
        description: 'Total team members',
        order: 2
      },
      {
        section: 'stats',
        key: 'experience',
        value: { label: 'Years Experience', value: '15', suffix: '+' },
        description: 'Years of experience',
        order: 3
      },
      {
        section: 'stats',
        key: 'satisfaction',
        value: { label: 'Client Satisfaction', value: '98', suffix: '%' },
        description: 'Client satisfaction rate',
        order: 4
      },

      // Contact Information
      {
        section: 'contact',
        key: 'email',
        value: 'firstskechconcepts@gmail.com',
        description: 'Primary email address',
        order: 1
      },
      {
        section: 'contact',
        key: 'phone',
        value: '+91-6282570226',
        description: 'Primary phone number',
        order: 2
      },
      {
        section: 'contact',
        key: 'whatsapp',
        value: '+91-6282570226',
        description: 'WhatsApp number',
        order: 3
      },
      {
        section: 'contact',
        key: 'address',
        value: {
          company: 'Firstsketch concepts',
          street: 'Beach road, Tanur',
          city: 'Malappuram',
          state: 'Kerala',
          country: 'India'
        },
        description: 'Office address',
        order: 4
      },
      {
        section: 'contact',
        key: 'business_hours',
        value: {
          monday: '9:00 AM - 6:00 PM',
          tuesday: '9:00 AM - 6:00 PM',
          wednesday: '9:00 AM - 6:00 PM',
          thursday: '9:00 AM - 6:00 PM',
          friday: '9:00 AM - 6:00 PM',
          saturday: '10:00 AM - 4:00 PM',
          sunday: 'Closed'
        },
        description: 'Business operating hours',
        order: 5
      },
      {
        section: 'contact',
        key: 'map_location',
        value: 'https://maps.app.goo.gl/QFqdPsMdTBkA6aCh8?g_st=iw',
        description: 'Google Maps location',
        order: 6
      },

      // Social Media
      {
        section: 'social',
        key: 'instagram',
        value: 'https://www.instagram.com/firstsketch_concepts?igsh=dzFuYmN2Y2d2anRl',
        description: 'Instagram profile',
        order: 1
      },
      {
        section: 'social',
        key: 'facebook',
        value: 'https://www.facebook.com/profile.php?id=100076768826494',
        description: 'Facebook profile',
        order: 2
      },
      {
        section: 'social',
        key: 'youtube',
        value: 'https://www.youtube.com/@firstsketch_concepts',
        description: 'YouTube channel',
        order: 3
      }
    ];

    await CompanyInfo.insertMany(companyInfo);
    console.log('Seeded company information');

    console.log('✅ Database seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedData();
}

module.exports = seedData;