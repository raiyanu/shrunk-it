import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { MongoClient, ServerApiVersion, Collection } from "mongodb";
import { signJwt } from "../../utils/jwt";
import cookie from "cookie";
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
	const JWToken = req.cookies?.["JWToken"];
	console.log("Fetched token", JWToken);
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Email and password are required" });
	}

	const collection: Collection = await getDB();
	const user = await collection.findOne({ email });
	console.log("User:", user);

	if (!user) {
		return res.status(400).json({ error: "Invalid credentials" });
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return res.status(400).json({ error: "Invalid credentials" });
	}

	const token = signJwt(user._id);
	res.setHeader(
		"Set-Cookie",
		cookie.serialize("JWToken", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24 * 7,
			path: "/",
			sameSite: "strict",
		})
	);
	res.status(200).json({ token });
}
