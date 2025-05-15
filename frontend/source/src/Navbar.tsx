import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
	const location = useLocation();

	const getActive = () => {
		if (location.pathname === "/") return "home";
		if (location.pathname.startsWith("/kanji/search")) return "search";
		if (location.pathname.startsWith("/kanji/quiz")) return "quiz";
		if (location.pathname.startsWith("/kanji/remember")) return "remember";
		return "";
	};

	const active = getActive();

	return (
		<nav className="flex w-[80%] max-w-xl bg-gray-300 justify-around h-10 items-center rounded-2xl absolute left-1/2 transform -translate-x-1/2 top-8">
			<Link
				to="/"
				className={`border border-blue-900 cursor-pointer h-7 w-[20%] text-center rounded-full ${
					active === "home"
						? "bg-blue-900 text-gray-50 hover:bg-blue-900/90"
						: "bg-gray-300 hover:bg-gray-900/5 hover:text-black"
				}`}
			>
				Home
			</Link>
			<Link
				to="/kanji/search"
				className={`border border-blue-900 cursor-pointer h-7 w-[20%] text-center rounded-full ${
					active === "search"
						? "bg-blue-900 text-gray-50 hover:bg-blue-900/90"
						: "bg-gray-300 hover:bg-gray-900/5 hover:text-black"
				}`}
			>
				Search
			</Link>
			<Link
				to="/kanji/quiz"
				className={`cursor-pointer border border-blue-900 h-7 w-[20%] text-center rounded-full ${
					active === "quiz"
						? "bg-blue-900 text-gray-50 hover:bg-blue-900/90"
						: "bg-gray-300 hover:bg-gray-900/5 hover:text-black"
				}`}
			>
				Quiz
			</Link>
			<Link
				to="/kanji/remember"
				className={`cursor-pointer border border-blue-900 h-7 w-[20%] text-center rounded-full ${
					active === "remember"
						? "bg-blue-900 text-gray-50 hover:bg-blue-900/90"
						: "bg-gray-300 hover:bg-gray-900/5 hover:text-black"
				}`}
			>
				Rem
			</Link>
		</nav>
	);
};

export default Navbar;
