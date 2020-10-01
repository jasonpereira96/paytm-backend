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

//how do i remove these from here?
const USERNAME = 'cxqyzdmbsgnzxx';
const HOST = 'ec2-18-203-7-163.eu-west-1.compute.amazonaws.com';
const DATABASE = 'd92ch17m0ic12f';
const PASSWORD = 'd960a0ea5e09081b4d642bfb3164c685cfe10f7516086399f7f61271c280e85e';
const IMGBB_API_KEY = '5539c5d19987f91976ba274ba6735bd0';
const IMGBB_URL = 'https://api.imgbb.com/1/upload';

module.exports.USERNAME = USERNAME;
module.exports.HOST = HOST;
module.exports.PASSWORD = PASSWORD;
module.exports.DATABASE = DATABASE;
module.exports.IMGBB_API_KEY = IMGBB_API_KEY;
module.exports.IMGBB_URL = IMGBB_URL;
module.exports.measurements = measurements;
module.exports.sizes = sizes;