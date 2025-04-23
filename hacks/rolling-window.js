const logs = `2025-04-18T06:09:49.9409303Z Receiving objects:  87% (107/122)
2025-04-18T06:09:49.9410323Z Receiving objects:  88% (108/122)
2025-04-18T06:09:49.9411344Z Receiving objects:  89% (109/122)
2025-04-18T06:09:49.9412363Z Receiving objects:  90% (110/122)
2025-04-18T06:09:49.9413380Z Receiving objects:  91% (112/122)
2025-04-18T06:09:49.9414400Z Receiving objects:  92% (113/122)
2025-04-18T06:09:49.9415519Z Receiving objects:  93% (114/122)
2025-04-18T06:09:49.9416534Z Receiving objects:  94% (115/122)
2025-04-18T06:09:49.9417555Z Receiving objects:  95% (116/122)
2025-04-18T06:09:49.9418564Z Receiving objects:  96% (118/122)
2025-04-18T06:09:49.9419578Z Receiving objects:  97% (119/122)
2025-04-18T06:09:49.9420585Z Receiving objects:  98% (120/122)
2025-04-18T06:09:49.9421595Z Receiving objects:  99% (121/122)
2025-04-18T06:09:49.9422604Z Receiving objects: 100% (122/122)
2025-04-18T06:09:49.9423892Z Receiving objects: 100% (122/122), 144.64 KiB | 3.53 MiB/s, done.
2025-04-18T06:09:49.9425268Z Resolving deltas:   0% (0/9)
2025-04-18T06:09:49.9426329Z Resolving deltas:  11% (1/9)
2025-04-18T06:09:49.9427278Z Resolving deltas:  22% (2/9)
2025-04-18T06:09:49.9428245Z Resolving deltas:  33% (3/9)
2025-04-18T06:09:49.9429209Z Resolving deltas:  44% (4/9)
2025-04-18T06:09:49.9430159Z Resolving deltas:  55% (5/9)
2025-04-18T06:09:49.9431111Z Resolving deltas:  66% (6/9)
2025-04-18T06:09:49.9432073Z Resolving deltas:  77% (7/9)
2025-04-18T06:09:49.9433034Z Resolving deltas:  88% (8/9)
2025-04-18T06:09:49.9433993Z Resolving deltas: 100% (9/9)
2025-04-18T06:09:49.9434967Z Resolving deltas: 100% (9/9), done.
2025-04-18T06:09:49.9436264Z From https://github.com/gfs-hybrid-services/apiky
2025-04-18T06:09:49.9437814Z  * [new ref]         8dd7494aba8f6997f63a4f9ef239a633c3949d71 -> origin/main
2025-04-18T06:09:49.9439985Z ##[endgroup]`;

function splitTest() {
	const splitStr = "2025-04-18T06:09:49.9433034Z Resolving deltas:  88% (8/9)"
		.split(/\s/)
		.filter(Boolean);
	const relevantWords = splitStr.slice(1, 3);
	console.log(relevantWords);
}

splitTest();

const parseFingerprint = (line) =>
	line.split(/\s/).filter(Boolean).slice(1, 3).join(" ");

/**
 * @param {string} input
 * @returns {Array<{line: string, repetitions: string[]}>}
 */
function parse(input) {
	const lines = input.split("\n");

	const output = [];
	for (let i = 0; i < lines.length; i++) {
		let windowLength = 2;
		let windowMatches = false;
		output.push({ line: lines[i], repetitions: [] });
		do {
			const window = lines.slice(i, i + windowLength); // create a window of 2 lines
			const baselineFingerprint = parseFingerprint(lines[i]);
			windowMatches =
				window.length !== 1 &&
				window.every((windowLine) => {
					const fingerprint = parseFingerprint(windowLine);
					// todo: could probably remove skip the check for idx === i
					return baselineFingerprint === fingerprint;
				});
			windowLength += 1;
			if (windowMatches) {
				const line = window[window.length - 1];
				output[output.length - 1].repetitions.push(line);
			}
			// go through the window and check if everything matches
		} while (windowMatches);
		// we need to skip i to where we left off. i + (windowLength - 1)
		if (windowLength !== 2) {
			i = i + (windowLength - 1);
			windowLength = 2;
		}
	}

	console.log(output);
}

parse(logs);
