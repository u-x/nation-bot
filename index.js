const express = require('express')
require('dotenv')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Bot online. Please leave this tab open or put it into https://uptimerobot.com as an HTTP monitor.')
})

app.listen(port, () => {
  console.log(`Listening on https://localhost:${port}.`)
})

const discord = require('discord.js')
require('discord-reply')
const roblox = require('noblox.js')
const WOKCommands = require('wokcommands')
const client = new discord.Client({
  partials: ['MESSAGE', 'REACTION']
})
const config = require('./config.json')

module.exports = { config, client, discord, roblox }

client.once('ready', () => {
  client.user.setActivity(`over ${config.nation_name} | ${config.prefix}help`, {type: 'WATCHING'})
  new WOKCommands(client, {
    commandsDir: 'cmds',
    testServers: config.whitelistedservers,
    showWarns: true,
    disabledDefaultCommands: [
      'command',
      'language',
      'prefix',
      'requiredrole',
      'channelonly',
    ],
  }).setColor(0x5865f2)
  .setDefaultPrefix(config.prefix)
  .setCategorySettings([
    {
      name: 'Border',
      emoji: '🛂'
    },
    {
      name: 'Ranking',
      emoji: '🔢'
    },
    {
      name: 'Admin',
      emoji: '⚠'
    }
  ])
})

setInterval(async () => {
  if (config.immigration.enabled == true) {
    let failedcheck = false
    let blacklistedgroups1 = 0
    let blacklistedgroups = config.immigration.blacklistedgroups
    let blacklistedusers = config.immigration.blacklistedusers
    const immigrants = await roblox.getPlayers(config.groupid, config.immigration.immigrationoffice)
    for (i = 0; i < immigrants.length; i++) {
      blacklistedgroups1 = 0
      const userGroups = await roblox.getGroups(immigrants[i].userId)
      for (f = 0; f < userGroups.length; f++) {
        for (l = 0; l < blacklistedgroups.length; l++) {
          if (blacklistedgroups[l] == userGroups[f].Id) {
            failedcheck = true
            blacklistedgroups1 += 1
          }
        }
      }
      for (f = 0; f < blacklistedusers.length; f++) {
        if (blacklistedusers[f] == immigrants[i].userId) {
          await roblox.setRank(config.groupid, immigrants[i].userId, Number(config.immigration.failrank))
          let iEmbed = new discord.MessageEmbed()
            .setTitle('Fail')
            .setColor('RED')
            .setDescription(`${immigrants[i].username} is a blacklisted user and has been successfully detained.`)
            .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${immigrants[i].userId}&width=420&height=420&format=png`)
          client.channels.cache.get(config.immigration.logchannel).send(iEmbed)
          return
        }
      }
      const player = await roblox.getPlayerInfo(immigrants[i].userId)
      if (player.age <= config.immigration.agelimit) {
        await roblox.setRank(config.groupid, immigrants[i].userId, config.immigration.failrank)
          client.channels.cache.get('818755081520021535').send(`**${immigrants[i].username}** (${immigrants[i].userId}) is underage and has been detained.`)
          return
      }
      if (config.immigration.un.enabled == true) {
        if (await roblox.getRankInGroup(config.immigration.un.group, immigrants[i].userId) >= config.immigration.un.unrank) {
          await roblox.setRank(config.groupid, immigrants[i].userId, Number(config.immigration.un.reprank))
          let iEmbed = new discord.MessageEmbed()
            .setTitle('Success')
            .setColor('GREEN')
            .setDescription(`${immigrants[i].username} was found as a representative from the United Nations and has been ranked to Foreign Representative.`)
            .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${immigrants[i].userId}&width=420&height=420&format=png`)
          client.channels.cache.get(config.immigration.logchannel).send(iEmbed)
          return
        }
      }
      if (failedcheck == true) {
        await roblox.setRank(config.groupid, immigrants[i].userId, Number(config.immigration.failrank))
        let iEmbed = new discord.MessageEmbed()
          .setTitle('Fail')
          .setColor('RED')
          .setDescription(`${immigrants[i].username} was caught in ${blacklistedgroups1} blacklisted groups and successfully detained.`)
          .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${immigrants[i].userId}&width=420&height=420&format=png`)
        client.channels.cache.get(config.immigration.logchannel).send(iEmbed)
        return
      } else {
        await roblox.setRank(config.groupid, immigrants[i].userId, Number(config.immigration.citizen))
        let iEmbed = new discord.MessageEmbed()
          .setTitle('Success')
          .setColor('GREEN')
          .setDescription(`${immigrants[i].username} was found in ${blacklistedgroups1} blacklisted groups and successfully immigrated.`)
          .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${immigrants[i].userId}&width=420&height=420&format=png`)
        client.channels.cache.get(config.immigration.logchannel).send(iEmbed)
        return
      }
    }
  }
}, 1000);

client.login(process.env.TOKEN)
roblox.setCookie(process.env.COOKIE)
