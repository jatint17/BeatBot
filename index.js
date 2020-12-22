const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});

const ytdl = require('ytdl-core');

const prefix = '.';

client.on('ready', ()=> {
    console.log('bot is online')
});

client.on('message', async message =>{
    var x = message.content;

    const args = x.substring(prefix.length).split(" ");

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

        const dispatcher = conn.play(ytdl(args[1]))
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
//to add search from youtube and queue feature tomorrow
client.login('your bot token here');
