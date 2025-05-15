import { Routes, Route } from "react-router-dom";
import SearchKanji from "./page/SearchKanji";
import Quiz from "./page/Quiz";
import Navbar from './Navbar';
import Home from './page/Home';
import Remember from "./page/Remember";
import RemQuiz from "./page/RemQuiz";
import { useEffect } from "react";
import axios from "axios";

const App = () => {

	useEffect(()=>{
		const pingServer=async()=>{
			await axios.get("https://kanji-project.vercel.app/ping")
		}
		pingServer()
	}, [])

	return (
		<>
			<Navbar/>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/kanji/search" element={<SearchKanji />} />
				<Route path="/kanji/quiz" element={<Quiz />} />
				<Route path="/kanji/remember" element={<Remember />} />
				<Route path="/kanji/remember/quiz" element={<RemQuiz />} />
			</Routes>
		</>
	);
};

export default App;
