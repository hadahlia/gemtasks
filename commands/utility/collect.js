// the collect command can be used once per task bounty
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('collect').setDescription('debug'),
	async execute(interaction) {
		await interaction.reply('debuginfo');
	},
};