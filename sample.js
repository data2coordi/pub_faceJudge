// モデル読み込み
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/../models'),
  faceapi.nets.faceLandmark68TinyNet.loadFromUri('/../models'),
]).then(initialize);

// Promise.all()の処理(モデル読み込み)全て成功後に実行
async function initialize(){
  // 「ファイル選択」'selectedFile'と「顔検出」'button'に関数を割り当てる
  const button = document.getElementById('button');
  button.addEventListener("click", facedetection, false);

  const selectedFile = document.getElementById("selectedFile");
  selectedFile.addEventListener("change", uploadImage, false);

  // 関数1　「ファイル選択」 選択された画像を読み込む
  async function uploadImage() {

    // 選択された画像を読み込む
    const imgFile = selectedFile.files[0];
    const img = await faceapi.bufferToImage(imgFile);
    // 画像サイズを変更(長辺を800pixにする)
    const MIN_SIZE = 800;

    let canvas = await faceapi.createCanvasFromMedia(img);
    let ctx = canvas.getContext('2d');
    let ratio = 1;

    if( Math.max(canvas.width, canvas.height) > MIN_SIZE) 
    	ratio = MIN_SIZE / Math.max(canvas.width, canvas.height);

    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;

    ctx.drawImage(img,  0, 0, canvas.width, canvas.height);

    // 画像を'myImg'に送る
    const imgSrc = canvas.toDataURL("image/jpeg");
    document.getElementById('myImg').src = imgSrc;
  }

  // 関数2　「顔検出」 検出領域と特徴点を描きこんだ画像を出力
  async function facedetection() {
    // 'myImg'から画像取得 canvas作成
    const img = document.getElementById('myImg');
    if(img.src == img.baseURI) return;
    const canvas = await faceapi.createCanvasFromMedia(img);
    document.getElementById("faceDetecting").textContent = "\n顔検出中\n少し時間がかかります"
    // canvasのスタイル変更　筆を赤色(255, 0, 0)にする
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = "rgb(255, 0, 0)";
    // 顔検出 + 特徴点68点抽出
    const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions()
    			).withFaceLandmarks(true); // faceLandmark68'Tiny'Net のときtrue

    // 検出した顔の数だけループ
    for (const detection of detections){
      // 検出領域を長方形で表示
      const box = detection.detection.box;
      ctx.strokeRect(box.x, box.y, box.width, box.height);
      // 特徴点を中心とした3*3の正方形を68点プロット
      for (const point of detection.landmarks.positions){
        ctx.strokeRect(point.x, point.y, 3, 3);
      }
    }
    // canvasを画像に変換
    document.getElementById("faceDetecting").textContent = ""
    const imgSrc = canvas.toDataURL("image/jpeg",0.9);
    document.getElementById("newImg").src = imgSrc;
  }
}

