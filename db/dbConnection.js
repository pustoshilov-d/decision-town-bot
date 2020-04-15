const {DATABASE_URL} = require('../config.js');
const {Pool} = require('pg');

module.exports = function createPool () {
  try{
    return new Pool({
      connectionString: DATABASE_URL,
      ssl: {sslmode: 'require',
        rejectUnauthorized: false
      }
    })
  }
  catch (e) {
    console.log('Ошибка в dbConnection.js', e)
  }
};