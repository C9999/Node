'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var request = require('supertest');

var url = 'http://localhost:5000';

var contatoCompleto = {
  'name': 'Zidane',
  'mobilephone': '0551185084469',
  'homephone': '0551141394567'
};

var contatoCompleto2 = {
  'name': 'Jolteon',
  'mobilephone': '0551185084469',
  'homephone': '0551141394567'
};

var update = {
  'name': 'TesterHighLevel',
  'mobilephone': '09931999998888',
  'homephone': '0993134345656'
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
});

describe('Teste na API PhoneBook - DELETE ', function() {
  it('Excluindo um contato via ID.', function(done) {
    request(url)
    .delete('/contacts/56d5efa8c82593800291c02b')
    .end(function(err, res) {
      assert.equal(res.status, 204);
      done();
    });
  });
});

describe('Teste na API PhoneBook - Sem usuários na base ', function() {
  it('Validando base sem nenhum usuário', function(done) {
    request(url)
    .delete('/contacts/56d5efa8c82593800291c02b')
    .end(function(err, res) {
      assert.equal(res.status, 404);
      done();
    });
  });
});

describe('Teste na API PhoneBook - retorno 404', function() {
  it('/Delete: deve retornar 404 ', function(done) {
    request(url)
    .delete('/contacts/56d3008555d5d37001675555')
    .end(function(err, res) {
      assert.equal(res.status, 404);
      assert.equal(res.text, 'Not Found');
      done();
    });
  });
});

/*describe('Teste na API PhoneBook - método: Update')
it('PUT - Deve atualizar nome e telefone do contato', function(done) {
  _conn.contacts.insert(fullContact, function(err, res) {
    request(app)
      .put('/contacts/56d5efa8c82593800291c02b')
      .set('Content-type', 'application/json')
      .send(fullContact)
      .expect(204,done);
      });
  });
*/
