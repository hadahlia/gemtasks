// remove tasks from persistent list. admin required
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('rmtask').setDescription('unfinished'),
	async execute(interaction) {
		await interaction.reply('不明です');
	},
};