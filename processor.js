var canvas = document.querySelector('#canvas');
var ctx_preview = canvas.getContext('2d');
var canvasTimeline = document.querySelector('#timeline');
var layer = document.querySelector('#layer');
// layer.getContext('2d').fillText('text', 10, 50);
var canvasControlLine = document.querySelector('#controlbar');
var elemLeft = canvasTimeline.offsetLeft;
var elemTop = canvasTimeline.offsetTop;
var widthTimeline = canvasTimeline.width;
var ctx_timeline = canvasTimeline.getContext('2d');
var ctx_ctrlLine = canvasControlLine.getContext('2d');
var video = document.querySelector('#video');
var width = 5;
var x = 5
function play() {
  video.play();
}
function pause() {
  video.pause();
}

// video.addEventListener('play', () => {
//   if (video.paused || video.ended) return;
//   width += 160
//   ctx.drawImage(video, 0, 0)
//   ctx.drawImage(video, 360, 0)
// })

video.addEventListener("play", function () {
  window.requestAnimationFrame(draw);
  i = window.setInterval(function () {
    ctx_preview.drawImage(video, 5, 5, 640, 360);
    ctx_preview.font = "20px Arial";
    ctx_preview.fillStyle = "white";
    var text = video.currentTime + ' / ' + video.duration;
    ctx_preview.fillText(text, 10, 50);
  }, 20);
}, false);
video.addEventListener("pause", function () {
  window.clearInterval(i);
}, false);
video.addEventListener("ended", function () {
  clearInterval(i);
}, false);



video.addEventListener("play", function () {
  j = window.setInterval(function () {
    ctx_preview.drawImage(video, 5, 5, 640, 360)
    // ctx_timeline.drawImage(video, 5, 5, 100, 100)
    ctx_timeline.drawImage(video, width, 5, 100, 100)
    width +=105
  }, 1000);
}, false);
video.addEventListener("pause", function () {
  window.clearInterval(j);
}, false);
video.addEventListener("ended", function () {
  clearInterval(j);
}, false); 


canvasTimeline.addEventListener('click', function(event) {
  var x = (event.pageX - elemLeft) / widthTimeline ;
  var duration = video.duration;
  video.currentTime = Math.floor(x*duration);
  console.log(x)
  video.play();
  // elements.forEach(function(element) {
  //     if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
  //         alert('clicked an element');
  //     }
  // });

}, false);

function draw() {
  ctx_ctrlLine.clearRect(0, 0, 840, 100);
  ctx_ctrlLine.save();
  var duration = video.duration;
  var currentTime = video.currentTime
  var x = Math.floor((widthTimeline * currentTime ) /duration);
  ctx_ctrlLine.fillRect(x, 10, 2, 100);
  ctx_ctrlLine.restore();
  if (x <= widthTimeline -5) {
    window.requestAnimationFrame(draw);
  }
}