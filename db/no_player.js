const createClient = require('./dbConnection.js');

module.exports = async (user_id) => {
    try{
        const client = await createClient();
        await client.connect();
        const sql = `SELECT * FROM players WHERE id_user = ${user_id}`;
        res = await client.query(sql);
        client.end();
        console.log(user_id,'Пользователя нет в базе', res.rowCount === 0);

        return res.rowCount === 0;
    }
    catch (e) {
        console.log(user_id, 'ошибка в no_player.js', e)
    }
};
