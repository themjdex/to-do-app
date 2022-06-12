const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
	'todolist',
	'postgres',
	process.env.DB_PASSWORD,
	{
		dialect: 'postgres',
		host: 'localhost',
		port: 5432
	}
)