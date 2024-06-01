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















const {
    iris,
    commands,
    isPublic
} = require("../lib/commands.js");
const plugins = require("../lib/commands.js");
const {
    INFO,
    HANDLERS,
    MODE,
    URL
} = require("../info.js");
const font = require("@viper-x/fancytext");
const fs = require("fs");
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
        
iris(
    {
        name: "menu",
        category: "misc",
        fromMe: isPublic,
        desc: "Show All commands"
    },
    async ({
        client, m, args
    }) => {
      try {
            if (args) {  
            for (let i of plugins.commands) {
                if (i.name.test(args)) { 
                  return m.reply(`*command : ${args.trim()}*\n*description : ${i.desc.toLowerCase()}*`);
                }
            }
        return m.reply(font.tiny("_Yoza cmd not found_"))
        } else {
            let [date,
                time] = new Date()
            .toLocaleString("en-IN", {
                timeZone: "Asia/Dhaka"
            })
            .split(",");
            let menu = `┌⟝———ᙍ ɪɴꜰᴏ ᙊ
│ *ʙᴏᴛ-ɴᴀᴍᴇ* : ${INFO.split(";")[0]}
│ *ᴘʟᴜɢɪɴs* : ${commands.length}
│ *ᴘʀᴇғɪx* : _[ ${HANDLERS} ]_
│ *ᴠᴇʀsɪᴏɴ* : 1.2.7
│ *ᴍᴏᴅᴇ* : ${MODE}
│ *ᴜᴘᴛɪᴍᴇ* : ${await m.uptime()}
│ *ᴛʏᴘᴇ-sᴄʀɪᴘᴛ* : ɴᴏᴅᴇ_ᴊs
└⟝————ᙍᙊ\n ${readMore}\n`
            let cmnd = [];
            let iris;
            let type = [];
            commands.map((command, num) => {
              
                if (command.name) {
              let cmdName = command.name
                  iris = cmdName.source.split('\\s*')[1]
                  .toString()
                  .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
              }

              if (command.dontAddCommandList || iris === undefined) return;
                   
                if (!command.dontAddCommandList && iris !== undefined) {
                    let category;
                    if (!command.category) {
                        category = "misc";
                    } else {
                        category = command.category.toLowerCase();
                    }
                    cmnd.push({
                        iris, category: category
                    });
                    if (!type.includes(category)) type.push(category);
                }
            });
            cmnd.sort();
            type.sort().forEach((cmmd) => {
                menu+= `\n╭▱╼❲ *${cmmd}* )\n`
                let comad = cmnd.filter(({
                    category
                }) => category == cmmd)
                comad.sort()
                comad.forEach(({
                    iris
                }, num) => {
                   menu += `│• ${iris.trim()}\n`
                 });
                 menu += `╰────────────\n`
            });
        let venox = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "displayName": "IRIS-MD","vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
        return await client.sendMessage(m.jid , { text : font.tiny(menu),
contextInfo: { externalAdReply: {                                           
title: font.tiny(`konnichiwa  ${m.pushName}`),
body: font.tiny(`this is ${INFO.split(";")[0]}`),
sourceUrl: URL,
mediaUrl: URL,
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: false,
thumbnailUrl: `${INFO.split(";")[2]}` }}},{ quoted: venox })      
    }
      } catch (e) {
        m.error(`hey : ${e}`)
      }
    }
);
