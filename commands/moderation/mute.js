const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'mute',
    description: 'Mutes a member from the server.',
    usage: '<@user or user ID> [reason]',
    userPerms: ['MANAGE_MEMBERS'],
    async execute(message, args, client) {
        const member = message.mentions.members.first() || message.guild.members.cache.get((user) => user.id === args[0])
        const role = message.guild.roles.cache.find((role) => role.name === 'Muted')
        let reason = args.slice(1).join(' ')
        if(!reason) reason = 'No reason specified.'
        if(!member) return message.channel.send(
            new MessageEmbed()
            .setTitle('Oopsie Poopsie!')
            .setDescription('You didn\'t specify a user to mute. Please do so!')
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        )
        if(member.roles.cache.has(role.id)) return message.channel.send(
            new MessageEmbed()
            .setTitle('Oopsie Poopsie!')
            .setDescription('That user is already muted. Please mention another user!')
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        )
        await member.roles.add(role)
        message.channel.send(
            new MessageEmbed()
            .setTitle('Great he\'s finally quiet')
            .setDescription(`${member.user.username} has successfully been muted from the server.`)
            .addFooter('Reason', reason)
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        )
    }
}