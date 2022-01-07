module.exports.run = async (bot, message, args, channels) => {

    if(!channels.find(channel => channel.owner === message.author.id))
        return message.channel.send("**:x: Сначала создайте свой голосовой канала, подключившись к соответствующему!**").then(msg => msg.delete(3000));

    if(!args || message.mentions.members.size === 0)
        return message.channel.send("**Использование: `/banMembers @member1 @member2 @member3`**\nЭта команда запрещает доступ упомянутым участникам к вашему голосовому каналу, если вы его создали.").then(msg => msg.delete(10000));

    let channel = message.guild.channels.get(channels.find(channel => channel.owner === message.author.id).channel);
    let usersString = "";

    message.mentions.members.forEach(member => {
        if(member.user.id != message.author.id)
        {
            channel.overwritePermissions(member, {
                VIEW_CHANNEL: false,
                CONNECT: false,
                SPEAK: false
            });
    
            if(member.voiceChannel) member.setVoiceChannel(message.guild.channels.get("669221667712532490"));
    
            usersString += member.user.username + ", ";
        }
    });
    
    if(usersString.length > 0){
            if(message.mentions.members.size === 1)
            return message.channel.send(`:white_check_mark:**Пользователь \`${usersString}\` был успешно удалён из вашего приватного голосового канала \`${channel.name}\`!**`);
        else
            return message.channel.send(`:white_check_mark:**Пользователи \`${usersString}\` былы успешно удалены из вашего приватного голосового канала \`${channel.name}\`!**`);
    }
}
