import mongoose from "mongoose";
import dotenv from "dotenv";
import { Types } from "mongoose";

dotenv.config();

const kanjiSchema = new mongoose.Schema({
	_id: {
		type: Types.ObjectId,
		required: true,
	},
	kanji: {
		type: String,
		required: true,
	},
	kana: {
		type: String,
		required: true,
	},
	english: {
		type: String,
		required: true,
	},
	remembered: {
		type: Boolean,
		required: true,
		default: false,
	},
});

const Kanji = mongoose.model("Kanji", kanjiSchema, "kanji");

const connectDB = () => {
	if (!process.env.MONGODB_URI) {
		throw new Error(
			"MONGODB_URI is not defined in the environment variables"
		);
	}
	mongoose.connect(process.env.MONGODB_URI).then(() => {
		console.log("Using DB:", mongoose.connection.name);
	});
};

const getKanji = async (choiceNumber: number) => {
	try {
		const randomKanji = await Kanji.aggregate([
			{ $match: { remembered: false } },
			{ $sample: { size: choiceNumber } },
		]);
		return randomKanji;
	} catch (error) {
		console.error(error);
	}
};

const updateToRemember = async (id: string) => {
	try {
		const objectId = new Types.ObjectId(id);
		await Kanji.updateOne(
			{ _id: objectId },
			{ $set: { remembered: true } }
		);
	} catch (error) {
		console.error(error);
	}
};

const updateToNotRemember = async (id: string[]) => {
	try {
		const objectIds = id.map((item) => new Types.ObjectId(item));
		await Kanji.updateMany(
			{ _id: { $in: objectIds } },
			{ $set: { remembered: false } }
		);
	} catch (error) {
		console.error(error);
	}
};

const getRememberList = async () => {
	try {
		const remKanji = await Kanji.find({ remembered: true });
		return remKanji;
	} catch (error) {
		console.error(error);
	}
};

export {
	connectDB,
	getKanji,
	updateToRemember,
	updateToNotRemember,
	getRememberList,
};
