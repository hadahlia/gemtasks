const { SlashCommandBuilder } = require('discord.js');
const { Users } = require('../../dbObjects.js');
const { activeTasks, addBalance } = require('../../inc/taskmanage.js');
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

		if (activeTasks.length < 3) {
			await interaction.reply('uh oh! active tasks has no members.');
			return;
		}
		const target = interaction.user;

		const user = await Users.findOne({ where: { user_id: target.id } });

		if (user.collected == true) {
			await interaction.reply(`Greedy greedy, ${target.tag}!\nYou've already collected today!`);
		} else {
			const choice = interaction.options.getInteger('id');
			const reward = activeTasks[choice - 1];
			addBalance(target.id, reward);
			await interaction.reply(`${target.tag} gets reward ${baseThreeGem(reward)}`);
		}

	},
};