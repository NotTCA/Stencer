const { MessageButton } = require('discord-buttons')

module.exports = {
    name: 'verify',
    userPerms: ['ADMINISTRATOR'],
    hidden: true,
    async execute(message, args, client) {
        const button = new MessageButton()
        .setStyle('gray')
        .setLabel('I\'m a human')
        .setID('verify')

        message.delete()
        message.channel.send('To join the Axolotl club and talk to other people who like Axolotls, please click on the button below.', button)
    }
}