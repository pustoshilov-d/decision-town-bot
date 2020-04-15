const createClient = require('./dbConnection.js');
const api = require('vk-easy');
const {TOKEN} = require('../config');

module.exports = async (user_id) => {
    try{
        ans = await api('users.get', {
            user_ids: user_id,
            access_token: TOKEN,
        });

        let user_name = ans.response[0].first_name + " " + ans.response[0].last_name;
        // console.log(user_name);

        const client = await createClient();
        await client.connect();
        const sql = `INSERT INTO players (id_user, user_name) VALUES (${user_id}, '${user_name}')`;
        await client.query(sql);
        client.end();

        console.log('\n', user_id, 'Новый пользователь добавлен:', user_name);
    }
    catch (e) {
        console.log(user_id, 'ошибка в add_player.js', e)
    }
};
