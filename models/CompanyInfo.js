const mongoose = require('mongoose');

const companyInfoSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    enum: ['about', 'contact', 'social', 'stats'],
    trim: true
  },
  key: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed, // Can store strings, numbers, objects, arrays
    required: true
  },
  description: {
    type: String,
    trim: true
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

// Compound index for efficient querying
companyInfoSchema.index({ section: 1, key: 1 }, { unique: true });
companyInfoSchema.index({ section: 1, order: 1, isActive: 1 });

module.exports = mongoose.model('CompanyInfo', companyInfoSchema);