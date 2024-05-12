import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

const Article = sequelize.define(
	"article",
	{
		art_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		art_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		art_price: {
			type: DataTypes.DOUBLE.UNSIGNED,
			allowNull: false,
		},
		art_quantity: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
		},
		art_status: {
			type: DataTypes.ENUM(
				"in stock",
				"out of stock",
				"pre-order",
				"limited"
			),
			allowNull: false,
			defaultValue: "in stock",
		},
	},
	{
		tableName: "articles",
		timestamps: false,
	}
);

export default Article;
