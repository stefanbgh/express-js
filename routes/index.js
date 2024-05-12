import homeRoutes from "./home.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import articleRoutes from "./article.routes.js";
import notFoundRoutes from "./404.routes.js";
import jwtVerify from "../jwt/index.js";

export default (app) => {
	app.use("/", homeRoutes);
	app.use("/api/v1/auth", authRoutes);
	app.use("/api/v1/users", jwtVerify, userRoutes);
	app.use("/api/v1/articles", jwtVerify, articleRoutes);
	app.use("*", notFoundRoutes);
};
