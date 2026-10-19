const Sequelize = require('sequelize');
// const { SqliteDialect } = require('@sequelize/sqlite3')

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const TaskList = require('./models/TaskList.js')(sequelize, Sequelize.DataTypes);
const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);
const PostData = require('./models/PostData.js')(sequelize, Sequelize.DataTypes);

module.exports = { Users: Users, TaskList: TaskList, PostData: PostData };