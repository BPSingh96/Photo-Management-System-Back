const mongoose = require('mongoose');

/**
* PhotoSchema is used to create Photo's Schema with the possible fields used inside the system.
*/
const PhotoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imageFileName: { type: String, trim: true, required: true }, // file name
    descriptions: [{
        _id: false,
        content: {type: String, trim: true, required: true },
        ratio: {type: Number, required: true, max: 100 },
    }]
},
    {
        versionKey: false,
        timestamps: true
    });

/**
* @typedef Photo
*/
module.exports = mongoose.model('photo', PhotoSchema);