import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type KanjiType = {
	_id: string;
	kanji: string;
	kana: string;
	english: string;
	remembered: boolean;
};

const Remember = () => {
	const [remKanjiList, setRemKanjiList] = useState<KanjiType[]>([]);
	const [quizListToReLearn, setQuizListToReLearn] = useState<KanjiType[]>([]);

	useEffect(() => {
		const getRememberedList = async () => {
			try {
				const response = await axios.get(
					"https://kanji-backend-4yfk.onrender.com/kanji/remember"
				);
				setRemKanjiList(response.data); // Axios puts the actual data in `.data`
			} catch (error) {
				console.error("Failed to fetch remembered kanji list:", error);
			}
		};

		getRememberedList();
	}, []);


	const handleCheck = (item: KanjiType) => {
		setQuizListToReLearn((prev) => {
			const exist = prev.some((i) => i._id === item._id);
			return exist
				? prev.filter((i) => i._id !== item._id)
				: [...prev, item];
		});
	};

    const putBackToNotRemember=async()=>{
        try {
            const idArrayToUpdate:string[]=quizListToReLearn.map((e)=>e._id)
            await axios.put("http://localhost:3000/kanji/notRemember", {id:idArrayToUpdate})
            
        } catch (error) {
            console.error(error)
        }
    }
	return (
		<div className="bg-gray-200 text-2xl w-svw min-h-svh">
			<div className="w-full flex flex-col bg-blue-950 h-50 justify-end">
				<h1 className="self-center text-gray-200">Remembered Kanjis</h1>
				<div className="h-8 bg-gray-200 rounded-t-3xl mt-4"></div>
			</div>
			<div className="flex w-full justify-center">
				<ul className="flex flex-col gap-2 pt-3 border-[1.5px] rounded-2xl items-center h-90 overflow-auto bg-gray-300 w-[90%] border-gray-400 max-w-xl">
					{remKanjiList.map((kanji, i) => {
						return (
							<li
								key={i}
								className="bg-blue-950/85 text-gray-200 rounded-2xl p-2 text-base w-[90%] flex justify-between items-center"
							>
								<div className="h-10 flex items-center">
									{kanji.kanji}
								</div>
								<input
									type="checkbox"
									className="self-center w-4 h-4 mr-2"
									checked={quizListToReLearn.some(
										(i) => i._id === kanji._id
									)}
									onChange={() => handleCheck(kanji)}
								/>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="flex mt-3 w-full justify-center">
				<div className="flex w-[90%] justify-between max-w-xl">
					<button className="bg-sky-500 w-[48%] cursor-pointer h-[50px] text-gray-200 border-[1.5px] border-gray-500 rounded-xl">
						<Link
							to={"/kanji/remember/quiz"}
							state={{ quizList: quizListToReLearn }}
						>
							Quiz
						</Link>
					</button>
					<button className="bg-sky-500 text-base w-[48%] cursor-pointer h-[50px] text-gray-200 border-[1.5px] border-gray-500 rounded-xl"
                    onClick={()=>putBackToNotRemember()}>
						Put back to study list
					</button>
				</div>
			</div>
		</div>
	);
};

export default Remember;
