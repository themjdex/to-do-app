const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/apiError');

const generateJwt = (id, email) => {
	return jwt.sign({ id, email },
		process.env.SECRET_KEY,
		{ expiresIn: '24h' })
}

class UserController {
	async registration(req, res, next) {
		const { email, password, name } = req.body;
		if (!email || !password || !name) {
			return next(ApiError.badRequest('Не указан емейл, имя или пароль'));
		};
		const newVisiter = await User.findOne({ where: { email } });
		if (newVisiter) {
			return next(ApiError.badRequest('Пользователь с таким email уже существует'));
		};
		const hashPassword = await bcrypt.hash(password, 7);
		const newUser = await User.create({ email, password: hashPassword, name });
		const token = generateJwt(newUser.id, newUser.email);
		return res.json(token);
	}

	async login(req, res, next) {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return next(ApiError.internal('Пользователь не найден'));
		};

		let comparePassword = bcrypt.compare(password, user.password);
		if (!comparePassword) {
			return next(ApiError.internal('Указан неверный пароль'));
		};
		const token = generateJwt(user.id, user.email);
		return res.json({ token, role: user.role })
	}

	async auth(req, res, next) {
		const token = generateJwt(req.user.id, req.user.email, req.user.role);
		return res.json({ token });
	}
};

module.exports = new UserController();