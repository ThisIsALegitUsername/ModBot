const { DiscordEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
	name: "ban",
	description: "Ban member from your discord server",
	execute(message) {
		const user = message.mentions.users.first();
		if (user) {
			const member = message.guild.members.resolve(user);

			if (member) {
				member
					.ban(`${user.tag} was kicked by ${message.author}`)
					.then(() => {
						const pomyslniezbanowano = new DiscordEmbed()
							.setAuthor("Ban")
							.setImage(
								"https://media.giphy.com/media/fe4dDMD2cAU5RfEaCU/giphy.gif",
							)
							.setDescription(
								`${user.tag} has been successfully banned by ${message.author}`,
							);
						message.channel.send(pomyslniezbanowano);
					})
					.catch(err => {
						const niemoge = new Discord.MessageEmbed()
							.setTitle("Ban")
							.setImage("https://tenor.com/view/nonono-gif-6133486")
							.setDescription(
								`${user.tag} cannot be banned (I have too small permissions or user has the same or higher role)`,
							)
							.setFooter(`By: ${message.author.username}`)
							.setTimestamp();
						message.channel.send(niemoge);
						// Wyświetl error w konsoli
						console.error(err);
					});
			}
			else {
				const niematakiegouzytkownika = new Discord.MessageEmbed()
					.setAuthor("Ban")
					.setDescription(`There is no such user on the server as ${user.tag}`)
					.setFooter(`By: ${message.author}`)
					.setTimestamp();
				message.channel.send(niematakiegouzytkownika);
			}
		}
		else {
			const nikogonieoznaczyles = new Discord.MessageEmbed()
				.setAuthor("Ban")
				.setDescription(
					`${message.author}, bad command usage, correct use:\n!ban @user`,
				)
				.setFooter(`By: ${message.author.username}`)
				.setTimestamp();
			message.channel.send(nikogonieoznaczyles);
		}
	},
};
