let tools = require("../tools/Tools"),
    clc = require("cli-color"),
    Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(message.author.id != "324416295120404480"){
        message.channel.send(":x:**Error!** You don't have permissions because you are not a developer of the bot!");
        let err_msg = new tools.LogMessage(`${message.author.username} tried to commit "/welcome" command!`);
        console.log(clc.yellowBright(err_msg.GetMessage()));
    }
    else{
        let title = "Ноксет";
        let description = "**Мы — сервер по общению и программированию. Адекватная администрация, свои боты (пока что в разработке) разрешен оффтоп и ещё много чего другого. Тут вы можете задать вопрос насчёт программирования и вам ответят. (С уважением администрация)**";
        let url = "https://discord.gg/998Hw2g";
        let color = "#25bae7";
           
        let info = new Discord.RichEmbed()
        .setTitle(title)
        .setColor(color)
        .setDescription(description)
        .setURL(url);


        message.channel.send(info).then(msg => msg.channel.send("https://discord.gg/998Hw2g"));
        message.delete();
    }
}
