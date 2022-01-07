const  Discord = require("discord.js"),
    Config = require("../config.json"),
    tools = require("../tools/Tools");

    /**
     *  Plays an audio from the link or adds it to the queue
     *      
     *  @param {Discord.Client}                      bot         //  Actually discord bot object
     *  @param {Discord.Message}                     message     //  Discord message that represetns '/play' command
     *  @param {Array<String>}                       args        //  The arguments of the command
     *  @param {Discord.Collection<String, Object>}  channels    //  Channels collections for private voice channels system
     *  @param {Object}                              data        //  The data about the music of the guild
     */
    module.exports.run = async (bot, message, args, channels, data) => {

        let botMember = bot.guilds.get(Config.guildID).members.get(bot.user.id);
        //  If the member isn't in the voice channel or is not in the same channel with the bot
        if(!message.member.voiceChannel || botMember.voiceChannel && message.member.voiceChannelID !== botMember.voiceChannelID)
        return tools.sendEmbedMessage(bot, message.channel, "error",
            "Вы должны зайти в голосовой канал, чтобы использовать команду:**```/play```**");

        if(!data.dispatcher) return tools.sendEmbedMessage(bot, message.channel, "warning",
        "**В данный момент я ничего не проигрываю!**", "Введите /play чтобы добавить трек в очередь.");

        if(data.dispatcher.paused) return tools.sendEmbedMessage(bot, message.channel, "warning",
        "**Я и так приостановила проигрывание музыки!**", "Введите /resume чтобы продолжить.");

        data.dispatcher.pause();

        let embed= new Discord.RichEmbed()
        .setDescription("⏸️ Проигрывание приостановлено!")
        .setColor(Config.colors.dark_purple)
        .setFooter("Введите \"/resume\" чтобы продолжить.");

        message.channel.send(embed);
}

