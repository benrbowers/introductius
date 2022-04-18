import { Client, GuildMember, Intents } from 'discord.js';
import { Manager, Player, SearchResult, Track } from 'erela.js';
import { token } from '../config.json';

interface ClientWithManager extends Client {
    manager?: Manager;
}

const client: ClientWithManager = new Client({ intents: Intents.FLAGS.GUILDS + Intents.FLAGS.GUILD_VOICE_STATES });

client.manager = new Manager({
    nodes: [
        {
            host: "0.0.0.0",
            port: 7000,
            password: "youshallnotpass",
        },
    ],
    send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
})
    .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
    .on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`));

 client.on("raw", (d) => client.manager?.updateVoiceState(d));

client.once('ready', () => {
    console.log('Introductius is ready!');
    client.manager?.init(client.user?.id);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'bitch') {
        interaction.reply('Fuck you. You called me a bitch');
    } else if (commandName === 'play') {
        const res = await client.manager?.search(
            interaction.options.data[0].value as string,
            interaction.member?.user
        ) as SearchResult;

          interaction.reply(res.tracks[0].uri);

          const member: GuildMember = interaction.member as GuildMember;
      
          // Create a new player. This will return the player if it already exists.

          if (interaction.channel && interaction.guild && member.voice.channel) {
            const player = client.manager?.create({
                guild: interaction.guild.id,
                voiceChannel: member.voice.channel?.id,
                textChannel: interaction.channel?.id,
              }) as Player;

              // Connect to the voice channel.
            player.connect();
        
            // Adds the first track to the queue.
            player.queue.add(res.tracks[0]);
            interaction.channel.send(`Enqueuing track ${res.tracks[0].title}.`);
        
            // Plays the player (plays the first track in the queue).
            // The if statement is needed else it will play the current track again
            if (!player.playing && !player.paused && !player.queue.size)
                player.play();
                if (interaction.options.data.length > 1) {
                    player.seek((interaction.options.data[1].value as number) * 1000);
                }
            }
    }
});

client.login(token);