import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import dialectModule from "mysql2";

const sequelize = new Sequelize({
	dialect: dbConfig.dialect,
	host: dbConfig.host,
	username: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.db,
	port: dbConfig.port,
	dialectModule,
});

const connectToDb = async () => {
	try {
		await sequelize.authenticate();
		console.log("Successfully connected to DB");
		await sequelize.sync();
	} catch (error) {
		console.log(error);
	}
};

export { sequelize, connectToDb };
