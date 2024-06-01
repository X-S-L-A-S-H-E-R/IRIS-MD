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















const { iris, isPublic } = require("../lib/commands.js");
const simpleGit = require('simple-git');
const git = simpleGit();
const info = require('../info.js');
const exec = require('child_process').exec;
const Heroku = require('heroku-client');
const heroku = new Heroku({ token: info.HKEY })
const baseURI = "/apps/" + info.HAPP;


iris(
    {
        name: "update",
        fromMe: true,
        desc: "updates the bot",
        category: "owner",
    },
    async ({ m, args, client }) => {
      
    let {prefix} = args
    if (args === "now") {
      await git.fetch();
      var commits = await git.log([
        'main' + "..origin/" + 'main',
      ]);
      if (commits.total === 0) {
        return await m.reply("*_Bot is already on updated version_*");
      } else {
        await m.reply("*_Update Started_*");

        try {
          var app = await heroku.get("/apps/" + info.HAPP);
        } catch {
          await m.reply("_Invalid Heroku Details_");
          await new Promise((r) => setTimeout(r, 1000));
        }

        git.fetch("upstream", 'main');
        git.reset("hard", ["FETCH_HEAD"]);

        var git_url = app.git_url.replace(
          "https://",
          "https://api:" + info.HKEY + "@"
        );

        try {  
          await git.addRemote("heroku", git_url);
        } catch {
          console.log("heroku remote error");
        }
        await git.push("heroku", 'main');

        await m.reply("*_Successfully Updated to the Latest Version_*");
      }
    }
    await git.fetch();
    var commits = await git.log(['main' + "..origin/" + 'main']);
    if (commits.total === 0) {
      await m.reply("*_No Updates Available_*");
    } else {
      var availupdate = "*Latest updates available* \n\n";
      commits["all"].map((commit, num) => {
        availupdate += num + 1 + " ⋆ " + (commit.m) + "\n";
      });
      return await client.sendMessage(m.jid, {
        text: availupdate,
        footer: ("click here to update"),
      });
    }
    }
  );
