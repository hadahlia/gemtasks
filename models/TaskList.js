module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'task_list',
		{
			task_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			task: {
				type: DataTypes.STRING,
				unique: true,
			},
			reward: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		},
	);
};