const express = require('express');
const bodyParser = require('body-parser');
const {PORT, CONFIRMATION, TEST_FLAG} = require('./config');
const app = express();
const processing = require('./processing');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/', async (req,res) => {
    const {body} = req;

    if (TEST_FLAG===1) {
    console.log('*TEST_FLAG*', body);
    }

    switch (body.type) {
        case 'confirmation':
            res.end(CONFIRMATION);
            break;

        case 'message_new':
            await processing(body.object.message);
            res.end('ok');
            break;


        default:
            res.end('ok');
            break;
    }
});

app.listen(PORT, () => console.log('Hello, word'));