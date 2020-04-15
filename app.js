const express = require('express');
const bodyParser = require('body-parser');
const {PORT, CONFIRMATION, USER} = require('./config');
const app = express();
const processing = require('./processing');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/', async (req,res) => {
    const {body} = req;
    // console.log('Пришло: \n', body);

    switch (body.type) {
        case 'confirmation':
            res.end(CONFIRMATION);
            break;

        case 'message_new':
            // console.log('Сообщение\n', body);
            await processing(body.object.message);
            res.end('ok');
            break;


        default:
            res.end('ok');
            break;
    }
});

app.listen(PORT, () => console.log('Hello, word'));