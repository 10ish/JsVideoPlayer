const player = document.querySelector('.player');
const video = document.querySelector('video');
const playBtn = document.getElementById('play-btn');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const videoTimeElapsed = document.querySelector('.time-elapsed');
const videoDuration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fa-expand');
let isPlaying = false;
let isMuted = false;
let inFullscreen = false;


//Progress Bar


// Play Video
function play() {
    video.play();
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.title = "Pause";
}

function pause() {
    isPlaying = false;
    video.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.title = "Play";

}
//Mute an Unmute Audio
function muteAudio() {
    isMuted = true;
    video.muted = true;
    volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
    volumeIcon.title = "Unmute"

}

function unmuteAudio() {
    isMuted = false;
    volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
    video.muted = false;
    volumeIcon.title = "Mute";
}
//Volume Bar 
function switchVolume(event) {
    const targetVol = event.offsetX;
    volumeBar.style.width = `${targetVol}%`;
    video.volume = (targetVol / 100);
}
//Update Progress Bar
function updateProgressBar(event) {
    if (isPlaying === true) {
        //In seconds 
        const {
            duration,
            currentTime
        } = event.target;
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60);
        let currentTimeMinutes = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`
        if (currentTimeSeconds < 10) {
            currentTimeSeconds = `0${currentTimeSeconds}`
        }
        videoTimeElapsed.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }

        if (durationSeconds) {
            videoDuration.textContent = ` / ${durationMinutes}:${durationSeconds}`;
        }

    }
}

function setProgressBar(event) {
  
    const clientWidth = this.clientWidth;
    const targetWidth = event.offsetX;
    const targetWidthPercent = (targetWidth / clientWidth) * 100;
    progressBar.style.width = `${targetWidthPercent}%`;
    const {
        duration
    } = video;
    const targetCurrentTime = (targetWidth / clientWidth) * duration;
    video.currentTime = targetCurrentTime;
}
// Full Screen
function enterFullscreen(){
    inFullscreen = true;
    player.requestFullscreen();
}
function outFullscreen(){
    inFullscreen = false;
        document.exitFullscreen();
}
//Event Listeners

playBtn.addEventListener('click', () => ((isPlaying ? pause() : play())));
volumeIcon.addEventListener('click', () => ((isMuted ? unmuteAudio() : muteAudio())));
volumeRange.addEventListener('click', switchVolume);
progressRange.addEventListener('click', setProgressBar);
video.addEventListener('timeupdate', updateProgressBar);
fullscreenBtn.addEventListener('click', ()=>((inFullscreen? outFullscreen() : enterFullscreen())));

//On load 