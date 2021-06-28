const { config, client, discord, roblox } = require('../index.js')

module.exports = {
  slash: 'both',
  category: 'Ranking',
  testOnly: true,
  description: 'Read off the group codes bound in the config.',
  callback: async ({ message, interaction, args }) => {
    let usera
    if (message) {
      usera = message.author.id
    } else {
      usera = interaction.member.user.id
    }
    if (!config.whitelistedusers[usera]) {
      if (message) {
        message.lineReply("You are not whitelisted to use this bot. Contact its owner if you feel this is a mistake.")
      }
      return "You are not whitelisted to use this bot. Contact its owner if you feel this is a mistake."
    }
    let beginStr = `Here are your group codes:\n\n`
    let gcodearray = Object.entries(config.ranking.groups)
    for (i = 0; i < gcodearray.length; i++) {
      let [key, value] = gcodearray[i]
      let gObj = await roblox.getGroup(value)
      beginStr += `${key} → ${gObj.name} (${value})\n`
    }
    beginStr += `\nThese are group codes that may be used with the ${config.prefix}rank and ${config.prefix}rankids commmands.`

    let iEmbed = new discord.MessageEmbed()
      .setTitle('Group Codes')
      .setDescription(beginStr)
      .setColor('BLUE')
      .setTimestamp()
    if (message) {
      message.lineReply(iEmbed)
    }
    return iEmbed
  }
}