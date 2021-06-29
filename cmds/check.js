const { config, client, discord, roblox } = require('../index.js')
let blacklistedgroups = config.immigration.blacklistedgroups
let blacklistedusers = config.immigration.blacklistedusers

module.exports = {
  slash: 'both',
  category: 'Border',
  testOnly: true,
  description: 'Check and make sure a user meets immigration requirements.',
  permissions: ['ADMINISTRATOR'],
  expectedArgs: '<roblox username>',
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
    if (config.immigration.toggle !== true) {
      if (message) {
        message.lineReply(`Immigration is currently off. Please turn it on using the \`${config.prefix}immigration on\` command.`)
      }
      return `Immigration is currently off. Please turn it on using the \`${config.prefix}immigration on\` command.`
    }
    let [user] = args
    let uID = await roblox.getIdFromUsername(user).catch(err => {
      console.log(err)
      if (message) {
        message.lineReply('This user does not exist on Roblox.')
      }
      return 'This user does not exist on Roblox.'
    })
    let realname = await roblox.getUsernameFromId(uID)
    const userGroups = await roblox.getGroups(uID)
    let failedcheck
    for (f = 0; f < userGroups.length; f++) {
      for (l = 0; l < blacklistedgroups.length; l++) {
        if (blacklistedgroups[l] == userGroups[f].Id) {
          failedcheck = true
          blacklistedgroups1 += 1
        }
      }
    }
    for (f = 0; f < blacklistedusers.length; f++) {
      if (blacklistedusers[f] == uID) {
        await roblox.setRank(config.groupid, uID, Number(config.immigration.failrank))
        let iEmbed = new discord.MessageEmbed()
          .setTitle('Fail')
          .setColor('RED')
          .setDescription(`${realname} is a blacklisted user and has been successfully detained.`)
          .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${uID}&width=420&height=420&format=png`)
        client.channels.cache.get(config.immigration.logchannel).send(iEmbed)
        if (message) {
          message.lineReply('This user has been caught and deemed ineligible for immigration.')
        }
        return 'This user has been caught and deemed ineligible for immigration.'
      }
    }
    if (config.immigration.un.enabled == true) {
      if (await roblox.getRankInGroup(config.immigration.un.group, uID) >= config.immigration.un.unrank) {
        await roblox.setRank(config.groupid, uID, Number(config.immigration.un.reprank))
        let iEmbed = new discord.MessageEmbed()
          .setTitle('Success')
          .setColor('GREEN')
          .setDescription(`${immigrants[i].username} was found as a representative from the United Nations and has been ranked to Foreign Representative.`)
          .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${uID}&width=420&height=420&format=png`)
        client.channels.cache.get(config.immigration.logchannel).send(iEmbed)
        return
      }
    }
    const player = await roblox.getPlayerInfo(uID)
    if (player.age <= config.immigration.agelimit) {
      await roblox.setRank(config.groupid, uID, config.immigration.failrank)
      let iEmbed = new discord.MessageEmbed()
          .setTitle('Fail')
          .setColor('RED')
          .setDescription(`${realname} is a underage and has been successfully detained.`)
          .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${uID}&width=420&height=420&format=png`)
      client.channels.cache.get(config.immigration.logchannel).send(iEmbed)
      if (message) {
        message.lineReply('This user has been caught and deemed ineligible for immigration.')
      }
      return 'This user has been caught and deemed ineligible for immigration.'
    }

    if (failedcheck == true) {
      await roblox.setRank(config.groupid, uID, Number(config.immigration.failrank))
      let iEmbed = new discord.MessageEmbed()
        .setTitle('Fail')
        .setColor('RED')
        .setDescription(`${realname} was caught in ${blacklistedgroups1} blacklisted groups and successfully detained.`)
        .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${uID}&width=420&height=420&format=png`)
      client.channels.cache.get(config.immigration.logchannel).send(iEmbed)
      if (message) {
        message.lineReply('This user has been caught and deemed ineligible for immigration.')
      }
      return 'This user has been caught and deemed ineligible for immigration.'
    } else {
      if (message) {
        message.lineReply('This user has been checked and is deemed eligible for immigration.')
      }
      return 'This user has been checked and is deemed eligible for immigration.'
    }
  }
}
