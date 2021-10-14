# nation-bot

A simple bot to suit your ro-nation's needs. Takes little time to set up.

**THIS DOES REQUIRE NODE.JS IF YOU ARE RUNNING IT ON YOUR MAIN COMPUTER! https://nodejs.org/en/**

The main file that will be used in this guide will be the `config.json`.
**I am not responsible for any ratelimiting issues within this bot.**

If you need any further assistance, contact [Ieo#2006](https://discord.com/user/754141987166486628) ([754141987166486628](https://discord.com/users/754141987166486628)) on discord or open an issue.

## Links

- [Setup](https://github.com/justIeo/nation-bot#setup)
- [Roblox account/discord bot setup](https://github.com/justIeo/nation-bot#roblox-account-and-discord-bot-account-setup)
- [Hosting method](https://github.com/justIeo/nation-bot#hosting-if-you-cannot-do-this-on-your-pc)
- [Fix 429 TooMany Requests Error](https://github.com/justIeo/nation-bot#fix-ratelimit)
- [Questions/concerns](https://github.com/justIeo/nation-bot#questions-or-bugs-about-this-bot)

## Setup

In this guide I will go through each part of the config file. Most is self explanatory but there are a couple confusing parts.

### groupid
Pretty self-explanatory. Just copy and paste your group id.

### immigration
This is an object consisting of many different parts.

>- `enabled`: Only set this to true if you would like immigration features enabled in your bot, meaning it will automatically rank anyone who joins to citizen after making sure they meet requirements.
>- `toggle`: The toggle is there to have immigration inactive/active. This is useful during elections or you just simply want to close the borders. This can also be changed through the bot's commands.
>- `immigrationoffice`: This is NOT the ID you think it is. I recommend getting this by installing [BTRoblox](https://chrome.google.com/webstore/detail/btroblox-making-roblox-be/hbkpclpemjeibhioopcebchdmohaieln), then going to your group's page, expanding your role list, and right click the rank. Go to the BTRoblox UI and click "Copy role id" as pictured below.
>
> ![Right click dialogue](https://i.imgur.com/ZnHnKyD.png)
> 
>- `citizenrank` and `failrank`: These are normal rank ids and can be obtained by going into your group's config and looking at the role settings. This can otherwise be obtained using the aforementioned method with BTRoblox, but instead of copying the role id, copy the role **rank**.
>- `logchannel`: This may be obtained by right clicking the channel you would like the bot to log immigrants into and copying its ID. You must have Discord developer mode on to do this. In your Discord settings, go to Appearance and scroll to the bottom to find this setting.
>
> ![Copying channel id](https://i.imgur.com/CBamDYT.png)
> 
>- `blacklistedgroups` and `blacklistedusers`: These are optional and will filter out anyone in any groups listed/match the user ID of the blacklist. They use group and user IDs and may be done as pictured below. These are also changeable through the bot's commands.
>
> ![Example list](https://i.imgur.com/DqaBXyB.png)
> 
>- `agelimit`: Optional. This filters out users younger than a certain amount of days out of your group.
>- `un`: Optional. This is allowed if you are in a United Nations or any other organization that is mainly recognized and will automatically rank users who have the set rep rank to Foreign Ambassador.
>>- `enabled`: The toggle. Set this to false if you do not recognize any major organization.
>>- `group`: The group ID of the organization.
>>- `unrank`: The rank ID of representatives from the organization. Anything ranked this and above will be ranked Foreign Representative in your group. You can grab this using the aforementioned method for `blacklistedgroups`.
>>- `reprank`: The representative rank in your group. You can grab this using the aforementioned method for `blacklistedgroups`.

### ranking
This part includes instructions on how to set up the ranking feature. Yes, you can change group ranks from the bot!

>- `enabled`: Set this to false if you would not liek ranking features on your bot.
>- `groups`: An object consisting of your group and whatever subgroups you would like rankable. Your bot account must be ranked in said groups. Use the format provided with the exmaple config file. Each key must be one word, however underscores and dashes may be used.

### prefix
A prefix if you do not want to use slash commands with your bot.

### whitelistedservers
I set up a whitelist for this bot so that no commands are run in a server that the bot is not supposed to be in. An example of this would look like something below. You will need discord developer mode.

![servers list](https://i.imgur.com/R2Qatgk.png)


### whitelistedusers
Basically same as whitelistedservers but it does have a twist. Anyone with the 'admin' value will be able to whitelist anyone they want to use the bot, however if you would like to make someone a normal user, use the 'user' value.

### nationname
This will be your nation's name. The bot will display its status as `Watching over {nationname} | {prefix}help`.

## Roblox account and discord bot account setup
A bot setup is pretty easy. Head to [Discord's Developer Hub](https://discord.com/developers/applications) and create a new application. Once you have done so, head to the "Bot" tab on the application. Click Build-a-bot and then copy the bot's token. From there you may go to the .env (Environment variables tab for repl users) file and paste the account's token in the TOKEN field. To invite it to your server, go to the "General Information" tab and copy the client ID. Fill in your client id in the following link: https://discord.com/api/oauth2/authorize?client_id=your_application_id_here&permissions=8&scope=bot%20applications.commands

Next, make a new Roblox account and name it whatever you want. Join all of the groups that you have linked with the bot in the config file, and make sure it gets ranking permissions in every one. From there, Inspect (Ctrl+Shift+I) and then go to the "Application" tab. Expand Cookies, and go to the one with hte Roblox URL. Copy the .ROBLOSECURITY, including the warning. Put this in the COOKIE field of the .env file.

![ctrl+shift+i menu](https://i.imgur.com/wtawQ5N.png)


**PLEASE NOTE THAT I DO NOT HAVE ACCESS TO ANY OF THESE ACCOUNTS THAT YOU HAVE PUT HERE. IF YOU DON'T TRUST ME, THEN DON'T USE IT.**

## Hosting (if you cannot do this on your pc)

If you are looking for a free project host for this, I recommend Repl.it.

  1. Go to [https://replit.com](https://replit.com).
  2. Make an account if you don't already have one. Then proceed to making a new repl BUT DO NOT HIT THE CREATE BUTTON.
  3. Hit the "Import from GitHub" tab and type in `justIeo/nation-bot`. The repl will be created with the base bot.
  4. Configure the config.json and the "Environment variables" tab file to your liking.
  5. Hit the "Run" button and head to [https://uptimerobot.com](https://uptimerobot.com). Make an account or log in if you have one.
  6. Make a new HTTPS monitor with the URL of `project-name.repl-username.repl.co`. This will also be linked in the top right of your project once you run it for the first time.  The friendly name does not matter. Leave it at a 5 minute check time as repls go offline every 5 minutes.
  7. It should be up and running and it should go 24/7.
  8. If you get the '429 TooMany Requests' error after a while of running, please read [this](https://github.com/justIeo/nation-bot#fix-ratelimit).

## Fix ratelimit
Are you getting ratelimited too often? No worries! It's a very simple fix. In the index.js file on line 124, there is a number (defaulted at 1000). This is the amount of milliseconds that the immigration office gets checked, meaning it gets checked every second. Change it to something like 5000 to fix it.

![ratelimit fix](https://i.imgur.com/6ihhHI9.png)

## Questions or bugs about this bot?
If you have spotted any bugs within the bot or have any questions, open an issue on this repository or DM me on discord at [Ieo#2006](https://discord.com/user/754141987166486628) ([754141987166486628](https://discord.com/users/754141987166486628)). I may also set this up for you if you so choose and trust me enough. I hope you all enjoy. :D

[To top](https://github.com/justIeo/nation-bot#nation-bot)
