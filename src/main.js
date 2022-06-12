const Express = require('express');
require('dotenv').config();
const sequelize = require('./db');
const models = require('../models/models');
const cors = require('cors');
const router = require('../routes/index');
const errorHandler = require('../middlewares/ErrorHandlingMiddleware');

const app = Express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(Express.json());
app.use('/api', router);

app.use('/', (req, res) => {
	res.status(200).json({ "task": "Убивать!" });
});

app.use(errorHandler);

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		app.listen(PORT, () => console.log(`Сервер стартовал на порту ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start();


