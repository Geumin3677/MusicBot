const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, EmbedBuilder } = require('discord.js');
const fs = require('fs')

module.exports = {

	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('예약 목록을 확인합니다'),

    async execute(interaction, distube) {
        var queue = distube.getQueue(interaction)

        if(queue)
        {
            var cnt = 0
            var list = ""
            for(var a of queue.songs)
            {
                if(cnt === 0)
                {
                    list += `현재 재생중 - ${a.name}\n`
                }
                else
                {
                    list += `${cnt} - ${a.name}\n`
                }
                cnt++
            }

            const embed3 = new EmbedBuilder()
                .setColor('#2B8BD9')
                .setTitle(`예약 목록`)
                .setDescription(list)
            interaction.reply({ embeds: [embed3] })
        }
        else
        {
            interaction.reply({ content: `노래를 재생하고 있지 않습니다.`, ephemeral: true })
        }
    }
}