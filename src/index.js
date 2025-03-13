import Fastify from "fastify";
import qs from "qs";
import Links from "./links.js";
const link = new Links();

let serverUrl = "http://localhost:3000/";

const fastify = Fastify({
	querystringParser: (str) => qs.parse(str),
});

fastify.get(
	"/api",
	async function handler(request, reply) {
		let url = request.query.url;
		let shortUrl = serverUrl + await link.shortLink(url);
		return reply.send({ shortUrl, url });
	}
);

(async () => {
	try {
		await fastify.listen({ port: 3000 });
		const address = fastify.server.address();
		const port = typeof address === "object" ? address?.port.toString() : "";

		serverUrl = `${!fastify.server.address().address === "::1" ?
			fastify.server.address().address :
			'http://localhost:'}${port}/`;
		console.log(`Server listening at http://localhost:${port}`);
		console.log(fastify.server.address());
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
})();
