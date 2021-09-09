const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'purge',
    description: 'Deletes a specific amount of messages.',
    usage: '<amount of messages>',
    async execute(message, args, client) {
        const amountToPurge = args[0]

        const embed = new MessageEmbed()
        .setTitle('Boop!')
        .setDescription(`I have successfully deleted ${amountToPurge.toLocaleString()} messages!`)
        .setColor(client.color)
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        if(!args[0]) return message.channel.send(
            new MessageEmbed()
            .setTitle('Oopsie Poopsie!')
            .setDescription('You didn\'t specify a number of messages to delete. Please do so!')
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        )

        if(isNaN(amountToPurge)) return message.channel.send(
            new MessageEmbed()
            .setTitle('Oopsie Poopsie!')
            .setDescription('You specified something that isn\'t a number. Please do so!')
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        )

        message.delete()
        await message.channel.bulkDelete(amountToPurge)
        message.channel.send(embed).then(v => v.delete({ timeout: 5 * 1000 }))
    }
}