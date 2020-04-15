const createPool = require('./dbConnection.js');

module.exports = async (user_id) => {
    try{
        const pool = await createPool();
        await pool.connect();
        const sql = `SELECT CASE WHEN (SELECT MAX(id_step) FROM game) = (SELECT cur_step FROM players WHERE id_user = ${user_id} ORDER BY id DESC LIMIT 1) THEN 'true' ELSE 'false' END`;
        let res = await pool.query(sql);

        pool.end();
        res = res.rows[0].case === 'true';
        console.log(user_id, 'Пользователь на финале', res);
        return res;
    }
    catch (e) {
        console.log(user_id, 'ошибка в check_final.js', e)
    }
};
