const express = require('express');
const router = express.Router();
const HeroImage = require('../models/HeroImage');
const Service = require('../models/Service');
const Stats = require('../models/Stats');

// GET /api/home - Get all home page data
router.get('/', async (req, res) => {
  try {
    // Fetch all home page data in parallel
    const [heroImages, services, stats] = await Promise.all([
      HeroImage.find({ isActive: true }).sort({ order: 1 }).select('url alt'),
      Service.find({ isActive: true }).sort({ order: 1 }).select('title shortDesc slug'),
      Stats.find({ isActive: true }).sort({ order: 1 }).select('label value suffix icon')
    ]);

    res.json({
      success: true,
      data: {
        heroImages,
        services,
        stats
      }
    });
  } catch (error) {
    console.error('Error fetching home page data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch home page data'
    });
  }
});

// GET /api/home/hero-images - Get hero images
router.get('/hero-images', async (req, res) => {
  try {
    const heroImages = await HeroImage.find({ isActive: true })
      .sort({ order: 1 })
      .select('url alt order');

    res.json({
      success: true,
      data: heroImages
    });
  } catch (error) {
    console.error('Error fetching hero images:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch hero images'
    });
  }
});

// GET /api/home/services - Get services for home page
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true })
      .sort({ order: 1 })
      .select('title shortDesc slug icon');

    // Transform for frontend compatibility
    const transformedServices = services.map(service => ({
      title: service.title,
      desc: service.shortDesc,
      path: `/services#${service.slug}`,
      icon: service.icon
    }));

    res.json({
      success: true,
      data: transformedServices
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch services'
    });
  }
});

// GET /api/home/stats - Get statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Stats.find({ isActive: true })
      .sort({ order: 1 })
      .select('label value suffix icon');

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
});

module.exports = router;