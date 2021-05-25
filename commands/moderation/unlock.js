const Discord = require("discord.js");
const { prefix } = require("../../json/config");

module.exports = {

	name:"unlock",
	description:"unlock a locked channel",
	accessibleby: "Admininstrator",
	usage: `${prefix} unlock`,
	category: "Moderation",
	aliases: "unl",

	execute: async (message) => {

		if(!message.member.hasPermission("MANAGE_CHANNELS")) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setTitle("**You don't have enough permissions to use this command.**")
					.setColor(0xcff9ff)
					.setImage("https://cdn.discordapp.com/attachments/836044564158611486/836058814176034816/unknown.png"),
			) ||

      message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: true });
		}
		message.channel.send(new Discord.MessageEmbed()
			.setDescription(":unlock: This Channel Has Been Unlocked")
			.setColor("PURPLE")
			.setFooter(message.guild.name, message.guild.iconURL({
				dynamic: true,
			})),
		);
	} };