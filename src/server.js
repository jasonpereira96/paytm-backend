const express = require('express');
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { uploadImage } = require('./upload-file.js');
const { makeEntry, imageExists, getImages, getImage } = require('./data/data');
const { processImage, hash } = require('./utils/utils');
const { sizes } = require('./constants/constants');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use('/static', express.static(path.join(__dirname, './../images')));

app.get('/', function (request, response) {
    response.send('Welcome');
});

app.get('/images', async function (request, response) {
    let images = await getImages();
    response.json({
        images
    });
});

app.post('/upload_test', function (request, response) {
    if (!request.files || Object.keys(request.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let file = request.files.file;
    console.log(file);
    console.log(file.name); //'Webp.net-resizeimage.png'
    response.json({
        name: file.name,
        id: 5000
    });
});

app.post('/upload', async function (request, response) {
    if (!request.files || Object.keys(request.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let file = request.files.file;
    let buffer = file.data;

    if (await imageExists(hash(buffer))) {
        response.json({
            error: 'image already exists'
        });
        return;
    }

    var responses = await Promise.all(sizes.map(async function (size) {
        let processedBuffer = await processImage(buffer, size);
        let response = await uploadImage(processedBuffer.toString('base64'));
        return response;
    }));

    responses.forEach(data => {
        console.log(data.url);
    });

    var record = sizes.reduce((acc, size, index) => {
        acc[size] = responses[index].url;
        return acc;
    }, {});

    record.name = file.name;

    var result = await makeEntry(record, hash(buffer));

    if (result) {
        response.json({
            message: 'Image uploaded',
            name: file.name,
            id: result.id
        });
    }
});

app.get('/image', async function (request, response) {
    let id = request.query.id;
    try {
        let rows = await getImage(id);
        let row = rows[0];
        response.json(row);
    } catch (error) {
        response.json({
            error
        });
    }
});

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));


