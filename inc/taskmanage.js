const { Collection } = require('discord.js');
const { TaskList } = require('../dbObjects');
const tasks = new Collection();

async function addTask(stask, amt) {
	const newTask = await TaskList.create({ task: stask, reward: amt });
	tasks.set(stask, newTask);

	return newTask;
}

async function delTask(t) {

	// const dTask = await TaskList.find({ task: t });
	// const dTask = tasks.find(g => g.task === t);
	// tasks.sweep(t, dTask);
	tasks.delete(t);
	await TaskList.destroy({
		where: {
			task: t,
		},
	});
	// return newTask;
}

module.exports = {
	tasks: tasks,
	addTask,
	delTask,
};