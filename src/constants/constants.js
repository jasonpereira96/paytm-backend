const measurements = {
    'horizontal': {
        width: 755, height: 450
    },
    'vertical': {
        width: 365, height: 450
    },
    'horizontal_small': {
        width: 365, height: 212
    },
    'gallery': {
        width: 380, height: 380
    }
};
const sizes = ['horizontal', 'vertical', 'horizontal_small', 'gallery'];

const USERNAME = process.env.USERNAME;
const HOST = process.env.HOST;
const DATABASE = process.env.DATABASE;
const PASSWORD = process.env.PASSWORD;
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
const IMGBB_URL = 'https://api.imgbb.com/1/upload';

module.exports.USERNAME = USERNAME;
module.exports.HOST = HOST;
module.exports.PASSWORD = PASSWORD;
module.exports.DATABASE = DATABASE;
module.exports.IMGBB_API_KEY = IMGBB_API_KEY;
module.exports.IMGBB_URL = IMGBB_URL;
module.exports.measurements = measurements;
module.exports.sizes = sizes;