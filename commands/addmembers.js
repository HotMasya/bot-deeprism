module.exports.run = async (bot, message, args, channels) => {

    if(!channels.find(channel => channel.owner === message.author.id))
        return message.channel.send("**:x: Сначала создайте свой голосовой канала, подключившись к соответствующему!**").then(msg => msg.delete(3000));

    if(!args || message.mentions.members.size === 0)
        return message.channel.send("**Использование: `/addMembers @member1 @member2 @member3`**\nЭта команда даёт доступ упомянутым участникам к вашему голосовому каналу, если вы его создали.").then(msg => msg.delete(10000));

    let channel = message.guild.channels.get(channels.find(channel => channel.owner === message.author.id).channel);
    let usersString = "";
    message.mentions.members.forEach(member => {
        if(member.user.id != message.author.id)
        {
            channel.overwritePermissions(member, {
                VIEW_CHANNEL: true,
                CONNECT: true,
                SPEAK: true
            });

            usersString += member.user.username + ", ";
        }
    });
    
    if(usersString.length > 0)
    {
            if(message.mentions.members.size === 1)
            return message.channel.send(`:white_check_mark:**Пользователь \`${usersString}\` был успешно добавлен в ваш приватный голосовой канал \`${channel.name}\`!**`);
        else
            return message.channel.send(`:white_check_mark:**Пользователи \`${usersString}\` былы успешно добавлены в ваш приватный голосовой канал \`${channel.name}\`!**`);
    }
}