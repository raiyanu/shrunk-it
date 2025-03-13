import React, { useState } from "react";

function UrlShortener() {
	const [url, setUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");
	const [showShortUrl, setShowShortUrl] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (url === "") {
			console.log("URL is empty");
			setError("URL is empty");
			setTimeout(() => {
				setError("");
			}, 2000);
			return;
		}
		try {
			const res = await fetch(`/api?url=${url}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!res.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await res.json();
			if (data.shortUrl) {
				setShortUrl(data.shortUrl);
				setShowShortUrl(true);
			} else {
				setError("Server Error");
				setTimeout(() => {
					setError("");
				}, 5000);
			}
			console.log(shortUrl);
		} catch (error) {
			console.error("Error shortening the URL:", error);
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(shortUrl);
	};

	const handleClear = () => {
		setShowShortUrl(false);
		setShortUrl("");
		setUrl("");
	};

	return (
		<div className="flex items-center justify-center h-screen bg-base-200">
			<div className="card bg-base-100 w-96 shadow-sm">
				<div className="card-body">
					<h2 className="card-title">Shrunk-it</h2>
					<p>Fast and Easy URL shortener</p>
					<form onSubmit={handleSubmit} className="mt-4">
						<input
							name="url"
							id="url"
							type="text"
							placeholder="Type here"
							className="input w-full"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
						/>
						<div className="mt-3">
							<button type="submit" className="btn btn-primary btn-block">
								Short it!
							</button>
						</div>
					</form>

					{showShortUrl && (
						<div className="card-footer flex items-center justify-between">
							<div>
								<p className="text-md">Shortened URL:</p>
								<a
									id="shortUrl"
									className="text-blue-300 text-xl"
									target="_blank"
									rel="noopener noreferrer"
									href={shortUrl}
								>
									{shortUrl}
								</a>
							</div>
							<button
								className="btn btn-soft btn-warning btn-sm"
								onClick={handleClear}
							>
								Clear
							</button>
						</div>
					)}

					{showShortUrl && (
						<button
							className="btn btn-soft btn-success btn-block"
							onClick={handleCopy}
						>
							Copy
						</button>
					)}
					<p className="text-red-500 text-center">{error}</p>
				</div>
			</div>
		</div>
	);
}

export default UrlShortener;
