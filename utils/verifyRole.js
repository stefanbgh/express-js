const verifyRole = (req, res, next) => {
	if (!req?.role) return res.sendStatus(401);

	if (req.role === process.env.USER_ROLE) {
		return res.sendStatus(401);
	}

	next();
};

export default verifyRole;
