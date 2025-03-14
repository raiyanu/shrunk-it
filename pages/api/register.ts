import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { MongoClient, ServerApiVersion, Collection } from "mongodb";
import { signJwt } from "../../utils/jwt";

const client = new MongoClient(process.env.MONGO_URI ?? "", {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

const getDB = async () => {
	try {
		await client.connect();
		const database = client.db("shrunkit");
		return database.collection("users");
	} catch (error) {
		throw error;
	}
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log(req.body);
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Email and password are required" });
	}

	const collection: Collection = await getDB();
	const existingUser = await collection.findOne({ email });

	if (existingUser) {
		return res.status(400).json({ error: "User already exists" });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = {
		email,
		password: hashedPassword,
	};

	const result = await collection.insertOne(user);
	const token = signJwt(result.insertedId);

	res.status(201).json({ token });
}
