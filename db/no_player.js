const createPool = require('./dbConnection.js');

module.exports = async (user_id) => {
    try{
        const pool = await createPool();
        await pool.connect();
        const sql = `SELECT * FROM players WHERE id_user = ${user_id}`;
        res = await pool.query(sql);
        pool.end();
        console.log(user_id,'Пользователь есть в базе', res.rowCount === 0);

        return res.rowCount === 0;
    }
    catch (e) {
        console.log(user_id, 'ошибка в no_player.js', e)
    }
};
