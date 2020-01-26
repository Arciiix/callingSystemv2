const socket = io();

let sentText = document.getElementById("info");

let isMessage = false;

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

    //Sending request
    socket.emit('send', inputText);

    sentText.innerText = "Łączenie...";
    sentText.style.opacity = 1;
    document.getElementById('submit').style.opacity = 0;
    document.getElementById('message').style.opacity = 0;
    
}

socket.on('request', () =>
{
    sentText.innerText = "Wysłano!";
    //Timeout, which tell when the request's time out
    timer = setTimeout(() => {
        sentText.innerText = "Czas minął!";
    }, (10000));
});

socket.on('done', () =>
{
    sentText.innerText = "Odebrano!";
    clearTimeout(timer);
});

socket.on('messageIsComingSender', () =>
{
    isMessage = true;
    sentText.innerText = "Pisanie wiadomości...";
});

socket.on('messageSender', data =>
{
    sentText.innerText = `Wiadomość: ${data}`;
    sentText.style.fontSize = '10vmin';
});


socket.on('off', () =>
{
    if(!isMessage)
    {
    sentText.innerText = "Przeczytano!";
    }
});
