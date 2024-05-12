import bcrypt from "bcrypt";
import User from "../models/User.js";
import Role from "../models/Role.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const register = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).send({
			err: "Username and password are required",
		});
	}

	const checkUser = await User.findOne({
		where: { usr_username: username },
	});

	if (checkUser) {
		return res.status(401).send({
			err: "Username already exists",
		});
	}

	try {
		const hashPassword = await bcrypt.hash(password, 10);

		await User.create({
			usr_username: username,
			usr_password: hashPassword,
		});

		return res.send({
			msg: "success",
		});
	} catch (error) {
		return res.status(500).send({
			err: "Internal server error",
		});
	}
};

const login = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).send({
			err: "Username and password are required",
		});
	}

	const checkUser = await User.findOne({
		where: { usr_username: username },
	});

	if (!checkUser) {
		return res.status(404).send({
			err: "The user was not found",
		});
	}

	const checkPassword = await bcrypt.compare(
		password,
		checkUser.usr_password
	);

	if (!checkPassword) {
		return res.status(401).send({
			err: "Username or password is incorrect",
		});
	}

	const { rol_token } = await Role.findOne({
		where: { rol_id: checkUser.rol_id },
	});

	const accessToken = jwt.sign(
		{
			info: {
				username: checkUser.usr_username,
				role: rol_token,
			},
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: "30m" }
	);

	const refreshToken = jwt.sign(
		{ username: checkUser.usr_username },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: "7d" }
	);

	await User.update(
		{ refresh_token: refreshToken },
		{ where: { usr_username: username } }
	);

	res.cookie("jwt", refreshToken, {
		httpOnly: true,
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	return res.send({
		msg: "success",
		token: accessToken,
		role: rol_token,
	});
};

const logout = async (req, res) => {
	const cookies = req.cookies;
	const usr_id = req.query.usr_id;

	if (!cookies?.jwt) {
		return res.send({
			msg: "ok",
		});
	}

	const checkUser = await User.findOne({
		where: { usr_id },
	});

	if (!checkUser) {
		return res.status(404).send({
			msg: "The user was not found",
		});
	}

	if (!checkUser.refresh_token) {
		req.clearCookie("jwt", {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		return res.status(200).send({
			msg: "ok",
		});
	}

	await User.update({ refresh_token: null }, { where: { usr_id } });

	res.clearCookie("jwt", { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

	return res.send({
		msg: "ok",
	});
};

const refreshToken = async (req, res) => {
	const cookies = req.cookies;
	const usr_id = req.query.usr_id;

	if (!cookies?.jwt) {
		return res.sendStatus(401);
	}

	const refresh_token = cookies.jwt;

	const checkUser = await User.findOne({
		where: { usr_id },
	});

	if (!checkUser) {
		return res.sendStatus(403);
	}

	const { rol_token } = await Role.findOne({
		where: { rol_id: checkUser.rol_id },
	});

	jwt.verify(
		refresh_token,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decoded) => {
			if (err || checkUser.usr_username !== decoded.username) {
				return res.send(403);
			}

			const accessToken = jwt.sign(
				{
					info: {
						username: decoded.username,
						role: decoded.role,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "30m" }
			);

			res.send({
				msg: "success",
				token: accessToken,
				role: rol_token,
			});
		}
	);
};

export { register, login, logout, refreshToken };
