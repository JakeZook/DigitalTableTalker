import { useEffect } from "react";
import { useState } from "react";
import "./app.css";
import qrCode from "./assets/QR.jpg";

function App() {
	const [names, setNames] = useState([]);
	const [loaded, setLoaded] = useState(false);

	async function loadNames() {
		try {
			const response = await fetch(
				"https://script.google.com/macros/s/AKfycbwHdPvjXt2hhiBuygmRdky1_Z5gPk4n-s8cPf_9kEgOqMzL4khGkCBHhvS0_dfy5jTaPA/exec",
			);

			const data = await response.json();

			const entries = data.filter(
				(item) => item.name.trim() !== "" || item.playerName.trim() !== "",
			);

			// Only update if the data changed
			setNames((currentNames) => {
				if (JSON.stringify(currentNames) !== JSON.stringify(entries)) {
					return entries;
				}

				return currentNames;
			});

			setLoaded(true);
		} catch (error) {
			console.error("Failed to load names:", error);
		}
	}

	useEffect(() => {
		loadNames();

		const interval = setInterval(loadNames, 60000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="min-h-screen text-white flex flex-col items-center justify-center p-8 gap-8 breathing-bg">
			<div className="flex items-center gap-8">
				<div className="w-full max-w-4xl bg-black/30 rounded-3xl p-8 backdrop-blur-sm">
					<h2 className="text-5xl font-bold text-center mb-8">
						Today's Facilitators
					</h2>

					<div className="space-y-8">
						{!loaded ? (
							<div className="text-4xl text-center py-12">
								Loading facilitators...
							</div>
						) : (
							names.map((item) => (
								<div
									key={item.name}
									className="flex items-center justify-between rounded-2xl bg-zinc-900/80 px-8 py-6 shadow-lg name-card"
								>
									<h1 className="text-5xl font-bold tracking-wide">
										{item.name}
									</h1>

									<p className="text-3xl text-cyan-400 font-medium">
										{item.playerName}
									</p>
								</div>
							))
						)}
					</div>
				</div>

				<div className="qr-shine w-[500px] bg-black/30 rounded-3xl p-8 backdrop-blur-sm flex flex-col items-center">
					<h2 className="text-5xl font-bold mb-6">Had fun?</h2>
					<img
						src={qrCode}
						alt="Google Review QR Code"
						className="w-64 h-64 rounded-xl bg-white p-4"
					/>
					<p className="text-xl mt-6">Please leave us a review!</p>
				</div>
			</div>

			<div className="w-full max-w-5xl bg-black/30 rounded-3xl p-6 backdrop-blur-sm text-center">
				<h2 className="text-3xl font-bold">Wi-Fi</h2>

				<p className="text-2xl mt-3">
					Network:{" "}
					<span className="text-cyan-400 font-bold">
						Activate - Westminster Guest
					</span>
				</p>

				<p className="text-2xl">
					Password: <span className="text-cyan-400 font-bold">Activate</span>
				</p>
			</div>
		</div>
	);
}

export default App;
