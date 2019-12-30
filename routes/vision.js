var express = require("express");
var router = express.Router();
const vision = require("@google-cloud/vision");

var base64Photo;
const image2base64 = require("image-to-base64");
image2base64("https://pbs.twimg.com/media/EJVuqthWkAA8C-9.jpg")
  .then(response => {
    base64Photo = response;
  })
  .catch(error => {
    console.log(error); //Exepection error....
  });

/* GET users listing. */
router.get("/", function(req, res, next) {
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "APIKey.json"
  });

  const request = {
    image: {
      content: base64Photo
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
