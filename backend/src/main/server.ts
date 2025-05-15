import express from "express";
import cors from "cors";
import route from "./routes";
import dotenv from "dotenv";
import { connectDB } from "./db";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use("/kanji", route);

app.listen(PORT, () => {
	console.log("server is running");
});
