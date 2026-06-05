// Utility functions for command line interface

import { Journey } from "./journey.js";

/**
 * Gets the answer to a journey string provided to the CLI.
 * 
 * @param {String} response - the user-provided journey string
 * @returns 
 */
export function getJourneyAnswer(response) {
	const journey = Journey.from(response);
	const distance = journey.euclideanDistance();

	const isFar = distance >= 30;
	const unsolicitedAdvice = isFar
		? "Best get walking!"
		: "Take your time; you've got all day!";

	return `The distance to your destination is ${distance}. ${unsolicitedAdvice}`;
}