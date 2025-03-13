import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { v4 as uuidv4 } from "uuid";
export default class Links {
	generateCustomUuid(length) {
		const uuid = uuidv4().replace(/-/g, ''); // Remove hyphens
		const shortUuid = uuid.slice(0, 8);
		return shortUuid
	}

	constructor() {
		this.db = new Low(new JSONFile("./db.json"), null);
	}
	async getLink() {
		const db = new Low(new JSONFile("./db.json"), null);
		await db.write();
		return "";
	}
	shortLink(link) {
		const customUuid = this.generateCustomUuid(12);
		return customUuid;
	}
}
