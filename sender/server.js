const express = require('express');

const app = express();  



//DEV
const localPort = 2142;

//const localPort = 5433; //This is a port, that will be used when deploying app on local machine.

const port = process.env.PORT || localPort; //Set port to local port (look higher) or auto (when on hosting)


app.use(express.static('./site/'));


app.get("/message", (req, res, next) => 
{
    res.sendFile(__dirname + '/message.html');
});


app.get("/", (req, res, next) =>
{
    res.sendFile('index.html');
    next();
    
});

app.get("/chat", (req, res, next) =>
{
res.sendFile(__dirname + '/site/chat.html');
});

app.use((req, res, next) =>
{
    res.status(404).send('notfound');
});


const server = app.listen(port, () =>
{
//Displaying a message about starting
console.log(`App has started on port ${port}!`)
});

const io = require('socket.io')(server);


io.on('connection', socket =>
{
    //On send button clicked
    socket.on('send', data =>
    {
        io.emit('request', data); //Let sender know, that server's received a request and send it to receiver
    });

    //On message read request
    socket.on('isThereAMessage', () =>
    {
        io.emit('whatIsTheMessage');
    });
    socket.on('messageIs', data =>
    {
        if(data != '' || data != undefined)
        {
            io.emit('messageToDisplay', data);
        }
    });

    socket.on('turnedOff', () =>
    {
        io.emit("off");
    })

    //When receiver receives it
    socket.on('received', () =>
    {
        io.emit('done');
    });

    //On message to sender
    socket.on('messageToSender', data =>
    {
        io.emit('messageSender', data);
        console.log("Message to sender has been sent!");
    });

    //On starting typing a message to sender (if data === true, to sender)
    socket.on('messageBegan', (data) =>
    {
        if(data)
        {
            io.emit('messageIsComingSender');
            console.log("Message to sender has began");
        }

    });

    //Chat

    //On new message
    socket.on('newMessage', data =>
    {
        io.emit("messageIncoming", data);
        console.log(`Message: "${data.body}" with a id ${data.id}`);
    });

    //On enter on chat website
    socket.on('wantsChat', () =>
    {
        io.emit("startChat");
    });

    console.log("Client connected");

}
);