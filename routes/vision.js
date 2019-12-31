var express = require("express");
var url = require("url");
var router = express.Router();
const vision = require("@google-cloud/vision");

var base64Photo;
const image2base64 = require("image-to-base64");
image2base64(
  "https://1.bp.blogspot.com/-IKs8HTnJ9gw/XZnNulcjQ2I/AAAAAAAAhVs/u7Fq4ujHrs0sXeyxLqN5rsQt0LphSKRkQCLcBGAsYHQ/s1600/migros-ekim-ayi-katalog-borsur-migroskop-2019.jpg"
)
  .then(response => {
    base64Photo = response;
  })
  .catch(error => {
    console.log(error); //Exepection error....
  });

/* GET vision listing. */
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

router.post("/photo", function(req, res, next) {
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "APIKey.json"
  });

  const photoUrl = req.body.photoUrl;

  const request = {
    image: {
      source: { imageUri: photoUrl }
    }
  };

  // const request = {
  //   image: {
  //     content: photoUrl
  //   }
  // };

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
