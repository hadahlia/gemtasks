module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'post_data',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: true,
			},
			tid1: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			tid2: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			tid3: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			active: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: true,
			},
		},
		{
			timestamps: true,
		},
	);
};