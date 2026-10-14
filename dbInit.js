const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const TaskList = require('./models/TaskList.js')(sequelize, Sequelize.DataTypes);
require('./models/Users.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize
	.sync({ force })
	.then(async () => {
		const tasks = [
			TaskList.upsert({ task: 'Find Rock. throw it as hard as u can', reward: 10 }),
			TaskList.upsert({ task: 'Find a cat and take a picture', reward: 4 }),
			TaskList.upsert({ task: 'Take a walk!', reward: 12 }),
		];

		await Promise.all(tasks);
		console.log('Synced Data');

		sequelize.close();
	})
	.catch(console.error);