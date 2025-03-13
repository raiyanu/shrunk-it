import { Low } from "lowdb";
import { JSONFile, JSONFilePreset } from "lowdb/node";
import { v4 as uuidv4 } from "uuid";

let db = await JSONFilePreset('db.json', { links: [] })

export default class Links {
	constructor() {
	}
	async shortLink(link) {
		const UniqueId = this.getUniqueId();
		await db.data.links.push({ id: UniqueId, link });
		await db.write()
		return UniqueId;
	}
	getLink(id) {
		const link = db.data.links.find((l) => l.id === id);
		if (link) {
			console.log(link)
			return link;
		}
		return null;
	}
	getUniqueId() {
		let UniqueId = this.generateCustomUuid(6);
		while (db.data.links.at[UniqueId]) {
			console.log("already exists");
			UniqueId = this.generateCustomUuid(6);
		}
		console.log("unqiue found");
		return UniqueId;
	}
	generateCustomUuid(length) {
		const uuid = uuidv4().replace(/-/g, ''); // Remove hyphens
		const shortUuid = uuid.slice(0, length);
		return shortUuid
	}
}
