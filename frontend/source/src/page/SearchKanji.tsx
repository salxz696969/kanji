import axios from "axios";
import { useState } from "react";

type JapaneseInside = {
	word: string;
	reading: string;
};

type SenseInside = {
	english_definitions: string[];
};

type DataInside = {
	japanese: JapaneseInside[];
	senses: SenseInside[];
};

type Data = {
	data: DataInside[];
};

const SearchKanji = () => {
	const [word, setWord] = useState<Data | null>(null);
	const [input, setInput] = useState<string>("");
	const [submit, setSubmit] = useState<boolean>(false);

	const sendToServer = async () => {
		try {
			setSubmit(true);
			const response = await axios.post(
				"https://kanji-backend-4yfk.onrender.com/kanji/search",
				{
					query: input, // ✅ same as your fetch body
				}
			);
			setWord(response.data); // ✅ axios auto-parses response
		} catch (error) {
			console.error(error);
		} finally {
			setSubmit(false);
		}
	};

	const display = () => {
		if (submit) {
			return (
				<div className="text-2xl w-svw h-100 flex justify-center items-center">
					<svg
						aria-hidden="true"
						className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
				</div>
			);
		}
		if (word) {
			return (
				<div className="w-full flex flex-col items-center gap-5 text-gray-200 justify-center">
					<div className="h-20 bg-blue-950/85 w-[95%] rounded-xl flex items-center pl-4 pr-4 text-xl max-w-xl">
						Kana: {word.data[0]?.japanese[0]?.reading}
					</div>
					<div className="h-20 bg-blue-950/85 w-[95%] rounded-xl flex items-center pl-4 pr-4 text-xl max-w-xl">
						Translate:{" "}
						{word.data[0]?.senses[0]?.english_definitions.join(
							", "
						)}
					</div>
				</div>
			);
		}
	};

	return (
		<div className="bg-gray-200 text-2xl w-svw min-h-svh">
			<div className="w-full flex flex-col bg-blue-950 h-50 justify-end">
				<div className="flex w-full justify-center">
					<div className="flex max-w-xl w-[80%] justify-around">
						<input
							type="text"
							className="bg-gray-300 border border-gray-700 rounded-xl w-[90%] h-10 focus:outline-1 focus:outline-gray-100 text-base pl-2.5"
							value={input}
							placeholder="Type Japanese word..."
							onChange={(e) => setInput(e.target.value)}
						/>
						<button
							className="h-10 w-10 flex items-center ml-5 border-2 border-gray-400 justify-center bg-sky-500 rounded-xl hover:bg-sky-500/95 cursor-pointer"
							onClick={() => sendToServer()}
						>
							<svg
								className="w-5 h-5 text-gray-300"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
						</button>
					</div>
				</div>
				<div className="h-8 bg-gray-200 rounded-t-3xl mt-4"></div>
			</div>
			{display()}
		</div>
	);
};

export default SearchKanji;
