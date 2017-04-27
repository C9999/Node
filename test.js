'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var request = require('supertest');
var url = 'http://localhost:5000';

var db = require('../lib/db');
var app = require('../lib/index');
var mongojs = require('mongojs');
var ObjectId = mongojs.ObjectId;
var _conn;

var fullContact = {
  '_id': ObjectId('5901f69132f9d935ec1115a3'),
  'name': 'QA CS',
  'mobilephone': '0551185087777',
  'homephone': '0551141409999'
};

var contatoCompleto = {
  'name': 'Zidane',
  'mobilephone': '0551185084469',
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
        assert.equal(result.name, 'Zidane', 'Conferindo o name!');
        assert.equal(result.mobilephone, '0551185084469', 'Conferindo o mobilephone!');
        assert.equal(result.homephone, '0551141394567', 'Conferindo o homephone!');
        done();
      });
  });
});//describe

describe('Teste na API PhoneBook - DELETE ', function() {
  before(function(done) {
    db.then(function(conn) {
      _conn = conn;
      done();
    });
  });

  after(function(done) {
    _conn.contacts.remove({}, function(err, res) {
      done();
    });
  });

  it('Excluindo um contato via ID.', function(done) {
    _conn.contacts.insert(fullContact, function(err, res) {
      request(app)
        .delete('/contacts/56d5efa8c82593800291c02b')
      done();
    });
  });
});
