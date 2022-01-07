let tools = require("../tools/Tools"),
    Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(message.author.id != "324416295120404480"){
        message.channel.send(":x:**Error!** You don't have permissions because you are not a developer of the bot!");
        let err_msg = new tools.LogMessage(`${message.author.username} tried to commit "/rules" command!`);
        console.log(clc.yellowBright(err_msg.GetMessage()));
    }
    else{
        let title = `Правила сервера ${message.guild.name}`;
        let description = "Основной свод правил" + message.channel.guild.emojis.find(e => e.name == "max") +", которого стоит придерживаться при общении на этом сервере. Он мало, что ограничивает, но всё же некоторые моменты стоит освоить исходя из этого свода правил. При нарушении этих правил члены"+ message.channel.guild.emojis.find(e => e.name == "tolyan")+" будут выносить вердикт исходя из степени тяжести нарушений " + message.channel.guild.emojis.find(e => e.name == "danik");
        let color = "#25bae7";
        let fields = [
            {
                name: "1) Нецензурная лексика",
                description: `На нашем сервере разрешена нецензурная лексика и всякие выражения. Однако, злоупотребление этим может привести к весьма неприятным последствиям. Яркими примерами этого являются агрессия, массовые оскорбления участников, а в некоторых случаях и буллинг. Также на сервер не приветствуются токсичные игроки, то есть те, кто не уважают других участников.`
            },
            {
                name: "2) Написание сообщений",
                description: "Старайтесь вмещать мысль в одном сообщении, не флудите кучей сообщений с парой-тройкой слов или эмоджи. Старайтесь не использовать слишком много букв в верхнем регистре(Caps-lock). Также на сервере __запрещается рекламировать__ что-либо, за исключениями материалов из текстовых чатов категории 🟩 **MEDIA**."
            },
            {
                name: "3) Контент",
                description: `Всё, что хранится во категории медиа, не должно содержать not-safe-for-work контент. В ином случае можно отхватить предупреждение, а в некоторых случаях и бан. Всё зависит от масштабности нарушения.`
            },
            {
                name: "4) Музыка",
                description: `Можно слушать любую музыку, но при условии, что вы не будете ставить очень длинные треки, либо плейлисты с большим количеством музыки, особенно, если большинство участников текущего голосового канала против этого.`
            },
            {
                name: "5) NSFW-Контент",
                description: `Запрещено сливать в NSFW-чаты всякий скам, оффтоп и тому подобное. Это карается закрытием доступа к этим чатам на время или навсегда, в зависимости от масштабности нарушения.`
            }
        ];
        let footer = "Если заметили недоработку или ошибку в правилах, просьба уведомить об этом администраторов. Да и вообще, по любым вопросам обращайтесь к администрации. Администрация не будет отвечать на вопросы, ответы на которые можно получить в данной категории чатов.";
        
        let info = new Discord.RichEmbed()
        .setTitle(title)
        .setColor(color)
        .setDescription(description)
        .setFooter(footer)
        .setImage("https://media.discordapp.net/attachments/509423914162716697/672160382055481365/Deeprism_Rules_Sign.gif");
       // .setThumbnail("https://media.discordapp.net/attachments/509423914162716697/672162423301472297/Deeprism_Avatar.gif");

        fields.forEach(field => {
            info.addField(field.name, "**"+field.description+"**");
        });

        message.channel.send(info);
        message.delete();
    }
}
