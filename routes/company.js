const express = require('express');
const router = express.Router();
const CompanyInfo = require('../models/CompanyInfo');

// GET /api/company - Get all company information
router.get('/', async (req, res) => {
  try {
    const companyInfo = await CompanyInfo.find({ isActive: true })
      .sort({ section: 1, order: 1 })
      .select('-__v');

    // Group by section
    const groupedInfo = {};
    companyInfo.forEach(info => {
      if (!groupedInfo[info.section]) {
        groupedInfo[info.section] = {};
      }
      groupedInfo[info.section][info.key] = info.value;
    });

    res.json({
      success: true,
      data: groupedInfo
    });
  } catch (error) {
    console.error('Error fetching company info:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch company information'
    });
  }
});

// GET /api/company/:section - Get company info by section
router.get('/:section', async (req, res) => {
  try {
    const { section } = req.params;
    
    const companyInfo = await CompanyInfo.find({ 
      section, 
      isActive: true 
    })
    .sort({ order: 1 })
    .select('-__v');

    // Convert to key-value object
    const sectionData = {};
    companyInfo.forEach(info => {
      sectionData[info.key] = info.value;
    });

    res.json({
      success: true,
      data: sectionData
    });
  } catch (error) {
    console.error('Error fetching company section:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch company section'
    });
  }
});

// GET /api/company/about/stats - Get about page statistics
router.get('/about/stats', async (req, res) => {
  try {
    const stats = await CompanyInfo.find({ 
      section: 'stats', 
      isActive: true 
    })
    .sort({ order: 1 })
    .select('key value description order -_id');

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching about stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch about statistics'
    });
  }
});

module.exports = router;