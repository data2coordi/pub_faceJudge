/**
 * Represents a class for storing RGB values.
 *
 * @class
 */
class RgbClass {
	/**
	 * Creates an instance of RgbClass.
	 *
	 * @constructor
	 * @param {number} r - The red component of the RGB color.
	 * @param {number} g - The green component of the RGB color.
	 * @param {number} b - The blue component of the RGB color.
	 */
	constructor(r, g, b) { 
		this.r = r;
		this.g = g;
		this.b = b;
	}
}

/**
 * Represents a class for storing information about a face part.
 *
 * @class
 */
class FacePartClass {
	/**
	 * Creates an instance of FacePartClass.
	 *
	 * @constructor
	 * @param {string} id - The identifier of the face part.
	 * @param {RgbClass[]} rgbs - An array of RgbClass instances representing RGB values.
	 * @param {object} rgb_scopes - Additional RGB scope information.
	 */
	constructor(id, rgbs, rgb_scopes) { 
		this.part_id = id;
		this.rgbs = rgbs; // RgbClass
	}

	/**
	 * Gets the identifier of the face part.
	 *
	 * @returns {string} The identifier of the face part.
	 */
	get_id() {
		return this.part_id;
	}

	/**
	 * Gets the array of RGB values associated with the face part.
	 *
	 * @returns {RgbClass[]} An array of RgbClass instances representing RGB values.
	 */
	get_rgbs() {
		return this.rgbs;
	}
}

export { RgbClass, FacePartClass };
