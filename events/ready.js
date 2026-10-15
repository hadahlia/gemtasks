const { Events, TextDisplayBuilder, MessageFlags } = require('discord.js');
const { Users } = require('../dbObjects.js');
const { homeId, roleId } = require('../config.json');
// const { tasks } = require('../inc/taskmanage.js');
// const storedBalance = async () => {
// 	await Users.findAll();
// };

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		(async () => {
			// const storedTasks = await TaskList.findAll();
			const storedBalance = await Users.findAll();
			// console.log('i got here');
			// storedTasks.forEach((a) => tasks.set(a.task, a));
			storedBalance.forEach((b) => gems.set(b.user_id, b));
		})();

		// const guild = client.guilds.get(guildId);
		// const role = guild.roles.cache.get(roleId);
		// const role = message.guild.roles.cache.get(roleId);
		console.log(`準備完了！ ${client.user.tag}がオンライン`);

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
					{ text: 'If you are seeing this,', emoji: '🚨' },
					{ text: 'the reality has not yet', emoji: '🐹' },
					{ text: 'set in for good.', emoji: '⚰️' },
				],
				allowMultiselect: false,
				duration: 72,
			},
		});
	},
};