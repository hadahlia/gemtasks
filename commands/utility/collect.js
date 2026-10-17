const { SlashCommandBuilder } = require('discord.js');
const { activeTasks } = require('../../inc/taskmanage.js');
const { baseThreeGem } = require('../../inc/gemconversion.js');

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

		if (activeTasks.length === 0) {
			await interaction.reply('uh oh! active tasks has no members.');
		}
		const target = interaction.user;
		const choice = interaction.options.getInteger('id');

		await interaction.reply(`${target.tag} get reward ${baseThreeGem(activeTasks[choice - 1])}`);
	},
};