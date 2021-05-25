const { prefix } = require("../../json/config");

module.exports = {
	name: "purge",
	description: "Delete up to 99 messages.",
	usage:`${prefix} purge <num 1-100 >`,
	accessibleby:"Mod/Admin",
	execute(message, args) {

		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to do this!");

		const number = args.join(" ");
		if(!number) return message.channel.send("You didn't specify a number to purge!");
		message.channel.bulkDelete(number).catch(console.error);
	},
};
