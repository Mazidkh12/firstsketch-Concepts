const mongoose = require('mongoose');

const heroImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true
  },
  alt: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    required: true,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  uploadedBy: {
    type: String,
    default: 'admin'
  }
}, {
  timestamps: true
});

// Index for efficient querying
heroImageSchema.index({ order: 1, isActive: 1 });

module.exports = mongoose.model('HeroImage', heroImageSchema);