import express, { Request, Response } from "express";
import { getKanji, getRememberList, updateToNotRemember, updateToRemember } from "./db";
import axios from "axios";
const route = express.Router();

route.post("/search", async (req: Request, res: Response) => {
	try {
		const fromFrontEnd = req.body.query;
		if (!fromFrontEnd) {
			return;
		}

		const response = await axios.get(
			`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(
				fromFrontEnd
			)}`,
			{
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36",
				},
			}
		);
		res.json(response.data);
	} catch (error) {
		console.error(error);
	}
});

route.post("/quiz", async (req: Request, res: Response) => {
	try {
		const choiceNumber = parseInt(req.body.choiceNumber);
		if (!choiceNumber) {
			return;
		}
		const kanjiFromDB = await getKanji(choiceNumber);
		res.json(kanjiFromDB);
	} catch (error) {
		console.error(error);
	}
});

route.put("/update", async (req: Request, res: Response) => {
	try {
		const idToUpdate = req.body.id;
		if (!idToUpdate) {
			return;
		}
		await updateToRemember(idToUpdate);
		res.sendStatus(204);
	} catch (error) {
		console.error(error);
	}
});

route.get("/remember", async (req: Request, res: Response) => {
	try {
		const remList = await getRememberList();
		if (!remList) res.sendStatus(404);
		res.json(remList);
	} catch (error) {
		console.error(error);
	}
});

route.put("/notRemember", async(req:Request, res:Response)=>{
	try {
		const idToUpdate:string[]=req.body.id
		if(!idToUpdate){
			return;
		}
		await updateToNotRemember(idToUpdate)	
		res.sendStatus(204)
	} catch (error) {
		console.error(error)
	}
})

export default route;
