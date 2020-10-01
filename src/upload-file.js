// import * as https from "https";
const https = require('https');
// import * as querystring from "querystring";
const querystring = require('querystring');
const { IMGBB_API_KEY } = require('./constants/constants');
//https://www.wisdomgeek.com/development/web-development/javascript/how-to-import-export-es6-modules-in-node/
// import ResponseObject from "./responseInterface";

/**
 * Now using the standard 'https' module instead of 'request' deprecated dependency.
 *
 * To tweak the method, edit 'postToImgbb.ts' with the help of [the docs](https://nodejs.org/api/https.html#https_https_request_options_callback)
 * @param {string} base64string - Typically, the output of fileToString("path") function
 * @returns A promise. Use `.then` as shown in [the README](https://github.com/TheRealBarenziah/imgbb-uploader#use) :
 */

const uploadImage = async (base64str) => {
    return new Promise((resolve, reject) => {
        const payload = querystring.stringify({
            image: base64str,
        });

        const options = {
            hostname: "api.imgbb.com", //move to constants
            method: "POST",
            timeout: 5000,
            path: `/1/upload?key=${IMGBB_API_KEY}`, //move to constants
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