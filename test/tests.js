var app = require('../app.js');
var expect = require('Chai').expect;
var request = require('request');
var url = 'http://localhost:3000/';
var sampleRequest = require('./sample_request.json');
var sampleResponseJson = JSON.stringify(require('./sample_response.json'));

describe('app HTML responses', function() {

    it('should return 400 and the error for invalid json', function(done) {
        request.post(url, 'invalid json', function(err, res, body) {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.equal('{"error":"Could not decode request: JSON parsing failed"}');
            done();
        });
    });

    it('should return 200 and process the payload correctly to match the sample_response', function(done) {
        request.post({
            url: url,
            json: sampleRequest
        }, function(err, res, body) {
            expect(res.statusCode).to.equal(200);
            expect(JSON.stringify(res.body)).to.equal(sampleResponseJson);
            done();
        });
    });
});
