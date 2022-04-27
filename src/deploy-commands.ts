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
        .addStringOption(option => option.setName('url').setDescription('URL of clip you want (WILL NOT WORK IF AGE RESTRICTED)').setRequired(true))
        .addNumberOption(option => option.setName('start').setDescription('How many seconds in to the clip to start the intro'))
        .addNumberOption(option => option.setName('duration').setDescription('How many seconds long your into will last (6 max)')),
    new SlashCommandBuilder().setName('stop').setDescription('Use this to drop Introductius from the current channel.'),
    new SlashCommandBuilder().setName('skip').setDescription('Skip the current track.'),
    new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Add a track to the queue.')
        .addStringOption(option => option.setName('query').setDescription('Your search query or video url').setRequired(true)),
    new SlashCommandBuilder()
        .setName('play-next')
        .setDescription('Play a track right after the current one.')
        .addStringOption(option => option.setName('query').setDescription('Your search query or video url').setRequired(true)),
    new SlashCommandBuilder()
        .setName('search')
        .setDescription('Displays a list of track results.')
        .addStringOption(option => option.setName('query').setDescription('Search query').setRequired(true))
        .addIntegerOption(option => option.setName('page').setDescription('Which page of results to display (10 per page)')),
];

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(applicationId, guildId), { body: commands })
    .then(() => console.log('Commands set successfully'))
    .catch((e) => console.error(e));