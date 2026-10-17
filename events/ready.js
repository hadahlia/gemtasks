const { sequelize } = require('../inc/sequelize.js');
const { Events, TextDisplayBuilder, MessageFlags } = require('discord.js');
const { Users, TaskList } = require('../dbObjects.js');
const { homeId, roleId } = require('../config.json');
// const { tasks } = require('../inc/taskmanage.js');
// const storedBalance = async () => {
// 	await Users.findAll();
// };

// const activeTasks = new Collection();

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		let t1 = '';
		let t2 = '';
		let t3 = '';

		(async () => {

			const storedBalance = await Users.findAll();
			// console.log('i got here');
			// storedTasks.forEach((a) => activeTasks.set(a.task, a));
			const storedTasks = await TaskList.findAll({ order: sequelize.random(), limit: 3 });

			let i = 0;

			for (const row of storedTasks) {
				if (i == 0) {
					t1 += row.task + ` (${row.reward})`;
				} else if (i == 1) {
					t2 += row.task + ` (${row.reward})`;
				} else if (i == 2) {
					t3 += row.task + ` (${row.reward})`;
				}
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
						{ text: '1: ' + t1, emoji: '🚨' },
						{ text: '2: ' + t2, emoji: '🐹' },
						{ text: '3: ' + t3, emoji: '⚰️' },
					],
					allowMultiselect: false,
					duration: 72,
				},
			});
		})();

		// const guild = client.guilds.get(guildId);
		// const role = guild.roles.cache.get(roleId);
		// const role = message.guild.roles.cache.get(roleId);
		console.log(`準備完了！ ${client.user.tag}がオンライン`);
	},
};