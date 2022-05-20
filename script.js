let previous = document.querySelector('#pre');
let nowplay = document.querySelector('#now');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let volumenow = document.querySelector('#volume');
let volumeshow = document.querySelector('#volume-show');
let slider = document.querySelector('#duration-slider');
let artist = document.querySelector('#artist');
let album = document.querySelector('#album');
let trackimg = document.querySelector('#track-image');
let auto = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');

let timer;
let autoplay = 0;
let index = 0;
let playingsong = false;

let track = document.createElement('audio');

let allsong = [
    {
        name: "Look At The Sky",
        path: "nurture/02 - Look at the Sky.mp3",
        img: "nurture/PorterRobinson Nurture album cover.jpg",
        singer: "Porter Robinson",
        alb: "nurture"
    },
    {
        name: "Musician",
        path: "nurture/05 - Musician.mp3",
        img: "nurture/PorterRobinson Nurture album cover.jpg",
        singer: "Porter Robinson",
        alb: "nurture"
    },
    {
        name: "Alien Boy",
        path: "Oliver Tree - Alien Boy [EP]/01. Oliver Tree - Alien Boy.mp3",
        img: "Oliver Tree - Alien Boy [EP]/OLAL.jpg",
        singer: "Oliver Tree",
        alb: "Alien Boy"
    },
    {
        name: "Hurt",
        path: "Oliver Tree - Alien Boy [EP]/Oliver Tree - Hurt.mp3",
        img: "Oliver Tree - Alien Boy [EP]/OLAL.jpg",
        singer: "Oliver Tree",
        alb: "Alien Boy"
    },
    {
        name: "I'm In It",
        path: "Kanye_West-Yeezus-2013-WHOA/06-kanye_west-im_in_it_(feat._travis_scott)-whoa.mp3",
        img: "Kanye_West-Yeezus-2013-WHOA/a2fb43da.jpg",
        singer: "Kanye West",
        alb: "yeezus"
    },
    {
        name: "Jail Pt.2",
        path: "Kanye West - Donda - (SongsLover.com)/24 Jail, Pt. 2 - (SongsLover.com).mp3",
        img: "Kanye West - Donda - (SongsLover.com)/Cover.jpg",
        singer: "Kanye West",
        alb: "Donda"
    },
    {
        name: "Hurricane",
        path: "Kanye West - Donda - (SongsLover.com)/05 Hurricane - (SongsLover.com).mp3",
        img: "Kanye West - Donda - (SongsLover.com)/Cover.jpg",
        singer: "Kanye West",
        alb: "Donda"
    },
    {
        name: "Jesus Lord",
        path: "Kanye West - Donda - (SongsLover.com)/17 Jesus Lord - (SongsLover.com).mp3",
        img: "Kanye West - Donda - (SongsLover.com)/Cover.jpg",
        singer: "Kanye West",
        alb: "Donda"
    },
    {
        name: "Off The Grid",
        path: "Kanye West - Donda - (SongsLover.com)/04 Off The Grid - (SongsLover.com).mp3",
        img: "Kanye West - Donda - (SongsLover.com)/Cover.jpg",
        singer: "Kanye West",
        alb: "Donda"
    },
    {
        name: "Come To Life",
        path: "Kanye West - Donda - (SongsLover.com)/22 Come to Life - (SongsLover.com).mp3",
        img: "Kanye West - Donda - (SongsLover.com)/Cover.jpg",
        singer: "Kanye West",
        alb: "Donda"
    }
];

function loadtrack(index){
    clearInterval(timer);
    resetslider();
    track.src = allsong[index].path;
    title.innerHTML = allsong[index].name;
    trackimg.src = allsong[index].img;
    artist.innerHTML = allsong[index].singer;
    album.innerHTML = allsong[index].alb;
    track.load();
    total.innerHTML = allsong.length;
    present.innerHTML = index + 1;
    timer = setInterval(sliderrange , 1000);
}
loadtrack(index);
function mute(){
    track.volume = 0;
    volume.value = 0;
    volumeshow.innerHTML= 0;
}

function resetslider(){
    slider.value = 0;
}
function now() {
    if(playingsong==false) {
        playsong();
    }else {
        pausesong();
    }
}
function playsong(){
    track.play();
    playingsong = true;
    play.innerHTML = '<span class="material-symbols-outlined">pause</span>';
}
function pausesong(){
    track.pause();
    playingsong = false;
    play.innerHTML = '<span class="material-symbols-outlined">pause</span>';
}
function previoussong(){
    if (index > 0) {
        index -= 1;
        loadtrack(index);
        playsong();
    }else{
        index = allsong.length;
        loadtrack(index);
        playsong();
    }
}
function nextsong(){
    if (index < allsong.length - 1) {
        index += 1;
        loadtrack(index);
        playsong();
    }else{
        index = 0;
        loadtrack(index);
        playsong();
    }
}
function change(){
    volumeshow.innerHTML = volumenow.value;
    track.volume = volumenow.value / 100;
}
function durations(){
    durslider = track.duration * (slider.value / 100);
    track.currentTime = durslider;
}
function autoswitch(){
    if(autoplay==1){
        autoplay=0;
        auto.style.background = "pink";
    }else{
        autoplay=1;
        auto.style.background = "aliceblue";
    }
}
function sliderrange(){
    let position = 0;
    if(!isNaN(track.duration)){
        position = track.currentTime * (100 / track.duration);
        slider.value = position; 
    }
    if(track.ended){
        if(autoplay==1){
            index += 1;
            loadtrack(index);
            playsong();
        }
    }
}