const express = require('express');

const app = express();  



const localPort = 5433; //This is a port, that will be used when deploying app on local machine.

const port = process.env.PORT || localPort; //Set port to local port (look higher) or auto (when on hosting)



app.use(express.static('../sender/'));




app.get("/", (req, res, next) =>
{
    res.sendFile('index.html');
    next();
    
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
        io.emit('request'); //Let sender know, that server's received a request and send it to receiver
    })
    //When receiver receives it
    socket.on('received', () =>
    {
        io.emit('done');
    })
}
);