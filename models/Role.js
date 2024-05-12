import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

const Role = sequelize.define(
	"role",
	{
		rol_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		rol_token: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
	},
	{
		tableName: "roles",
		timestamps: false,
	}
);

export default Role;
