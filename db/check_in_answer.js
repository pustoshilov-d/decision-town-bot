const createClient = require('./dbConnection.js');

module.exports = async (user_id, step_id, answer) => {
    try{
        const client = await createClient();
        await client.connect();
        const sql = `UPDATE players SET "${step_id}" = ${answer} WHERE id_user = ${user_id} AND id = (SELECT MAX(id) FROM players WHERE id_user = ${user_id})`;
        await client.query(sql);
        client.end();

        console.log(user_id, 'У пользователя добавлен новый ответ', step_id, answer);
    }
    catch (e) {
        console.log(user_id, 'ошибка в check_in_answers.js', e)
    }
};
