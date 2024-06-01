//══════════════════════════════════════════════════════════════════════════════════════════════════════// 
//                                                                                                      //
//                                     LIGHT-WEIGHT WHATSAPP BOT                                        //
//                                                                                                      //
//                                             𝚅.1.2.7                                                  // 
//                                                                                                      //
//                          ██╗ ██████╗ ██╗███████╗    ███╗   ███╗ ██████╗                              //
//                          ██║ ██╔══██╗██║██╔════╝    ████╗ ████║ ██╔══██╗                             //
//                          ██║ ██████╔╝██║███████╗    ██╔████╔██║ ██║  ██║                             //
//                          ██║ ██╔══██╗██║╚════██║    ██║╚██╔╝██║ ██║  ██║                             //
//                          ██║ ██║  ██║██║███████║    ██║ ╚═╝ ██║ ██████╔╝                             //
//                          ╚═╝ ╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝     ╚═╝ ╚═════╝                              //
//                                                                                                      //
//                                          BY: VENOX-SENPAI                                            //
//                                                                                                      //
//                                                                                                      //
//══════════════════════════════════════════════════════════════════════════════════════════════════════//

/**

* @project_name : IRIS-MD
* @Developer : Venox-Senpai
* @Version : v.1.2.7
* @license : APACHE-2.0

THIS PROJECT IS MADE UNDER THE CIRCUMSTANCES OF "APACHE-2.0"
MEANS ANY KIND OF (MISLEADING, RE-UPLOADING, RENG) WILL LEAD YOU
TO A DMCA REPORT FROM THE OFFICIAL GITHUB, WHICH RESULT IN 
REMOVING UR COPIED/RE-UPLOADED PROJECT FROM THERE, IN SOME
CONDITIONS IT CAN LEADS TO TERMINATE UR ACCOUNT FROM THAT PLATFORM

│• @C_holder : Venox-Senpai

**/















const { iris , isPublic } = require("../lib/commands.js");
const util = require("util");
const axios = require("axios");
const fetch = require("node-fetch");
const fs = require("fs");
const {
    exec
} = require("child_process");
const {
    updatefullpp
} = require("../lib/spotify.js");

iris(
    {
        name: "fullpp",
        fromMe: true,
        category: "owner",
        desc: "fullpp"
    }, async ({
            m, client, args
        }) => {
        try {
            if (!m.quoted || (!m.quoted.message.imageMessage))
                return m.reply("_Reply to an Image_");
            let media = await m.quoted.download();
            await updatefullpp(m.user, media, client);
            return await m.reply("_Profile Picture Updated_");
        } catch (e) {
            console.log(e)
        }
    })

iris({
    name: "eval", fromMe: true, category: "owner", desc: "Runs a server code"
}, async ({}) => {})

iris(
    {
        name: "restart",
        fromMe: true,
        desc: "Restart the bot",
        category: "owner",
    },
    async ( {
        m, args, client
    }) => {
        await m.reply("_Restarting..._");
        exec("node index.js", (error, stdout, stderr) => {
            if (error) {
                return client.sendMessage(m.jid, `Error: ${error}`);
            } return;
        });
    });

iris(
    {
        on: "text",
        fromMe: true,
    },
    async ({
        client, m, args
    }) => {
        if (args.startsWith(">")) {
            try {
                let evaled = await eval(`(async () => { ${args.replace(">", "")} })()`);
                if (typeof evaled !== "string") evaled = util.inspect(evaled);
                await m.reply(`${'```'}${evaled}${'```'}`)
            } catch (err) {
                await m.reply(`_${util.format(err)}_`);
            }
        }
    });


iris(
    {
        name: "mee",
        fromMe: true,
       category: "owner"
    },
    async ({
        m, client, args
    }) => {
m.sendMsg(m.jid , `_@${m.sender.split("@")[0]}_`  , {   mentions : [m.sender]} )
    })
