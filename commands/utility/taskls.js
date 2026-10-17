const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { TaskList } = require('../../dbObjects');
// const { tasks } = require('../../inc/taskmanage.js');
const paginate = require('../../inc/pagination.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('taskls')
		.setDescription('displays tasks in a paginated list'),
	async execute(interaction) {
		const embeds = [];

		let p1 = '# Task List\n';
		const taskList = await TaskList.findAll();
		// const taskString = taskList.map(t => t).join(', ') || 'No tasks in database :(';
		for (const row of taskList) {
			p1 += `**${row.task}**: ${row.reward} gems\n`;
		}

		// const p1 = 'This is a test';
		const p2 = 'Fuck You this is Also a Test';

		for (let i = 0; i < 4; i++) {
			if (i + 1 == 1) embeds.push(new EmbedBuilder().setColor('Blurple').setDescription(p1));
			else if (i + 1 == 2) embeds.push(new EmbedBuilder().setColor('Blurple').setDescription(p2));
			// embeds.push(new EmbedBuilder().setDescription(`Page ${i + 1}`));
		}

		await paginate(interaction, embeds);
		// await interaction.reply(`added ${task} (for ${reward} gems) to the Task List`);
	},
};