const { SlashCommandBuilder } = require('discord.js');

// the collect command can be used once per task bounty

module.exports = {
	data: new SlashCommandBuilder()
		.setName('collect')
		.setDescription('unfinished. claim active bounty')
		.addIntegerOption((option) => option.setName('id')
			.setDescription('corresponds to which poll answer to redeem')
			.addChoices(
				{ name: '1', value: 1 },
				{ name: '2', value: 2 },
				{ name: '3', value: 3 },
			).setRequired(true)),
	async execute(interaction) {
		const choice = interaction.options.getInteger('id');
		await interaction.reply(`debuginfo ${choice}`);
	},
};