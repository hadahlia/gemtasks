const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
// const { TaskList } = require('../../dbObjects');
const { baseThreeGem } = require('../../inc/gemconversion.js');
const { addTask } = require('../../inc/taskmanage.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('addtask')
		.setDescription('adds a task to the task list')
		.addStringOption((option) => option.setName('task').setDescription('task to add').setRequired(true))
		.addIntegerOption((option) => option.setName('reward').setDescription('gems rewarded on task collection').setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const task = interaction.options.getString('task');
		const reward = interaction.options.getInteger('reward');

		if (task == null) return interaction.reply('task must be specified >:c');
		if (reward < 1) return interaction.reply('ugh, cheaping out are we?');

		addTask(task, reward);

		await interaction.reply(`added ${task} (${baseThreeGem(reward)}) to the Task List`);
	},
};