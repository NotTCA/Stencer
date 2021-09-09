module.exports = {
    name: 'tias',
    description: 'Links to https://tryitands.ee/',
    aliases: ['try', 'tryit'],
    async execute(message, args, client) {
        return message.channel.send('https://tryitands.ee/')
    }
}