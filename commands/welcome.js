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
        let emojis = message.guild.emojis;

        let title = `Добро пожаловать на ${message.guild.name}`;
        let description = "Мы очень рады вас приветствовать на нашем **Discord-сервере**. У нас вы найдёте мало чего интересного, зато всегда найдёте, с кем пообщаться. Прежде всего рекомендуем ознакомиться со сводом правил и другой информацией в чатах этой категории*(там всего по немногу)*, а затем только располагаться.  Наш сервер не слишком навороченный и, изначально, не задумывался таким быть. Но, если у вас есть предложения по улучшению сервера, то пишите их в <#672407989939863568>. Этот сервер ~~--~~ просто укромное местечко для тех, кому скучно и нечего делать ¯\\_(ツ)_/¯.\n**ВАЖНО!** Если вы не можете понять предназначение канала, прочитайте его описание."
        let color = "#25bae7";
       
        let footer = "Если заметили недоработку или ошибку в приветствии, просьба уведомить об этом администраторов. Да и вообще, по любым вопросам обращайтесь к администрации. Администрация не будет отвечать на вопросы, ответы на которые можно получить в данной категории чатов.";
        
        let info = new Discord.RichEmbed()
        .setTitle(title)
        .setColor(color)
        .setDescription(description)
        .setFooter(footer)
        .setImage("https://media.discordapp.net/attachments/509423914162716697/672160432252780594/Deeprism_Welcome_Sign.gif")
        //.setThumbnail("https://media.discordapp.net/attachments/509423914162716697/672161460222164992/Deeprism_Avatar.gif")
        .setURL("https://discord.gg/XzMUn6p")
        .addField("Администрация", `**Власть здесь представляют 3 замечательных человека, а именно:**
                                    ${emoji("max", emojis)} Макс, он же <@324416295120404480>;
                                    ${emoji("tolyan", emojis)} Толян, он же <@509027867540324363>;
                                    ${emoji("danik", emojis)} Даник, он же <@373889696453099521>`)
        
        .addField("Приглашения", "**Чтобы не забивать список ссылок-приглашений, создана одна перманентная ссылка. Просто копируйте её и отправляйте друзьям **:)** https://discord.gg/XzMUn6p**")

        message.channel.send(info);
        message.delete();
    }
}

function emoji(name, emojis)
{
    return emojis.find(e => e.name == name);
}
