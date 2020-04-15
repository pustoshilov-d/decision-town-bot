# postgres
PostgreSQL client for node.js.  

## Install

```sh
$ npm i node-postgres
```

## Todo list
* [x] connect
  * [x] parseR
  * [x] parseE
  * [x] parseT
  * [x] parseS
  * [x] parseK
  * [x] parseZ
  * [x] parseD
  * [x] parseC
* [x] startup
* [x] Authentication
  * [x] AuthenticationOk
  * [x] AuthenticationCleartextPassword
  * [x] AuthenticationMD5Password
* [x] query
  * [x] RowDescription 
  * [x] DataRow
* [ ] query queue
* [x] end
* [x] ssl
* [ ] pool
* [ ] ...

## Useage  

### client 

```js
const { Client, Pool } = require('../index');

(async () => {
  const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'test',
    password: 'esri@123',
    port: 5432
  });
  
  await client.connect();

  const res = await client.query('SELECT * from users');
  console.log(res);
  await client.end();
})().catch(console.error);
```  

### ssl 
```js
const { Client, Pool } = require('../index');
const fs = require('fs');

(async () => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: 'esri@123',
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
      // ca: fs.readFileSync('c:/my/server.crt').toString(),
      key: fs.readFileSync('c:/my/server.key').toString(),
      cert: fs.readFileSync('c:/my/server.crt').toString(),
    }
  });
  
  await client.connect();
  
  const res = await client.query('SELECT * from users');
  console.log(res);
  await client.end();
})().catch(console.error);
```  

## Test

```bash
$ npm test
```  