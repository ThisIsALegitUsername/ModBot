const keepAlive = require("./alwayson");
const fs = require("fs");
const Discord = require("discord.js");
const { PREFIX } = require("./json/config1");
const db = require('quick.db');
const { token } = process.env

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commands = fs.readdirSync("./commands");

for (const folder of commands) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity("!m help", ({ type: "WATCHING" }));
});

client.on("message", async message => {

let prefix;

if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === "dm") {
		return message.reply("I can't execute that command inside DMs!");
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply("You don't have permission to do this!");
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args, client);
	}
	catch (error) {
		console.error(error);
		message.reply("there was an error trying to execute that command!");
	}
});

keepAlive();

client.login(token);
