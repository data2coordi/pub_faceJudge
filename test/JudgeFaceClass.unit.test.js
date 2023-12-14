

const {
	convers_image_to_2d,
	JudgeFaceClass,
	JudgePersonalColorClass,
	JudgeByRatioClass,
	PartFactory
} = require("../JudgeFaceClass.js")


const {
	RgbClass,
	FacePartClass,
} = require("../JudgeFaceDomainClass.js")


const {
	JudgeFaceStateClass,
	JudgeFaceGuiClass,
} = require("../JudgeFaceGuiClass.js")


window.Judge_ct = 1

//randmark_part_db["hoho"]"[from"]
let randmark_part_db = {
			"hoho":{"from":31, "to":15},
			 "rip":{"from":99, "to":99}
			};

//rgb_scope_db["hoho"]["sp"][0]["min"]["r"]
let rgb_scope_db = {
			"hoho":
			      {"sp":
				     [
				      {"min":{"r":1,"g":1,"b":1}, "max":{"r":12,"g":12,"b":13}}
				     ],
			       "sm":
				     [
				      {"min":{"r":2,"g":2,"b":2}, "max":{"r":22,"g":22,"b":23}}
				     ],
			       "au":
				     [
				      {"min":{"r":3,"g":3,"b":3}, "max":{"r":32,"g":32,"b":33}}
				     ],
			       "wi":
				     [
				      {"min":{"r":4,"g":4,"b":4}, "max":{"r":42,"g":32,"b":43}}
				     ]
			       },
			"rip":
			      {"sp":
				     [
				      {"min":{"r":3,"g":3,"b":3}, "max":{"r":42,"g":1,"b":1}}
				     ],
			       "sm":
				     [
				      {"min":{"r":4,"g":4,"b":4}, "max":{"r":1,"g":1,"b":1}}
				     ],
			       "au":
				     [
				      {"min":{"r":4,"g":4,"b":4}, "max":{"r":1,"g":1,"b":1}}
				     ],
			       "wi":
				     [
				      {"min":{"r":4,"g":4,"b":4}, "max":{"r":1,"g":1,"b":1}}
				     ]
			       },
		    };


	let rgb_ratio_scope_db = {
				"hoho":
				      {"sp":
					     [
					      {"min":{"r":1.3,"g":1.06,"b":1}, "max":{"r":1.4,"g":1.16,"b":1}}
					     ],
				       "sm":
					     [
					      {"min":{"r":1.25,"g":1.04,"b":1}, "max":{"r":1.35,"g":1.14,"b":1}}
					     ],
				       "au":
					     [
					      {"min":{"r":1.56,"g":1.21,"b":1}, "max":{"r":1.66,"g":1.31,"b":1}}
					     ],
				       "wi":
					     [
					      {"min":{"r":1.17,"g":1.00,"b":1}, "max":{"r":1.27,"g":1.10,"b":1}}
					     ]
				       },
			    };



function helper_buildHtml(src, id) { 
	document.body.innerHTML = document.body.innerHTML +
	    '<img src= "' + src + '" id="' + id + '" alt="" />';

}

describe('Domain', () => {

	let hoho_rgbs = [];

	beforeEach(() => {

		hoho_rgbs = [new RgbClass(42, 32, 43), new RgbClass(1, 1, 1)];

	});


	afterEach(() => {
	});

	beforeAll(() => {
	});

	afterAll(() => {
	});

	test('hoho class is created  ', function() {

		let hoho = new FacePartClass("hoho", hoho_rgbs );
		expect(JSON.stringify(hoho.get_rgbs())).toBe(JSON.stringify(hoho_rgbs));

	});

	test('rgb class is created  ', function() {
		let rgb = new RgbClass(1, 2, 3);
		expect(rgb.r).toBe(1);
		expect(rgb.g).toBe(2);
		expect(rgb.b).toBe(3);
	});

	test('rgb class is created  ', function() {

		expect(rgb_scope_db["hoho"]["sp"][0]["min"]["r"]).toBe(1);
		expect(rgb_scope_db["hoho"]["wi"][0]["max"]["b"]).toBe(43);

	});

	test('parsonal color is judged from hoho color ', function() {


		//get rgb scopes of personal color
		//let rgb_scopes = new RgbScopesClass(sp_rgb_scopes, sm_rgb_scopes, au_rgb_scopes, wi_rgb_scopes);

		//get hoho
		let hoho = new FacePartClass("hoho", hoho_rgbs );

		const hoho_scope_db = rgb_scope_db["hoho"];
		let judge_hoho = new JudgePersonalColorClass(hoho, hoho_scope_db);
		let parsonal_color_scores =  judge_hoho.get_scores();
	
		expect(parsonal_color_scores["sp"]).toBe(10);
		expect(parsonal_color_scores["sm"]).toBe(0);
		expect(parsonal_color_scores["au"]).toBe(0);
		expect(parsonal_color_scores["wi"]).toBe(10);
		
		//mulit points for judge
		let hoho_rgbs2 = [new RgbClass(1, 1, 1), new RgbClass(1, 1, 1), new RgbClass(1, 1, 1)];
		let hoho2 = new FacePartClass("hoho", hoho_rgbs2 );
		judge_hoho = new JudgePersonalColorClass(hoho2, hoho_scope_db);
		parsonal_color_scores =  judge_hoho.get_scores();
	
		expect(parsonal_color_scores["sp"]).toBe(30);
		expect(parsonal_color_scores["sm"]).toBe(0);
		expect(parsonal_color_scores["au"]).toBe(0);
		expect(parsonal_color_scores["wi"]).toBe(0);
	});

	test('parsonal color is judged from hoho color by ratio ', function() {

		//{"min":{"r":1.3,"g":1.06,"b":1}, "max":{"r":1.4,"g":1.16,"b":1}}
		//{"min":{"r":1.25,"g":1.04,"b":1}, "max":{"r":1.35,"g":1.14,"b":1}}
		let hoho_rgbs = [new RgbClass(2.6, 2.12, 2), new RgbClass(2.6, 2.12, 2)];
		let hoho = new FacePartClass("hoho", hoho_rgbs );

		const hoho_ratio_scope_db = rgb_ratio_scope_db["hoho"];
		let judge_hoho = new JudgeByRatioClass(hoho, hoho_ratio_scope_db);
		let parsonal_color_scores =  judge_hoho.get_scores();



		expect(parsonal_color_scores["sp"]).toBe(0);
		expect(parsonal_color_scores["sm"]).toBe(0);
		expect(parsonal_color_scores["au"]).toBe(0);
		expect(parsonal_color_scores["wi"]).toBe(20);
		
	});

});
//////////////////////////////////////////////////////////////////////////////
describe('PartFactory', () => {


	let hoho_rgbs = [];
	
	var cavas_image_data2d = JSON.parse(JSON.stringify((new Array(1000)).fill((new Array(1000)).fill(0))));
	// 		   6 = 1 + (11-1/2)
	cavas_image_data2d[4][1] =  {"r":255, "g":1, "b":1 }
	cavas_image_data2d[5][1] =  {"r":255, "g":1, "b":1 }
	cavas_image_data2d[6][1] =  {"r":1, "g":1, "b":1 }
	cavas_image_data2d[7][1] =  {"r":2, "g":1, "b":1 }
	cavas_image_data2d[8][1] =  {"r":2, "g":1, "b":1 }

	let randmark_positions = [];
	for (let i = 0; i < 68; i++) {
		randmark_positions[i] = {"_x":i, "_y":i}
	}

	//hoho of center
	randmark_positions[31-1] = {"_x":1,  "_y":1}
	//hoho of right
	randmark_positions[15-1] = {"_x":11, "_y":1}


	
	beforeEach(() => {
	});


	afterEach(() => {
	});

	beforeAll(() => {
	});

	afterAll(() => {
	});

	test(' domain onject is created by Factory ', function() {


		let factory = new PartFactory(  cavas_image_data2d, 
						randmark_positions, 
						randmark_part_db,
						1,	
						"hoho"
						);

		let hoho_class = factory.get_part("hoho");

		expect(hoho_class.get_id()).toBe("hoho");

		let hoho_rgbs = [new RgbClass(1, 1, 1), new RgbClass(2, 1, 1), new RgbClass(255, 1, 1), ];
		expect(JSON.stringify(hoho_class.get_rgbs())).toBe(JSON.stringify(hoho_rgbs));

	});


	test(' It can be geted the positions for judge from Factory ', function() {


		let factory = new PartFactory(  cavas_image_data2d, 
						randmark_positions, 
						randmark_part_db,
						1,	
						"hoho"
						);

		let judge_pos =  PartFactory.get_judge_positions();

		expect(JSON.stringify(judge_pos)).toBe(JSON.stringify([{"x":6, "y":1}, {"x":7, "y":1}, {"x":5, "y":1}]));


	});



});



/////////////////////////////////////////////////////////////////////////////
//
//


describe('UI', () => {
	
	let Items_table = {
		"all":     ["start_img",  "selectedFile", "shutter", "result_img"   ],
		"init":    ["start_img",  "selectedFile"],	
		"selected":["start_img"    ],	
		"result":  ["result_img" ]
	}	

	beforeEach(() => {

		helper_buildHtml("dummy", "start_img")
		helper_buildHtml("dummy", "selectedFile")
		helper_buildHtml("dummy", "shutter")
		helper_buildHtml("dummy", "result_img")

	});

	afterEach(() => {
	});

	beforeAll(() => {
	});

	afterAll(() => {
	});

	function helper_check_visibility(cssId, flag){

		let htmlTag = document.getElementById(cssId);

		expect(htmlTag.style.visibility).toBe(flag);

	};


	test('init state is correct  ', function() {
		let htmlTag = document.getElementById("start_img");

		let faceJudge_gui = new JudgeFaceStateClass(Items_table)
		faceJudge_gui.to_init();
		helper_check_visibility('start_img', "visible");

	});
});

//////////////////////////////////////////////////////////////////////////////
describe('Repository', () => {
	
	beforeEach(() => {
	});

	afterEach(() => {
	});

	beforeAll(() => {
	});

	afterAll(() => {
	});

	test(' canvas-image2d db is created ', function() {
		let cavas_image_data = [1,2,3,255,
					1,2,3,255,
					1,2,3,255,
					1,1,1,255];
/*
		let cavas_image_data = [{"r":1, "g":2, "b":3 },
					{"r":1, "g":2, "b":3 },
					{"r":1, "g":2, "b":3 },
					{"r":1, "g":1, "b":1 }
					];
*/
		//cavas_image_data2d[1][1] =  {"r":1, "g":1, "b":1 }

		let cavas_image_data2d =  convers_image_to_2d( cavas_image_data, 2, 2 )

		expect(JSON.stringify(cavas_image_data2d[1][1])).toBe(JSON.stringify({"r":1, "g":1, "b":1 }));


	});
});

//////////////////////////////////////////////////////////////////////////////
describe('main', () => {


	let conversed_image_data = [[],[],[],[]];
	/*
	conversed_image_data[0][0] = {"r":1, "g":2, "b":3 }
	conversed_image_data[0][1] = {"r":1, "g":2, "b":3 }
	conversed_image_data[1][0] = {"r":1, "g":2, "b":3 }
	conversed_image_data[1][1] = {"r":1, "g":1, "b":1 }
	*/

	conversed_image_data[0][0] = {"r":1, "g":2, "b":3 }
	conversed_image_data[0][1] = {"r":1, "g":2, "b":3 }
	conversed_image_data[0][1] = {"r":1, "g":1, "b":1 }
	conversed_image_data[1][1] = {"r":1, "g":1, "b":1 }
	conversed_image_data[2][1] = {"r":1, "g":1, "b":1 }

	//randmark_part_db["hoho"]"[from"]
	let randmark_part_db = {
				"hoho":{"from":31, "to":15}
				};

	//rgb_scope_db["hoho"]["sp"][0]["min"]["r"]
	let rgb_scope_db = {
				"hoho":
				      {"sp":
					     [
					      {"min":{"r":1,"g":1,"b":1}, "max":{"r":12,"g":12,"b":13}}
					     ],
				       "sm":
					     [
					      {"min":{"r":2,"g":2,"b":2}, "max":{"r":22,"g":22,"b":23}}
					     ],
				       "au":
					     [
					      {"min":{"r":3,"g":3,"b":3}, "max":{"r":32,"g":32,"b":33}}
					     ],
				       "wi":
					     [
					      {"min":{"r":4,"g":4,"b":4}, "max":{"r":42,"g":32,"b":43}}
					     ]
				       }
			    };


	let randmark_positions = [];
	for (let i = 0; i < 68; i++) {
		randmark_positions[i] = {"_x":i, "_y":i}
	}

	//hoho of center
	randmark_positions[31-1] = {"_x":0,  "_y":1}
	//hoho of right
	randmark_positions[15-1] = {"_x":2, "_y":1}


	beforeEach(() => {
	});

	afterEach(() => {
	});

	beforeAll(() => {
	});

	afterAll(() => {
	});

	test(' the Main func can get result of the judge', function() {

		let factory = new PartFactory(  conversed_image_data, 
						randmark_positions, 
						randmark_part_db,
						Judge_ct,	
						);

		// get image data in 2d
		let judgeFaceClass = new JudgeFaceClass(
							randmark_positions,
							2,
							2,
							rgb_scope_db,
							);

		judgeFaceClass.judge_personal_color("hoho", factory);
		let resulet_hoho_score = judgeFaceClass.get_judge_score("hoho");
		expect(resulet_hoho_score["sp"]).toBe(30);
		expect(resulet_hoho_score["sm"]).toBe(0);
		expect(resulet_hoho_score["au"]).toBe(0);
		expect(resulet_hoho_score["wi"]).toBe(0);

		let resulet_hoho = judgeFaceClass.get_judge_result("hoho");
		expect(resulet_hoho).toBe("sp");
	});
});


//////////////////////////////////////////////////////////////////////////////
describe('change from rgb to hsb', () => {


	let conversed_image_data = [[],[],[],[]];
	/*
	conversed_image_data[0][0] = {"r":1, "g":2, "b":3 }
	conversed_image_data[0][1] = {"r":1, "g":2, "b":3 }
	conversed_image_data[1][0] = {"r":1, "g":2, "b":3 }
	conversed_image_data[1][1] = {"r":1, "g":1, "b":1 }
	*/

	conversed_image_data[0][0] = {"r":1, "g":2, "b":3 }
	conversed_image_data[0][1] = {"r":1, "g":2, "b":3 }
	conversed_image_data[0][1] = {"r":1, "g":1, "b":1 }
	conversed_image_data[1][1] = {"r":1, "g":1, "b":1 }
	conversed_image_data[2][1] = {"r":1, "g":1, "b":1 }

	//randmark_part_db["hoho"]"[from"]
	let randmark_part_db = {
				"hoho":{"from":31, "to":15}
				};

	//rgb_scope_db["hoho"]["sp"][0]["min"]["r"]
	let hsb_scope_db = {
				"hoho":
				      {"sp":
					     [
					      {"min":{"r":1,"g":1,"b":1}, "max":{"r":12,"g":12,"b":13}}
					     ],
				       "sm":
					     [
					      {"min":{"r":2,"g":2,"b":2}, "max":{"r":22,"g":22,"b":23}}
					     ],
				       "au":
					     [
					      {"min":{"r":3,"g":3,"b":3}, "max":{"r":32,"g":32,"b":33}}
					     ],
				       "wi":
					     [
					      {"min":{"r":4,"g":4,"b":4}, "max":{"r":42,"g":32,"b":43}}
					     ]
				       }
			    };


	let randmark_positions = [];
	for (let i = 0; i < 68; i++) {
		randmark_positions[i] = {"_x":i, "_y":i}
	}

	//hoho of center
	randmark_positions[31-1] = {"_x":0,  "_y":1}
	//hoho of right
	randmark_positions[15-1] = {"_x":2, "_y":1}


	beforeEach(() => {
	});

	afterEach(() => {
	});

	beforeAll(() => {
	});

	afterAll(() => {
	});

	test('it can be changed from rgb-object to hsb-object ', function() {
		let r = 1;	
		let g = 2;	
		let b = 3;	

		let hsbClass =  new HsbClass(r, g, b)

		expect(resulet_hoho_score["sp"]).toBe(30);
		expect(resulet_hoho_score["sm"]).toBe(0);
		expect(resulet_hoho_score["au"]).toBe(0);
		expect(resulet_hoho_score["wi"]).toBe(0);

	});
});


