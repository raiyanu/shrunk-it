import type { NextApiRequest, NextApiResponse } from "next";
import link from "./links";
import { MongoClient, ServerApiVersion } from "mongodb";
import { v4 as uuidv4 } from "uuid";

type Data = {
	url?: string;
	shortUrl?: string;
	error?: string;
};
interface Request {
	url: string;
}
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	try {
		if (typeof req.query.url === "string") {
			const collection = await getDB();
			if (!collection) {
				throw new Error("Failed to connect to MongoDB");
			}
			const UniqueId = await getUUID(collection);
			let doc = null;
			if (collection) {
				doc = await collection.insertOne({ id: UniqueId, link: req.query.url });
			}
			res.status(200).json({
				shortUrl: `https://shrunk-it.vercel.app/api/s/${UniqueId}`,
				url: req.query.url,
			});
		} else {
			res.status(400).json({ error: "Invalid URL" });
		}
	} catch (error) {}
}
async function getUUID(collection: any) {
	let UniqueId = generateCustomUuid(6);
	// let existingDoc = await collection.findOne({ id: UniqueId });
	// console.log(existingDoc);
	while (await collection.findOne({ id: UniqueId })) {
		console.log("already exists, generating new...");
		UniqueId = generateCustomUuid(6);
	}
	console.log("unqiue found", UniqueId);
	return UniqueId;
}

const client = new MongoClient(
	process.env.MONGO_URI ??
		(() => {
			throw new Error("MONGO_URI is not defined");
		})(),
	{
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		},
	}
);

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
function generateCustomUuid(length: number) {
	const uuid = uuidv4().replace(/-/g, ""); // Remove hyphens
	const shortUuid = uuid.slice(0, length);
	return shortUuid;
}
