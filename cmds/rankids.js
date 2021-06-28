const { config, client, discord, roblox } = require('../index.js')

module.exports = {
  slash: 'both',
  category: 'Ranking',
  testOnly: true,
  description: 'List off the rank IDs in a group.',
  expectedArgs: '<gcode>',
  minArgs: 1,
  maxArgs: 1,
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
    let [gcode] = args
    let gID = config.ranking.groups[gcode.toLowerCase()]
    if (gID == undefined) {
      if (message) {
        message.lineReply('The group code you entered does not exist in the bot\'s database. If you are the bot owner, you may change this in the config file.')
      }
      return 'The group code you entered does not exist in the bot\'s database. If you are the bot owner, you may change this in the config file.'
    }
    const getRoles = await roblox.getRoles(Number(gID))
    const formattedRoles = getRoles.map((r) => `\`${r.name}\` - Rank ID: **${r.rank}**`);
    const rankListEmbed = new discord.MessageEmbed()
      .setTitle('Here are all your ranks:')
      .setDescription(formattedRoles)
      .setColor('BLUE')
      .setTimestamp()
    if (message) {
      message.channel.send(rankListEmbed)
    }
    return rankListEmbed
  }
}