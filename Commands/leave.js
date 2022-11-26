const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs')

module.exports = {

	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('음성 채널을 떠납니다'),

    async execute(interaction, distube) {
        
        if(distube.voices.get(interaction)?.connection?._eventsCount === 3)
        {
            const channelId = distube.voices.get(interaction).connection.joinConfig.channelId
            const channel = interaction.guild.channels.cache.get(channelId);
            distube.voices.get(interaction).leave()
            interaction.reply(`leave ${channel}`)
        }
        else
        {
            interaction.reply({ content: `음성 채널에 들어가 있지 않습니다.`, ephemeral: true })
            return 0
        }
    }
}