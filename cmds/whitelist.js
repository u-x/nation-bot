const { config, client, discord, roblox } = require('../index.js')
const fs = require('fs')

module.exports = {
  slash: 'both',
  category: 'Admin',
  testOnly: true,
  description: 'Modify the whitelist.',
  expectedArgs: '<add-remove-view> <user id>',
  minArgs: 2,
  maxArgs: 2,
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
    let [onoff, uid] = args
    if (config.whitelistedusers[usera] !== "admin") {
      console.log(config.whitelistedusers[usera])
      if (message) {
        message.lineReply("You do not have permission to manage this bot's whitelist.")
      }
      return "You do not have permission to manage this bot's whitelist."
    }
    if (onoff == 'add') {
      if (config.whitelistedusers[uid]) {
        if (message) {
          message.lineReply('This user is already whitelisted.')
        }
        return 'This user is already whitelisted.'
      }
      config.whitelistedusers[uid] = "user"
      fs.writeFileSync('./config.json', JSON.stringify(config, null, 4))
      if (message) {
        message.lineReply(`Added <@${uid}> to the whitelist.`)
      }
      return `Added <@${uid}> to the whitelist.`
    } else if (onoff == 'remove') {
      if (!config.whitelistedusers[uid]) {
        if (message) {
          message.lineReply('This user is not whitelisted.')
        }
        return 'This user is not whitelisted.'
      }
      delete config.whitelistedusers[uid]
      fs.writeFileSync('./config.json', JSON.stringify(config, null, 4))
      if (message) {
        message.lineReply(`Removed <@${uid}> from the whitelist.`)
      }
      return `Removed <@${uid}> from the whitelist.`
    } else if (onoff == 'view') {
      let beginStr = `Here are the users whitelisted in the bot:\n\n`
      let objarray = Object.entries(config.whitelistedusers)
      for (i = 0; i < objarray.length; i++) {
        let [key, value] = objarray[i]
        beginStr += `<@${key}> → ${value}\n`
      }
      let iEmbed = new discord.MessageEmbed()
        .setTitle('Whitelist')
        .setDescription(beginStr)
        .setColor('BLUE')
        .setTimestamp()
      if (message) {
        message.lineReply(iEmbed)
      }
      return iEmbed
    } else {
      if (message) {
        message.lineReply("First argument must be either `add`, `remove` or `view`.")
      }
      return "First argument must be either `add` or `remove.`"
    }
  }
}