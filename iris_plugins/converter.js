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
const googleTTS = require('google-tts-api');
const FakeYou = require('fakeyou.js');
const fetch = require('node-fetch')
const info = require('../info.js');
const {
    STICKER_DATA
} = require('../info.js');
const fy = new FakeYou.Client({
    token: 'TR:p1921zb51ha60mbp4zbqtgyftcnn6',
    usernameOrEmail: 'vbcoc18@gmail.com',
    password: 'barishvb-8'
});
const { toAudio,
        AudioData,
        toVideo
      } = require("../lib/functions.js");

iris(
    {
        name: "sticker",
        fromMe: isPublic,
        desc: "Converts an image to sticker",
        category: "converter",
    },
    async ({
        m, client, args
    }) => {
        if (!m.quoted || !(m.quoted.message.imageMessage || m.quoted.message.videoMessage || m.quoted.message.stickerMessage ))
            return await m.reply("_Reply to photo or video_");
        if (args) {
            let [packname, author] = args.split(",");
        let buff = await m.quoted.download();
        m.sendMsg(m.jid, buff, {
    packname: packname || '', author: author || '' , quoted : m 
}, "sticker")
        } else {
            let buff = await m.quoted.download();
        m.sendMsg(m.jid, buff, {
    packname: `${STICKER_DATA.split(";")[0]}`, author: `${STICKER_DATA.split(";")[1]}` , quoted : m 
}, "sticker")
        }
    }
    );

iris(
    {
        name: "mp3",
        fromMe: isPublic,
        desc: "Converts an Video/Voice to Mp3",
        category: "converter",
    },
    async ({
        m, client, args
    }) => {
        if (!m.quoted || !(m.quoted.message.audioMessage || m.quoted.message.videoMessage ))
            return await m.reply("_Reply to voice or video_");
        let buff = await m.quoted.download();
     return m.sendMsg(m.jid , buff , { mimetype: "audio/mpeg" } , "audio")
    }
);

iris(
    {
        name: "tts",
        fromMe: isPublic,
        category: "converter",
        desc: "text to speech"
    },
    async ({
        m, client, args
    }) => {
        if (!args) {
            m.reply('_Enter Query!_')
        } else {
            let [txt,
                lang] = args.split`:`
            const audio = googleTTS.getAudioUrl(`${txt}`, {
                lang: lang || "ml",
                slow: false,
                host: "https://translate.google.com",
            })
            client.sendMessage(m.jid, {
                audio: {
                    url: audio,
                },
                mimetype: 'audio/mpeg',
                ptt: true,
                fileName: `${'tts'}.mp3`,
            }, {
                quoted: m,
            })

        }
    });

iris(
    {
        name: "wave",
        fromMe: isPublic,
        category: "converter",
        desc: "audio in wave format"
    },
    async ({
        m, client, args
    }) => {
        if (!m.quoted || !(m.quoted.message.audioMessage || m.quoted.message.documentMessage ))
            return await m.reply("_Reply to Audio Message_");
        let buff = await m.quoted.download()
m.sendMsg(m.jid , buff,{ audiowave : Array.from({length: 30}, () => Math.floor(Math.random() * 100)) , ptt : true , mimetype : "audio/mpeg" } , "audio" )
    }
    );

iris(
    {
        name: "tomp4",
        fromMe: isPublic,
        category: "converter",
        desc: "convert a document video to normal video"
    },
    async ({
        m, client, args
    }) => {
        if (!m.quoted || !( m.quoted.message.videoMessage || m.quoted.message.documentMessage ))
            return await m.reply("_Reply to a video_");
await m.reply("_Loading..._")
let buff = await m.quoted.download()
client.sendMessage(m.jid , { video : buff } )
    }
    );

iris(
    {
        name: "toimage",
        fromMe: isPublic,
        category: "converter",
        desc: "convert a document image to normal image"
    },
    async ({
        m, client, args
    }) => {
        if (!m.quoted || !( m.quoted.message.imageMessage || m.quoted.message.documentMessage ))
            return await m.reply("_Reply to an image_");
await m.reply("_Converting..._")
let buff = await m.quoted.download()
client.sendMessage(m.jid , { image : buff } )
    }
    );

iris(
    {
        name: "caption",
        fromMe: isPublic,
        category: "converter",
        desc: "give custom captions"
    },
    async ({
        m, client, args
    }) => {
        if (!m.quoted || !(m.quoted.message.imageMessage || m.quoted.message.videoMessage || m.quoted.message.documentMessage ))
            return await m.reply("_Reply to photo or video_");
await m.reply("_Please Wait 2 secs...._")
let res = await m.quoted.download();
      if(m.quoted.message.videoMessage){
       await client.sendMessage(m.jid, { video :res ,  mimetype:"video/mp4", caption: (args)}, {quoted: m })
      } else if(m.quoted.message.imageMessage){
      await client.sendMessage(m.jid, { image :res ,  mimetype:"image/jpeg",caption: (args)}, {quoted: m })
      }
    }
    );


iris(
    {
        name: "take",
        fromMe: isPublic,
        category: "converter",
        desc: "give custom captions"
    },
    async ({
        m, client, args
    }) => {
if (!m.quoted.message.stickerMessage && !m.quoted.message.audioMessage && !m.quoted.message.imageMessage && !m.quoted.message.videoMessage) return m.reply('reply to a sticker/audio');
        if (m.quoted.message.stickerMessage || m.quoted.message.imageMessage || m.quoted.message.videoMessage) {
            args = args || info.STICKER_DATA;
            let media = await m.quoted.download();
            return await m.sendMsg(m.jid, media, {
                packname: args.split(/[|,;]/)[0] || args,
                author: args.split(/[|,;]/)[1]
            }, "sticker");
        } else if (m.quoted.message.audioMessage) {
            const opt = {
                title: args ? args.split(/[|,;]/) ? args.split(/[|,;]/)[0] : args : info.INFO.split(/[|,;]/)[0] ? info.INFO.split(/[|,;]/)[0] : info.INFO,
                body: args ? args.split(/[|,;]/)[1] : info.INFO.split(/[|,;]/)[1],
                image: (args && args.split(/[|,;]/)[2]) ? args.split(/[|,;]/)[2] : info.INFO.split(/[|,;]/)[2]
            }
            const Data = await AudioData(await toAudio(await m.quoted.download()), opt);
            return await m.sendMsg(m.jid ,Data,{
                mimetype: 'audio/mpeg'
            },'audio');
        }
    }
    );

iris(
    {
        name: "black",
        fromMe: isPublic,
        category: "converter",
        desc: "give custom captions"
    },
    async ({
        m, client, args
    }) => {
        if (!m.quoted || !(m.quoted.message.audioMessage || m.quoted.message.documentMessage ))
            return await m.reply("_Reply to Audio Message_");
let black = await m.quoted.download()
const result = await toVideo(black);
m.sendMsg(m.jid , result , {} , "video")
    }
    );
