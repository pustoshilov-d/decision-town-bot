const api = require('vk-easy');
const {TOKEN, GROUP} = require('./config');

let next_keyboard = JSON.stringify({
    one_time: false,
    inline: true,
    buttons: [
        [{
            action: {
                type: "text",
                label: "Далее",
                payload: {next_type: "story"}
            },
            "color": "secondary"
        }],
        [{
            action: {
                type: "text",
                label: "Закончить",
                payload: {next_type: "final"}
            },
            "color": "secondary"
        }],
    ]});

let restart_keyboard = JSON.stringify({
    one_time: false,
    buttons: [
        [{
            action: {
                type: "text",
                label: "Начать",
                payload: {next_type: "start"}
            },
            "color": "secondary"
        }],
    ]});

module.exports = async (user_id, game_step, text, mes_type, extra) => {
    try {
        if (mes_type === 'start') {

            let res = await api('messages.send', {
                user_id: user_id,
                random_id:  Math.floor(Math.random()*999999999),
                message: text !== null ? text : "",
                group_id: GROUP,
                keyboard: next_keyboard,
                attachment: game_step.story,
                access_token: TOKEN
            });
            console.log(user_id, 'Cообщение отправлено.', mes_type, res)
        }

        else if (mes_type === 'story'){

            let keyboard = JSON.stringify({
                one_time: false,
                inline: true,
                buttons: [
                    [{
                        action: {
                            type: "text",
                            label: game_step['answer_text.1'],
                            payload: {next_type: "answer.1"}
                        },
                        "color": "secondary"
                    }],

                    [{
                        action: {
                            type: "text",
                            label: game_step['answer_text.2'],
                            payload: {next_type: "answer.2"}
                        },
                        "color": "secondary"
                    }],
                ]
            });

            let res = await api('messages.send', {
                user_id: user_id,
                random_id:  Math.floor(Math.random()*999999999),
                message: text !== null ? text : "",
                group_id: GROUP,
                keyboard: keyboard,
                attachment: game_step.story,
                access_token: TOKEN
            });
            console.log(user_id, 'Cообщение отправлено.', mes_type, res);

            res = await api('messages.send', {
                user_id: user_id,
                random_id:  Math.floor(Math.random()*999999999),
                message: "Выбор за тобой",
                group_id: GROUP,
                access_token: TOKEN
            });
            console.log(user_id, 'Cообщение отправлено.', 'simple', res)

        }

        else if (mes_type === 'answer'){
            let res = await api('messages.send', {
                user_id: user_id,
                random_id:  Math.floor(Math.random()*999999999),
                message: text !== null ? text : "",
                group_id: GROUP,
                keyboard: next_keyboard,
                attachment: game_step[extra],
                access_token: TOKEN
            });
            console.log(user_id, 'Cообщение отправлено.', mes_type, res)
        }

        else if (mes_type === 'final'){
            let res = await api('messages.send', {
                user_id: user_id,
                random_id:  Math.floor(Math.random()*999999999),
                message: text !== null ? text : "",
                group_id: GROUP,
                keyboard: restart_keyboard,
                attachment: game_step.story,
                access_token: TOKEN
            });
            console.log(user_id, 'Cообщение отправлено.', mes_type, res);

            res = await api('messages.send', {
                user_id: user_id,
                random_id:  Math.floor(Math.random()*999999999),
                message: "Если хочешь пройти ещё раз, жми «Начать»",
                keyboard: restart_keyboard,
                group_id: GROUP,
                access_token: TOKEN
            });
            console.log(user_id, 'Cообщение отправлено.', 'simple', res)
        }

        else if (mes_type === 'simple'){

            let res = await api('messages.send', {
                user_id: user_id,
                random_id:  Math.floor(Math.random()*999999999),
                message: text !== null ? text : "",
                group_id: GROUP,
                access_token: TOKEN
            });
            console.log(user_id, 'Cообщение отправлено.', mes_type, res)
        }


    }

    catch (e) {
        console.log(user_id, 'ошибка в send.js', e)
    }
};