const socket = io('http://192.168.0.120:5433');

let button = document.querySelector("#mainBtn");

button.addEventListener('click', turnOff);

async function turnOff()
{
//Fetching to site, which turns off the music
await fetch('/off');
}


//When clicked the second button, redirecting to site where you can send message.
document.querySelector('#messBtn').addEventListener('click', () =>
{
fetch('/off')
.then(() =>
{
    document.location.href = 'chat';
});

});

//Check, is there a message
socket.emit('isThereAMessage');

socket.on('messageToDisplay', data => 
{
document.getElementById('header').innerText = data;
document.getElementById('header').style.opacity = 1;
});