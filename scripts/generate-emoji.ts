import { Twemoji } from "@svgmoji/twemoji"
import svg2img, { type svg2imgOptions } from "svg2img"
import { writeFileSync } from "node:fs";
import data from 'svgmoji/emoji.json';

async function fetchSvg(url:string) {
	const response = await fetch(url);
	const text = await response.text();
	return text
}

async function recolorSvg(svg: string, color: string) {
	const rewriter = new HTMLRewriter().on("path[fill='#3B88C3']", {
		element: (element) => {
			console.log(element)
			element.setAttribute("fill", color);
		}
	})

	return rewriter.transform(svg)
}

async function svg2imgAsync(svg:string, options: svg2imgOptions) {
	return new Promise((resolve, reject) => {
		svg2img(svg, options, (error, buffer) => {
			if (error) {
				reject(error);
			} else {
				resolve(buffer);
			}
		});
	});
}

const letters = {
	a:"🇦",
	b:"🇧",
	c:"🇨",
	d:"🇩",
	e:"🇪",
	f:"🇫",
	g:"🇬",
	h:"🇭",
	i:"🇮",
	j:"🇯",
	k:"🇰",
	l:"🇱",
	m:"🇲",
	n:"🇳",
	o:"🇴",
	p:"🇵",
	q:"🇶",
	r:"🇷",
	s:"🇸",
	t:"🇹",
	u:"🇺",
	v:"🇻",
	w:"🇼",
	x:"🇽",
	y:"🇾",
	z:"🇿",
};

const colors = {
	correct: "#78B159",
	place:"#FDCB58",
	incorrect: "#DD2E44",
	extra: "#AA8ED6"
}

const twemoji = new Twemoji({ data : data as any, type: 'all' })
const baseUrl = "https://cdn.jsdelivr.net/gh/svgmoji/svgmoji@3.2.0/packages/svgmoji__twemoji/svg/"

for (const letter in letters) {
	const emoji = letters[letter as keyof typeof letters];
	const allUrl = twemoji.url(emoji)
	const url = `${baseUrl}${allUrl.split("#")[1]}.svg`;
	const svg = await fetchSvg(url)
	console.log(URLSearchParams,svg)

	for (const name in colors) {
		const color = colors[name as keyof typeof colors];
		const recoloredSvg = await recolorSvg(svg, color);
		const imgBuffer = await svg2imgAsync(recoloredSvg, { resvg:{
			fitTo:{
				mode: "width",
				value:512
			}
		}});
		writeFileSync(`./emoji/${letter}_${name}.png`, imgBuffer as string)
	}
}