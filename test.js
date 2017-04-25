'use strict';

var assert = require('chai').assert;
var request = require('supertest');
var expect = require('chai').expect;

var url = 'http://localhost:5000';

var contatoCompleto = {
  'name': 'Romero',
  'mobilephone': '0551199995555',
  'homephone': '0551141394567'
};

describe('Teste na API PhoneBook - método: POST', function() {
  it('/POST: inserindo contato completo', function(done) {
    request(url)
      .post('/contacts/')
      .set('Content-type', 'application/json')
      .send(contatoCompleto)
      .end(function(err, res) {
        var result = JSON.parse(res.text);
        assert.equal(res.status, 201);
        assert.equal(result.name, 'Romero', 'Conferindo o name!');
        assert.equal(result.mobilephone, '0551199995555', 'Conferindo o mobilephone!');
        assert.equal(result.homephone, '0551141394567', 'Conferindo o homephone!');
        done();
      });
  });
});
