import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const signJwt = (userId: ObjectId) => {
	console.log(userId);
	return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyJwt = (token: string) => {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log(String(error));
		}
		return null;
	}
};
