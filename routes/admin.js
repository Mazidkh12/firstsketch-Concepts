const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const HeroImage = require('../models/HeroImage');
const Service = require('../models/Service');
const Stats = require('../models/Stats');
const Contact = require('../models/Contact');
const Project = require('../models/Project');
const CompanyInfo = require('../models/CompanyInfo');
const { authMiddleware, adminLogin } = require('../middleware/auth');

// Admin login endpoint
router.post('/login', adminLogin);

// Hero Images Management
router.get('/hero-images', authMiddleware, async (req, res) => {
  try {
    const heroImages = await HeroImage.find().sort({ order: 1 });
    res.json({ success: true, data: heroImages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/hero-images', authMiddleware, [
  body('url').isURL().withMessage('Valid URL is required'),
  body('alt').notEmpty().withMessage('Alt text is required'),
  body('order').isInt({ min: 0 }).withMessage('Order must be a positive integer')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const heroImage = new HeroImage(req.body);
    await heroImage.save();
    res.status(201).json({ success: true, data: heroImage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/hero-images/:id', authMiddleware, async (req, res) => {
  try {
    const heroImage = await HeroImage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!heroImage) {
      return res.status(404).json({ success: false, error: 'Hero image not found' });
    }
    
    res.json({ success: true, data: heroImage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/hero-images/:id', authMiddleware, async (req, res) => {
  try {
    const heroImage = await HeroImage.findByIdAndDelete(req.params.id);
    
    if (!heroImage) {
      return res.status(404).json({ success: false, error: 'Hero image not found' });
    }
    
    res.json({ success: true, message: 'Hero image deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Services Management
router.get('/services', authMiddleware, async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/services', authMiddleware, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('shortDesc').notEmpty().withMessage('Short description is required'),
  body('slug').notEmpty().withMessage('Slug is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const service = new Service(req.body);
    await service.save();
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Stats Management
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const stats = await Stats.find().sort({ order: 1 });
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/stats', authMiddleware, [
  body('label').notEmpty().withMessage('Label is required'),
  body('value').notEmpty().withMessage('Value is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const stat = new Stats(req.body);
    await stat.save();
    res.status(201).json({ success: true, data: stat });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Contact Management
router.get('/contacts', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    
    const query = status ? { status } : {};
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');
    
    const total = await Contact.countDocuments(query);
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/contacts/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'contacted', 'in-progress', 'completed', 'closed'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Projects Management
router.get('/projects', authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find().sort({ service: 1, order: 1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/projects', authMiddleware, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('service').isIn(['architecture', 'interior', 'planning', 'construction']).withMessage('Valid service is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/projects/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/projects/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Company Info Management
router.get('/company-info', authMiddleware, async (req, res) => {
  try {
    const companyInfo = await CompanyInfo.find().sort({ section: 1, order: 1 });
    res.json({ success: true, data: companyInfo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/company-info', authMiddleware, [
  body('section').isIn(['about', 'contact', 'social', 'stats']).withMessage('Valid section is required'),
  body('key').notEmpty().withMessage('Key is required'),
  body('value').notEmpty().withMessage('Value is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const companyInfo = new CompanyInfo(req.body);
    await companyInfo.save();
    res.status(201).json({ success: true, data: companyInfo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/company-info/:id', authMiddleware, async (req, res) => {
  try {
    const companyInfo = await CompanyInfo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!companyInfo) {
      return res.status(404).json({ success: false, error: 'Company info not found' });
    }
    
    res.json({ success: true, data: companyInfo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;