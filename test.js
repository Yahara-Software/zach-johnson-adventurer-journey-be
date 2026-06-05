// Unit tests

import { getJourneyAnswer } from "./cli.js";
import { Journey } from "./journey.js";

/**
 * Assert that the expected value is equal to the actual value, printing a
 * "SUCCESS" string if true and a "FAILURE" string if false.
 *
 * @param {*} expected - the expected value
 * @param {*} actual - the actual value
 * @param {String|null} testName - the name of this test for display purposes
 */
function assertEqual(expected, actual, testName = "") {
	if (expected === actual) {
		console.log(`SUCCESS ${testName}`);
	} else {
		console.log(`FAILURE ${testName}`);
		console.log(`Expected '${expected}' but was' ${actual}'`);
	}
}

/**
 * Assert that the expected message is equal to the message of the
 * error thrown by the test function, printing a "SUCCESS" string if
 * true and a "FAILURE" string if false.
 *
 * @param {String} expectedMessage - the message expected to appear in the error's message field
 * @param {Function} testFn - the function which is expected to throw an error
 * @param {String|null} testName - the name of this test for display purposes
 */
function assertError(expectedMessage, testFn, testName = "") {
	try {
		testFn();
	} catch (e) {
		assertEqual(expectedMessage, e.message, testName);
	}
}

/**
 * Run tests related to the `Journey` class.
 */
function runJourneyTests() {
	// No duplicates
	{
		const journeyString = "1F2B2R4L";
		const journey = Journey.from(journeyString);

		assertEqual(
			Math.sqrt(5),
			journey.euclideanDistance(),
			"Without duplicates"
		);
	}

	// With duplicates
	{
		const journeyString = "1F2B5F1F2R4L";
		const journey = Journey.from(journeyString);
		assertEqual(Math.sqrt(29), journey.euclideanDistance(), "With duplicates");
	}

	// Invalid distance
	{
		const journeyString = "aF2B5F1F2R4L";
		assertError(
			"Distance value 'a' could not be parsed as a number.",
			() => Journey.from(journeyString),
			"Invalid distance"
		);
	}
}

/**
 * Run tests related to the CLI.
 */
function runCLITests() {
	// Short journey
	{
		const journeyString = "1F2B2R4L";

		assertEqual(
			`The distance to your destination is ${Math.sqrt(5)}. Take your time; you've got all day!`,
			getJourneyAnswer(journeyString),
			"Short journey"
		);
	}

	// Long journey
	{
		const journeyString = "25F5F0B2R32L";

		assertEqual(
			`The distance to your destination is ${Math.sqrt(1800)}. Best get walking!`,
			getJourneyAnswer(journeyString),
			"Long journey"
		);
	}
}

runJourneyTests();
runCLITests();
