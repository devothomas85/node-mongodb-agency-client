const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Type schema options
const options = {
  toObject: {
    getters: false,
    setters: false,
    virtuals: false
  },
  toJSON: {
    getters: false,
    setters: false,
    virtuals: false
  },
  timestamps: true,
  _id: true
};

//Agency Schema Definitions
const definitions = {
  name: {
    type: String,
    required: true
  },
  address1: {
    type: String,
    trim: true,
    required: true
  },
  address2: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true,
    required: true
  },
  state: {
    type: String,
    trim: true,
    required: true
  },
  phone: {
      type: String,
      required: true
  },
};

const AgencySchema = new Schema(definitions, options);
module.exports = mongoose.model('Agency', AgencySchema);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            