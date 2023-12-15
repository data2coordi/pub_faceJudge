<!DOCTYPE html>
<html lang="ja">
	<head>
	    <meta charset="UTF-8">
	    <title>パーソナルカラー AI診断</title>
	    <link rel="stylesheet" href="faceJudge.css">
	    <script type='text/javascript' src='./js/face-api.min.js'></script>
	    <script type='text/javascript' src='./judge_data.js'></script>
	    <script type="module" src="JudgeFaceApri.js"></script>
	    <meta name="viewport" content="width=750">
	</head>
	<body>

		<!-- image -->
		<img src="./img/base_start.png" id="base_start" alt=""/>
		
		<img id="start_img" src="./img/start_img.jpg"></img>
		<p class="text_01" style="
			position: absolute;
			top: 0;
			left: 0;
			font-size: 16px;
			color: black;
			margin-top: 90px;
			margin-left: 120px;
			z-index: 900;
			">※写真を選択した後、解析まで1分ほどお待ちください</p>
		<img id="result_img" src=""></img>

		<!-- camera photo -->
		<canvas id="picture"></canvas>
		<video id="video" style="-webkit-transform: scaleX(-1);"  autoplay="1" playsinline="true" ></video>


		<!-- button -->
		<label>
			<div id="selectedFile_label"></div>
			<input  id="selectedFile" input 
				type="file" accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png">test</input>
			
		</label>

		<p><a href="#"><button type="button" id="analyze"><img src="./img/this.png"/></button></a></p>
		<p><a href="#"><button type="button" id="shutter"><img src="./img/shutter.png"/></button></a></p>
		<p><a href="#"><button type="button" id="photograph"><img src="./img/photograph.png"/></button></a></p>
		<p><a href="#"><button type="button" id="back"   ><img src="./img/back.png"/></butt</a></p>on>

		<!-- display  -->
		<div style="backGround-color: lightblue;position:fixed;top:1000px;left:10px;z-index:1000000;">
			<p id="debug"><br></p>
		</div>
		<div style="backGround-color: lightblue;position:fixed;top:0px;left:0px;z-index:1000000;">
			<p id="msg">診断結果<br></p>
		</div>



	</body>
</html>



