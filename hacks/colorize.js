const fs = require("fs");

const contents = fs.readFileSync("./41136596542.txt").toString("utf8");

const ansiToTailwind = {
	"1": "font-bold",
	"2": "opacity-70",
	"3": "italic",
	"4": "underline",
	"9": "line-through",

	// Foreground colors
	"30": "text-black",
	"31": "text-red-500",
	"32": "text-green-500",
	"33": "text-yellow-500",
	"34": "text-blue-500",
	"35": "text-purple-500",
	"36": "text-cyan-500",
	"37": "text-white",

	// Bright foregrounds
	"90": "text-gray-500",
	"91": "text-red-400",
	"92": "text-green-400",
	"93": "text-yellow-400",
	"94": "text-blue-400",
	"95": "text-purple-400",
	"96": "text-cyan-400",
	"97": "text-white",

	// Backgrounds
	"40": "bg-black",
	"41": "bg-red-500",
	"42": "bg-green-500",
	"43": "bg-yellow-500",
	"44": "bg-blue-500",
	"45": "bg-purple-500",
	"46": "bg-cyan-500",
	"47": "bg-white",

	// Bright backgrounds
	"100": "bg-gray-500",
	"101": "bg-red-400",
	"102": "bg-green-400",
	"103": "bg-yellow-400",
	"104": "bg-blue-400",
	"105": "bg-purple-400",
	"106": "bg-cyan-400",
	"107": "bg-white",
};

function colorize(logs) {
	const ESC = String.fromCharCode(27);
	const curClasses = [];
	const colorizedLine = [];
	for (let i = 0; i < logs.length; i++) {
		if (logs[i] === ESC && logs[i + 1] === "[") {
			const curEsc = [];
			do {
				curEsc.push(logs[++i]);
			} while (logs[i] !== "m"); // `m` is the end of the ansi code

			const codes = curEsc.join("").replace('[', '').replace('m', '').split(';')
			//console.log(codes)

			for (const code of codes) {
			if (code === "0") {
				do {
					curClasses.pop();
				} while (curClasses.length);
			} else {
				curClasses.push(ansiToTailwind[code]);
			}
			}
		} else {
			colorizedLine.push({ char: logs[i], classes: curClasses.join(" ") });
		}
	}




	let curClassname = "";
	let char = colorizedLine.shift();
	const lines = [];
	const curLine = [{ str: char.char, classes: char.classes }];
	while ((char = colorizedLine.shift())) {
		if (char.char === "\n") {
			lines.push([...curLine]);
			do {
				curLine.pop();
			} while (curLine.length);
			curClassname = "";
			curLine.push({ str: "", classes: curClassname });
		} else if (char.classes !== curClassname) {
			curLine.push({ str: char.char, classes: char.classes });
		} else {
			curLine[curLine.length - 1].str += char.char;
		}
		curClassname = char.classes;
	}

	return lines;
}

console.log(colorize(contents));
//colorize(contents);
