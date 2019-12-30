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
        .textDetection(request)
        .then(response => {
            console.log(response);
            res.send(response[0].textAnnotations[0].description);
        })
        .catch(err => {
            console.error(err);
        });

});


module.exports = router;
