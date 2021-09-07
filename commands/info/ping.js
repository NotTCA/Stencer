module.exports = {
    name: 'ping',
    async execute(message, args, client) {
        await message.reply('Pong!')
    }
}