const Discord = require('discord.js');
const { Util } = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const fs = require('fs');
const ytdl = require('ytdl-core');
const YouTube = require("simple-youtube-api");

const prefix = '.';

client.on('ready', ()=> {
    console.log('bot is online')
});

client.on('message', async message => {
    const youtube = new YouTube('AIzaSyDeYAEJj6RZVM-DZvO0ci_05hNUmVjjF8k')
    
    var x = message.content;
    const args = x.substring(prefix.length).split(" ");
    
    var search = args.join(" ")
    var video = await youtube.searchVideos(search).catch(console.log)
    var songInfo = await video[0].fetch().catch(console.log);

    const song = {
        title: Util.escapeMarkdown(songInfo.title),
        url: songInfo.url,
    }

    if(x.startsWith(`${prefix}h`))
    {
        message.channel.send("Hello server")
        console.log(".h working")
    }

    if(x.startsWith(`${prefix}play`))
    {
        const vc = message.member.voice.channel
        const permission = vc.permissionsFor(message.client.user)

        if(!vc)
        {
            console.log("member not connected to vc")
            return message.channel.send("Please connect to a voice channel")
        }

        if(!permission.has('CONNECT') || !permission.has('SPEAK'))
        {
            return message.channel.send("Please give permission")
        }

        try
        {
            var conn = await vc.join()
        }
        catch(error)
        {
            console.log(`Error in vc : ${error}`)
            return message.channel.send(`Error in vc: ${error}`)
        }

        const dispatcher = conn.play(ytdl(song.url))
    }

    if(x.startsWith(`${prefix}stop`))
    {
        const vc = message.member.voice.channel
        if(!vc)
        {
            return message.channel.send("Please connect to a voice channel first")
        }
        else
        {
            vc.leave()
            return
        }
    }
})

client.login('*your token here');
