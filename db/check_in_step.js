const createPool = require('./dbConnection.js');

module.exports = async (user_id) => {
    try{
        const pool = await createPool();
        await pool.connect();
        const sql = `UPDATE players SET cur_step = cur_step + 1 WHERE id_user = ${user_id} AND id = (SELECT MAX(id) FROM players WHERE id_user = ${user_id})`;
        await pool.query(sql);
        pool.end();

        console.log(user_id, 'Пользователь на новом шаге');
    }
    catch (e) {
        console.log(user_id, 'ошибка в check_in_step.js', e)
    }
};
