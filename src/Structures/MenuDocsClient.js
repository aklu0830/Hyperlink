const {Client} = require('discord.js');

module.exports = class MenuDocsClient extends Client {

    constructor(options = {}) {
        super({
            disableMentions: 'everyone'
        });
        this.validate(options);

        this.once('ready', () => {
            console.log(`Logged in as ${this.user.username}`);
        });

        this.on("message", async (message) => {
            const mentionRegex = RegExp(`^<@!${this.user.id}>`);
            const mentionRegexPrefix = RegExp(`^<@!${this.user.id}>`);

            if (message.guild || message.author.bot) return;

            if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.prefix}\`.`);

            const prefix = message.content.match(mentionRegexPrefix) ?
                message.content.match(mentionRegexPrefix)[0] : this.prefix;

            const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

            if (cmd.toLowerCase() === 'hello') {
                message.channel.send("Hello!");
            }
        });
    }
}