const { Task } = require('../models/models');
const ApiError = require('../error/apiError');

class TaskController {
	async create(req, res, next) {
		try {
			const { title, description, finishDate, userId } = req.body;
			const task = await Task.create({ title, description, finishDate, userId });
			return res.json(task);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async getAll(req, res) {
		let tasks = await Task.findAll();
		return res.json(tasks);
	}

	async getOne(req, res) {
		const { id } = req.params;
		const task = await Task.findOne({ where: { id } });
		return res.json(task);
	}

	async edit(req, res) {
		const data = req.body;
		const { id } = req.params;
		try {
			await Task.update(data, { where: { id } });
			const editedTask = await Task.findOne({ where: { id } });;
			return res.json(editedTask);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}

	}

	async delete(req, res, next) {
		const { id } = req.params;
		try {
			await Task.destroy({ where: { id } });
			return res.json({ message: "Удалено успешно" });
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}

	}
};

module.exports = new TaskController();