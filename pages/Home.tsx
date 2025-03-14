import React from "react";
import Table from "@/component/Table";
import Dashboard from "@/component/Dashboard";
import Profile from "@/component/Profile";
import UrlShortener from "@/component/UrlShortner";

function Home() {
	return (
		<div
			className="flex flex-col md:grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr] grid-flow-row h-screen p-4 rounded-2xl gap-4 *:border-2 *:rounded-2xl "
			style={{
				gridTemplateAreas: `
					"create create linkTable linkTable"
					"create create linkTable linkTable"
					"count user linkTable linkTable"
					`,
			}}
		>
			<div
				className="flex items-center justify-center"
				style={{ gridArea: "create" }}
			>
				<UrlShortener />
			</div>
			<div
				className="flex items-center justify-center"
				style={{ gridArea: "count" }}
			>
				<Dashboard />
			</div>
			<div
				className="flex items-center justify-center"
				style={{ gridArea: "user" }}
			>
				<Profile />
			</div>
			<div className="p-2" style={{ gridArea: "linkTable" }}>
				<Table />
			</div>
		</div>
	);
}
export default Home;
