let button = document.querySelector("#mainBtn");

const socket = io();
let text = null;
let timer;

button.addEventListener('click', send);

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
})