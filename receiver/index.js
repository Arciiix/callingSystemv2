//DEV
const port = 8584;
//const port = 3824; //Port
//const url = "http://192.168.0.120:5433"; //Change it to yours!
const url = "http://localhost:2142";
//DEV


const socket = require('socket.io-client');

const io = socket(url);


const player = require('node-wav-player');


let isPlaying = false;

const express = require('express');

const app = express();  

const open = require('open');

const ip = require("ip");

let message;

io.on('request', async (data) =>
{
//Sending info, that I've received it!
io.emit('received');
isPlaying = true;
if(data != '' || data != undefined)
{
    message = data;
}
else
{
    message = '';
}
consoleMessage(`WOŁANIE! WIADOMOŚĆ: ${message}`);

//Playing song
player.play({
    path: './song.wav',
  });
  
  //Opening site which allows you to turn off the music 
  await open(`http://${ip.address()}:${port}`);

});

io.on('whatIsTheMessage', () =>
{
    io.emit('messageIs', message);
    message = null;
})

const server = app.listen(port, () =>
{
//Displaying a message about starting
consoleMessage(`Odpalono aplikacje na porcie ${port}`);
});

function consoleMessage(mess)
{
    console.clear();
    console.log("Wołacz");
    console.log(mess);
}

app.get('/off', (req, res, next) =>
{
    if(isPlaying)
    {
    consoleMessage(`Zawołano: ${new Date}`);
    message = undefined;
    player.stop();
    isPlaying = false;
    res.send("turned off");
    io.emit("turnedOff");
    }
    next();
})


app.use(express.static('../receiver/'));

app.get("/chat", (req, res, next) => 
{
    res.sendFile(__dirname + '/chat.html');
});

app.get("/", (req, res, next) =>
{
    res.sendFile('index.html');
    next();
    
});
