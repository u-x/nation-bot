const { config, client, discord, roblox } = require('../index.js')
const fs = require('fs')

module.exports = {
  slash: 'both',
  category: 'Border',
  testOnly: true,
  description: 'Modify the blacklist.',
  expectedArgs: '<groups or users> <add-remove-view> [id]',
  minArgs: 2,
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
    let [guid, arid, gu] = args
    if (guid.toLowerCase() == 'groups') {
      if (arid.toLowerCase() == 'add') {
        if (config.immigration.blacklistedgroups.find(element => element == usera)) {
          if (message) {
            message.lineReply('This group is already on the blacklist.')
          }
          return 'This group is already on the blacklist.'
        }
        const gObj = await roblox.getGroup(Number(gu)).catch(err => {
          console.log(err)
          if (message) {
            message.lineReply("An error occured while getting the group.")
          }
          return "An error occured while getting the group."
        })
        config.immigration.blacklistedgroups.push(Number(gu))
        fs.writeFileSync('./config.json', JSON.stringify(config, null, 4))
        if (message) {
          message.reply(`${gObj.name} (${gu}) has been added to the immigration blacklist.`)
        }
        return `${gObj.name} (${gu}) has been added to the immigration blacklist.`
      } else if (arid.toLowerCase() == 'remove') {
        const gObj = await roblox.getGroup(Number(gu)).catch(err => {
          console.log(err)
          if (message) {
            message.lineReply("An error occured while getting the group.")
          }
          return "An error occured while getting the group."
        })
        for (i = 0; i < config.immigration.blacklistedgroups.length; i++) {
          if (config.immigration.blacklistedgroups[i] == Number(gu)) {
            config.immigration.blacklistedgroups.splice(i, 1)
          }
        }
        fs.writeFileSync('./config.json', JSON.stringify(config, null, 4))
        if (message) {
          message.reply(`${gObj.name} (${gu}) has been removed from the immigration blacklist if they were on it.`)
        }
        return `${gObj.name} (${gu}) has been removed from the immigration blacklist if they were on it.`
      } else if (arid.toLowerCase() == 'view') {
        beginstr = `Here are all groups blacklisted in your bot:\n\n`
        for (i = 0; i < config.immigration.blacklistedgroups.length; i++) {
          let list = config.immigration.blacklistedgroups
          let group = await roblox.getGroup(list[i]).catch(err => {
            console.log(err)
          })
          let name
          if (!group) {
            name = "Name could not be retrieved for this group"
          } else {
            name = group.name
          }
          beginstr += `- \`${name}\` (${String(list[i])})\n`
        }
        const iEmbed = new discord.MessageEmbed()
          .setTitle(`Blacklisted Groups`)
          .setDescription(beginstr)
          .setColor('BLUE')
          .setTimestamp()
        if (message) {
          message.lineReply(iEmbed)
        }
        return iEmbed
      } else {
        if (message) {
          message.lineReply(`Second argument must be either \`add\`, \`remove\`, or \`view\`.`)
        }
        return `Second argument must be either \`add\`, \`remove\`, or \`view\`.`
      }
    } else if (guid.toLowerCase() == 'users') {
      if (arid.toLowerCase() == 'add') {
        let uID = await roblox.getIdFromUsername(gu).catch(err => {
          console.log(err)
          if (message) {
            message.lineReply(`An error occured.`)
          }
          return `An error occured.`
        })
        if (config.immigration.blacklistedusers.find(element => element == uID)) {
          if (message) {
            message.lineReply('This user is already on the blacklist.')
          }
          return 'This user is already on the blacklist.'
        }
        let realname = await roblox.getUsernameFromId(uID)
        config.immigration.blacklistedusers.push(Number(uID))
        fs.writeFileSync('./config.json', JSON.stringify(config, null, 4))
        if (message) {
          message.reply(`${realname} (${uID}) has been added to the immigration blacklist.`)
        }
        return `${realname} (${uID}) has been added to the immigration blacklist.`
      } else if (arid.toLowerCase() == 'remove') {
        let uID = await roblox.getIdFromUsername(gu).catch(err => {
          console.log(err)
          if (message) {
            message.lineReply(`An error occured.`)
          }
          return `An error occured.`
        })
        let realname = await roblox.getUsernameFromId(uID)
        for (i = 0; i < config.immigration.blacklistedusers.length; i++) {
          if (config.immigration.blacklistedusers[i] == uID) {
            config.immigration.blacklistedusers.splice(i, 1)
          }
        }
        fs.writeFileSync('./config.json', JSON.stringify(config, null, 4))
        if (message) {
          message.reply(`${realname} (${uID}) has been removed from the immigration blacklist if they were on it.`)
        }
        return `${realname} (${uID}) has been removed from the immigration blacklist if they were on it.`
      } else if (arid.toLowerCase() == 'view') {
        beginstr = `Here are all users blacklisted in your bot:\n\n`
        for (i = 0; i < config.immigration.blacklistedusers.length; i++) {
          let list = config.immigration.blacklistedusers
          let name = await roblox.getUsernameFromId(list[i])
          beginstr += `- \`${name}\` (${String(list[i])})\n`
        }
        const iEmbed = new discord.MessageEmbed()
          .setTitle(`Blacklisted Users`)
          .setDescription(beginstr)
          .setColor('BLUE')
          .setTimestamp()
        if (message) {
          message.lineReply(iEmbed)
        }
        return iEmbed
      } else {
        if (message) {
          message.lineReply(`Second argument must be either \`add\`, \`remove\`, or \`view\`.`)
        }
        return `Second argument must be either \`add\`, \`remove\`, or \`view\`.`
      }
    } else {
      if (message) {
        message.lineReply(`First argument must be either \`groups\` or \`users\`.`)
      }
      return `First argument must be either \`groups\` or \`users\`.`
    }
  }
}
