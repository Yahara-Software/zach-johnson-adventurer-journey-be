import { Journey } from "./journey.js";
import { getJourneyAnswer } from "./cli.js";

import readline from "readline";

const cli = readline.createInterface(process.stdin, process.stdout);

// Prompt the user to provide the journey string.
cli.question("> What is the path to your destination?\n> ", (response) => {
	console.log(`> ${getJourneyAnswer(response)}\n`);
	process.exit();
});
