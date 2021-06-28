const fs = require('fs')
const config = require('../config.json')

module.exports = {
  slash: 'both',
  category: 'Border',
  testOnly: true,
  description: 'Toggle the immigration system.',
  expectedArgs: '<on or off>',
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
    if (config.immigration.enabled !== true) {
      if (message) {
        message.lineReply("Immigration is disabled. Please enable it through the bot's config and fix all the settings required to use it.")
      }
      return "Immigration is disabled. Please enable it through the bot's config and fix all the settings required to use it."
    }
    if (!args[0]) return message.lineReply('Please include a toggle. Must be either on or off.')
    if (args[0] == 'on') {
      config.immigration.toggle = true
      fs.writeFileSync('./config.json', JSON.stringify(config, null, 4))
      if (message) {
        message.lineReply("Immigration is now open.")
      }
      return "Immigration is now open."
    } else if (args[0] == 'off') {
      config.immigration.toggle = false
      fs.writeFileSync('./config.json', JSON.stringify(config, null, 4))
      if (message) {
        message.lineReply("Immigration is now closed.")
      }
      return "Immigration is now closed."
    } else {
      if (message) {
        message.lineReply("The toggle must be either on or off.")
      }
      return "The toggle must be either on or off."
    }
  }
}