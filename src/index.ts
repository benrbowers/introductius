import { Client, Intents } from 'discord.js';
import { token } from '../config.json';

const client = new Client({ intents: Intents.FLAGS.GUILDS });

client.once('ready', () => console.log('Introductius is ready!'));

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'bitch') {
        interaction.reply('Fuck you. You called me a bitch');
    }
});

client.login(token);