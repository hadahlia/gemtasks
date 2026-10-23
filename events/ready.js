const { sequelize } = require('../inc/sequelize.js');
const { Events, TextDisplayBuilder, MessageFlags } = require('discord.js');
const { Users, TaskList, PostData } = require('../dbObjects.js');
const { homeId, roleId } = require('../config.json');
const { baseThreeGem } = require('../inc/gemconversion.js');
const { activeTasks, gems, addPostData } = require('../inc/taskmanage.js');
const schedule = require('node-schedule');
const fs = require('node:fs');

const motdPaths = [ 'verbs.txt', 'pronouns.txt', 'nouns.txt', 'end.txt' ];

function newFunMessage() {
	// const msg = [];
	let msg = '';
	// for (f of motdPaths) {
	for (let f = 0; f < motdPaths.length; f++) {
		const data = fs.readFileSync('./motd/' + motdPaths[f], 'utf8');
		// fs.readFileSync('./motd/' + motdPaths[f], 'utf8', (err, data) => {
		// 	if (err) {
		// 		console.error(err);
		// 		return;
		// 	}

		const d = data.split('\r\n');
		const rng = Math.floor(Math.random() * (d.length));

		// 	// const arr = data.split('\n');
		// 	// .replace('\r', '');
		msg += d[rng];
		// msg.push(d[rng]);
		// 	// console.log(d[rng]);
		// 	// msg.push(arr[rng]);
		// 	// console.log(arr.join(' ').replace('\r', ''));
		// 	// console.log(`${data.split('\n').slice(rng, rng + 1)}`);
		// 	// return data.split('\n').slice(rng, rng + 1);
		// });
	}
	// console.log(msg.join(' '));
	// console.log(msg);
	return msg;
}

async function checkPostData() {
	const postData = await PostData.findOne({ where: { active: true } });
	if (postData) {
		console.log('postData is not null!!');


		const d = Date.now() - postData.createdAt;

		const h = Math.floor(d / (1000 * 60 * 60));

		console.log(`time passed: ${d} OR ${h}`);
		// IF ITS BEEN OVER 24 HOURS, ACTIVE IS FALSE MAKE NEW
		if (h < 24) {
			activeTasks.push(postData.tid1);
			activeTasks.push(postData.tid2);
			activeTasks.push(postData.tid3);

			return true;
		} else if (h > 24) {
			postData.active = false;
			// postData.setDataValue('active', false);
			postData.save();
			console.log(`test: ${postData.active}`);
			// const pdata = await PostData.findOne({ where: { active: true } });
			// if (pdata) {
			// 	return checkPostData();
			// } else {
			// 	return false;
			// }
			return false;
		}

	} else {
		console.log('postData is null?');
		// NULL, MAKE NEW
		return false;
	}
}

async function taskPost(client, storedBalance) {
	let t1 = '';
	let e1 = '';
	let t2 = '';
	let e2 = '';
	let t3 = '';
	let e3 = '';


	// CHECK POSTDATA
	// for (let g = 0; g < activeTasks.length; g++) {
	// 	activeTasks.pop();
	// }
	activeTasks.length = 0;
	if (await checkPostData() == true) return;

	for (const row of storedBalance) {
		if (row.collected == true) {
			row.collected = false;
			row.save();
		}
	}
	// storedTasks.forEach((a) => activeTasks.set(a.task, a));
	const storedTasks = await TaskList.findAll({ order: sequelize.random(), limit: 3 });

	let i = 0;

	for (const row of storedTasks) {
		if (i == 0) {

			t1 += row.task;
			e1 = `${baseThreeGem(row.reward)}`;
		} else if (i == 1) {

			t2 += row.task;
			e2 = `${baseThreeGem(row.reward)}`;
		} else if (i == 2) {

			t3 += row.task;
			e3 = `${baseThreeGem(row.reward)}`;
		}

		activeTasks.push(row.task_id);

		i++;
	}

	// SET POSTDATA
	const pdata = await addPostData(activeTasks[0], activeTasks[1], activeTasks[2]);
	// const pid = await PostData.max('id') ?? 0;

	const atext = new TextDisplayBuilder().setContent(
		`<@&${roleId}>\n(You can use \`/collect\` to turn in a task!)`,
	);

	client.channels.cache.get(homeId).send({
		components: [atext],
		flags: MessageFlags.IsComponentsV2,
	});

	client.channels.cache.get(homeId).send({
		// components: [text],
		// flags: MessageFlags.IsComponentsV2,
		poll: {
			question: { text: `(#${pdata.id ?? 0}) ${newFunMessage()}` },
			answers: [
				{ text: '1: ' + t1, emoji: e1 },
				{ text: '2: ' + t2, emoji: e2 },
				{ text: '3: ' + t3, emoji: e3 },
			],
			allowMultiselect: false,
			duration: 24,
		},
	});
}

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {

		// const startTime = new Date(Date.now());
		(async () => {
			const storedBalance = await Users.findAll();
			storedBalance.forEach((b) => gems.set(b.user_id, b));

			// checkPostData();
			// const rule = new schedule.RecurrenceRule();
			// rule.hour = 8;
			const msg = newFunMessage();
			console.log(`logged: ${msg}`);

			taskPost(client, storedBalance);

			const job = schedule.scheduleJob('25 11 * * *', async () => {

				taskPost(client, storedBalance);

			});
		})();

		// const guild = client.guilds.get(guildId);
		// const role = guild.roles.cache.get(roleId);
		// const role = message.guild.roles.cache.get(roleId);
		console.log(`準備完了！ ${client.user.tag}がオンライン`);
		// newFunMessage();

	},
};