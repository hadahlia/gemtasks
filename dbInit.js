const Sequelize = require('sequelize');
const { sequelize } = require('./inc/sequelize.js');

const TaskList = require('./models/TaskList.js')(sequelize, Sequelize.DataTypes);
require('./models/Users.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize
	.sync({ force })
	.then(async () => {
		const tasks = [
			TaskList.upsert({ task: 'Find Rock. throw it as hard as u can', reward: 1 }),
			TaskList.upsert({ task: 'Find a cat and take a picture', reward: 1 }),
			TaskList.upsert({ task: 'Take a walk!', reward: 3 }),
		];

		await Promise.all(tasks);
		console.log('Synced Data');

		sequelize.close();
	})
	.catch(console.error);