const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);