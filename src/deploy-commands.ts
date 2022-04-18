import { REST } from '@discordjs/rest';
import  { SlashCommandBuilder } from '@discordjs/builders';
import { Routes }  from 'discord-api-types/v9';
import { applicationId, guildId, token } from '../config.json';

const commands = [
	new SlashCommandBuilder().setName('bitch').setDescription('A fiendish insult!')
];

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(applicationId, guildId), { body: commands })
    .then(() => console.log('Commands set successfully'))
    .catch((e) => console.error(e));