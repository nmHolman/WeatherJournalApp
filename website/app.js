/* Global Variables */
const weatherAPIUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const weatherAPIKey = keys.WEATHER_API;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Get data from Weather API
const getData = async (url, key) => {
    let zip = document.getElementById('zip').value;
    let fullURL = `${url}q=${zip}&units=imperial&appid=${key}`

    const request = await fetch(fullURL);

    try {
        const allData = await request.json();
        const temp = allData.main['temp'];
        return temp;

    } catch (error) {
        console.log("error", error);
    }
};


async function doThing(e) {
    const temp = await getData(weatherAPIUrl, weatherAPIKey);
    console.log(`Current temp: ${temp}`)
}

// Click Event
document.getElementById('generate').addEventListener('click', doThing);