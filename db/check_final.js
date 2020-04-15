const createClient = require('./dbConnection.js');

module.exports = async (user_id) => {
    try{
        const client = await createClient();
        await client.connect();
        const sql = `SELECT CASE WHEN (SELECT MAX(id_step) FROM game) = (SELECT cur_step FROM players WHERE id_user = ${user_id} ORDER BY id DESC LIMIT 1) THEN 'true' ELSE 'false' END`;
        let res = await client.query(sql);

        client.end();
        res = res.rows[0].case === 'true';
        console.log(user_id, 'Пользователь на финале', res);
        return res;
    }
    catch (e) {
        console.log(user_id, 'ошибка в check_final.js', e)
    }
};
