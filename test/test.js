var app = require('../app.js');
var expect = require('Chai').expect;
var request = require('request');
var url = 'http://localhost:3000/';
var sampleRequest = require('./sample_request.json');
var sampleResponseJson = JSON.stringify(require('./sample_response.json'));

describe('tests for app.js', function() {

  it('should return the appropriate error message with incorrect format', function(done) {
    request.post(url, 'invalid json', function(error, res, body) {
      expect(res.statusCode).to.equal(400);
      expect(res.body)
      .to.equal('{"error":"Could not decode request: JSON parsing failed"}');
      done();
    });
  });

  it('should process the payload correctly and match the sample_response', function(done) {
    request.post({url: url, json: sampleRequest}, function(error, res, body) {
      expect(res.statusCode).to.equal(200);
      expect(JSON.stringify(res.body))
      .to.equal(sampleResponseJson);
      done();
    });
  });
});
