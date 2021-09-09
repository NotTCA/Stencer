module.exports = {
    name: 'justask',
    description: 'Links to https://dontasktoask.com/',
    aliases: ['data', 'ask'],
    async execute(message, args, client) {
        return message.channel.send('https://dontasktoask.com/')
    }
}