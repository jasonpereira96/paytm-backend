const { Client } = require('pg');
const { DB_PORT, USERNAME, HOST, DATABASE, PASSWORD, SCHEMA } = require('./../constants/constants');

/**
 * 
 * @param {string} hash 
 */
async function imageExists(hash) {
    let response = await query({
        queryString: `select * from ${SCHEMA}."Images" where hash = $1;`,
        params: [hash]
    });
    return response.rows.length > 0;
}

async function getImages() {
    let response = await query({
        queryString: `select * from ${SCHEMA}."Images";`,
    });
    response.rows.forEach(row => {
        if (row.image_name) {
            row.name = row.image_name;
            delete row.image_name;
        }
    });
    return response.rows;
}

async function makeEntry(record, hash) {
    let response = await query({
        queryString: `insert into ${SCHEMA}."Images" (hash, horizontal, vertical, horizontal_small, gallery, image_name) values ($1, $2, $3, $4, $5, $6) returning id;`,
        params: [
            hash,
            record['horizontal'],
            record['vertical'],
            record['horizontal_small'],
            record['gallery'],
            record['name']
        ]
    });
    return {
        id: response.rows[0].id,
        name: record.name
    };
}

async function getImage(id) {
    let response = await query({
        queryString: `select * from ${SCHEMA}."Images" where id = $1;`,
        params: [id]
    });
    response.rows.forEach(row => {
        if (row.image_name) {
            row.name = row.image_name;
            delete row.image_name;
        }
    });
    return response.rows;
}

function getClient() {
    return new Client({
        user: USERNAME,
        host: HOST,
        database: DATABASE,
        password: PASSWORD,
        port: DB_PORT,
        ssl: {
            rejectUnauthorized: false
        }
    });
}

function query(options) {
    var { queryString, params } = options;
    if (!params) {
        params = [];
    }
    return new Promise(function (resolve, reject) {
        const client = getClient();
        client.connect().then(function () {
            console.log('Connection successful!');
            client.query(queryString, params).then(result => {
                resolve(result);
            }).catch(e => {
                console.log(e);
                reject(e);
            }).finally(() => {
                client.end();
                console.log('Connection ended!');
            })
        }).catch(function (e) {
            console.log(e);
        });
    });
}

module.exports.makeEntry = makeEntry;
module.exports.imageExists = imageExists;
module.exports.getImages = getImages;
module.exports.getImage = getImage;
