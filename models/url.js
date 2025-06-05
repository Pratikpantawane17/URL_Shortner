const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortID : {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL : {
        type: String,
        unique: true,
    },
    visitHistory : [{
        timestamp : {
            type: Number
        }
    }],
},
{
    timestamps: true
}
)

const URL = mongoose.model('url', urlSchema);

module.exports = URL;