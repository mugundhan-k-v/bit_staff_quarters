const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Plumbing', 'Carpentry', 'Electrical', 'Gardening', 'Others'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description must be at least 10 characters long'],
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Resolved', 'Rejected'],
    },
    quarters: {
      type: String,
      required: [true, 'Quarters number is required'],
    },
    facultyId: {
      type: String,
      required: [true, 'Faculty ID is required'],
    },
    proof: {
      data: {
        type: String,
        required: function () {
          return this.proof && this.proof.contentType; // Require data if contentType exists
        },
      },
      contentType: {
        type: String,
        enum: [
          'image/jpeg',
          'image/png',
          'video/mp4',
          'video/webm',
        ],
        required: function () {
          return this.proof && this.proof.data; // Require contentType if data exists
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Complaint', ComplaintSchema);
