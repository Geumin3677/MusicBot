const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs')

module.exports = {

	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('음성 채널에 들어갑니다'),

    async execute(interaction, distube) {
        if(!interaction.member?.voice?.channel)
        {
            interaction.reply({ content: `먼저 음성 채널에 들어가 주세요.`, ephemeral: true })
            return 0
        }
        distube.voices.join(interaction.member?.voice?.channel)
        interaction.reply(`join ${interaction.member?.voice?.channel}`)
    }
}