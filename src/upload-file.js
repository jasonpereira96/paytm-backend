const https = require('https');
const querystring = require('querystring');
const { IMGBB_API_KEY } = require('./constants/constants');

const uploadImage = async (base64str) => {
    return new Promise((resolve, reject) => {
        
        const payload = querystring.stringify({
            image: base64str,
        });

        const options = {
            hostname: "api.imgbb.com", 
            method: "POST",
            timeout: 5000,
            path: `/1/upload?key=${IMGBB_API_KEY}`, 
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": payload.length,
            },
        };

        const request = https
            .request(options, (response) => {
                let res = "";

                response.on("data", (d) => {
                    res += d;
                });

                response.on("end", () => {
                    const output = JSON.parse(res).data;
                    resolve(output);
                });
            })

            .on("error", (err) => {
                reject(err);
            });

        request.write(payload);

        request.end();

    });
};

module.exports.uploadImage = uploadImage;