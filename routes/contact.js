const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const router = express.Router();
const Contact = require('../models/Contact');

// Rate limiting for contact form (stricter)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 contact form submissions per windowMs
  message: {
    success: false,
    error: 'Too many contact form submissions. Please try again later.'
  }
});

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('service')
    .optional()
    .isIn(['architecture', 'interior-design', 'planning', 'construction', 'consultation', 'other'])
    .withMessage('Invalid service type'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// POST /api/contact - Submit contact form
router.post('/', contactLimiter, contactValidation, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, phone, service, message } = req.body;

    // Create contact record
    const contact = new Contact({
      name,
      email,
      phone,
      service: service || 'other',
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await contact.save();

    // Send email notification (if configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();
        
        // Email to admin
        const adminMailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || 'firstskechconcepts@gmail.com',
          subject: `New Contact Form Submission - ${service || 'General'}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Service:</strong> ${service || 'Other'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
            <p><small>IP Address: ${req.ip}</small></p>
          `
        };

        // Auto-reply to user
        const userMailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Thank you for contacting FirstSketch Concepts',
          html: `
            <h2>Thank you for your inquiry!</h2>
            <p>Dear ${name},</p>
            <p>We have received your message and will get back to you within 24 hours.</p>
            <p><strong>Your message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p>Best regards,<br>FirstSketch Concepts Team</p>
            <p>Email: firstskechconcepts@gmail.com<br>Phone: +91-6282570226</p>
          `
        };

        await Promise.all([
          transporter.sendMail(adminMailOptions),
          transporter.sendMail(userMailOptions)
        ]);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: {
        id: contact._id,
        submittedAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form. Please try again.'
    });
  }
});

// GET /api/contact/info - Get contact information
router.get('/info', (req, res) => {
  res.json({
    success: true,
    data: {
      email: 'firstskechconcepts@gmail.com',
      phone: '+91-6282570226',
      whatsapp: '+91-6282570226',
      address: {
        company: 'Firstsketch concepts',
        street: 'Beach road, Tanur',
        city: 'Malappuram',
        state: 'Kerala',
        country: 'India'
      },
      businessHours: {
        monday: '9:00 AM - 6:00 PM',
        tuesday: '9:00 AM - 6:00 PM',
        wednesday: '9:00 AM - 6:00 PM',
        thursday: '9:00 AM - 6:00 PM',
        friday: '9:00 AM - 6:00 PM',
        saturday: '10:00 AM - 4:00 PM',
        sunday: 'Closed'
      },
      socialMedia: {
        instagram: 'https://www.instagram.com/firstsketch_concepts?igsh=dzFuYmN2Y2d2anRl',
        facebook: 'https://www.facebook.com/profile.php?id=100076768826494',
        youtube: 'https://www.youtube.com/@firstsketch_concepts'
      },
      mapLocation: 'https://maps.app.goo.gl/QFqdPsMdTBkA6aCh8?g_st=iw'
    }
  });
});

module.exports = router;