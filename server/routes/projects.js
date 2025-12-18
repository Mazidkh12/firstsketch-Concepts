const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET /api/projects - Get all projects with optional filtering
router.get('/', async (req, res) => {
  try {
    const { service, category, featured, status } = req.query;
    
    // Build query
    const query = { isActive: true };
    if (service) query.service = service;
    if (category) query.category = category;
    if (featured !== undefined) query.featured = featured === 'true';
    if (status) query.status = status;

    const projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects'
    });
  }
});

// GET /api/projects/by-service - Get projects grouped by service
router.get('/by-service', async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');

    // Group projects by service
    const groupedProjects = {
      architecture: projects.filter(p => p.service === 'architecture'),
      interior: projects.filter(p => p.service === 'interior'),
      planning: projects.filter(p => p.service === 'planning'),
      construction: projects.filter(p => p.service === 'construction')
    };

    res.json({
      success: true,
      data: groupedProjects
    });
  } catch (error) {
    console.error('Error fetching grouped projects:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch grouped projects'
    });
  }
});

// GET /api/projects/:id - Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ 
      _id: req.params.id, 
      isActive: true 
    }).select('-__v');

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project'
    });
  }
});

module.exports = router;