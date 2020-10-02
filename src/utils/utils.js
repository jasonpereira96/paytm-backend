const crypto = require('crypto');
const sharp = require('sharp');
const { measurements } = require('./../constants/constants');

function processImage(buffer, size) {
    let { height, width } = measurements[size];
    return sharp(buffer)
        .resize({
            height: height,
            width: width,
            fit: 'cover'
        }).toBuffer();
}

function hash(buffer) {
    let _hash = crypto.createHash('sha256');
    _hash.update(buffer);
    return _hash.digest('hex');
}

module.exports.processImage = processImage;
module.exports.hash = hash;
