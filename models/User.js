import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

import Role from "./Role.js";

const User = sequelize.define(
	"user",
	{
		usr_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		usr_username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		usr_password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		refresh_token: {
			type: DataTypes.STRING,
		},
		rol_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: {
				model: Role,
				key: "rol_id",
			},
			defaultValue: process.env.ROLE_ID,
		},
	},
	{
		tableName: "users",
		timestamps: false,
	}
);

export default User;
