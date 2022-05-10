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
I used yarn for this project, but you can use npm if you prefer.

```
yarn
```
Or
```
npm i
```
### Step 3: Start Lavalink
If you want to run it temporarily for testing things out you can use `yarn lavalink`
To keep it running after you close the terminal, run it with PM2:
```
yarn lavalinkPM2
```
Or
```
npm run lavalinkPM2
```
(use stopLavalinkPM2 to stop it)
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
(`yarn stopPM2` to stop)

