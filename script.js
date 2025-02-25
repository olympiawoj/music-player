const musicContainer = document.getElementById('music-container')

const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')


const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer  = document.getElementById('progress-container')
const title = document.getElementById('title')
const cover = document.getElementById('cover')

// Song titles
const songs = ['hey', 'summer', 'ukulele']


// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex])

// Update song details
function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Play Song
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

// Pause Song
function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    audio.pause()

}

// Previous Song
function prevSong(){
    //take index and decrease by 1
    songIndex --;
    if(songIndex < 0){
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

// Next Song
function nextSong(){
    //take index and decrease by 1
    songIndex ++;
    if(songIndex > songs.length - 1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

// Update progress bar
function updateProgress(e){
    // we can get the duration and current time on song from sourceElement
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100

    progress.style.width = `${progressPercent}%`
}

// Set Progress bar
function setProgress(e){
    const width = this.clientWidth // total width
    const clickX = e.offsetX;
    const duration = audio.duration;

    // set current time of audio to right position
    audio.currentTime  = (clickX / width) * duration;

}


// Event listeners
playBtn.addEventListener('click', ()=> {
    //If it's playing, pause
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying){
        pauseSong();
    }else {
        playSong()
    }
})

// Change song
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// Time/song update event
audio.addEventListener('timeupdate', updateProgress)

// Click on progress bar
progressContainer.addEventListener('click', setProgress)

// Song ends
audio.addEventListener('ended', nextSong)