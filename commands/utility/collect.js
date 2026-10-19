const { SlashCommandBuilder } = require('discord.js');
const { Users, TaskList } = require('../../dbObjects.js');
const { activeTasks, addBalance, getBalance } = require('../../inc/taskmanage.js');
const { baseThreeGem } = require('../../inc/gemconversion.js');

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

		const user = await Users.findByPk(target.id);


		if (user && user.collected == true) {
			await interaction.reply(`Greedy greedy, ${target.tag}!\nYou've already collected today!`);
			return;
		}

		const choice = interaction.options.getInteger('id');
		const taskId = activeTasks[choice - 1];
		if (!taskId) {
			await interaction.reply('taskId is stale');
			return;
		}

		const task = await TaskList.findByPk(taskId);
		if (!task) {
			await interaction.reply('task Out Of Bounds');
			return;
		}

		const reward = Number(task.reward);
		if (!Number.isFinite(reward) || reward <= 0) {
			await interaction.reply('bad reward');
			return;
		}

		await addBalance(target.id, reward);
		await interaction.reply(`${target.tag} has redeemed ${task.task}\t++${baseThreeGem(reward)}`);
	},
};