/*
** About Me Canvas
** Inspired from: http://codepen.io/charliekuldip/pen/KCpHn
*/

// Variables
var parent = document.getElementById("voice-recognition");
var canvas = document.getElementById("voice-canvas");
var context = canvas.getContext("2d");
var canvasWidth = canvas.width = parent.clientWidth;
var canvasHeight = canvas.height = parent.clientHeight;
var cellSize = Math.ceil(canvasWidth/15);
var amplitude = 0;
var time = -1;
var voiceInput = document.getElementById("voice-input");

var render = function(){
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    time+=3;
    if (voiceInput.classList.contains('on') && amplitude < 60){
        amplitude += 5;
    }
    if (!voiceInput.classList.contains('on') && amplitude > 0){
        amplitude -= 10;
    }
    for (var i = 1; i < canvasWidth/2; i++){
        var x = i;
        var y = amplitude * (i/canvasWidth) * Math.sin((x + time)/30);
        context.beginPath();
        context.moveTo(x, y + canvasHeight/2);
        context.lineTo(x, canvasHeight);
        context.lineWidth = 2;
        context.strokeStyle = "#512DA8";
        context.globalAlpha = 1;
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(canvasWidth - x, y + canvasHeight/2);
        context.lineTo(canvasWidth - x, canvasHeight);
        context.lineWidth = 2;
        context.strokeStyle = "#512DA8";
        context.globalAlpha = 1;
        context.closePath();
        context.stroke();
    }
};

setInterval(render, 10);

// Events
voiceInput.addEventListener("mousedown", function(e){
    if (voiceInput.classList.contains('on')) {
        voiceInput.classList.remove('on');
    } else {
        voiceInput.classList.add('on');
    }
}, false);
