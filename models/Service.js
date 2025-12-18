const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  shortDesc: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    trim: true
  },
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  videos: [{
    url: String,
    title: String,
    thumbnail: String
  }],
  features: [String],
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
serviceSchema.index({ slug: 1 });
serviceSchema.index({ order: 1, isActive: 1 });

module.exports = mongoose.model('Service', serviceSchema);