const { Collection } = require('discord.js');
const { Users, TaskList, PostData } = require('../dbObjects');
const tasks = new Collection();
const gems = new Collection();

const activeTasks = [];

async function addPostData(t1, t2, t3) {
	const newPData = await PostData.create({ tid1: t1, tid2: t2, tid3: t3, active: true });

	return newPData;
}

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

	const newUser = await Users.create({ user_id: id, gems: amt, collected: true });
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
	addPostData,
	addTask,
	delTask,
	addBalance,
	getBalance,
};