import  {  
		//Out_debug,
		//JudgeFaceClass,
		//PartFactory
		} from './JudgeFaceClass.js';

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


/*
IMG_7047-2.JPG
face.jpg
face_u1.jpg

base_start.png
start_img.jpg
details.png
photograph.png

features_autumn_hard.png
features_autumn_yellow.png
features_spring_soft.png
features_spring_yellow.png
features_summer_blue.png
features_summer_soft.png
features_winter_blue.png
features_winter_hard.png


result_autumn_hard.png
result_autumn_yellow.png
result_spring_soft.png
result_spring_yellow.png
result_summer_blue.png
result_summer_soft.png
result_winter_blue.png
result_winter_hard.png

selectedFile.png
shutter.png
this.png
back.png

uplord.png
*/

let Items_table = {
	"all":       ["start_img",  "selectedFile_label", "photograph", "picture", "shutter", "video", "back", "analyze", "result_img"  ],
	"init":      ["start_img",  "selectedFile_label", "photograph","picture" ],	
//	"photograph":["video",	    "shutter", "picture" ],	
	"photograph":["video",	    "shutter"  ],	
	"selected":  ["start_img",  "back", "analyze"],	
	"result":    ["result_img", "back", ]
}	


class JudgeFaceStateClass{


	constructor(items_table = Items_table){
		this.items_table = items_table;
	}

	_change_visible(key, flag){

		let all_items = this.items_table[key]
		for (let cssId of all_items) {
			let htmlTag = document.getElementById(cssId);
			htmlTag.style.visibility = flag
		}

	};

	to_init(){
		this._change_visible("all",  "hidden");
		this._change_visible("init", "visible");
	}

	to_result(){
		this._change_visible("all",  "hidden");
		this._change_visible("result", "visible");
	}

	to_selected(){
		this._change_visible("all",  "hidden");
		this._change_visible("selected", "visible");
	}
	to_photograph(){
		this._change_visible("all",  "hidden");
		this._change_visible("photograph", "visible");
	}
}


class JudgeFaceGuiClass{
	//ui
	static drow_judge_position(base_canvas, detection, judge_positions ){

		let Base_ctx 		= base_canvas.getContext('2d');

		// 検出した顔の数だけループ
		let box = {};

		Base_ctx.strokeStyle 	= "rgb(255, 255, 255)";

		// 検出領域を長方形で表示
		box = detection.detection.box;
		Base_ctx.strokeRect(box.x, box.y, box.width, box.height);
		// 特徴点を中心とした3*3の正方形を68点プロット
		for (let point of detection.landmarks.positions){
			Base_ctx.strokeRect(point.x, point.y, 10, 10);
		}

		Base_ctx.strokeStyle 	= "rgb(204, 0, 255)";
		for (let point of judge_positions){
			Base_ctx.strokeRect(point.x, point.y, 10, 10);
		}

		// canvasを画像に変換
		let imgSrc = base_canvas.toDataURL("image/jpeg", 1);
		document.getElementById("result_img").src = imgSrc;

	}

	static display_result(id, result_hoho, result_hoho_score){
		
		let msg = "<br>--------------------<br>" +  id
		msg = msg + '結果は' + result_hoho + 'です<br>'
		msg = msg + "<br>sp:"+ result_hoho_score["sp"]
		msg = msg + "<br>sm:"+ result_hoho_score["sm"]
		msg = msg + "<br>au:"+ result_hoho_score["au"]
		msg = msg + "<br>wi:"+ result_hoho_score["wi"]

		document.getElementById('msg').innerHTML = document.getElementById('msg').innerHTML + msg;

		let gui_state = new JudgeFaceStateClass(Items_table)
		gui_state.to_result()


	}

	static boot_gui(){

		let gui_state = new JudgeFaceStateClass(Items_table)
		gui_state.to_init()


		let back = document.getElementById('back');
		back.addEventListener("click", function() {gui_state.to_init();}, false);


		/* 画像選択へ*/
		var elm = document.getElementById("selectedFile");

		elm.onchange = function(evt){
			var selectFiles = evt.target.files;
			if(selectFiles.length != 0) {
				var fr = new FileReader();
				fr.readAsDataURL(selectFiles[0]);
				fr.onload = function(evt) {
					
					document.getElementById('start_img').src =  fr.result ;
				}

				gui_state.to_selected()
			}
		}

		/* 写真を取るへ*/
		document.querySelector("#photograph").addEventListener("click", () => {
			JudgeFaceGuiClass.photograph()			
		});

		/* シャッターボタン*/
		document.querySelector("#shutter").addEventListener("click", () => {
			JudgeFaceGuiClass.shutter()			
				
		});


	}

	static shutter(){
			/*on photo*/
			let video = document.getElementById("video");
			let cam_canvas = document.getElementById("picture");
	
			const ctx = cam_canvas.getContext("2d");

			// 演出的な目的で一度映像を止めてSEを再生する
			video.pause();  // 映像を停止
			//se.play();      // シャッター音
			//		  setTimeout( () => {
			//				  video.play();    // 0.5秒後にカメラ再開
			//				  }, 500);

			// canvasに画像を貼り付ける
			cam_canvas.width = video.videoWidth;
			cam_canvas.height = video.videoHeight;

			ctx.drawImage(video, 0, 0, cam_canvas.width, cam_canvas.height);
			//ctx.drawImage(video, 0, 0, 300, 600);

			let imgSrc = cam_canvas.toDataURL("image/jpeg", 1);
			document.getElementById("start_img").src = imgSrc;

			let gui_state = new JudgeFaceStateClass(Items_table)
			gui_state.to_selected()
	
	}

	static photograph(){

		let video = document.getElementById("video");

		//const se     = document.querySelector('#se');

		/** カメラ設定 */
		const constraints = {
			audio: false,
			       video: {
//				       width: ,
//				       height:2048,
				      width: { ideal: 1000 } , 
			facingMode: "user"   // フロントカメラを利用する
					    // facingMode: { exact: "environment" }  // リアカメラを利用する場合
			       }
					};

		/**
		 * カメラを<video>と同期
		 */
		try {
			navigator.mediaDevices.getUserMedia(constraints)
				.then( (stream) => {
						video.srcObject = stream;
						video.onloadedmetadata = (e) => {
						video.play();
						};
						}).catch( (err) => {
					console.log(err.name + ": " + err.message);
					});
			
			let gui_state = new JudgeFaceStateClass(Items_table)
			gui_state.to_photograph()

		}catch(error){
			const err = new Error('カメラが使えない端末です。「写真をアップロード」で診断してください。');
			alert(`${err.name} ${err.message}`);
		}

	};


}


export {  
	JudgeFaceStateClass,
	JudgeFaceGuiClass
}
;
