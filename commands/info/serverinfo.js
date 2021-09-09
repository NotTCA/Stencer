const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'serverinfo',
    description: 'Shows some info about your server.',
    async execute(message, args, client) {
        const { guild } = message

        const { name, id, owner, memberCount, members, emojis, roles, createdAt } = guild
        const icon = guild.iconURL({ dynamic: true })
        const channels = guild.channels.cache

        const embed = new MessageEmbed()
            .setAuthor(name, icon)
            .setThumbnail(icon)
            .addField('Server ID', id, false)
            .addField('Owner', owner, true)
            .addField('Owner ID', owner.user.id, true)
            .addField('Member Count', `${memberCount} **total**, ${members.cache.filter((member) => !member.user.bot).size} **humans**, and ${members.cache.filter((member) => member.user.bot).size} **bots**.`, false)
            .addField('Channels', `#️⃣ ${channels.filter((channel) => channel.type === 'text').size} **text** channels and 🔊 ${channels.filter((channel) => channel.type === 'voice').size} **voice** channels.`, true)
            .addField('Emojis', emojis.cache.size, true)
            .addField('Roles', roles.cache.size, true)
            .addField('📅 Creation Date', createdAt.toLocaleString())
            .setColor(client.color)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
}