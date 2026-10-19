const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { TaskList } = require('../../dbObjects');
// const { tasks } = require('../../inc/taskmanage.js');
const paginate = require('../../inc/pagination.js');
const { baseThreeGem } = require('../../inc/gemconversion.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('taskls')
		.setDescription('displays tasks in a paginated list'),
	async execute(interaction) {
		const embeds = [];
		const pages = [];
		let alltasks = '';
		// let p = '# Task List\n';
		const taskList = await TaskList.findAll();
		// const taskString = taskList.map(t => t).join(', ') || 'No tasks in database :(';
		for (const row of taskList) {
			alltasks += `${row.task_id} **${row.task}**: (${baseThreeGem(row.reward)}) \n||`;
		}

		// split into as many strings as necessary?
		for (let iter = 0; iter < alltasks.split('\n').length; iter += 8) {
			const p = alltasks.split('||').slice(iter, iter + 8).join(' ');
			const t = '# Task List\n' + p;
			pages.push(t);
		}
		// p1 += alltasks.split('||').slice(0, 8).join(' ');
		// const p1 = 'This is a test';
		// let p2 = '# Task List\n';
		// p2 += alltasks.split('||').slice(8, 16).join(' ');

		for (let i = 0; i < pages.length; i++) {
			// if (i + 1 == 1)
			embeds.push(new EmbedBuilder().setColor('Blurple').setDescription(pages[i]));
			// else if (i + 1 == 2) embeds.push(new EmbedBuilder().setColor('Blurple').setDescription(pages[i]));
			// embeds.push(new EmbedBuilder().setDescription(`Page ${i + 1}`));
		}

		await paginate(interaction, embeds);
		// await interaction.reply(`added ${task} (for ${reward} gems) to the Task List`);
	},
};