var express = require('express');
var router = express.Router();
const vision = require('@google-cloud/vision');

/* GET users listing. */
router.get('/', function (req, res, next) {

    const client = new vision.ImageAnnotatorClient({
        keyFilename: 'APIKey.json'
    });

    const request = {
        image: {
            source: { imageUri: 'https://pbs.twimg.com/media/EJVuqthWkAA8C-9.jpg' }
        }
    };

    client
        .labelDetection(request)
        .then(response => {
            console.log(response);
            res.json(response);
        })
        .catch(err => {
            console.error(err);
        });

});


module.exports = router;
