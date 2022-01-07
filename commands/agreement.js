let Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(message.author.id != "324416295120404480"){
        message.channel.send(":x:**Error!** You don't have permissions because you are not a developer of the bot!");
        let err_msg = new tools.LogMessage(`${message.author.username} tried to commit "/channels" command!`);
        console.log(clc.yellowBright(err_msg.GetMessage()));
    }
    else{
        let embed = new Discord.RichEmbed()
        .setTitle("Как стать участником сервера?")
        .setColor("#25bae7")
        .setDescription("**Если вы внимательно ознакомились с предоставленной вам информацией и правилами, нажмите ✅ чтобы получить доступ к серверу и стать его участником. Тем самым вы согласитесь __соблюдать правила__ нашего сервера!**");
        
      message.channel.send(embed).then(msg => msg.react("✅"));
        
      message.delete();
    }
}
