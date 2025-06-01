import { readdirSync, readFileSync } from "node:fs";
import { REST } from "@discordjs/rest";
import { env } from "bun";
import { Routes } from "discord-api-types/v10";

const DISCORD_BOT_ID = env.DISCORD_BOT_ID as string;
const DISCORD_BOT_TOKEN = env.DISCORD_BOT_TOKEN as string;

const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);
const files = readdirSync("./emoji")

for (const file of files) {
	const path = `./emoji/${file}`;

	console.log(path)
	console.log(file.replace(".png", ""),)

	console.log(await rest.post(
		Routes.applicationEmojis(DISCORD_BOT_ID),
		{
			body: {
				name: file.replace(".png", ""),
				image: `data:image/png;base64,${readFileSync(path, 'base64')}`,
			}
		}
	))
}