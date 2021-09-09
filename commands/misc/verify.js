const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')

module.exports = {
    name: 'verify',
    hidden: true,
    userPerms: ['ADMINISTRATOR'],
    async execute(message, args, client) {
        const channel = await client.channels.fetch('884616438411845652')

        const button = new MessageButton()
        .setStyle('gray')
        .setLabel('I\'m a human')
        .setID('verify')
    
        const embed = new MessageEmbed()
        .setTitle('Hey there! 👋')
        .setDescription(`
        If you want to join the server and chat to other axolotls, then please click on the button below to verify and gain access to the rest of the server.
    
        This is prevent robots from beep booping all over the server!
        `)
        .addField('Note', 'If you are encounter any problems while trying to verify, please DM <@674914596108369954>.')
        .setColor(client.color)
        .setFooter(`Verification powered by ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        message.delete()
        channel.messages.fetch().then((messages) => {
            if(messages.size === 0) {
                channel.send(embed, button)
            } else {
                for (const message of messages) {
                    message[1].edit(embed)
                }
            }
        })
    }
}