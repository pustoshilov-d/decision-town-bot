const createPool = require('./dbConnection.js');

module.exports = async (user_id, step_id, answer) => {
    try{
        const pool = await createPool();
        await pool.connect();
        const sql = `UPDATE players SET "${step_id}" = ${answer} WHERE id_user = ${user_id} AND id = (SELECT MAX(id) FROM players WHERE id_user = ${user_id})`;
        await pool.query(sql);
        pool.end();

        console.log(user_id, 'У пользователя добавлен новый ответ', step_id, answer);
    }
    catch (e) {
        console.log(user_id, 'ошибка в check_in_answers.js', e)
    }
};
