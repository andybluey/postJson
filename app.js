// Use express to create Web Service API
var express = require('express');
var bodyParser = require('body-parser');

// Setup port
var port = process.env.PORT || 3000;

// Express Setup
var app = express();

// Setup express to serve JSON
app.use(bodyParser.text({
  type: 'application/json'
}));

// Respond to POST request on the root route
app.post('/', function(req, res) {
  var payload = req.body;

  try {
    payload = JSON.parse(req.body).payload;
  } catch (err) {
    // Handle json error
    res.status(400);
    return res.send({error: 'Could not decode request: JSON parsing failed'});
  }

  // Filter the list according to requirement -
  // drm:true; episodeCount > 0
  var data = payload
  .filter(function (payloadItem) {
    return payloadItem.drm &&
            payloadItem.episodeCount > 0;
  })

  // From filtered results, return the required items
  .map(function (payloadItem) {
    return {
      image: payloadItem.image.showImage,
      slug: payloadItem.slug,
      title: payloadItem.title
    };
  });

  // Respond with filtered json data
  res.send({response: data});
});

app.listen(port, function(){
  console.log('Listening on :' + port);
});
