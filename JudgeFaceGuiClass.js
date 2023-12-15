
let Items_table = {
	"all":       ["start_img",  "selectedFile_label", "photograph", "picture", "shutter", "video", "back", "analyze", "result_img"  ],
	"init":      ["start_img",  "selectedFile_label", "photograph","picture" ],	
//	"photograph":["video",	    "shutter", "picture" ],	
	"photograph":["video",	    "shutter"  ],	
	"selected":  ["start_img",  "back", "analyze"],	
	"result":    ["result_img", "back", ]
}	


/**
 * Represents the state of the JudgeFaceClass GUI.
 *
 * @class
 */
class JudgeFaceStateClass {
	/**
	 * Creates an instance of JudgeFaceStateClass.
	 *
	 * @constructor
	 * @param {Object} [items_table=Items_table] - The table containing information about visible items.
	 */
	constructor(items_table = Items_table) {
		this.items_table = items_table;
	}

	/**
	 * Changes the visibility of HTML elements based on the given key and flag.
	 *
	 * @private
	 * @param {string} key - The key representing a specific set of HTML elements.
	 * @param {string} flag - The visibility flag ('visible' or 'hidden').
	 */
	_change_visible(key, flag) {
		let all_items = this.items_table[key];
		for (let cssId of all_items) {
			let htmlTag = document.getElementById(cssId);
			htmlTag.style.visibility = flag;
		}
	}

	/**
	 * Switches the GUI state to the initialization state.
	 */
	to_init() {
		this._change_visible("all", "hidden");
		this._change_visible("init", "visible");
	}

	/**
	 * Switches the GUI state to the result state.
	 */
	to_result() {
		this._change_visible("all", "hidden");
		this._change_visible("result", "visible");
	}

	/**
	 * Switches the GUI state to the selected state.
	 */
	to_selected() {
		this._change_visible("all", "hidden");
		this._change_visible("selected", "visible");
	}

	/**
	 * Switches the GUI state to the photograph state.
	 */
	to_photograph() {
		this._change_visible("all", "hidden");
		this._change_visible("photograph", "visible");
	}
}

/**
 * Represents the graphical user interface (GUI) for JudgeFaceClass.
 *
 * @class
 */
class JudgeFaceGuiClass {
	/**
	 * Draws the judge positions on the base canvas.
	 *
	 * @static
	 * @param {HTMLCanvasElement} base_canvas - The base canvas element.
	 * @param {Object} detection - The detection information.
	 * @param {Array} judge_positions - The array of judge positions.
	 */
	static drow_judge_position(base_canvas, detection, judge_positions) {
		let Base_ctx = base_canvas.getContext('2d');

		let box = {};
		Base_ctx.strokeStyle = "rgb(255, 255, 255)";

		box = detection.detection.box;
		Base_ctx.strokeRect(box.x, box.y, box.width, box.height);

		for (let point of detection.landmarks.positions) {
			Base_ctx.strokeRect(point.x, point.y, 10, 10);
		}

		Base_ctx.strokeStyle = "rgb(204, 0, 255)";
		for (let point of judge_positions) {
			Base_ctx.strokeRect(point.x, point.y, 10, 10);
		}

		let imgSrc = base_canvas.toDataURL("image/jpeg", 1);
		document.getElementById("result_img").src = imgSrc;
	}

	/**
	 * Displays the result information on the GUI.
	 *
	 * @static
	 * @param {string} id - The identifier.
	 * @param {string} result - The result for hoho.
	 * @param {object} result_score - The scores for hoho.
	 */
	static display_result(id, result, result_score) {
		id=id.replace("hoho", "頬の")
		id=id.replace("rip", "唇の")
		id=id.replace("eye_white", "白目部分の")
		id=id.replace("eye_black", "黒目部分の")
		result = result.replace("sp", "【春】")
		result = result.replace("sm", "【夏】")
		result = result.replace("au", "【秋】")
		result = result.replace("wi", "【冬】")

		if (result.length == 0) {result="【特徴なし】"}
		let msg = "<br>--------------------<br>" + id;
		msg = msg + '結果は' + result + 'です<br>';
		msg = msg + "<br>sp:" + result_score["sp"];
		msg = msg + "<br>sm:" + result_score["sm"];
		msg = msg + "<br>au:" + result_score["au"];
		msg = msg + "<br>wi:" + result_score["wi"];

		document.getElementById('msg').innerHTML = document.getElementById('msg').innerHTML + msg;

		let gui_state = new JudgeFaceStateClass(Items_table);
		gui_state.to_result();
	}

	/**
	 * Boots up the JudgeFaceClass GUI.
	 *
	 * @static
	 */
	static boot_gui() {
		let gui_state = new JudgeFaceStateClass(Items_table);
		gui_state.to_init();

		let back = document.getElementById('back');
		back.addEventListener("click", function () { gui_state.to_init(); }, false);

		var elm = document.getElementById("selectedFile");
		elm.onchange = function (evt) {
			var selectFiles = evt.target.files;
			if (selectFiles.length != 0) {
				var fr = new FileReader();
				fr.readAsDataURL(selectFiles[0]);

				fr.onload = function (evt) {
					document.getElementById('start_img').src = fr.result;
				}

				gui_state.to_selected();
			}
		}

		document.querySelector("#photograph").addEventListener("click", () => {
			JudgeFaceGuiClass.photograph();
		});

		document.querySelector("#shutter").addEventListener("click", () => {
			JudgeFaceGuiClass.shutter();
		});
	}

	/**
	 * Captures a photo and sets it as the start image.
	 *
	 * @static
	 */
	static shutter() {
		let video = document.getElementById("video");
		let cam_canvas = document.getElementById("picture");
		const ctx = cam_canvas.getContext("2d");

		video.pause();

		cam_canvas.width = video.videoWidth;
		cam_canvas.height = video.videoHeight;

		ctx.drawImage(video, 0, 0, cam_canvas.width, cam_canvas.height);

		let imgSrc = cam_canvas.toDataURL("image/jpeg", 1);
		document.getElementById("start_img").src = imgSrc;

		let gui_state = new JudgeFaceStateClass(Items_table);
		gui_state.to_selected();
	}

	/**
	 * Activates the photograph mode by setting up the camera.
	 *
	 * @static
	 */
	static photograph() {
		let video = document.getElementById("video");

		const constraints = {
			audio: false,
			video: {
				width: { ideal: 1000 },
				facingMode: "user"
			}
		};

		try {
			navigator.mediaDevices.getUserMedia(constraints)
				.then((stream) => {
					video.srcObject = stream;
					video.onloadedmetadata = (e) => {
						video.play();
					};
				}).catch((err) => {
					console.log(err.name + ": " + err.message);
				});

			let gui_state = new JudgeFaceStateClass(Items_table);
			gui_state.to_photograph();

		} catch (error) {
			const err = new Error('カメラが使えない端末です。「写真をアップロード」で診断してください。');
			alert(`${err.name} ${err.message}`);
		}
	};
}

export {
	JudgeFaceStateClass,
	JudgeFaceGuiClass
};
