const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ban',
    description: 'Bans a member from the server.',
    usage: '<@user or user ID> [reason]',
    userPerms: ['BAN_MEMBERS'],
    async execute(message, args, client) {
        const member = message.mentions.members.first() || message.guild.members.cache.find((user) => user.id === args[0])
        var reason = args.slice(1).join(' ')
        if(!args[1]) reason = 'No reason specified.'

        if(!member) return message.channel.send(
            new MessageEmbed()
            .setTitle('Oopsie Poopsie!')
            .setDescription('You didn\'t specify a user to ban. Please do so!')
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        )
        if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(
            new MessageEmbed()
            .setTitle('Oopsie Poopsie!')
            .setDescription('The user you specified has a higher role than you, so you are not allowed to ban them.')
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        )
        try {
            await member.ban({ reason: `${reason}` }).then((mem) => {
                const embed = new MessageEmbed()
                .setTitle('Bonk!')
                .setDescription(`${mem.user.username} has successfully been banned from the server.`)
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