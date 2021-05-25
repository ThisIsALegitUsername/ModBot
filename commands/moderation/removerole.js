module.exports = {
	name: "removerole",
	description: "Remove A Role From A User",

	execute(message, args, member) {

		if (!message.member.hasPermission("MANAGE_ROLES")) {return message.channel.send("You don't have permission to do this!");}

		if (!member) {return message.channel.send("You have not mentioned a user");}

		const remove = args.slice(1).join(" ");
		if (!remove) {return message.channel.send("You have not specified a role");}

		const roleRemove = message.guild.roles.cache.find(role => role.name === remove);
		if (!roleRemove) {return message.channel.send("This role does not exist");}

		if (!member.roles.cache.get(roleRemove.id)) {return message.channel.send(`This user does not have the ${remove} role`);}

		member.roles.remove(roleRemove.id).then((member) => {
			message.channel.send(`${remove} removed from ${member.displayName}`);
		});
	},
};