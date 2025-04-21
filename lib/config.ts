import { z } from "zod";

const envSchema = z.object({
	GITHUB_TOKEN: z.string({
		required_error: "GITHUB_TOKEN is required in to access the GitHub API",
	}),
	GITHUB_ORG: z.string({
		required_error:
			"GITHUB_ORG is required to access your GitHub organization repositories",
	}),
});

const envResult = envSchema.safeParse({
	GITHUB_TOKEN: process.env.GITHUB_TOKEN,
	GITHUB_ORG: process.env.GITHUB_ORG,
});

if (!envResult.success) {
	console.error("❌ Invalid environment variables:");
	console.error(envResult.error.format());
	throw new Error("Invalid environment configuration");
}

export const config = {
	github: {
		token: envResult.data.GITHUB_TOKEN,
		org: envResult.data.GITHUB_ORG,
	},
};
