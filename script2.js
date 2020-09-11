
var canvas = new fabric.StaticCanvas('canvas');

var videoEl = document.createElement('video');
videoEl.src = 'http://127.0.0.1:8088/videoplayback.mp4';
videoEl.height = 360
videoEl.width = 640
videoEl.crossOrigin = "anonymous";
document.getElementById('main').appendChild(videoEl);
var video1El = document.getElementById('video1El');
canvas.add(new fabric.Image(videoEl));
canvas.add(new fabric.Image(video1El))
canvas.add(new fabric.Rect({width: 20, height: 20}))
canvas.renderAll();