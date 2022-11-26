const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs')

module.exports = {

	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('노래를 재생합니다')
        .addStringOption(option => option.setName('url').setDescription('재생할 음악의 URL 또는 제목').setRequired(true)),

    async execute(interaction, distube) {
        const name = interaction.options._hoistedOptions[0].value

        if(!interaction.member?.voice?.channel)
        {
            interaction.reply({ content: `먼저 음성 채널에 들어가 주세요.`, ephemeral: true })
            return 0
        }

        var queue = distube.getQueue(interaction)

        if(queue)
        {
            interaction.reply({ content: `음악을 불러오는 중입니다...` })
            distube.play( interaction.member.voice.channel, name ).then(() => {
                queue = distube.getQueue(interaction)
                const embed3 = new EmbedBuilder()
                    .setColor('#2BD996')
                    .setTitle(`⏱ 예약됨 - ${queue.songs[queue.songs.length - 1].name} \`${queue.songs[queue.songs.length - 1].formattedDuration}\``)
                    .setURL(`${queue.songs[queue.songs.length - 1].url}`)
                    .setImage(queue.songs[queue.songs.length - 1].thumbnail)
                interaction.editReply({ embeds: [embed3], content: "" })
            })
        }
        else
        {
            interaction.reply({ content: `음악을 불러오는 중입니다...` })
            distube.play( interaction.member.voice.channel, name ).then(() => {
                queue = distube.getQueue(interaction)
                const embed3 = new EmbedBuilder()
                    .setColor('#A931DE')
                    .setTitle(`🎶 현재 재생중 - ${queue.songs[0].name} \`${queue.songs[0].formattedDuration}\``)
                    .setURL(`${queue.songs[0].url}`)
                    .setImage(queue.songs[0].thumbnail)
                interaction.editReply({ embeds: [embed3], content: "" })
            })
        }
    }
}