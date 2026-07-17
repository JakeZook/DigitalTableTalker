import { useEffect } from "react";
import { useState } from "react";

function App() {
	const [names, setNames] = useState([]);

	async function loadNames() {
		const response = await fetch(
			"https://script.google.com/macros/s/AKfycbwHdPvjXt2hhiBuygmRdky1_Z5gPk4n-s8cPf_9kEgOqMzL4khGkCBHhvS0_dfy5jTaPA/exec",
		);

		const data = await response.json();
		const entries = data.filter(
			(item) => item.name.trim() !== "" || item.playerName.trim() !== "",
		);

		setNames(entries);
	}

	useEffect(() => {
		loadNames();

		const interval = setInterval(loadNames, 60000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		console.log(names);
	}, [names]);

	return (
		<div className="min-h-screen bg-blue-200 text-white flex items-center justify-center p-8">
			<div className="w-full max-w-4xl space-y-8">
				{names.map((item) => (
					<div
						key={item.name}
						className="flex items-center justify-between rounded-2xl bg-zinc-900 px-8 py-6 shadow-lg"
					>
						<h1 className="text-5xl font-bold tracking-wide">{item.name}</h1>

						<p className="text-4xl text-cyan-400 font-medium">
							{item.playerName}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
