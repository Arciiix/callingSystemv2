let button = document.querySelector("#mainBtn");

const socket = io();
let text = null;
let timer;

let isMessage = false;

button.addEventListener('click', send);
document.getElementById('messBtn').addEventListener('click', () =>
{
    window.location.href = "message";
})

function send()
{
    //Sending request
    socket.emit('send');

    text = document.createElement("span");
    text.classList.add("infoText");
    text.innerText = "Łączenie...";
    
    let parent = button.parentElement;
    parent.appendChild(text);
    button.remove();
    document.getElementById("messBtn").remove();
    document.getElementsByClassName('center')[0].style.justifyContent = 'center';

}

socket.on('request', () =>
{
    text.innerText = "Wysłano!";
    //Timeout, which tell when the request's time out
    timer = setTimeout(() => {
        text.innerText = "Czas minął!";
    }, (10000));
});

socket.on('done', () =>
{
    text.innerText = "Odebrano!";
    clearTimeout(timer);
});

socket.on('messageIsComingSender', () =>
{
text.innerText = "Pisanie wiadomości...";
isMessage = true;
});

socket.on('messageSender', data =>
{
    text.innerText = `Wiadomość: ${data}`;
    text.style.fontSize = '10vmin';
});

socket.on('startChat', () =>
{
    window.location.href = 'chat';
    console.log("chat i love godf");
})


socket.on('off', () =>
{   
    if(!isMessage)
    {
    text.innerText = "Przeczytano!";
    }
});
