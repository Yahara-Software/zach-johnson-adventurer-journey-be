// A module containing types and functions related to an adventurer's journey

// The valid planes of movement on a journey
const PLANES = {
	LONGITUDINAL: "LONGITUDINAL",
	LATERAL: "LATERAL"
};

// Valid directional keys and information about the movement they represent.
// Directions that are "opposites" (i.e. front/back) are represented as positive/negative values on the same plane.
const DIRECTIONS = {
	F: {
		plane: PLANES.LONGITUDINAL,
		multiplier: 1
	},
	B: {
		plane: PLANES.LONGITUDINAL,
		multiplier: -1
	},
	R: {
		plane: PLANES.LATERAL,
		multiplier: 1
	},
	L: {
		plane: PLANES.LATERAL,
		multiplier: -1
	}
};

/**
 * A single move on a journey
 * @module JourneyMove
 *
 * @property {Number} distance - The number of steps to travel in the specified direction
 * @property {String} direction - The direction of travel
 */
class JourneyMove {
	/**
	 * @param {Number} distance - The number of steps to travel in the specified direction
	 * @param {String} direction - The direction of travel
	 */
	constructor(distance, direction) {
		this.distance = distance;
		this.direction = direction;
	}
}

/**
 * A journey planned by an adventurer
 * @module Journey
 *
 * @property {JourneyMove[]} moves - An array of moves planned on the journey
 */
export class Journey {
	/**
	 * @param {JourneyMove[]} moves - An array of moves planned on the journey
	 */
	constructor(moves) {
		this.moves = moves;
	}

	/**
	 * Initialize a `Journey` from a string representing the planned
	 * steps and their distance.
	 *
	 * @param {String} journeyString A string representing the planned journey (ex. '12F4B3R7L')
	 * @returns {Journey} An new `Journey` instance
	 */
	static from(journeyString) {
		// Split by direction and capture both direction and distance
		const moveSplitExp = /([FBRL])/g;
		const splitMoves = journeyString.split(moveSplitExp);

		const moves = [];

		// Construct `JourneyMove`s from the tokenized array
		for (let i = 0; i < splitMoves.length - 1; i += 2) {
			const moveTuple = splitMoves.slice(i, i + 2);

			const distance = Number(moveTuple[0]);

			// Validate values
			if (Number.isNaN(distance)) {
				throw new Error(
					`Distance value '${moveTuple[0]}' could not be parsed as a number.`
				);
			}
			// Should be impossible since we only split on valid keys but kept it here defensively.
			if (!(moveTuple[1] in DIRECTIONS)) {
				throw new Error(
					`Direction '${moveTuple[1]}' is not a valid movement direction.`
				);
			}
			moves.push(new JourneyMove(Number(moveTuple[0]), moveTuple[1]));
		}
		return new Journey(moves);
	}

	/**
	 * The Euclidean (straight-line) distance to the destination.
	 */
	euclideanDistance() {
		const destCoords = this._destinationCoordinates();
		const sumSquares = Object.values(PLANES).reduce((sumAcc, dir) => {
			sumAcc += destCoords[dir] ** 2;
			return sumAcc;
		}, 0);
		return Math.sqrt(sumSquares);
	}

	/**
	 * Compute the total movement in each direction.
	 *
	 * @returns {Object} The destination coordinates, keyed by direction.
	 */
	_destinationCoordinates() {
		const destinationCoords = {
			[PLANES.LONGITUDINAL]: 0,
			[PLANES.LATERAL]: 0
		};
		this.moves.forEach((move) => {
			const directionInfo = DIRECTIONS[move.direction];
			destinationCoords[directionInfo.plane] +=
				move.distance * directionInfo.multiplier;
		});
		return destinationCoords;
	}
}
