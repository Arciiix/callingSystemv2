const socket = io('http://192.168.0.120:5433');

let sentText = document.getElementById("info");

document.getElementById('submit').addEventListener('click', send);
document.addEventListener('keyup', key => {
if(key.code === 'Enter') send();
});

function send()
{
let inputText = document.getElementById('message').value;

if(!inputText || inputText === '')
{
    document.getElementById('message').placeholder = 'Musisz coś wpisać!';
    document.getElementById('message').classList.add('placeholderRed');
    return;
}

socket.emit('messageToSender', inputText);
socket.on('messageSender', data =>
{
if(data === inputText)
{
sentText.style.opacity = 1;
//Turn off the song
fetch('/off');
}
});

}

//Sending info that someone writes a message
socket.emit('messageBegan', true);