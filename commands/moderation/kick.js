const Discord = require("discord.js");

// ========================================== \\

module.exports = {
	name: "kick",
	description: "Kick user from your discord server",
	execute(message) {
		const user = message.mentions.users.first();
		if (user) {
			const member = message.guild.members.resolve(user);

			if (member) {
				member
					.kick(`${user.tag} was kicked by ${message.author}`)
					.then(() => {
						const pomyslniewyrzucono = new Discord.MessageEmbed()
							.setAuthor("Kick")
							.setDescription(
								`${user.tag} has successfully been kicked by ${message.author}`,
							)
							.setTimestamp();
						message.channel.send(pomyslniewyrzucono);
					})
					.catch(err => {
						const niemoge = new Discord.MessageEmbed()
							.setTitle("Kick")
							.setDescription(
								`${user.tag} cannot be kicked (I have too small permissions or user has the same or higher role)`,
							);
						message.channel.send(niemoge);
						console.error(err);
					});
			}
			else {
				const niematakiegouzytkownika = new Discord.MessageEmbed()
					.setAuthor("Kick")
					.setDescription(`There is no such user on the server as ${user.tag}`);
				message.channel.send(niematakiegouzytkownika);
			}
		}
		else {
			const nikogonieoznaczyles = new Discord.MessageEmbed()
				.setAuthor("Kick")
				.setDescription(
					`${message.author}, bad command usage, correct use:\n!kick @user`,
				);
			message.channel.send(nikogonieoznaczyles);
		}
	},
};
