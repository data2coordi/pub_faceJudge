import  {  
		Out_debug,
		JudgeFaceClass,
		PartFactory,
		ThreePosFactory,
		FourPosFactory,
		convers_image_to_2d
		} from './JudgeFaceClass.js';

import  {  
		JudgeFaceGuiClass
		} from './JudgeFaceGuiClass.js';





class FaceApiClass{
	static create_model(){
		Promise.all([
				faceapi.nets.tinyFaceDetector.loadFromUri('models'),
				faceapi.nets.faceLandmark68TinyNet.loadFromUri('models'),
				faceapi.nets.faceLandmark68Net.load("models"),
				faceapi.nets.ssdMobilenetv1.loadFromUri('models')
		]);

	}

	static createCanvasFromMedia(start_img){
		return faceapi.createCanvasFromMedia(start_img);
	}

	static detectAllFaces(start_img){

		return faceapi.detectAllFaces(start_img).withFaceLandmarks(); 
		// faceLandmark68'Tiny'Net のときtrue
	}


}

class AnalyzeClass{

	static _analyze_part(judgeFaceClass, part, factory){

		judgeFaceClass.judge_personal_color(part, factory);
		let result_part_score = judgeFaceClass.get_judge_score(part);
		let result_part = judgeFaceClass.get_judge_result(part);

		//ui
		Gui.display_result(part, result_part, result_part_score )

	}

	static _personal_color_analyze(cavas_image_data, randmark_positions, x, y ){


		//// debug s /////
		Out_debug("< canvas before convert to 2d>")
		Out_debug(cavas_image_data);
		Out_debug("<image size: >")
		Out_debug(" width:" + x + " height:" + y);

		Out_debug("<randmark68_positions:>");
		Out_debug(randmark_positions);

		Out_debug("<position(x,y) by Ai>")
		Out_debug("   <start(x,y)  by Ai>")
		Out_debug(randmark_positions[30]);
		Out_debug("   <end(x,y)  by Ai>")
		Out_debug(randmark_positions[14]);
		//// debug e/////

		let convered_image_2d = convers_image_to_2d(cavas_image_data, x, y)

		//// debug s /////
		Out_debug("convered_image_2d:");
		Out_debug(convered_image_2d);
		//// debug e/////

		let judgeFaceClass = new JudgeFaceClass(randmark_positions,
							x,
							y,
							rgb_ratio_scope_db,
							);



		let Judge_ct = 0;
		Judge_ct = 20;
		let factory = new PartFactory(  convered_image_2d, 
						randmark_positions, 
						randmark_part_db,
						Judge_ct
						);
		//hoho
		AnalyzeClass._analyze_part(judgeFaceClass, "hoho", factory);



		//rip
		AnalyzeClass._analyze_part(judgeFaceClass, "rip", factory);



		//eye_white
		Judge_ct = 10;
		factory = new ThreePosFactory(  convered_image_2d, 
						randmark_positions, 
						randmark_part_db,
						Judge_ct
						);
		AnalyzeClass._analyze_part(judgeFaceClass, "eye_white", factory);



		//eye_black
		Judge_ct = 10;
		factory = new FourPosFactory(  convered_image_2d, 
						randmark_positions, 
						randmark_part_db,
						Judge_ct
						);
		AnalyzeClass._analyze_part(judgeFaceClass, "eye_black", factory);

		
	}



	static async analyze(faceApiClass, start_img) {

		document.getElementById("msg").textContent = "\n分析中\n時間がかかります"

		let base_canvas 	= await faceApiClass.createCanvasFromMedia(start_img);

		// 顔検出 + 特徴点68点抽出
		//複数人の人を想定しているためdetectionsは配列。が実際は1人のみ利用
		let detections = await faceApiClass.detectAllFaces(start_img);

		//judge
		let base_ctx 	= base_canvas.getContext('2d');
		let image_data = base_ctx.getImageData(0, 0, base_canvas.width, base_canvas.height);

		PartFactory.clear_judge_positions()
		AnalyzeClass._personal_color_analyze(image_data.data, detections[0].landmarks.positions, base_canvas.width, base_canvas.height )

		//display
		Gui.drow_judge_position(base_canvas, detections[0], PartFactory.get_judge_positions())
	}

}
		//////////////////////////////////////////////////////////////////////////////


let Gui = JudgeFaceGuiClass;
Gui.boot_gui();
FaceApiClass.create_model();

let analyze = document.getElementById('analyze');
let start_img = document.getElementById('start_img');
analyze.addEventListener("click", function() {AnalyzeClass.analyze(FaceApiClass, start_img);}, false);




/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//
//

export {  
		FaceApiClass
}
;
