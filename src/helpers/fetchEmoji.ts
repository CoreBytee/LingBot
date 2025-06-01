import { env } from "bun";
import {
	REST,
	type RESTGetAPIApplicationEmojisResult,
	Routes,
	formatEmoji,
} from "discord.js";

const DISCORD_BOT_ID = env.DISCORD_BOT_ID as string;
const DISCORD_BOT_TOKEN = env.DISCORD_BOT_TOKEN as string;

export default async function fetchEmoji() {
	const rest = new REST({
		version: "10",
	}).setToken(DISCORD_BOT_TOKEN);

	const emoji = (await rest.get(
		Routes.applicationEmojis(DISCORD_BOT_ID),
	)) as RESTGetAPIApplicationEmojisResult;

	return Object.fromEntries(
		emoji.items.map((emoji) => [emoji.name, formatEmoji(emoji.id)]),
	);
}
