module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'users',
		{
			user_id: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			gems: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
			collected: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		},
	);
};