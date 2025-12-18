const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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
  category: {
    type: String,
    required: true,
    enum: ['Residential', 'Commercial', 'Urban Planning', 'Site Planning', 'Space Planning', 'Renovation'],
    trim: true
  },
  service: {
    type: String,
    required: true,
    enum: ['architecture', 'interior', 'planning', 'construction'],
    trim: true
  },
  image: {
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
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
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  completionDate: {
    type: Date
  },
  location: {
    type: String,
    trim: true
  },
  client: {
    type: String,
    trim: true
  },
  tags: [String],
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
projectSchema.index({ service: 1, isActive: 1 });
projectSchema.index({ featured: 1, order: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ status: 1 });

module.exports = mongoose.model('Project', projectSchema);