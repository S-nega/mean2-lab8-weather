const assert = require('assert');
const request = require('supertest');
const app = require('../server'); // Предполагается, что ваше Express-приложение экспортируется из service.js

describe('Weather API', function() {
  let server;

  before(async function() {
    // Запуск сервера Apollo перед запуском тестов
    server = await app.listen(4000); // Предполагается, что ваш сервер Apollo настроен в service.js
  });

  after(function() {
    // Закрытие сервера после выполнения тестов
    server.close();
  });

  it('должен возвращать данные о погоде для действительного города', function(done) {
    request(server)
      .get('/api/weather/almaty')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        assert(res.body.name === 'Astana');
        // done();
      });
  });

  it('должен возвращать ошибку для недействительного города', function(done) {
    request(server)
      .get('/api/weather/invalid-city')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        assert(res.body.error === 'Failed to fetch weather data');
        // done();
      });
  });
});
