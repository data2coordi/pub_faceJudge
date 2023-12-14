


class FacePartClass {

	constructor(id, rgbs, rgb_scopes) { 
		this.part_id = id;
		this.rgbs = rgbs             //RgbClass
	}
	get_id(){
		return this.part_id;
	}
	get_rgbs(){
		return this.rgbs;
	}

}



//data image ( value object)
//r = 1
//g = 2
//b = 3
class RgbClass {
	constructor(r, g, b) { 
		this.r = r;
		this.g = g;
		this.b = b;
	}
}



export {  
	RgbClass,
	FacePartClass
}

;
