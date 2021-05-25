# ModBot

This is my discord bot designed for moderation. it is still in development.

# Installation

To host the bot yourself, download Node.JS and git. Then copy the git repo (**click the green code button and click https if it isnt selected already, then copy it**).
Open your command prompt/terminal and run "git clone (insertGitRepo)". next run "cd (InsertClonedRepoDirectory)". After that, go to your cloned directory and make a file
called "process.env.json". Edit the file with your prefered text editor and paste the following code inside:
```
{

"token":""

}
```
next, go to https://discordapi.com and make a new application. Then open the created application and go to the bot section, click create, copy the token and paste it
inside your proccess.env.json file. Your file should look something like this:
```
{

"token":"Random Letters"

}
```
And now, invite the bot to your server. Go back to discordapi.com and click on your application, next  go to oauth and select the scope "bot" and add "administrator" permissions.
Now you should see a link appear in the box, open a new tab, and open the link. Now select the server you want to invite it to (you have to have manage server permissions,
I would usually create a server just for testing) and click authorize.

Finally, open your terminal, type in "cd (InsertClonedRepoDirectory)" and then node index.js. Now your bot should be online in your test server, and try typing !m avatar.
If your avatar shows up, then Success! You have successfully installed the bot.

# Bugs/Errors

If you get any errors message me on discord. my username is Human1789#5842

# Credit

I coded this bot, nobody else helped me.
