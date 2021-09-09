module.exports = (client) => {
    const updateMembers = (guild) => {
      const channel = guild.channels.cache.get('884401501072687166')
      channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
    }
    const updateHumans = (guild) => {
      const channel = guild.channels.cache.get('884410449435709490')
      channel.setName(`Humans: ${guild.members.cache.filter(member => !member.user.bot).size}`)
    }
    const updateBots = (guild) => {
      const channel = guild.channels.cache.get('884412417910657055')
      channel.setName(`Bots: ${guild.members.cache.filter(member => member.user.bot).size}`)
    }
  
    client.on('guildMemberAdd', (member) => {
      updateMembers(member.guild)
      updateHumans(member.guild)
      updateBots(member.guild)
    })
    client.on('guildMemberRemove', (member) => {
      updateMembers(member.guild)
      updateHumans(member.guild)
      updateBots(member.guild)
    })

    const guild = client.guilds.cache.get('884356748016750622')
    updateMembers(guild)
    updateHumans(guild)
    updateBots(guild)
}