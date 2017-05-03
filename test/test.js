'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var request = require('supertest');
var ObjectId = mongojs.ObjectId;

var url = 'http://localhost:5000';

var contatoCompleto = {
  'name': 'Zidane',
  'mobilephone': '0551185084469',
  'homephone': '0551141394567'
};

var contatoCompleto2 = {
  //'_id': ObjectId('590a07af37a33e16e6555555'),
  'name': 'Jolteon',
  'mobilephone': '0551185084469',
  'homephone': '0551141394567'
};


describe.skip('Teste na API PhoneBook - método: POST', function() {
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
});

describe.skip('Teste na API PhoneBook - DELETE ', function() {
  it('Excluindo um contato via ID.', function(done) {
    request(url)
    .delete('/contacts/56d5efa8c82593800291c02b')
    .end(function(err, res) {
      assert.equal(res.status, 204);
      done();
    });
  });
});

describe.skip('Teste na API PhoneBook - Sem usuários na base ', function() {
  it('Validando base sem nenhum usuário', function(done) {
    request(url)
    .delete('/contacts/56d5efa8c82593800291c02b')
    .end(function(err, res) {
      assert.equal(res.status, 404);
      done();
    });
  });
});

describe('Adicionando e deletando mesmo contato com unico IT: POST', function() {
  it('/POST: inserindo contato completo', function(done) {
    request(url)
    .post('/contacts/')
    .set('Content-type', 'application/json')
    .send(contatoCompleto2)
    .end(function(err, res) {
      var result = JSON.parse(res.text);
      assert.equal(res.status, 201);
      assert.equal(result.name, 'Jolteon', 'Conferindo o name!');
      assert.equal(result.mobilephone, '0551185084469', 'Conferindo o mobilephone!');
      assert.equal(result.homephone, '0551141394567', 'Conferindo o homephone!');
      done();

      request(url)
      .delete('/contacts/id')
      .end(function(err, res) {
        assert.equal(res.status, 404);
        assert.equal(res.text, 'Not Found');
        done();
      });
    });
  });
});
