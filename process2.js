
// ----- main canvas --------
var canvas = new fabric.Canvas('c');
// --------------------------


var videoEl = document.getElementById('video');
var running;
var video = new fabric.Image(videoEl, {
    fireRightClick: false,  // <-- enable firing of right click events
    fireMiddleClick: true,
    selectable: false
});
canvas.add(video);

videoEl.addEventListener("play", function () {
    running = true
    fabric.util.requestAnimFrame(function render() {
        if (running) {
            canvas.renderAll();
        }
        fabric.util.requestAnimFrame(render);
    });
});

videoEl.addEventListener("pause", function () {
    running = false;
}, false);
videoEl.addEventListener("ended", function () {
    running = false;
}, false);



// ----- func video -------
function play() {
    videoEl.play();
}
function pause() {
    videoEl.pause();
}
// -------------------------



// ----- add on ------------
function genIMG(url, left = 0, top = 0) {
    return fabric.Image.fromURL(url, function (oImg) {
        oImg.scale(0.2);
        oImg.left = left;
        oImg.top = top;
        canvas.add(oImg);
    });
}
genIMG('http://192.168.26.47:8088/facebook-2661207_960_720.jpg', 400, 100);
genIMG('http://192.168.26.47:8088/unnamed.png', 100, 200);

function genText(content, top = 0, left = 0, fill = '#78a3b9') {

    // Text 
    var text = new fabric.Text(content, {
        left,
        top,
        name: 'text',
    });
    text.on('mouse:down', function (options) {
        console.log(options);
    });
    text.set({ fill })
    canvas.add(text);
}
genText('Quang ahihi', 100, 0, 'white');
genText('VCCorp');
// ---------------------------




// --- Time line controler ---

var canvasControlLine = new fabric.Canvas('timeline');
canvasControlLine.on('mouse:down', function (options) {
    var pointer = canvasControlLine.getPointer(options);
    videoEl.currentTime = pointer.x * videoEl.duration / canvasControlLine.width;
    videoEl.play();
    // console.log(pointer);
});
const rect = new fabric.Rect({
    width: 2,
    height: 100,
    left: 0,
    fill: '#000',
    selectable: false,
    minScaleLimit:1
});
canvasControlLine.add(rect)

videoEl.addEventListener('timeupdate', function () {
    if (videoEl.currentTime < (videoEl.duration - 1)) {
        var x = Math.floor((canvasControlLine.width * videoEl.currentTime) / videoEl.duration);
        rect.set('left', x);
        canvasControlLine.renderAll();
        console.log(Math.floor(videoEl.currentTime) + ' / ' + Math.floor(videoEl.duration));
    }
})
// ------------------------



// ------- Get obj --------

fabric.Canvas.prototype.getItemByName = function (name) {
    var object = null,
        objects = this.getObjects();

    for (var i = 0, len = this.size(); i < len; i++) {
        if (objects[i].name && objects[i].name === name) {
            object = objects[i];
            break;
        }
    }

    return object;
};

// var obj =  canvas.getItemByName('text');

// console.log(obj)

// -------------------------