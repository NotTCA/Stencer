module.exports = (client) => {
    client.on('message', (message) => {
        if(message.channel.type === 'news' && message.content.includes('@everyone')) {
            message.crosspost()
        }
    })
}