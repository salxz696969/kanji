import { useState } from "react";
import { Link, useLocation} from "react-router-dom";

type KanjiType = {
	_id: string;
	kanji: string;
	kana: string;
	english: string;
	remembered: boolean;
};

const RemQuiz = () => {
	const location = useLocation();
	const kanjiFromRem: KanjiType[] = location.state?.quizList || [];
    const [kanji, setKanji] = useState<KanjiType[]>(kanjiFromRem);
	const [counter, setCounter] = useState<number>(0);
	const [displayOption, setDisplayOption] = useState<string>("kanji");
	const [inputAnswer, setInputAnswer] = useState<string>("");

	const displayOptionFunction = () => {
		switch (displayOption) {
			case "kanji":
				return kanji[counter]?.kanji;
			case "kana":
				return kanji[counter]?.kana;
			case "english":
				return kanji[counter]?.english;
		}
	};

    const submitToRemember = async (id: string) => {
		if (inputAnswer !== kanji[counter]?.kana) {
			return;
		}
		try {
			const displayElement = document.getElementById("display");
			if (displayElement) {
				displayElement.style.backgroundColor = "lightgreen";
			}

			// Wait for 1 second
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Clear the background color
			if (displayElement) {
				displayElement.style.backgroundColor = "";
			}


			// Update the state
			setKanji(kanji.filter((i) => i._id !== id));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="bg-gray-200 text-2xl w-svw min-h-svh flex flex-col">
            <button className="absolute text-gray-200 top-2 left-2">
				<Link to={"/kanji/remember"}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
						/>
					</svg>
				</Link>
			</button>
			<div className="w-full flex flex-col bg-blue-950 h-50 justify-end">
				<div className="h-8 bg-gray-200 rounded-t-3xl mt-4"></div>
			</div>
			<div
				className="bg-gray-300 h-80 w-[80%] self-center rounded-2xl border border-blue-950 max-w-xl flex justify-between pl-2 pr-2"
				onClick={() => setDisplayOption("kanji")}
                id="display"
			>
				<button
					onClick={() =>
						counter === 0
							? setCounter(counter)
							: setCounter(counter - 1)
					}
					className="cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-7 self-center"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
				</button>

				<div className="self-center">{displayOptionFunction()}</div>
				<button
					onClick={() =>
						counter === kanji.length - 1
							? setCounter(counter)
							: setCounter(counter + 1)
					}
					className="cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-7 self-center"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
				</button>
			</div>
			<div className="flex w-[80%] justify-between self-center mt-5 max-w-xl">
				<input
					type="text"
					className="bg-gray-300 border border-gray-700 rounded-xl flex-grow mr-2 h-10 focus:outline-1 focus:outline-gray-100 text-base pl-2.5"
					placeholder="Type Kana..."
					value={inputAnswer}
					onChange={(e) => setInputAnswer(e.target.value)}
				/>
				<button
					className="h-10 w-10 flex items-center border-2 border-gray-400 justify-center bg-sky-500 rounded-xl hover:bg-sky-500/95 cursor-pointer"
                    onClick={() => submitToRemember(kanji[counter]?._id)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="size-6 text-gray-200"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
						/>
					</svg>
				</button>
			</div>
			<div className="w-[80%] flex justify-between mt-3 text-base self-center max-w-xl">
				<button
					className="bg-gray-300 w-[48%] rounded-xl h-10 cursor-pointer border border-blue-950 hover:bg-gray-200"
					onClick={() => setDisplayOption("kana")}
				>
					Show Kana
				</button>
				<button
					className="bg-gray-300 w-[48%] rounded-xl h-10 cursor-pointer border border-blue-950 hover:bg-gray-200"
					onClick={() => setDisplayOption("english")}
				>
					Show English
				</button>
			</div>
		</div>
	);
};

export default RemQuiz;