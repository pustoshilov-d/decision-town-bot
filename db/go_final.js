const createClient = require('./dbConnection.js');

module.exports = async (user_id) => {
    try{
        const client = await createClient();
        await client.connect();
        const sql = `UPDATE players SET cur_step = (SELECT MAX(id_step) FROM game) WHERE id = (SELECT id FROM players WHERE id_user = ${user_id} ORDER BY id DESC LIMIT 1)`;
        await client.query(sql);
        client.end();

        console.log(user_id, 'Пользователь закончил досрочно');

    }
    catch (e) {
        console.log(user_id, 'ошибка в go_final.js', e)
    }
};
