const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs')

module.exports = {

	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('현재 노래를 스킵합니다.'),
    async execute(interaction, distube) {
        if(!interaction.member?.voice?.channel)
        {
            interaction.reply({ content: `먼저 음성 채널에 들어가 주세요.`, ephemeral: true })
            return 0
        }
        const queue = distube.getQueue(interaction)
        if(queue)
        {
            if(queue.songs.length === 1)
            {
                distube.stop(interaction)
                interaction.reply({ content: `${queue.songs[0].name} - 스킵 했습니다.`})
            }
            else
            {
                distube.skip(interaction)
                interaction.reply({ content: `${queue.songs[0].name} - 스킵 했습니다.`})
            }
        }
        else
        {
            interaction.reply({ content: `노래를 재생하고 있지 않습니다.`, ephemeral: true })
        }
    }
}