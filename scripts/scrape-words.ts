import { writeFileSync } from "node:fs";

function hasSpecialCharacters(word: string) {
	return /[^a-z]/i.test(word);
}

async function scapeWords(page: string) {
	const words: string[] = [];
	const rewriter = new HTMLRewriter().on("a[href]", {
		element: (element) => {
			const [, word] = element.getAttribute("href")?.split("/woord/") || [];
			if (!word) return;
			const [pickedWord] = word.split("/");
			const trimmedWord = pickedWord?.trim();
			if (!trimmedWord || hasSpecialCharacters(trimmedWord)) return;
			words.push(pickedWord!.trim());
		},
	});

	rewriter.transform(page);

	return words;
}

const links = [
	"https://www.lingowoorden.nl/categorie/5-letterwoorden/",
	"https://www.lingowoorden.nl/categorie/6-letterwoorden/",
	"https://www.lingowoorden.nl/categorie/7-letterwoorden/",
	"https://www.lingowoorden.nl/categorie/8-letterwoorden/",
	"https://www.lingowoorden.nl/categorie/9-letterwoorden/",
	"https://www.lingowoorden.nl/categorie/10-letterwoorden/",
	"https://www.lingowoorden.nl/categorie/11-letterwoorden/",
	"https://www.lingowoorden.nl/categorie/12-letterwoorden/",
];

const words = [];

for (const link of links) {
	console.log(link);
	const response = await fetch(link);
	const page = await response.text();
	const pageWords = await scapeWords(page);
	words.push(...pageWords);

	console.log(words.length);
}

console.log("Scraped all pages", words.length, "words");

writeFileSync("./words.json", JSON.stringify(words, null, 2));
