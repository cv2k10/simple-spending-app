const mongoose = require('mongoose');

const spendingSchema = new mongoose.Schema({
  place: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: "User",
    required: true
  }
}, {timestamps: true}
);

module.exports = mongoose.model('Spending', spendingSchema);