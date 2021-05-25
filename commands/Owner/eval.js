module.exports = {
  
  name:"eval",
  description:"This command is intended ONLY for the owner of the bot. Do not attempt to use this.",
  accessibleby:"Bot's Owner",

  execute(message, args) {

    if(message.author.id !== "791843960477188106") return message.channel.send(
        new Discord.MessageEmbed()
        .setTitle("**You don't have enough permissions to use this command.**")
        .setColor(0xcff9ff)
        .setImage("https://cdn.discordapp.com/attachments/836044564158611486/836058814176034816/unknown.png"))

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
      console.log(code)
      console.log(evaled)
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
        }
}