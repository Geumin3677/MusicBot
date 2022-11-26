const { token } = require('./config.json');
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection } = require('discord.js');
const fs = require('fs')
const path = require('node:path');
const deploycommands = require('./deploy-commands');

const { DisTube, isObject } = require('distube')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates] });

const distube = new DisTube(client, {
	searchSongs: 5,
	searchCooldown: 30,
	leaveOnEmpty: false,
	leaveOnFinish: false,
	leaveOnStop: false,
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'Commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

async function dataSave(data, name) {
    const datastr = JSON.stringify(data, null, '\t');
    fs.writeFileSync(`./${name}.json`, datastr);
}

function makeRandom(min, max){
    var RandVal = Math.floor(Math.random()*(max-min+1)) + min;
    return RandVal;
}

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.on('ready', async () => {
    console.log('MusicBot is Ready! dev by ABELA')
})

client.on('interactionCreate', async interaction => {

	if(interaction.isSelectMenu())
	{
		try{
			if(interaction.customId === 'SongSelect')
            {
                const selected = interaction.values[0];
                distube.queues.collection.forEach(element => {
                    const itemToFind = element.songs.find(song => song.name === selected)
                    const idx = element.songs.indexOf(itemToFind)
                    if(idx != -1)
                    {
                        element.songs.splice(idx, 1)
                        interaction.update({ content: `${selected} - 예약 취소 되었습니다.`, components: [], ephemeral: false });
                    }
                    else
                    {
                        interaction.update({ content: `${selected} - 예약 목록에 존재하지 않습니다.`, components: [], ephemeral: false });
                    }
                });
            }
		}catch (error) {
			console.error(error);
			await interaction.reply({ content: '명령어 처리중 오류가 발생했습니다!', ephemeral: true });
		}
	}

	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, distube);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: '명령어 처리중 오류가 발생했습니다!', ephemeral: true });
	}
});

client.login(token);