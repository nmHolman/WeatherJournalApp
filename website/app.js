/* Global Variables */
const weatherAPIUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const weatherAPIKey = '52e6c7689672cdc242b9dcee26ee3094';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Get data from Weather API
const getData = async (url, key) => {
    let zip = document.getElementById('zip').value;
    let fullURL = `${url}q=${zip}&appid=${key}`

    const request = await fetch(fullURL);

    try {
        const allData = await request.json()
        console.log(allData)
        
    } catch(error) {
        console.log("error", error);
    }
};


function doThing(e) {
    getData(weatherAPIUrl, weatherAPIKey)
}

// Click Event
document.getElementById('generate').addEventListener('click', doThing);