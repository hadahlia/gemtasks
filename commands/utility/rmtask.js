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


		if (task == null) return interaction.reply('task to KILL must be specified >:c');

		delTask(task);

		await interaction.reply(`removed ${task} from the Task List`);
	},
};