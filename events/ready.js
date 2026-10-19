const { sequelize } = require('../inc/sequelize.js');
const { Events, TextDisplayBuilder, MessageFlags } = require('discord.js');
const { Users, TaskList, PostData } = require('../dbObjects.js');
const { homeId, roleId } = require('../config.json');
const { baseThreeGem } = require('../inc/gemconversion.js');
const { activeTasks, gems, addPostData } = require('../inc/taskmanage.js');
const schedule = require('node-schedule');
// const storedBalance = async () => {
// 	await Users.findAll();
// };

// const activeTasks = new Collection();
async function checkPostData() {
	const postData = await PostData.findOne({ where: { active: true } });
	if (postData) {
		console.log('postData is not null!!');

		// CHECK THE DATE
		const d = Date.now() - postData.createdAt;
		// return;
		const h = Math.floor(d / (1000 * 60 * 60));

		console.log(`time passed: ${d} OR ${h}`);
		// IF ITS BEEN OVER 24 HOURS, ACTIVE IS FALSE MAKE NEW
		if (h < 24) {
			// if (activeTasks.length == 0 || activeTasks[0] != postData.tid1) {
			// activeTasks.length = 0;
			activeTasks.push(postData.tid1);
			activeTasks.push(postData.tid2);
			activeTasks.push(postData.tid3);
			// if (activeTasks.length == 0) {
			// 	activeTasks.push(postData.tid1);
			// 	activeTasks.push(postData.tid2);
			// 	activeTasks.push(postData.tid3);
			// } else if (activeTasks.length == 3) {
			// 	activeTasks[0] = postData.tid1;
			// 	activeTasks[1] = postData.tid2;
			// 	activeTasks[2] = postData.tid3;
			// }
			// }
			// console.log(`what is activeTasks length... ${activeTasks.length}`);
			return true;
		} else {
			postData.active = false;
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

	// (async () => {

	// CHECK POSTDATA
	for (let g = 0; g < activeTasks.length; g++) {
		activeTasks.pop();
	}
	if (await checkPostData() == true) return;

	for (const row of storedBalance) {
		if (row.collected == true) {
			row.collected = false;
			row.save();
		}
	}
	// console.log('i got here');
	// storedTasks.forEach((a) => activeTasks.set(a.task, a));
	const storedTasks = await TaskList.findAll({ order: sequelize.random(), limit: 3 });

	let i = 0;
	// activeTasks.length = 0;

	for (const row of storedTasks) {
		if (i == 0) {
			// basethree(row.reward);
			t1 += row.task;
			e1 = `${baseThreeGem(row.reward)}`;
		} else if (i == 1) {
			// basethree(row.reward);
			t2 += row.task;
			e2 = `${baseThreeGem(row.reward)}`;
		} else if (i == 2) {
			// basethree(row.reward);
			t3 += row.task;
			e3 = `${baseThreeGem(row.reward)}`;
		}
		// if (activeTasks.length < 3) {
		activeTasks.push(row.task_id);
		// } else {
		// 	activeTasks
		// }
		i++;
	}

	// SET POSTDATA
	const pdata = addPostData(activeTasks[0], activeTasks[1], activeTasks[2]);
	// const pid = await PostData.max('id') ?? 0;

	const atext = new TextDisplayBuilder().setContent(
		`<@&${roleId}>`,
	);

	client.channels.cache.get(homeId).send({
		components: [atext],
		flags: MessageFlags.IsComponentsV2,
	});

	client.channels.cache.get(homeId).send({
		// components: [text],
		// flags: MessageFlags.IsComponentsV2,
		poll: {
			question: { text: `(#${pdata.id ?? 0}) (Message To Be Determined?)` },
			answers: [
				{ text: '1: ' + t1, emoji: e1 },
				{ text: '2: ' + t2, emoji: e2 },
				{ text: '3: ' + t3, emoji: e3 },
			],
			allowMultiselect: false,
			duration: 24,
		},
	});
	// })();
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
			taskPost(client, storedBalance);

			const job = schedule.scheduleJob('00 * * * *', async () => {
				// const atext = new TextDisplayBuilder().setContent(
				// 	`<@&${roleId}>\n um this is a scheduled message i think? whats up wus good :>`,
				// );
				taskPost(client, storedBalance);
				// client.channels.cache.get(homeId).send({
				// 	components: [atext],
				// 	flags: MessageFlags.IsComponentsV2,
				// });
			});
		})();

		// const guild = client.guilds.get(guildId);
		// const role = guild.roles.cache.get(roleId);
		// const role = message.guild.roles.cache.get(roleId);
		console.log(`準備完了！ ${client.user.tag}がオンライン`);

	},
};