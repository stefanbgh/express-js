import Article from "../models/Article.js";

const getArticles = async (req, res) => {
	const articles = await Article.findAll();

	if (articles.length < 1) {
		return res.status(404).send({
			err: "The articles are empty",
		});
	}

	return res.send({
		msg: "success",
		data: articles,
	});
};

const getSingleArticle = async (req, res) => {
	const art_id = req.params.id;

	const article = await Article.findByPk(art_id);

	if (!article) {
		return res.status(404).send({
			err: "The article was not found",
		});
	}

	return res.send({
		msg: "success",
		data: article,
	});
};

const addArticle = async (req, res) => {
	const dto = req.body;

	await Article.create(dto);

	return res.send({
		msg: "success",
	});
};

const updateArticle = async (req, res) => {
	const dto = req.body;
	const art_id = req.params.id;

	await Article.update(dto, { where: { art_id } });

	return res.send({
		msg: "success",
	});
};

const deleteArticle = async (req, res) => {
	const art_id = req.params.id;

	const article = await User.destroy({ where: { art_id } });

	if (article === 0) {
		return res.status(404).send({
			err: "The article was not found",
		});
	}

	return res.send({
		msg: "success",
	});
};

export {
	getArticles,
	getSingleArticle,
	addArticle,
	updateArticle,
	deleteArticle,
};
