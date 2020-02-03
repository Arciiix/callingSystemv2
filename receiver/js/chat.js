//DEV
const server = "http://localhost:2142";

//const server = "http://192.168.0.120:5433";

const socket = io(server);

let messageDiv = document.getElementsByClassName("messages")[0];
let submit = document.getElementById("submit");
let input = document.getElementById("messageInput");

let sound = new Audio('pop.mp3');


let unicalId;

submit.addEventListener("click", sendMessage);

//Add trigger on enter
document.addEventListener("keyup", e =>
{
    if(e.key === "Enter")
    {
        sendMessage();
    }
})

socket.on('messageIncoming', data => 
{
if(data.id !== unicalId)
{
newMessage(data.body, false);
}
});


//On submitting
function sendMessage()
{
let text = input.value;
if(text !== "")
{
unicalId = new Date().getTime();
socket.emit("newMessage", {body: text, id: unicalId});
input.value = '';
newMessage(text, true);
}
}


//On new message
function newMessage(body, isSelf)
{
if(body != '')
{
    let chatDiv = document.createElement("div");
    chatDiv.classList.add("chat");

    let pop = document.createElement("div");
    pop.classList.add(isSelf ? "chat-mine" : "chat-subject");
    pop.innerText = body;

    chatDiv.append(pop);

    messageDiv.appendChild(chatDiv);

    scrollAutomatically();

    if(!isSelf)
    {
        sound.play();
    }

}
}


//Function, that scroll messages, when there's a new one.
function scrollAutomatically()
{
let shouldScroll = messageDiv.scrollTop + messageDiv.clientHeight !== messageDiv.scrollHeight;

if (shouldScroll)
{
    messageDiv.scrollTop = messageDiv.scrollHeight;
}
}

//On init
socket.emit("wantsChat");
