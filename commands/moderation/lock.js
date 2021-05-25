const Discord = require("discord.js");
const { prefix } = require("../../json/config");


module.exports = {
	name: "lock",
	description: "Locks the channels",
	usage:`${prefix} lock`,
	accessibleby: "admin/mod",

	execute(message) {

		if(!message.member.hasPermission("MANAGE_CHANNELS")) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setTitle("**You don't have enough permissions to use this command.**")
					.setColor(0xcff9ff)
					.setImage("https://cdn.discordapp.com/attachments/836044564158611486/836058814176034816/unknown.png"),
			);
		}
		message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
		message.channel.send(new Discord.MessageEmbed()
			.setImage("https://cdn.discordapp.com/attachments/833139865352273930/835651790149517370/image0.gif")
			.setDescription("**Channel Locked**")
			.setColor(0xFF8C00)
			.setFooter(message.guild.name, message.guild.iconURL({
				dynamic: true,
			})),
		);
	},
};