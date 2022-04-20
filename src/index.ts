import { Client, GuildMember, Intents } from 'discord.js';
import { Manager, Player, SearchResult, Track } from 'erela.js';
import { MongoClient } from 'mongodb';
import { guildId, heWhoIntrosId, token } from '../config.json';

interface ClientWithManager extends Client {
    manager?: Manager;
}

const client: ClientWithManager = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });

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

let currentTrack: Track;

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const member: GuildMember = interaction.member as GuildMember;

    // Create a new player. This will return the player if it already exists.
    const player = client.manager?.create({
        guild: interaction.guild?.id as string,
        voiceChannel: member.voice.channel?.id,
        textChannel: interaction.channel?.id as string,
    }) as Player;

    const { commandName } = interaction;

    if (commandName === 'bitch') {
        interaction.reply('Fuck you. You called me a bitch');
    } else if (commandName === 'play') {
        player.pause(false);
        player.stop();
        
        const res = await client.manager?.search(
            interaction.options.data[0].value as string,
            interaction.member?.user
        ) as SearchResult;

        if (res.tracks.length === 0) {
            interaction.reply('Found no results for: ' + interaction.options.data[0].value);
            return;
        }

        currentTrack = res.tracks[0];

        interaction.reply(res.tracks[0].uri);

        // Connect to the voice channel.
        player.connect();
    
        // Adds the first track to the queue.
        player.queue.add(res.tracks[0]);
        player.queue.at
        interaction.channel?.send(`Enqueuing track ${res.tracks[0].title}.`);
    
        // Plays the player (plays the first track in the queue).
        // The if statement is needed else it will play the current track again
        if (!player.playing && !player.paused && !player.queue.size)
            player.play();
        if (interaction.options.data.length > 1) {
            player.seek((interaction.options.data[1].value as number) * 1000);
        }
    } else if (commandName === 'pause') {
        player.pause(!player.paused);
        if (player.paused) {
            interaction.reply(`Paused ${currentTrack.title}.`);
        } else {
            interaction.reply(`Resumed ${currentTrack.title}.`);
        }
        
    } 
    else if (commandName === 'intro') {
        const url = interaction.options.data[0].value;
        let start = 0;
        let duration = 6;

        interaction.options.data.forEach((option) => {
            if (option.name === 'start') {
                start = option.value as number;
            } else if (option.name === 'duration' && (option.value as number) <= 6) {
                duration = option.value as number;
            }
        })
        const mongo = new MongoClient('mongodb://0.0.0.0:27017');

        try {
            await mongo.connect();

            const db = mongo.db('Introductius');
            const intros = db.collection('intros');

            const existingIntro = await intros.findOne({ user: interaction.user.id });

            if (existingIntro === null) {
                await intros.insertOne({
                    user: interaction.user.id,
                    url,
                    start,
                    duration
                });
            } else {
                await intros.findOneAndReplace({ user: interaction.user.id },  {
                    user: interaction.user.id,
                    url,
                    start,
                    duration
                });
            }

            interaction.reply('Intro created succcessfully.')
        } catch (e) {
            console.error(e);
            interaction.reply('There was an issue creating your intro: ' + e.message)
        } finally {
            await mongo.close();
        }
    }
})

client.on('voiceStateUpdate', async (oldState, newState) => {
    if (newState.channelId === null || oldState.channelId === newState.channelId) {
        return;
    }

    const mongo = new MongoClient('mongodb://0.0.0.0:27017');

    try {
        await mongo.connect();

        const db = mongo.db('Introductius');
        const intros = db.collection('intros');

        const intro = await intros.findOne({ user: newState.member?.user.id });
        
        if (intro === null) {
            return;
        } else {
            const player = client.manager?.create({
                guild: guildId,
                voiceChannel: newState.channelId,
                textChannel: heWhoIntrosId
            }) as Player;

            player.pause(false);
            player.stop();

            const res = await client.manager?.search(
                intro.url,
                newState.member?.user
            ) as SearchResult;
    
            if (res.tracks.length === 0) {
                return;
            }

            // Adds the first track to the queue.
            player.queue.add(res.tracks[0]);
            player.queue.at

            player.play();
            if (intro.start > 0) {
                player.seek(intro.start * 1000);
            }

            setTimeout(() => {
                player.stop();
            }, intro.duration * 1000)


        }
    } catch (e) {
        console.error(e);
    }
})

client.login(token);