import { useEffect } from "react";
import { useState } from "react";
import "./app.css";
import qrCode from "./assets/QRNew.jpg";

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

	const compactMode = names.length > 3;

	return (
		<div className="w-[800px] h-[480px] overflow-hidden text-white flex flex-col items-center justify-between p-4 gap-3 breathing-bg new-font">
			<div className="flex items-start gap-3 w-full">
				{/* Facilitators */}
				<div className="panel flex-1">
					<div className="panel-content rounded-2xl p-4">
						<h2 className="text-scanner font-bold text-4xl text-center mb-3">
							Meet the team
						</h2>

						<div
							className={compactMode ? "grid grid-cols-2 gap-3" : "space-y-3"}
						>
							{!loaded ? (
								<div className="text-2xl text-center py-8">
									Loading facilitators...
								</div>
							) : (
								names.map((item) => (
									<div
										key={item.name}
										className={`flex items-center rounded-xl bg-zinc-900/80 px-4 py-3 shadow-lg name-card ${
											compactMode ? "justify-center flex" : "justify-between"
										}`}
									>
										{compactMode ? (
											<h1 className="text-scanner text-2xl font-bold truncate text-center w-full">
												{item.name}
											</h1>
										) : (
											<>
												<h1 className="text-3xl font-bold truncate">
													{item.name}
												</h1>

												<p className="text-2xl text-scanner font-bold ml-4">
													{item.playerName}
												</p>
											</>
										)}
									</div>
								))
							)}
						</div>
					</div>
				</div>

				{/* QR */}
				<div className="qr-shine qr-bounce w-52 shrink-0">
					<div className="panel-content rounded-2xl p-4 flex flex-col items-center">
						<h2 className="text-3xl font-bold mb-2 text-scanner">Had fun?</h2>

						<img
							src={qrCode}
							alt="Google Review QR Code"
							className="w-36 h-36 rounded-lg bg-white p-2"
						/>

						<p className="text-xl mt-3 text-center">
							Please leave us a review!
						</p>
					</div>
				</div>
			</div>

			{/* WiFi */}
			<div className="panel w-full">
				<div className="panel-content rounded-2xl p-3 text-center">
					<h2 className="text-[40px] font-bold text-scanner">Wi-Fi</h2>

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
		</div>
	);
}

export default App;
