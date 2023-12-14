
import  {  
	RgbClass,
	FacePartClass
		} from './JudgeFaceDomainClass.js';


class JudgeFaceClass {

	constructor(	//cavas_image_data,
			randmark_positions,
			width,
			height,
			//randmark_part_db,
			scope_db,
			)
	{ 

		//this.cavas_image_data = cavas_image_data
		this.randmark_positions = randmark_positions
		//this.randmark_part_db = randmark_part_db
		this.scope_db = scope_db;
		this.width = width
		this.height = height

		this.part_class = {};
		this.personal_scores = {}
		
		this.part_id = "";


	}

	judge_personal_color(part_id, factory){

		this.part_id = part_id;

		this.part_class = factory.get_part(this.part_id);

		let judge = new JudgeByRatioClass(this.part_class, this.scope_db[this.part_id]);
		this.personal_scores[this.part_id] = judge.get_scores();

	}


	get_judge_score(part){

		return this.personal_scores[part]
	}

	get_judge_result(part){

		let result_season = "";
		let max_val = 0;

		let hash = this.personal_scores[part]
		for (let key in hash) {
			if (hash[key] > max_val) {
				result_season  = key;
				max_val = hash[key] ;
			}
		}

		return  result_season;
	}


}
;


function Out_debug(msg){

	let Flag = false
	if (Flag) {
		console.log(msg)
	}
}

let  Judge_pos = [];		
class PartFactory{

	//static judge_pos = [];		

	constructor(cavas_image_data2d, randmark_positions, randmark_part_db, judge_ct = 1) { 

		this.cavas_image_data2d = cavas_image_data2d;
		this.randmark_positions = randmark_positions;
		
		this.randmark_part_db = randmark_part_db;

		this.parts = {};

		this.Judge_ct = judge_ct;
		this.part_id = "";

	}

	static clear_judge_positions(){
		//return PartFactory.judge_pos
		Judge_pos = []
	}

	static get_judge_positions(){
		//return PartFactory.judge_pos
		return Judge_pos
	}

	static add_positions(pos){

		//PartFactory.judge_pos.push(pos)
		Judge_pos.push(pos)
	}

	get_part(part_id){

		this.part_id = part_id;
		this._create_parts();
		return this.parts[this.part_id]; 
	}

	_create_parts(){
		//hoho
		let part_rgbs = this._get_part_rgbs();
		this.parts[this.part_id] = new FacePartClass(this.part_id, part_rgbs );
	}


	_get_center_position(){
	
		//////from randmarks and canvas_image_data 
		//const hoho_x = (positions[30]["_x"] + (positions[14]["_x"] - positions[30]["_x"]) / 2 ) ;

		const pos_from = this.randmark_part_db[this.part_id]["from"] - 1;
		const pos_to   = this.randmark_part_db[this.part_id]["to"] - 1;

		let s_x = this.randmark_positions[pos_from]["_x"];
		let s_y = this.randmark_positions[pos_from]["_y"];
		let e_x = this.randmark_positions[pos_to]["_x"];
		let x = parseInt((s_x +  (e_x - s_x) / 2) );
		//const hoho_y = positions[30]["_y"] ;
		let y = parseInt(s_y );

		//const imageData = canvasCtx.getImageData(hoho_x, hoho_y,  1, 1 );
		//const data      = imageData.data; // rgba、1バイト×4のデータ
		//  r:1 g:1 b:1 			5 1
		Out_debug("<hoho position for judge>")
		Out_debug("x:" + x + " y:" + y)
		Out_debug("<converted canvas>")
		Out_debug(this.cavas_image_data2d)
		///////////////////////////////////////////////////

		return {"x":x, "y":y}
	
	}

	_push_rgb_to_list(RgbClasss, part_rgb){
		RgbClasss.push( new RgbClass(part_rgb.r, part_rgb.g, part_rgb.b))
	}


	_get_part_rgbs(){

		let cp = this._get_center_position()

		let RgbClasss = [];
		this._push_rgb_to_list(RgbClasss, this.cavas_image_data2d[cp.x][cp.y])
		PartFactory.add_positions({"x":cp.x, "y":cp.y});

		for (let i = 1; i <= this.Judge_ct ; i++){
			this._push_rgb_to_list(RgbClasss, this.cavas_image_data2d[cp.x + i][cp.y])
			PartFactory.add_positions({"x":cp.x + i , "y":cp.y});
		}

		for (let i = 1; i <= this.Judge_ct; i++){
			this._push_rgb_to_list(RgbClasss, this.cavas_image_data2d[cp.x - i][cp.y])
			PartFactory.add_positions({"x":cp.x -  i , "y":cp.y});
		}

			// cavas_image_data2d[0][1] 
			// 	{"r":1, "g":2, "b":3} 
			// cavas_image_data2d[1][1]
			// 	{"r":1, "g":2, "b":3} 

		//////////////////////////////////////////////////////
		Out_debug("<rgb of part>")
		Out_debug(RgbClasss)
		//////////////////////////////////////////////////////
		Out_debug("<rgb of part>")

		return  RgbClasss
		//let hoho_rgbs = [new RgbClass(42, 32, 43), new RgbClass(12, 12, 13)];

	}

	
}


class ThreePosFactory extends PartFactory{

	_get_center_position(){
	
		const pos_top    = this.randmark_part_db[this.part_id]["top"]   - 1;
		const pos_down   = this.randmark_part_db[this.part_id]["down"]  - 1;
		const pos_right  = this.randmark_part_db[this.part_id]["right"] - 1;

		let t_x = this.randmark_positions[pos_top   ]["_x"];
		let t_y = this.randmark_positions[pos_top   ]["_y"];
		let d_x = this.randmark_positions[pos_down  ]["_x"];
		let d_y = this.randmark_positions[pos_down  ]["_y"];
		let r_x = this.randmark_positions[pos_right ]["_x"];
		let r_y = this.randmark_positions[pos_right ]["_y"];
		
		let x = parseInt(((t_x + d_x + r_x) / 3) );
		let y = parseInt(((t_y + d_y + r_y) / 3) );

		return {"x":x, "y":y}
	}

}


class FourPosFactory extends PartFactory{

	_get_center_position(){
	
		const left_top    = this.randmark_part_db[this.part_id]["left_top"]   - 1;
		const left_down   = this.randmark_part_db[this.part_id]["left_down"]  - 1;
		const right_top   = this.randmark_part_db[this.part_id]["right_top"] - 1;
		const right_down  = this.randmark_part_db[this.part_id]["right_down"] - 1;

		//p1
		let p1    = {
			"x":this.randmark_positions[left_down   ]["_x"],
			"y":this.randmark_positions[left_down   ]["_y"]
			}

		//p2
		let p2   = {
			"x":this.randmark_positions[right_down   ]["_x"],
			"y":this.randmark_positions[right_down   ]["_y"]
			}

		//p3
		let p3 = {
			"x":this.randmark_positions[right_top ]["_x"],
			"y":this.randmark_positions[right_top ]["_y"]
			}

		//p4
		let p4 = {
			"x":this.randmark_positions[left_top  ]["_x"],
			"y":this.randmark_positions[left_top  ]["_y"]
			}

		let s1 = (p4.x - p2.x) * (p1.y - p2.y) - (p4.y - p2.y) * (p1.x - p2.x)
		let s2 = (p4.x - p2.x) * (p2.y - p3.y) - (p4.y - p2.y) * (p3.x - p3.x)
		
		let x = parseInt(p1.x + (p3.x - p1.x) * s1 / (s1 + s2));
		let y = parseInt(p1.y + (p3.y - p1.y) * s1 / (s1 + s2));

		return {"x":x, "y":y}
	}

}


class JudgePersonalColorClass {
	constructor(arg_part, part_scope_db) { 
		this.part = arg_part

		//part_scope_db["sp"][0]["min"]["r"]
		this.scope_db = part_scope_db 
	}

	get_scores() { 
		let Personal_color_scores = this._calc_personal_color();
		//output image
		//{"sp":1, "sm":2, "au":3, "wi":4};
		return Personal_color_scores;
	}

	_calc_personal_color(){
		let part_rgbs = this.part.get_rgbs();

		//base scope error check
		let sp_score = 0;
		let sm_score = 0;
		let au_score = 0; 
		let wi_score = 0;

		Out_debug("<scolpe for judge>")
		Out_debug(this.scope_db)
		Out_debug("<rgb for judge>")
		Out_debug(part_rgbs)

		for (let part_rgb of part_rgbs){
			sp_score = sp_score + this._compare_rgb(part_rgb, this.scope_db["sp"])
			sm_score = sm_score + this._compare_rgb(part_rgb, this.scope_db["sm"])
			au_score = au_score + this._compare_rgb(part_rgb, this.scope_db["au"])
			wi_score = wi_score + this._compare_rgb(part_rgb, this.scope_db["wi"])
		}

		return {"sp":sp_score, "sm":sm_score, "au":au_score, "wi":wi_score };
	}

	_compare_rgb(part_rgb, scope_rgb){
	
		let score = 0;
		const hit_score = 10;

		if ((part_rgb.r <= scope_rgb[0]["max"].r) && (part_rgb.r >= scope_rgb[0]["min"].r) &&
      		   (part_rgb.g <=  scope_rgb[0]["max"].g) && (part_rgb.g >= scope_rgb[0]["min"].g) &&
		   (part_rgb.b <=  scope_rgb[0]["max"].b) && (part_rgb.b >= scope_rgb[0]["min"].b)) {
		   
		   score = hit_score;
		}

		return score;
	}



}

class JudgeByRatioClass extends JudgePersonalColorClass {
	_compare_rgb(part_rgb, scope_rgb){
	
		let score = 0;
		const hit_score = 10;
		const g = part_rgb.g
		//const b = part_rgb.b

		if ((part_rgb.r/g <= scope_rgb[0]["max"].r) && (part_rgb.r/g >= scope_rgb[0]["min"].r)) {
		//if ((part_rgb.r/b <= scope_rgb[0]["max"].r) && (part_rgb.r/b >= scope_rgb[0]["min"].r) &&
      		 //   (part_rgb.g/b <= scope_rgb[0]["max"].g) && (part_rgb.g/b >= scope_rgb[0]["min"].g) ) {
		   
		   score = hit_score;
		}

		return score;
	}

}

class JudgeByHsbClass extends JudgePersonalColorClass {

	_compare_rgb(part_rgb, scope_Hsb){
	
		let score = 0;
		const hit_score = 10;
		const g = part_rgb.g
		//const b = part_rgb.b

		if ((part_rgb.r/g <= scope_rgb[0]["max"].r) && (part_rgb.r/g >= scope_rgb[0]["min"].r)) {
		//if ((part_rgb.r/b <= scope_rgb[0]["max"].r) && (part_rgb.r/b >= scope_rgb[0]["min"].r) &&
      		 //   (part_rgb.g/b <= scope_rgb[0]["max"].g) && (part_rgb.g/b >= scope_rgb[0]["min"].g) ) {
		   
		   score = hit_score;
		}

		return score;
	}

	_rgb2hsv ( rgb ) {
		var r = rgb[0] / 255 ;
		var g = rgb[1] / 255 ;
		var b = rgb[2] / 255 ;

		var max = Math.max( r, g, b ) ;
		var min = Math.min( r, g, b ) ;
		var diff = max - min ;

		var h = 0 ;

		switch( min ) {
			case max :
				h = 0 ;
			break ;

			case r :
				h = (60 * ((b - g) / diff)) + 180 ;
			break ;

			case g :
				h = (60 * ((r - b) / diff)) + 300 ;
			break ;

			case b :
				h = (60 * ((g - r) / diff)) + 60 ;
			break ;
		}

		var s = max == 0 ? 0 : diff / max ;
		var v = max ;

		return [ h, s, v ] ;
	}
}


;



function convers_image_to_2d(image_data, width, height){
	//1690500
	//var image_data2d = JSON.parse(JSON.stringify((new Array(1000)).fill((new Array(1000)).fill(0))));
	//image_data2d[1][1] =  {"r":1, "g":1, "b":1 }
	let image_data2d = JSON.parse(JSON.stringify((new Array(width)).fill((new Array(height)).fill(0))));
	let i=0;
	for (var y = 0; y < height; ++y) {
		for (var x = 0; x < width; ++x) {
			image_data2d[x][y] = {  "r":image_data[i], 
						"g":image_data[i+1],
						"b":image_data[i+2]
						}
			i = i+4;
		};
	};

	return image_data2d;
}




export {  
		Out_debug,
		JudgeFaceClass,
		JudgePersonalColorClass,
		JudgeByRatioClass,
		PartFactory,
		ThreePosFactory,
		FourPosFactory,
		convers_image_to_2d
}
;
