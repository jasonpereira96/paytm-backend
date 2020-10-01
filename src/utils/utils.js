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
    const hash = crypto.createHash('sha256');
    hash.update(buffer);
    return hash.digest('hex');
}

module.exports.processImage = processImage;
module.exports.hash = hash;
