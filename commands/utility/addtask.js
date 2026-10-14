// add tasks to data list. admin required
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('addtask').setDescription('lorem ipsum'),
	async execute(interaction) {
		await interaction.reply('debug');
	},
};