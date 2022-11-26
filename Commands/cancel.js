const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const fs = require('fs');
const list = require('./list');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('cancel')
		.setDescription('예약된 곡을 취소합니다'),

    async execute(interaction, distube) {
		var queue = distube.getQueue(interaction)

        if(queue?.songs.length > 1)
        {
			var list = []
			for(var a of queue.songs)
            {
				list.push({
					label: a.name,
					description: a.formattedDuration,
					value: a.name
				})
			}
			list.shift()
			const row = new ActionRowBuilder()
				.addComponents(
					new SelectMenuBuilder()
						.setCustomId('SongSelect')
						.setPlaceholder('선택된 노래 없음')
						.addOptions(list)
				);

			interaction.reply({ content: `예약 취소할 노래를 선택해 주세요`, components:[row] })

		}
		else
        {
            interaction.reply({ content: `예약된 노래가 없습니다.`, ephemeral: true })
        }
            /*
        distube.queues.collection.forEach(element => {
            const itemToFind = element.songs.find(song => song.name === "IU Best Songs [Playlist for Motivation and Cheer Up]")
            const idx = element.songs.indexOf(itemToFind)
            element.songs.splice(idx, 1)
            //삭제완
        });
        */
    }
}