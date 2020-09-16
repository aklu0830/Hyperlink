const Discord = require('discord.js');
const {prefix, token, giphytoken} = require('./config.json');
const client = new Discord.Client();


var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphytoken)


client.once('ready', () => {
    console.log('Online!')
})

client.on("message", msg => {
    if (msg.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {


        if (msg.content.startsWith(`${prefix}kick`)) {
            msg.channel.send("Kick")

            let member = msg.mentions.members.first();
            member.kick().then((member) => {

                giphy.search('gifs', {"q": "fail"})
                    .then((response) => {
                        var totalresponses = response.data.length;
                        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalresponses;
                        var responseFinal = response.data[responseIndex]

                        msg.channel.send(":wave: " + member.displayName + " has been kicked!", {
                            files: [responseFinal.images.fixed_height.url]
                        })

                    })


            }).catch(() => {
                msg.channel.send("Error ugh!")
            })
        }

    }
})


client.login(token);