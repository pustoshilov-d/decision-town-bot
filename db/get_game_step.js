const createPool = require('./dbConnection.js');

module.exports = async (user_id) => {
    try{
        const pool = await createPool();
        await pool.connect();
        const sql = `SELECT * FROM game WHERE id_step IN (SELECT cur_step FROM players WHERE id_user = ${user_id} ORDER BY id DESC LIMIT 1)`;
        let res = await pool.query(sql);
        pool.end();
        console.log(user_id,'Получен шаг', res.rows[0].id_step);

        return res.rows[0];
    }
    catch (e) {
        console.log(user_id, 'ошибка в get_game_step.js', e)
    }
};
