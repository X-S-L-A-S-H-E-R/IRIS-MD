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
    isPublic
} = require("../lib/commands.js");
const { elevenlabs
} = require('../lib/functions.js');

const { 
	MusicFind
} = require('../lib/spotify.js');
const axios = require('axios');


iris(
    {
        name: "vo",
        fromMe: true,
        category: "tools",
        desc: "Resends the view Once message"
    },
    async ({
        m, client 
    }) => {
try {
        if (!m.quoted) {
            return m.reply("_Reply to ViewOnce Message !_");
        }
     if (m.quoted.message.viewOnceMessageV2) {
            let vv = m.quoted.message.viewOnceMessageV2

            if (vv.message.imageMessage) {
                let img = await m.downloadAndSaveMedia(vv.message.imageMessage, "vo", true)

                await client.sendMessage(m.jid, {
                    image: {
                        url: img
                    }, caption: vv.message.imageMessage.caption
                }, {
                    quoted: m
                })
            } else if (vv.message.videoMessage) {

                let video = await m.downloadAndSaveMedia(vv.message.videoMessage, "vo", true)

                await client.sendMessage(m.jid, {
                    video: {
                        url: video
                    }, caption: vv.message.videoMessage.caption
                }, {
                    quoted: m
                })

            }
        } else if (m.quoted.message.viewOnceMessageV2Extension.message.audioMessage) {
              let audio = await m.downloadAndSaveMedia(m.quoted.message.viewOnceMessageV2Extension.message.audioMessage, "vo", true)

                await client.sendMessage(m.jid, {
                    audio: {
                        url: audio
                    }
                }, {
                    quoted: m
                })
     } else {
            m.reply('_Not a ViewOnce Message !_')
        }
} catch {
  m.reply("_Error !_")
}
    })


iris(
    {
        name: "find",
        fromMe: isPublic,
        category: "tools",
        desc: "Finds music from replied Audio",
    },
    async ({
        m, client
    }) => {
            if (!m.quoted || !(m.quoted.message.audioMessage || m.quoted.message.videoMessage)) {
                return m.reply("_Reply to Audio/Video Message !_");
            }
		let msg = await m.sendMsg(m.jid, "*_Please wait..._*",{quoted:m});
try {
	    return await MusicFind(m, client);
                    } catch (e) {
            await m.sendMsg(m.jid,"_*No result found!*_",{edit:msg.key});
        }
    })

iris(
    {
        name: "ss",
        fromMe: isPublic,
        category: "tools",
        desc: "Finds music from replied Audio",
    },
    async ({
        m, client, args
    }) => {
args = args || m.quoted?.text;
if (!args) return await m.reply("_Enter Or Reply to a link_");
let dll = `https://toxicdevilapi.vercel.app/other/screenshot?url=${args}`
client.sendMessage(m.jid, { image :{ url: dll }, caption: "_IRIS-MD_"}, {quoted: m })
    }
	);

iris(
    {
        name: "save",
        fromMe: true,
        category: "tools",
        desc: "Finds music from replied Audio",
    },
    async ({
        m, client, args
    }) => {
if (!m.quoted) {
        return m.adreply("_Reply to Anyone's Status!_");
}
let res = await m.quoted.download();
      if(m.quoted.message.videoMessage){
       await client.sendMessage(m.jid, { video :res ,  mimetype:"video/mp4"}, {quoted: m })
      } else if(m.quoted.message.imageMessage){
      await client.sendMessage(m.jid, { image :res ,  mimetype:"image/jpeg"}, {quoted: m })
      }
    }
	);
