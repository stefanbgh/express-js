import User from "../models/User.js";

const getUsers = async (req, res) => {
	const users = await User.findAll();

	if (users.length < 1) {
		return res.status(404).send({
			err: "The users were not found",
		});
	}

	return res.send({
		msg: "success",
		data: users,
	});
};

const getSingleUser = async (req, res) => {
	const usr_id = req.params.id;

	const user = await User.findOne({ where: { usr_id } }); // or findByPk

	if (!user) {
		return res.status(404).send({
			err: "The user was not found",
		});
	}

	return res.send({
		msg: "success",
		data: user,
	});
};

const updateUser = async (req, res) => {
	const dto = req.body;

	const checkUser = await User.findOne({
		where: { usr_username: username },
	});

	if (checkUser) {
		return res.status(401).send({
			err: "Username already exists",
		});
	}

	await User.update(dto, { where: { usr_id: req.params.id } });

	return res.send({
		msg: "success",
	});
};

const deleteUser = async (req, res) => {
	const usr_id = req.params.id;

	const result = await User.destroy({ where: { usr_id } });

	if (result === 0) {
		return res.status(404).send({
			err: "The user was not found",
		});
	}

	return res.send({
		msg: "success",
	});
};

export { getUsers, getSingleUser, updateUser, deleteUser };
