import { REST } from '@discordjs/rest';
import  { SlashCommandBuilder } from '@discordjs/builders';
import { Routes }  from 'discord-api-types/v9';
import { applicationId, guildId, token } from '../config.json';

const commands = [
    new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a video in the vc')
        .addStringOption(option => option.setName('query').setDescription('Your search query or video url').setRequired(true))
        .addIntegerOption(option => option.setName('start').setDescription('Start time in seconds')),
    new SlashCommandBuilder().setName('pause').setDescription('Pause/Resume Introductius'),
    new SlashCommandBuilder()
        .setName('intro')
        .setDescription('Set the up to 6 second clip that Introductius will introduce you with')
        .addStringOption(option => option.setName('url').setDescription('URL of clip you want').setRequired(true))
        .addNumberOption(option => option.setName('start').setDescription('How many seconds in to the clip to start the intro'))
        .addNumberOption(option => option.setName('duration').setDescription('How many seconds long your into will last (6 max)')),
    new SlashCommandBuilder().setName('stop').setDescription('Use this to drop Introductius from the current channel.'),
];

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(applicationId, guildId), { body: commands })
    .then(() => console.log('Commands set successfully'))
    .catch((e) => console.error(e));