const {TOKEN} = require('./config');
const api = require('vk-easy');
const add = require("./db/add_player");
const no_player = require("./db/no_player");
const get_game_step = require("./db/get_game_step.js");
const check_in_answer = require("./db/check_in_answer.js");
const check_final = require("./db/check_final.js");
const check_in_step = require("./db/check_in_step.js");
const send =require('./send.js');

async function main() {
    // await add(52167654);
    //await check_in_step(52167654);
    let game_step = await get_game_step(52167654);
    // await send(52167654,game_step,null, 'Хай','simple');
    await send(52167654,game_step, null,'story');

    //await send(52167654,game_step, null,'answer', 'answer.1');
    //
    // await check_in_answer(52167654,4,4);
    //
    // await check_final(52167654);


    // await no_player(52167654);
    //     ans = api('users.get', {
    //         user_ids: 1,
    //         access_token: TOKEN,
    //     });
    //     console.log(TOKEN)
    // ans.then(console.log)


};

main();