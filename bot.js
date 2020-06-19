// Willy Bot was created/made by: Willy#8302
// ========================================================================
// = You do need npm and node.js installed first before running the code. =
// ========================================================================
// Here is a little tip: You can rename the "bot.js" to "index.js" if you want to do "node ." instead of "node bot.js"


const fs = require('fs');

const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const client = new Discord.Client();

const { prefix, token } = require('./config.json');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`My prefix is ${prefix}`);
});

client.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
  		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

      if (!command) return;


    if (command.guildOnly && msg.channel.type !== 'text') {
  		return msg.reply('I can\'t execute that command inside DMs!');
  	}

  	if (command.args && !args.length) {
  		let reply = `You didn't provide any arguments, ${msg.author}!`;

  		if (command.usage) {
  			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
  		}

  		return msg.channel.send(reply);
  	}

    if (!cooldowns.has(command.name)) {
    		cooldowns.set(command.name, new Discord.Collection());
    	}

    	const now = Date.now();
    	const timestamps = cooldowns.get(command.name);
    	const cooldownAmount = (command.cooldown || 3) * 1000;

    	if (timestamps.has(msg.author.id)) {
    		const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

    		if (now < expirationTime) {
    			const timeLeft = (expirationTime - now) / 1000;
    			return msg.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    		}
    	}

    	timestamps.set(msg.author.id, now);
    	setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

  try {
		command.execute(msg, args);
	} catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});

client.login(token);
