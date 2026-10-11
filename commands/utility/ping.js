const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Prints Latency Info.'),
	async execute(interaction) {
		await interaction.reply('ピングだよ\nスピードは不明です');
	},
};