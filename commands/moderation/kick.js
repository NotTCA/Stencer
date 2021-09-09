const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'kick',
    description: 'Kicks a member from the server.',
    usage: '<@user or user ID> [reason]',
    userPerms: ['BAN_MEMBERS'],
    async execute(message, args, client) {
        const member = message.mentions.members.first() || message.guild.members.cache.find((user) => user.id === args[0])
        let reason = args.slice(1).join(' ') || 'No reason specified.'

        if(!member) return message.channel.send(
            new MessageEmbed()
            .setTitle('Oopsie Poopsie!')
            .setDescription('You didn\'t specify a user to kick. Please do so!')
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        )
        if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(
            new MessageEmbed()
            .setTitle('Oopsie Poopsie!')
            .setDescription('The user you specified has a higher role than you, so you are not allowed to kick them.')
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        )
        try {
            await member.kick(reason).then((mem) => {
                const embed = new MessageEmbed()
                .setTitle('Bonk!')
                .setDescription(`${mem.user.username} has successfully been kicked from the server.`)
                .setColor(client.color)
                .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                
                message.channel.send(embed)
            })
        } catch (err) {
            console.log(err)
        }
    }
}