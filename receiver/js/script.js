let button = document.querySelector("#mainBtn");

button.addEventListener('click', turnOff);

async function turnOff()
{
//Fetching to site, which turns off the music
await fetch('/off');
}