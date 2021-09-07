const { Client, Collection, MessageEmbed } = require('discord.js')
const client = new Client({
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    restTimeOffset: 0,
    presence: {
        activity: {
            name: 'TCA pressing F',
            type: 'STREAMING',
            url: 'https://www.youtube.com/watch?v=23LnpONVmOc'
        }
    }
})
require('discord-buttons')(client)
client.config = require('./config.json')
const { prefix, ownerID } = client.config
const keepAlive = require('./server')

const { readdirSync } = require('fs')
client.commands = new Collection()
client.aliases = new Collection()
client.categories = readdirSync('./commands/')
require('./handlers/commands')(client)

client.on('ready', () => {
    require('./handlers/features')(client)

    console.log(`${client.user.tag} is now online!`)
    keepAlive()
})

client.on('message', async (message) => {
    if (!message.guild || message.author.bot) return

    if(!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).split(/ +/)
    const cmd = args.shift().toLowerCase()
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd))

    if (command) {
        if (command.wip && message.author.id !== ownerID)
            return message.reply(
                "This command is currently a **W**ork **I**n **P**rogress."
            );

        if (command.userPerms && !message.member.hasPermission(command.userPerms))
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle("Oopsie Poopsie!")
                    .setDescription(
                        `You need the following permissions to use this command: \`${command.userPerms
                            .map(
                                (value) =>
                                    `${value[0].toUpperCase() +
                                    value.toLowerCase().slice(1).replace(/_/gi, " ")
                                    }`
                            )
                            .join(", ")}\``
                    )
                    .setColor(client.color)
                    .setFooter(
                        client.user.username,
                        client.user.displayAvatarURL({ dynamic: true })
                    )
                    .setTimestamp()
            );

        command.execute(message, args, client);
    } else {
        return message.delete();
    }
})

client.on('clickButton', async (button) => {
    const member = button.clicker.member
    const role = button.guild.roles.cache.get('884616331922665532')
    if(button.id === 'verify') {
        if(member.roles.cache.has(role.id)) return button.reply.send('You are already verified. No need to click the button again.', true)
        button.reply.send('Success. You are now verified.', true)
        await member.roles.add(role)
    } 
})

client.login(process.env.token)