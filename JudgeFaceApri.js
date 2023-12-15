import { Out_debug, JudgeFaceClass, PartFactory, ThreePosFactory, FourPosFactory, convers_image_to_2d } from './JudgeFaceClass.js';
import { JudgeFaceGuiClass } from './JudgeFaceGuiClass.js';

/**
 * Represents a class for handling face-related API operations.
 *
 * @class
 */
class FaceApiClass {
	/**
	 * Creates models required for face detection and landmark extraction.
	 *
	 * @static
	 */
	static create_model() {
		Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri('models'),
			faceapi.nets.faceLandmark68TinyNet.loadFromUri('models'),
			faceapi.nets.faceLandmark68Net.load("models"),
			faceapi.nets.ssdMobilenetv1.loadFromUri('models')
		]);
	}

	/**
	 * Creates a canvas from a media element.
	 *
	 * @static
	 * @param {HTMLMediaElement} start_img - The media element to create a canvas from.
	 * @returns {HTMLCanvasElement} The created canvas element.
	 */
	static createCanvasFromMedia(start_img) {
		return faceapi.createCanvasFromMedia(start_img);
	}

	/**
	 * Detects all faces in the provided media element and extracts facial landmarks.
	 *
	 * @static
	 * @param {HTMLMediaElement} start_img - The media element containing the image.
	 * @returns {Promise} A promise that resolves with face detection results.
	 */
	static detectAllFaces(start_img) {
		return faceapi.detectAllFaces(start_img).withFaceLandmarks();
		// faceLandmark68'Tiny'Net のときtrue
	}
}

/**
 * Represents a class for analyzing facial features and personal color.
 *
 * @class
 */
class AnalyzeClass {
	/**
	 * Analyzes a specific facial part and updates the UI.
	 *
	 * @static
	 * @param {JudgeFaceClass} judgeFaceClass - The instance of JudgeFaceClass for analysis.
	 * @param {string} part - The name of the facial part to analyze.
	 * @param {PartFactory} factory - The PartFactory instance for creating facial parts.
	 * @private
	 */
	static _analyze_part(judgeFaceClass, part, factory) {
		judgeFaceClass.judge_personal_color(part, factory);
		let result_part_score = judgeFaceClass.get_judge_score(part);
		let result_part = judgeFaceClass.get_judge_result(part);

		// ui
		Gui.display_result(part, result_part, result_part_score);
	}

	/**
	 * Analyzes the personal color of facial features based on RGB values.
	 *
	 * @static
	 * @param {number[][]} cavas_image_data - The RGB values of the facial features.
	 * @param {Object} randmark_positions - The landmark positions of the face.
	 * @param {number} x - The width of the image.
	 * @param {number} y - The height of the image.
	 * @private
	 */
	static _personal_color_analyze(cavas_image_data, randmark_positions, x, y) {
		let convered_image_2d = convers_image_to_2d(cavas_image_data, x, y);

		let judgeFaceClass = new JudgeFaceClass(randmark_positions, x, y, rgb_ratio_scope_db);

		let Judge_ct = 0;
		Judge_ct = 20;
		let factory = new PartFactory(convered_image_2d, randmark_positions, randmark_part_db, Judge_ct);
		// hoho
		AnalyzeClass._analyze_part(judgeFaceClass, "hoho", factory);

		// rip
		AnalyzeClass._analyze_part(judgeFaceClass, "rip", factory);

		// eye_white
		Judge_ct = 10;
		factory = new ThreePosFactory(convered_image_2d, randmark_positions, randmark_part_db, Judge_ct);
		AnalyzeClass._analyze_part(judgeFaceClass, "eye_white", factory);

		// eye_black
		Judge_ct = 10;
		factory = new FourPosFactory(convered_image_2d, randmark_positions, randmark_part_db, Judge_ct);
		AnalyzeClass._analyze_part(judgeFaceClass, "eye_black", factory);
	}

	/**
	 * Performs facial analysis using Face API and updates the UI.
	 *
	 * @static
	 * @async
	 * @param {FaceApiClass} faceApiClass - The instance of FaceApiClass for face analysis.
	 * @param {HTMLMediaElement} start_img - The media element containing the image to analyze.
	 */
	static async analyze(faceApiClass, start_img) {
		// document.getElementById("msg").textContent = "\n分析中\n時間がかかります";
		document.getElementById("msg").textContent = "\n※※※ 分析結果 ※※※\n";

		let base_canvas = await faceApiClass.createCanvasFromMedia(start_img);

		// Face detection + Landmark extraction
		// Detections is an array for handling multiple people, but only one is used in practice
		let detections = await faceApiClass.detectAllFaces(start_img);

		// judge
		let base_ctx = base_canvas.getContext('2d');
		let image_data = base_ctx.getImageData(0, 0, base_canvas.width, base_canvas.height);

		PartFactory.clear_judge_positions();
		AnalyzeClass._personal_color_analyze(image_data.data, detections[0].landmarks.positions, base_canvas.width, base_canvas.height);

		// display
		Gui.drow_judge_position(base_canvas, detections[0], PartFactory.get_judge_positions());
	}
}

// Gui initialization
let Gui = JudgeFaceGuiClass;
Gui.boot_gui();
// Model loading for face analysis
FaceApiClass.create_model();

// Event listener for the analyze button
let analyze = document.getElementById('analyze');
let start_img = document.getElementById('start_img');
analyze.addEventListener("click", function () { AnalyzeClass.analyze(FaceApiClass, start_img); }, false);

// Additional comments or imports if needed

export {
	FaceApiClass
};
