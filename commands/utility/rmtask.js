const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
// const { TaskList } = require('../../dbObjects');
const { delTask } = require('../../inc/taskmanage.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('rmtask')
		.setDescription('removes a task from the task list')
		.addStringOption((option) => option.setName('task').setDescription('task to add').setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const task = interaction.options.getString('task');
		// const reward = interaction.options.getInteger('reward');
		// const storedTasks = await TaskList.findAll();

		if (task == null) return interaction.reply('task to KILL must be specified >:c');
		// if (reward < 1) return interaction.reply('ugh, cheaping out are we?');
		delTask(task);
		// addTask(task, reward);
		// storedTasks.forEach((b) => tasks.set(b.task, b));
		await interaction.reply(`removed ${task} from the Task List`);
		// console.log(`thing ${}`);
	},
};