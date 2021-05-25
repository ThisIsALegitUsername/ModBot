const { prefix } = require("../../json/config");

module.exports = {
	name: "serverinfo",
	description: "Display info about this server.",
	usage: `${prefix} serverinfo`,
	execute(message) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};