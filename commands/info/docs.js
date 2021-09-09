const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'docs',
    description: 'Displays Discord.JS documentation.',
    usage: '<documentation search query>',
    async execute(message, args, client) {
        const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args[0])}`

        if(!args[0]) return message.channel.send(
            new MessageEmbed()
            .setTitle('Oopsie Poopsie!')
            .setDescription('You didn\'t specify a search query. Please do so!')
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        )

        axios.get(uri).then(res => {
            const { data } = res

            const embed = new MessageEmbed(data)

            embed.setColor(client.color)
            embed.setTimestamp()
            embed.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))

            if(data && !data.error) {
                message.channel.send(embed)
            } else {
                message.channel.send(
                    new MessageEmbed()
                    .setTitle('Oopsie Poopsie!')
                    .setDescription('I couldn\'t find that documentation in the Discord.JS docs. Please specify something that actually exists on the Discord.JS docs!')
                    .setColor(client.color)
                    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                )
            }
        }).catch(err => {
            console.log(err)
        })
    }
}