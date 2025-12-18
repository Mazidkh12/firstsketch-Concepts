const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: String,
    required: true,
    trim: true
  },
  suffix: {
    type: String,
    default: '',
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  icon: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
statsSchema.index({ order: 1, isActive: 1 });

module.exports = mongoose.model('Stats', statsSchema);