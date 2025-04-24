const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '95123',
      database : 'midiapi'
    }
  });

  module.exports = knex;