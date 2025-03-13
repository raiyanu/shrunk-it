const { MongoClient, ServerApiVersion } = require("mongodb");
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	url: string;
	error?: object;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	try {
		const { slug } = req.query;
		console.log(slug);
		if (typeof slug === "string") {
			const collection = await getDB();
			const doc = await collection.findOne({ id: slug });
			let link = doc.link.startsWith("http") ? doc.link : `https://${doc.link}`;
			if (doc) {
				const url = new URL(link);
				res.writeHead(307, { Location: url.toString() });
				res.end();
			} else {
				res.status(404).json({ url: "URL doesnt exists" });
			}
		} else {
			res.status(400).json({ url: "Invalid URL" });
		}
	} catch (error) {
		console.error("Error redirecting to the URL:", error);
		res.status(500).json({ url: "Server Error", error: error ?? "" });
	}
}

const client = new MongoClient(process.env.MONGO_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function getDB() {
	try {
		await client.connect();
		const database = client.db("shrunkit");
		const collection = database.collection("links");
		return collection;
	} catch (e) {
		console.error("Failed to connect to MongoDB:", e);
	}
}
