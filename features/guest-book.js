module.exports = async (client) => {
    const channel = await client.channels.fetch('885400617705668638')

    client.on('guildMemberAdd', (member) => {
        channel.send(`Welcome to TCA's Axolotl Club, ${member}! Please make sure to read the <#884421236778750003>.`)
    })

    client.on('guildMemberRemove', (member) => {
        channel.send(`Seems like ${member.user.username} left the server. Well that's great.`)
    })
}