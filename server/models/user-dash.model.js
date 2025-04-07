const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {
      type: String,
      required: true,
      unique: true
    },
    name: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    altPhone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true });

const UserForm = mongoose.model("UserForm", userSchema);
module.exports = UserForm;
