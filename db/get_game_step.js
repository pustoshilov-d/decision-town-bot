const createClient = require('./dbConnection.js');

module.exports = async (user_id) => {
    try{
        const client = await createClient();
        await client.connect();
        const sql = `SELECT * FROM game WHERE id_step IN (SELECT cur_step FROM players WHERE id_user = ${user_id} ORDER BY id DESC LIMIT 1)`;
        let res = await client.query(sql);
        client.end();
        console.log(user_id,'Получен шаг', res.rows[0].id_step);

        return res.rows[0];
    }
    catch (e) {
        console.log(user_id, 'ошибка в get_game_step.js', e)
    }
};
