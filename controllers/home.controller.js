import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const homeController = (req, res) => {
	return res.sendFile(path.join(__dirname, "..", "views", "index.html"));
};

export default homeController;
