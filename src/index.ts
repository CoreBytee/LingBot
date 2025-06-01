import words from "../words.json";
import { env } from "bun";
import { Client, IntentsBitField } from "discord.js";
import fetchEmoji from "./helpers/fetchEmoji";

const emoji = await fetchEmoji();

const discord = new Client({
	intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages],
});
await discord.login(env.DISCORD_BOT_TOKEN as string);
console.log(words);