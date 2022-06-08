const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

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
    agencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email');
            }
        }
    },
    phone: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
};

const ClientSchema = new Schema(definitions, options);
module.exports = mongoose.model('Client', ClientSchema);
