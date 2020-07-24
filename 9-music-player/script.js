const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const currentTimeSong = document.getElementById("currentTime");
const durationSong = document.getElementById("duration");

// Song titles
const songs = ["Reality", "SaveMe"];

// Keep track of song
let songIndex = 0;

audio.volume = 0.4;
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
  audio.volume = 0.3;
  progress.style.width = "0%";
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  currentTimeSong.innerText = convertSecondToMinute(currentTime);
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function convertSecondToMinute(time) {
  let result = "";
  let m = Math.floor(time / 60);
  let s = Math.floor(time % 60);
  result += m >= 10 ? m : "0" + m;
  result += ":";
  result += s >= 10 ? s : "0" + s;
  return result;
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);
audio.onloadeddata = function (e) {
  durationSong.innerText = convertSecondToMinute(audio.duration);
};

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

progressContainer.addEventListener("click", setProgress);
