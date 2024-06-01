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
//                                                                                                     //
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
const { 
  existsSync, 
  mkdirSync, 
  writeFileSync,
  readFileSync,
  createWriteStream
} = require('fs');
const fetch = require('node-fetch')
const yts = require("yt-search")
const ytdl = require("youtubedl-core");
const NodeID3 = require('node-id3')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const axios = require("axios")
const {
  AddMp3Meta
} = require("../lib/functions.js");


iris(
    {
        name: "xv",
        fromMe: isPublic,
        desc: "Instagram downloader",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
let sample = await fetch(`https://api-aswin-sparky.koyeb.app/api/search/xvideos?search=${args}`);
var data = await sample.json();
let txt = `xv search results\n\n`;
      
        for (let i=1; i<11; i++){
  txt+=`
TITLE : ${data.data[i].title}
DURATION : ${data.data[i].duration}
URL : ${data.data[i].url}\n`
        }
return m.adreply(`${txt}`)
    }
  );

iris(
    {
        name: "yt",
        fromMe: isPublic,
        category: "downloader",
        desc: "To download yt vid/aud"
    },
async ({

        m, client, args

    }) => {

    if (!args) return m.reply("_Enter a Query !_")
   let mes = await client.sendMessage(m.jid, { text : `_Searching..._`}, {quoted : m })
    let datai = `_Youtube Downloader_\n\n`
    let search = await yts(`${args}`)
    let hdata = search.all
 
    for (let i=1; i<11; i++){
        datai += `_${i} .${hdata[i].title}_\n`
    }
   return client.sendMessage(m.jid, { text : `${datai}` , edit : mes.key })
      }
    )

        
iris(
    {
        name: "play",
        fromMe: isPublic,
        category: "downloader",
        desc: "To download song"
    },
    async ({
        m, client, args
    }) => {
      args = args || m.quoted?.text;
        if (!args) return m.reply("_Enter a Query !_")
      let mes = await client.sendMessage(m.jid, { text : `_Searching..._` } , { quoted : m })
   const res = await axios.get(`https://api-viper-x.koyeb.app/api/song?name=${args}`)
    let response = await res.data
    let coverBuffer = await (await fetch(`${response.data.thumbnail}`)).buffer()
     client.sendMessage(m.jid, { text : `_Downloading : ${response.data.title}_` , edit : mes.key })
   const songbuff = await (await fetch(`${response.data.downloadUrl}`)).buffer()
   const song = await AddMp3Meta(songbuff , coverBuffer , { title : response.data.title , artist : response.data.channel.name } )
     return await client.sendMessage(m.jid , {audio : song ,  mimetype : 'audio/mpeg'} , { quoted : m })
      
    })
