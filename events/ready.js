const { Events } = require('discord.js');
const { Users } = require('../dbObjects.js');

// const storedBalance = async () => {
// 	await Users.findAll();
// };

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		(async () => {
			const storedBalance = await Users.findAll();
			// console.log('i got here');
			storedBalance.forEach((b) => gems.set(b.user_id, b));
		})();

		console.log(`準備完了！ ${client.user.tag}がオンライン`);
	},
};