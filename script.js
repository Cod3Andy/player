const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const muteBtn = document.querySelector('#mute')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
const slider = document.querySelector('.volume-slider');
const progresVol = document.querySelector('progress');
// Song titles 
const songs = ['Begin_again_Vera_Keyes', 'Put_Your_Head_On_My_Shoulder', 'Beyond_the_Sea']

// Keep track of songs
let songIndex = 2

// Initailly load songs 
loadSong(songs[songIndex])

// Update song details
function loadSong(song) {
    title.innerText = song
    audio.src =`Music/${song}.m4a`
    cover.src = `Images/${song}.jpg`
}
function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}
function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    audio.pause()
}
function prevSong () {
    songIndex--
    if(songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}
function nextSong () {
    songIndex++
    if(songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}
function muteSong () {
    audio.volume > 0 ? (audio.volume = 0) & (slider.value = 0) : (audio.volume = 0.5) & (slider.value = 50)
    progresVol.value = slider.value
}
function setVolume() {
    audio.volume = slider.value / 100
    progresVol.value = slider.value
}
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = ((clickX / width) * duration)
}
// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})
// Change Song Events 
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
muteBtn.addEventListener('click', muteSong)
audio.addEventListener('ended', nextSong)