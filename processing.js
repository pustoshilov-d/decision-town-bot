const  send = require("./send.js");
const no_player = require("./db/no_player.js");
const add_player = require("./db/add_player.js");
const get_game_step = require("./db/get_game_step.js");
const check_in_answer = require("./db/check_in_answer.js");
const check_final = require("./db/check_final.js");
const check_in_step = require("./db/check_in_step.js");


module.exports = async ({from_id: userId, text: text, payload}) => {
    try {

        if (payload === undefined) {
            console.log(userId, 'входящее сообщение',text);

            if ((text === "start" && await no_player(userId)) || text === "restart") {
                //если игрока нет в базе, занести, с обнулением
                    await add_player(userId);
                    let game_step = await get_game_step(userId);
                    await send(userId, game_step,null,'start')
            }

            else if (text === "start"){
                let game_step = await get_game_step(userId);
                await send(userId, game_step,null,'story');
                if (!await check_final(userId)) {
                    await send(userId, null, 'Что ты выберешь?', 'simple');
                }
            }
        }


        else {
            // console.log(`UserID: ${userId}, Command: ${JSON.parse(payload)}`);
            payload = JSON.parse(payload);
            console.log(userId, 'входящая команда',payload.next_type, text);

            if (payload.next_type === "answer.1" || payload.next_type === "answer.2") {
                //получили ответ
                //загрузить текущий степ (найти номер степа, загрузить)
                let game_step = await get_game_step(userId);
                //зачекинить ответ

                await check_in_answer(userId, game_step.id_step, payload.next_type.split('.')[1]);
                //выслали ведио-отве, с кнопкой далее

                await send(userId, game_step,null,'answer', payload.next_type)
            }

            else if (payload.next_type === "story") {
                //получили кнопку далее
                //зачекинить степ
                await check_in_step(userId);
                //загрузить текущий степ
                let game_step = await get_game_step(userId);

                if (await check_final(userId)) {
                    //ИЛИ если финал, просто стори
                    await send(userId, game_step,  null,'final')
                }
                else {
                    //выслать стори с кнопками ответов
                await send(userId, game_step, null,'story');
                await send(userId, null, 'Что ты выберешь?', 'simple');
                }
            }
        }
    }
    catch (e) {
        console.log("У пользователя", userId, 'ошибка', e)
        
    }
};
