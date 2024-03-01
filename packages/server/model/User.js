const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Object,
    default: {
      id: '1001',
      name: 'User',
      permissions: ['get:notes', 'post:notes', 'patch:notes', 'delete:notes']
    }
  },
  refreshToken: {
    type: String
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);