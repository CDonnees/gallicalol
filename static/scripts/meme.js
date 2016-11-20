var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var $imageURL = $('#image-url');
var $downloadIntoCanvas = $('#download-into-canvas');
var $scale = $('#scale');
var $textOne = $('#text-1');
var $textTwo = $('#text-2');
var $download = $('#download');

var img = new Image();
// img.setAttribute('crossOrigin', 'anonymous');
var imageURL;

var x, y;

function loadImageIntoCanvas() {
  img.onload = function() {
    x = canvas.width / 2 - img.width / 2;
    y = canvas.height / 2 - img.height / 2;
    ctx.drawImage(img, x, y);
    refreshDownloadLink();
  };

  img.src = imageURL;
}

function writeText(text, x, y) {

  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  var f = 36; // Font size (in pt)
  for (; f >= 0; f -=1) {
    ctx.font = "bold " + f + "pt Impact, Charcoal, sans-serif";
    if (ctx.measureText(text).width < canvas.width - 10) {
      ctx.fillText(text, x, y);
      ctx.strokeText(text, x, y);
      break;
    }
  }
}

function writeTexts() {
  writeText($textOne.val(), canvas.width / 2, 50);
  writeText($textTwo.val(), canvas.width / 2, canvas.height - 20);
}

function renderMeme() {
  ctx.save();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var val = $scale.val();
  ctx.scale(val, val)
  ctx.drawImage(img, x, y);
  ctx.restore();

  writeTexts();
  refreshDownloadLink();
}

function refreshDownloadLink() {
  var dataURL = canvas.toDataURL('image/jpeg');
  dataURL = dataURL.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
  $download.attr('href', dataURL);
}

$downloadIntoCanvas.on('click', function(e) {
  e.preventDefault();
  imageURL = '/proxy.php?url=' + encodeURIComponent($imageURL.val());
  console.log(imageURL);
  loadImageIntoCanvas();
});

$scale.on('change', renderMeme);

// $download.on('click', function(e) {
//   e.preventDefault();
//   var dataURL = canvas.toDataURL('image/jpeg');
//   dataURL = dataURL.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
//   window.open(dataURL);
// });

$textOne.on('keyup', renderMeme);
$textTwo.on('keyup', renderMeme);

