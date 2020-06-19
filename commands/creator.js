module.exports = {
	name: 'creator',
	description: 'The creator/author of the bot.',
	execute(message, args) {
		message.channel.send('**The creator of the bot is: Willy#8302**');
	},
};
