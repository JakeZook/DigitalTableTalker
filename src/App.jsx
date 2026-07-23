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
		<div className="w-[800px] h-[480px] overflow-hidden text-white flex flex-col items-center justify-between p-4 gap-3 breathing-bg">
			<div className="flex items-start gap-4 w-full">
				{/* Facilitators */}
				<div className="flex-1 bg-black/30 rounded-2xl p-4 backdrop-blur-sm">
					<h2 className="text-3xl font-bold text-center mb-4">
						Today's Facilitators
					</h2>

					<div className="space-y-3">
						{!loaded ? (
							<div className="text-2xl text-center py-8">
								Loading facilitators...
							</div>
						) : (
							names.map((item) => (
								<div
									key={item.name}
									className="flex items-center justify-between rounded-xl bg-zinc-900/80 px-4 py-3 shadow-lg name-card"
								>
									<h1 className="text-3xl font-bold truncate">{item.name}</h1>

									<p className="text-2xl text-cyan-400 ml-4">
										{item.playerName}
									</p>
								</div>
							))
						)}
					</div>
				</div>

				{/* QR */}
				<div className="qr-shine qr-bounce w-52 bg-black/30 rounded-2xl p-4 backdrop-blur-sm flex flex-col items-center shrink-0">
					<h2 className="text-3xl font-bold mb-3">Had fun?</h2>

					<img
						src={qrCode}
						alt="Google Review QR Code"
						className="w-36 h-36 rounded-lg bg-white p-2"
					/>

					<p className="text-xl mt-3 text-center">Please leave us a review!</p>
				</div>
			</div>

			{/* WiFi */}
			<div className="w-full bg-black/30 rounded-2xl p-3 backdrop-blur-sm text-center">
				<h2 className="text-[40px] font-bold">Wi-Fi</h2>

				<p className="text-lg mt-2">
					Network:
					<span className="text-cyan-400 font-bold">
						{" "}
						Activate - Westminster Guest
					</span>
				</p>

				<p className="text-lg">
					Password:
					<span className="text-cyan-400 font-bold"> Activate</span>
				</p>
			</div>
		</div>
	);
}

export default App;
