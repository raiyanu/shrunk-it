import { NextApiRequest, NextApiResponse } from "next";
import { verifyJwt } from "../../utils/jwt";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	const decoded = verifyJwt(token);

	if (!decoded) {
		return res.status(401).json({ error: "Invalid or expired token" });
	}

	// You can fetch user info from DB if necessary, using decoded.userId

	res.status(200).json({ message: "Protected content accessed" });
}
