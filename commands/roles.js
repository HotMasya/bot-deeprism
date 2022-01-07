let Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(message.author.id != "324416295120404480"){
        message.channel.send(":x:**Error!** You don't have permissions because you are not a developer of the bot!");
        let err_msg = new tools.LogMessage(`${message.author.username} tried to commit "/channels" command!`);
        console.log(clc.yellowBright(err_msg.GetMessage()));
    }
    else{
        let embed = new Discord.RichEmbed()
        .setTitle("Информация о ролях")
        //.setThumbnail("https://media.discordapp.net/attachments/509423914162716697/672161460222164992/Deeprism_Avatar.gif")
        .setColor("#25bae7")
        .setDescription("Здесь содержится общая информация обо всех ролях этого сервера. Стандартная роль @everyone даёт доступ только к самой первой категории каналов.")
        .setFooter("Если заметили недоработку или ошибку в описании ролей, просьба уведомить об этом администраторов. Да и вообще, по любым вопросам обращайтесь к администрации. Администрация не будет отвечать на вопросы, ответы на которые можно получить в данной категории чатов.")
        .setImage("https://media.discordapp.net/attachments/509423914162716697/672440566285467668/Deeprism_Roles_Sign_1.gif");

        embed.addField("Rythm и JUST MONIKA", "**Две роли, которые пренадлежат двум ботам и управляются внешней интеграцией Discord.**")
             .addField("NSFW", "**Роль для доступа к категории каналов **🟪 NSFW**. Почитать об этой категории можно в посте выше.**")
             .addField("Editor", "**Роль редактора для текстового канала <#669221136881680404>. Больше информации в посте выше.**")
             .addField("Unique", "**Уникальный участник. Даётся тем, кто прошёл авторизацию на сервере. Инструкцию по авторизации можно найти в первом посте.**")
             .addField("Souless machine", "**Эта роль группирует всех ботов в одну категорию и отображает их отдельно в списке участников.**")
             .addField("Server booster", "**Эта роль управляется внешней интеграцией Discord. Она выдаётся автоматически, если вы бустите наш Discord-сервер. Будем очень рады любому бусту.** :D")
             .addField("Moderator", "**Роль для тех, кто пристально следит за порядком, согласно правилам нашего сервера.**")
             .addField("Admin", "**Эту роль имеет троица, которая не моется, они же представлены в первом посте и заправляют всем на сервере.**");
        message.channel.send(embed);
        message.delete();
    }
}
