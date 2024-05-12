import express from "express";
import routes from "./routes/index.js";
import middlewares from "./middlewares/index.js";

import { PORT } from "./constants/port.constant.js";
import { connectToDb } from "./db/index.js";

const app = express();

middlewares(app);
routes(app);

app.listen(PORT, async () => {
	console.log(`Server listening on port: http://localhost:${PORT}`);

	await connectToDb();
});

process.on("unhandledRejection", (reason, promise) => {
	console.error("Unhandled Rejection at:", promise, "reason:", reason);

	process.exit(1);
});
