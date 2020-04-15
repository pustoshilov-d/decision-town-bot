const createClient = require('./dbConnection.js');

module.exports = async (user_id) => {
    try{
        const client = await createClient();
        await client.connect();
        const sql = `UPDATE players SET cur_step = cur_step + 1 WHERE id_user = ${user_id} AND id = (SELECT MAX(id) FROM players WHERE id_user = ${user_id})`;
        await client.query(sql);
        client.end();

        console.log(user_id, 'Пользователь на новом шаге');
    }
    catch (e) {
        console.log(user_id, 'ошибка в check_in_step.js', e)
    }
};
