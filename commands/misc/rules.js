const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'rules',
    hidden: true,
    userPerms: ['ADMINISTRATOR'],
    async execute(message, args, client) {
        const channel = await client.channels.fetch('884421236778750003')

        const embed = new MessageEmbed()
        .setTitle('Hey there! 👋')
        .setDescription(`
        All rules in the server apply at all times *and in all places* (unless stated otherwise). If you break a rule you will usually receive a warning, and 5 of these within a month will be a ban.
        `)
        .addField('Extra notes:', `
        ➣ All Discord TOS and Guidelines apply.
        🔗 https://dis.gd/terms
        🔗 https://dis.gd/guidelines
        ➣ This is an English only server.
        ➣ Not every single rule is listed here, so please use common sense and read the channel topic of each channel to view any additional rules.
        ➣ If you see any mods not doing their job or abusing their powers, please report it to a higher ranked staff member.
        `)
        .addField('Rules', `
        1. No bullying
        2. No NSFW, aka anything sexual.
        3. No spam is allowed.
        4. No memes in <#884356748981448726>.
        5. Respect everyone's thought, ideas, and opinions.
        6. No racism.
        7. No talking about anything religion or political related.
        8. Swearing is allowed, just don't go all out saying the n word in the entire server.
        9. Only advertise in the <#884958116129673237> channel.
        10. You are not allowed to annoy people with soundboards, voice changers, or anything similar in VCs.
        `)
        .setColor(client.color)
        .setFooter('TCA\'s Axolotl Club', 'https://i.imgur.com/EmPoWzR.jpg')
        .setTimestamp()

        message.delete()
        channel.messages.fetch().then((messages) => {
            if(messages.size === 0) {
                channel.send(embed)
            } else {
                for (const message of messages) {
                    message[1].edit(embed)
                }
            }
        })
    }
}