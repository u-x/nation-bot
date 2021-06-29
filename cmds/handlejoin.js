const { config, client, discord, roblox } = require('../index.js')

module.exports = {
  slash: 'both',
  category: 'Ranking',
  testOnly: true,
  description: 'Handle a join request in your roblox group.',
  expectedArgs: '<group code> <roblox username> <accept-deny>',
  minArgs: 3,
  maxArgs: 3,
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
    if (config.ranking.enabled !== true) {
      if (message) {
        message.lineReply("Ranking is disabled. Please enable it through the bot's config and fix all the settings required to use it.")
      }
      return "Ranking is disabled. Please enable it through the bot's config and fix all the settings required to use it."
    }
    let [gcode, username, rankid] = args
    if (!gcode || !username || !rankid) {
      if (message) {
        message.lineReply('You are missing an argument.')
      }
      return "You are missing an argument."
    }
    let gID = config.ranking.groups[gcode.toLowerCase()]
    if (gID == undefined) {
      if (message) {
        message.lineReply('The group code you entered does not exist in the bot\'s database. If you are the bot owner, you may change this in the config file.')
      }
      return 'The group code you entered does not exist in the bot\'s database. If you are the bot owner, you may change this in the config file.'
    }
    let groupObj = await roblox.getGroup(Number(gID))
    let uID = await roblox.getIdFromUsername(username).catch(err => {
      console.log(err)
      if (message) {
        message.lineReply('An error occured.')
      }
      return 'An error occured.'
    })
    let realname = await roblox.getUsernameFromId(uID)
    if (rankid.toLowerCase() == 'accept') {
        await roblox.handleJoinRequest(Number(gID), uID, true)
        let iEmbed = new discord.MessageEmbed()
            .setTitle(`Success`)
            .setDescription(`${realname} has been accepted into ${groupObj.name}.`)
            .setColor('GREEN')
            .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${uID}&width=420&height=420&format=png`)
            .setTimestamp()
        if (message) {
            message.lineReply(iEmbed)
        }
        return iEmbed
    } else if (rankid.toLowerCase() == 'deny') {
        await roblox.handleJoinRequest(Number(gID), uID, false)
        let iEmbed = new discord.MessageEmbed()
            .setTitle(`Success`)
            .setDescription(`${realname} has been denied from joining ${groupObj.name}.`)
            .setColor('GREEN')
            .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${uID}&width=420&height=420&format=png`)
            .setTimestamp()
        if (message) {
            message.lineReply(iEmbed)
        }
        return iEmbed
    } else {
        if (message) {
            message.lineReply(`accept-deny must be either \`accept\` or \`deny\`.`)
        }
    }
    
  }
}
