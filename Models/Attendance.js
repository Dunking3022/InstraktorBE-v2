const mongoose = require('mongoose');

const Attendance = mongoose.Schema({
  student: {
    type: Number,
    ref: 'User',
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['PRESENT', 'ABSENT'],
    default: 'ABSENT',
  },
});

module.exports = mongoose.model('Attendance', Attendance);