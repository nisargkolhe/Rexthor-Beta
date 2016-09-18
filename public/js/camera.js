//http://www.html5rocks.com/en/tutorials/getusermedia/intro/

function update(stream) {
    document.querySelector('video').src = stream.url;
}

function hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if (!hasGetUserMedia()){
  alert('getUserMedia() is not supported in your browser');
}

var errorCallback = function(e) {
    console.log('Reeeejected!', e);
};

navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
    var video = document.querySelector('video');
    video.src = window.URL.createObjectURL(localMediaStream);

    video.onloadedmetadata = function(e) {

    };
}, errorCallback);
