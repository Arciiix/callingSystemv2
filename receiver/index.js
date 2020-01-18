const port = 3824; //Port
const url = "https://wolacz.herokuapp.com"; //Change it to yours!




const socket = require('socket.io-client');

const io = socket(url);


const player = require('node-wav-player');


let isPlaying = false;

const express = require('express');

const app = express();  

const open = require('open');

const ip = require("ip");

let openedWindow;

io.on('request', async () =>
{
//Sending info, that I've received it!
io.emit('received');
isPlaying = true;
consoleMessage(`WOŁANIE!`);

//Playing song
player.play({
    path: './song.wav',
  });
  
  //Opening site which allows you to turn off the music 
  await open(`http://${ip.address()}:${port}`);

});


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
    player.stop();
    isPlaying = false;
    res.send("turned off");
    }
})


app.use(express.static('../receiver/'));


app.get("/", (req, res, next) =>
{
    res.sendFile('index.html');
    next();
    
});