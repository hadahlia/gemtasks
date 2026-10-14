const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Prints Latency Info.'),
	async execute(interaction) {
		const delay = Date.now() - interaction.createdTimestamp;
		await interaction.reply(`ピングだよ\nスピードは ${delay} msです`);
	},
};