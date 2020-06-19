module.exports = {
	name: 'user-info',
	description: 'Shows infomation about you.',
	execute(message, args) {
    const Discord = require('discord.js');
    const { MessageEmbed } = require('discord.js');

    const exampleEmbed = new Discord.MessageEmbed()
  .setColor('#98FB98')
  .setDescription(`Info about ${message.author.username}`)
  .addFields(
    { name: 'Username', value: `${message.author.username}`, inline: true },
    { name: 'User ID', value: `${message.author.id}`, inline: true },
  )
  .setTimestamp()
  .setFooter('Willy Bot at your service!', 'https://cdn.discordapp.com/avatars/723467431074463757/1591720c022723e5a8990b91d5d82522.png?size=128');

message.channel.send(exampleEmbed);
	},
};
