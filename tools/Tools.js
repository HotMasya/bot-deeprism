const Discord = require("discord.js");
const fs = require('fs');
const Config = require("../config.json");

/**
 *  Log Message Class represents a
 *  log message for console and text files
 */
module.exports.LogMessage = class {
    
    /**
     *  Constructor of this class.
     * 
     * @param {string} message  Actually Message
     * @param {Date} time       Optional. The time this message has been created 
     * @param {string} type     Optional. The type of message for example "BOT" or "AUTH"
     * @param {string} source   Optional. Source, that created this message.
     */
    constructor(message, time = new Date(), type = "", source = "")
    {
        this.message = message;
        this.time = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
        this.type = type;
        this.source = source;
    }

    /**
     *  This function will give you an automatically
     *  construsted message
     * 
     * @returns {string} The automatically constructed message.
     */
    GetMessage(){
        let result_message = this.message;

        if(this.source.length) result_message = `[${this.source}] ${result_message}`;
        if(this.type.length) result_message = `[${this.type}]${result_message}`;
        if(this.time.length) result_message = `[${this.time}]${result_message}`;

        return result_message;
    }
}

/**
 *  Gets an emoji from Deeprism discord server
 * 
 *  @param {Discord.Client}     bot         Actually the bot
 *  @param {String}             emojiName   The name of the emoji of the Deeprism discord server
 * 
 *  @returns {Discord.Emoji}                Discord emoji
 */
module.exports.GetEmoji = function (bot, emojiName)
{
    return bot.guilds.get(Config.guildID).emojis.find(e => e.name === emojiName);
}

/**
 *  My type of message for guild member's notifications
 * 
 *  @param {Discord.Client}                     bot     Actually the bot
 *  @param {Discord.TextChannel}                channel The channel to send message to
 *  @param {"error" | "warning" | "message"}    type    The type of the message
 *  @param {String}                             message Actually the message to send   
 *  @param {String}                             footer  The footer of this embed message     
 *  @param {String}                             title   The title of the embed message if it is not an error or warning
 */
module.exports.sendEmbedMessage = function (bot, channel, type, message, footer = null, title = "Заглавие")
{
    const embed = new Discord.RichEmbed()
    .setTitle(type == "error" ? `Не получилось ${this.GetEmoji(bot, "snapped_natsuki")}` :
            type == "warning" ? `Эй! ${this.GetEmoji(bot, "mad_natsuki")}` : title)
    .setDescription(message)
    .setColor(type == "error" ? Config.colors.red : type == "warning" ? Config.colors.yellow : Config.colors.blue);

    if(footer) embed.setFooter(footer);

    channel.send(embed);
}