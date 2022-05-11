# Introductius - A Discord bot

Introductius is Discord bot that introduces users who join a voice channel using an up to 6 second clip set by the user. This project uses [Lavalink](https://github.com/freyacodes/Lavalink) to get audio from YouTube. [DiscordJS](https://discord.js.org/#/) and [ErelaJS](https://erelajs-docs.netlify.app/) are used to interact with the Discord API.

Also, for no other reason than the libraries used for this project allow it, Introductius also serves as a lightweight music player (For example, the popular "FredBoat" music bot uses lavalink). In general, I would reccomend using a bot specifically dedicated to being a music player, but as Introductius is still very much in development, the music player functions are useful for checking that Introductius can properly connect to a channel and play sound.

## Installation
Introductius is not currently an official discord bot, so if you want him in your server you'll have to host him yourself. The cheapest solution is likely to host Introductius locally on a Raspberry Pi, however I can't speak for the connection quality of that method. For my server, I've purchased a $6 per month VPS instance from [Vultr](https://www.vultr.com/). I chose a server location in my part of the country and the connection quality seems to be more than enough for my friends and I.

### Step 1: Clone the repo
PSA: Looks like `git clone` might not be supported for GitHub anymore. You'll need to install [GitHub CLI](https://cli.github.com/).

Run this to clone the repo:
```
gh repo clone benrbowers/introductius
```
### Step 2: Install Dependencies
[Here's the official guide for installing nodejs and discordjs]

Once node and npm are installed you can install the dependencies. I used yarn for this project, but you can use npm if you prefer. Run the following in a terminal from the root project directory:

```
yarn
```
Or
```
npm i
```
### Step 3: Install MongoDB
Introductius uses MongoDB to store user info such as: user ID, url of selected clip, and a time stamp of last usage in order to enforce a cool down for intro sounds. You can follow these [installation instructions](https://www.mongodb.com/docs/manual/administration/install-community/) for your given platform. Once it's installed it should be running on port `27017` at one of the following hosts: `0.0.0.0`, `127.0.0.1`, or `localhost`.

You'll be able to set your hostname and port number when you set up your config file in the next section.

## Setup
### Step 1: Register Discord Application
Like all bots, Introductius must be registered as an application to interact with the Discord API.

[Follow the official guide here.](https://discordjs.guide/preparations/setting-up-a-bot-application.html)
[Create a new application here.](https://discord.com/developers/applications)

You can name the application "Introductius" or whatever you like, the name won't affect anything.
### Step 2: Create config file
Create a new file in the root directory called `config.json`. Then, copy and paste the following:
```
{
  "token": "YOUR_TOKEN",
	"applicationId": "YOUR_APP_ID",
	"guildId": "YOUR_GUILD_ID",
	"mongoHost": "0.0.0.0",
	"mongoPort": "27017"
}
```
Replace `YOUR_TOKEN` with your bot token which you can find as per [this guide.](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-token)
Replace `YOUR_APP_ID' with the application id for your newly created application which you can find in the "General Information" section for application in the [Discord developer portal.](https://discord.com/developers/applications)

"Guild" in discord lingo just means "server," so "guildId" refers to your server ID. In order to get your guild (server) id, open Discord and go to your settings. On the "Advanced" page, turn on "Developer Mode". This will enable a "Copy ID" button in the context menu when you right-click on a server icon, a user's profile, etc. Right click on the server icon that you want to add Introductius to and select "Copy ID". Replace `YOUR_GULD_ID` with that id.

### Step 3: Start Lavalink
Lavalink is the service that allows Introductius
If you want to run it temporarily for testing things out you can use `yarn lavalink`
To keep it running after you close the terminal, run it with [PM2](https://www.npmjs.com/package/pm2):
```
yarn lavalinkPM2
```
Or
```
npm run lavalinkPM2
```
*Note*: `lavalink`, `lavalinkPM2`, and several other commands are defined in `package.json` in the "scripts" section.

Use this to stop it:
```
yarn stopLavalinkPM2
```
Or
```
npm run stopLavalinkPM2
```
### Step 4: Start Introductius
Introductius uses TypeScript, so before he can run you'll need to generate the vanilla JavaScript by running:
```
yarn build
```
If it built successfully, there should now be a `dist/` directory with JavaScript versions of the TypeScript files from `src/`.
Now you can start Introductius:
```
yarn startPM2
```

Use this stop him:
```
yarn stopPM2
```

