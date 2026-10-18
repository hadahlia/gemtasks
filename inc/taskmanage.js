const { Collection } = require('discord.js');
const { Users, TaskList } = require('../dbObjects');
const tasks = new Collection();
const gems = new Collection();

const activeTasks = [];

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

async function addBalance(id, amt) {
	const user = gems.get(id);

	if (user) {
		user.gems += Number(amt);
		user.collected = true;
		return user.save();
	}

	const newUser = await Users.create({ user_id: id, gems: amt });
	gems.set(id, newUser);

	return newUser;
}

function getBalance(id) {
	const user = gems.get(id);
	return user ? user.gems : 0;
}

module.exports = {
	activeTasks: activeTasks,
	gems: gems,
	tasks: tasks,
	addTask,
	delTask,
	addBalance,
	getBalance,
};