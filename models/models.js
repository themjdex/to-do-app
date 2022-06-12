const sequelize = require('../src/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, defaultValue: 'user' },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

const Task = sequelize.define('task', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	finishDate: { type: DataTypes.DATE },
	description: { type: DataTypes.TEXT, defaultValue: 'Описание вашей задачи' },
	status: { type: DataTypes.STRING, defaultValue: 'В процессе' }, // в процессе, выполнено, отменено
});


User.hasMany(Task);
Task.belongsTo(User);


module.exports = {
	User,
	Task
};