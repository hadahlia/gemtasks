const { sequelize } = require('../inc/sequelize.js');
const { Events, TextDisplayBuilder, MessageFlags } = require('discord.js');
const { Users, TaskList } = require('../dbObjects.js');
const { homeId, roleId } = require('../config.json');
const { baseThreeGem } = require('../inc/gemconversion.js');
const { activeTasks, gems } = require('../inc/taskmanage.js');
// const storedBalance = async () => {
// 	await Users.findAll();
// };

// const activeTasks = new Collection();

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		let t1 = '';
		let e1 = '';
		let t2 = '';
		let e2 = '';
		let t3 = '';
		let e3 = '';

		(async () => {

			const storedBalance = await Users.findAll();

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
				activeTasks.push(row.reward);
				i++;
			}

			storedBalance.forEach((b) => gems.set(b.user_id, b));


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
					question: { text: 'Flair Undesired' },
					answers: [
						{ text: '1: ' + t1, emoji: e1 },
						{ text: '2: ' + t2, emoji: e2 },
						{ text: '3: ' + t3, emoji: e3 },
					],
					allowMultiselect: false,
					duration: 24,
				},
			});
		})();

		// const guild = client.guilds.get(guildId);
		// const role = guild.roles.cache.get(roleId);
		// const role = message.guild.roles.cache.get(roleId);
		console.log(`準備完了！ ${client.user.tag}がオンライン`);
	},
};