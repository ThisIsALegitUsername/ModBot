const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  
	name: "addrole",
	aliases: ["ar"],
	description: "Adds role to the specified user",
	usage: "[name | nickname | mention | ID] <role>",
	accessableby: "admin/mod",

	execute: async (message, args) => {

		if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("**You don't have permission to add roles!**");
		if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("**I don't have permission to do this!**");

		if (!args[0]) return message.channel.send("**Please Enter A Role!**");

		const rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
		if (!rMember) return message.channel.send("**Please Enter A Username!**");
		if (rMember.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send("**Cannot Add Role To This User!**");

		const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(rp => rp.name.toLowerCase() === args.slice(1).join(" ").toLocaleLowerCase());
		if (!args[1]) return message.channel.send("**Please Enter A Role!**");

		if (!role) return message.channel.send("**Could Not Find That Role!**");

		if (role.managed) return message.channel.send("**Cannot Add That Role To The User!**");
		if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send("**Role Is Currently Higher Than Me Therefore Cannot Add It To The User!**");

		if (rMember.roles.cache.has(role.id)) return message.channel.send("**User Already Has The Role!**");
		if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id);
		const sembed = new MessageEmbed()
			.setColor("GREEN")
			.setAuthor(message.guild.name, message.guild.iconURL())
			.setDescription(`The role ${role} has been added to ${rMember.user.username}`);
		message.channel.send(sembed);

		const channel = db.fetch(`modlog_${message.guild.id}`);
		if (!channel) return;

		const embed = new MessageEmbed()
			.setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
			.setColor("#ff0000")
			.setThumbnail(rMember.user.displayAvatarURL({ dynamic: true }))
			.setFooter(message.guild.name, message.guild.iconURL())
			.addField("**Moderation**", "addrole")
			.addField("**Added Role to**", rMember.user.username)
			.addField("**Role Added**", role.name)
			.addField("**Added By**", message.author.username)
			.addField("**Date**", message.createdAt.toLocaleString())
			.setTimestamp();

		const sChannel = message.guild.channels.cache.get(channel);
		if (!sChannel) return;
		sChannel.send(embed);
	},
};