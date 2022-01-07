const Discord = require("discord.js"),
    Config = require("./config.json"),
    clc = require("cli-color"),
    tools = require("./tools/Tools");

const bot = new Discord.Client();

let commands = new Discord.Collection(),    //  Commands for command handler
    channels = new Discord.Collection();    //  Private channels list

let data = {};  //  Data for audio commands

//  Ready stmt
bot.on("ready", () => {

    //  Setting up commands
    //  --------------------
    //  Information commands
    commands.set("rules", "./commands/rules");
    commands.set("welcome", "./commands/welcome");
    commands.set("channels", "./commands/channels");
    commands.set("roles", "./commands/roles");
    commands.set("how", "./commands/how");
    commands.set("partner", "./commands/partner");
    commands.set("agreement","./commands/agreement");
    //  Private voice channels system commands
    commands.set("addmembers", "./commands/addmembers");
    commands.set("addmem", "./commands/addmembers");
    commands.set("banmembers", "./commands/banmembers");
    commands.set("banmem", "./commands/banmembers");
    //  Music commands
    commands.set("play", "./commands/play");
    commands.set("p", "./commands/play");
    commands.set("pause", "./commands/pause");
    commands.set("resume", "./commands/resume");
    commands.set("skip", "./commands/skip");
    commands.set("s", "./commands/s");

    //  Bot's status
    bot.user.setPresence({
        game: {
            name: 'twitter @_Thundie',
            type: "WATCHING",
        },
        status: "online"
    });

   
    
    //  Getting our guild
    let deeprism = bot.guilds.get(Config.guildID);
    
    deeprism.channels.forEach(channel => {
        if(channel.type === 'voice' && channel.id !== Config.privateChannelID && channel.parentID === Config.PrivateCategoryID)
        {
            channel.delete();
        }
    });
    
    //  Ready stmt console message
    let message = new tools.LogMessage(`Bot is working with ${deeprism.memberCount} member(s).`, new Date(), "BOT", "BOT_READY_STATE");
    console.log(clc.greenBright(message.GetMessage()));

    //  Caching a message to monitor the users than agree with rules
    deeprism.channels.filter(c => c.type == "text").get(Config.rulesChannelID).fetchMessages({ limit: 1, around: Config.agreementMsgID});
});

//  For user agreement
bot.on("messageReactionAdd", (reaction, user) => {
    try{
        let deeprism = bot.guilds.get(Config.guildID);
        let member = deeprism.members.get(user.id);

        if(reaction.message.id === Config.agreementMsgID && reaction.emoji.name === "✅" && member.roles.size === 2)
        {
            member.addRole(deeprism.roles.get(Config.uniqueRoleID));
                 let newMember = new Discord.RichEmbed()
                    .setColor("#d577ff")
                    .setDescription("Поприветствуйте нового " + deeprism.members.filter(m => m.roles.size > 1).size + "-го участника, " + member + "!")
                    .setThumbnail(member.user.avatarURL);
                
                deeprism.channels.get(Config.mainChannelID).send(newMember);
        }
    }
    catch(error)
    {
        console.log(error);
    }
});


//  Command handler
bot.on("message", async message => {
    if(message.author.bot) return;

    if(message.channel.type == 'dm') return;

   

    if(!message.content.startsWith(Config.prefix)) return;

    //  Commands parts(first element of the args is a command's name)
    let args = message.content.trim().slice(Config.prefix.length).split(/\s/g);
    let command = commands.get(args.shift());


    if(command)
        require(command).run(bot, message, args, channels, data);
});

//  Private voice channels system
bot.on("voiceStateUpdate", async (oldMember, newMember) => {
    if(newMember.voiceChannel && newMember.voiceChannelID === Config.privateChannelID)
    {
        //  If private channel of this user doesn't exist
        if(!channels.find(channel => channel.owner == newMember.user.id)){
            newMember.guild.createChannel(newMember.user.username + "'s channel", {
                type: "voice",
                parent: Config.privateCategoryID,
                permissionOverwrites:
                [
                    {
                        id: newMember.guild.id,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: newMember.user.id,
                        allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'MANAGE_ROLES_OR_PERMISSIONS'],
                        deny: ['CREATE_INSTANT_INVITE']
                    }
                ]
            })
            .then(channel => { 
                newMember.setVoiceChannel(channel)
                channels.set(channel.id, {
                    expires: -1,
                    owner: newMember.user.id,
                    channel: channel.id
                });
                
                let embed = new Discord.RichEmbed()
                    .setTitle(":wave: Привет, " + newMember.user.username)
                    .setDescription("Ты только что создал приватный голосовой канал, но его никто не видит. Чтобы сделать его доступным для остальных, настрой его вручную, либо используй следующие команды:")
                    .addField("/addMembers", "**Альтеранативная команда -- `/addMem`.**")
                    .addField("/banMembers", "**Альтеранативная команда -- `/banMem`.**")
                    .setFooter("Чтобы узнать больше об этих командах, просто введи их чат~");
                
                
                newMember.guild.channels.get(Config.privateTextChannelID).send(`<@${newMember.user.id}>`).then(msg => { msg.channel.send(embed).then(m => { if(m) m.delete(30000); if(msg) msg.delete(30000)  } )});
            });
        }// If exists, moving the user to his channel
        else newMember.setVoiceChannel(newMember.guild.channels.get(channels.find(channel => channel.owner == newMember.user.id).channel));
    }

    //  Private voice channel notifications
    if(channels.get(oldMember.voiceChannelID) && oldMember.voiceChannel.members.size === 0)
    {
        let deeprism = bot.guilds.get(Config.guildID);
        let embed = new Discord.RichEmbed()
            .setTitle(":warning: Внимание!")
            .setColor("#FFC300")
            .setDescription(`**<@${deeprism.members.get(channels.get(oldMember.voiceChannelID).owner).user.id}>, ваш приватный голосовой канал будет удалён через 3 минуты, если за это время в него никто не зайдёт!**`);

        deeprism.channels.get(Config.privateTextChannelID).send(embed).then(m => { if(m) m.delete(30000) });
        channels.get(oldMember.voiceChannelID).expires = new Date().getTime() + (180 * 1000);

        let interval = setInterval(() => {
            let target = channels.get(oldMember.voiceChannelID);

            if(target)
            {
                if( oldMember.guild.channels.get(oldMember.voiceChannelID).members.size === 0)
                {
                    if(target.expires <= new Date().getTime())
                    {
                        oldMember.voiceChannel.delete(target.channel)
                        .then(channel =>  deeprism.channels.get(Config.privateTextChannelID).send(`Приватный голосовой канал **${channel.name}**  был удалён!`).then(m => { if(m) m.delete(30000) }));
                        channels.delete(target.channel);
                        clearInterval(interval);
                    }
                }
                else clearInterval(interval);
            }
            else clearInterval(interval);
        }, 3000);
    }
});


bot.on("channelDelete", channel => {
    //  When user deletes his private channel on purpose or occationally
    let target = channels.get(channel.id);

    if(target)
    {
        channels.delete(target.channel);
        bot.guilds.get(Config.guildID).channels.get(Config.privateTextChannelID).send(`Приватный голосовой канал **${channel.name}**  был удалён!`).then(m => { if(m) m.delete(30000) });
    }
});

bot.login("Njc0MzMyMDM1NDk3NTkwNzk2.Xkf0aw.ECjqdJ88fTAYUYDlWzADR-KjJG4");

