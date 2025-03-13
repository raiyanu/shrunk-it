import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: "/s/:slug*",
				destination: "/api/s/:slug*",
			},
		];
	},
};

export default nextConfig;
