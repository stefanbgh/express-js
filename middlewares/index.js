import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default (app) => {
	app.use(cors());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cookieParser());
	app.use("/", express.static(path.join(__dirname, "..", "public")));
};
