/* Global Variables */
const weatherAPIUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const weatherAPIKey = '52e6c7689672cdc242b9dcee26ee3094';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

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

// Asnyc Post
const postData = async (url, data) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Async GET
const retrieveData = async (url) => {
    const request = await fetch(url);
    try {
        const allData = await request.json()

        lastDate = allData.slice(-1)[0].date;
        lastTemp = allData.slice(-1)[0].temp;
        lastFeeling = allData.slice(-1)[0].feelings;

        document.getElementById('date').innerHTML = `<p>Date <br/><span id='result'>${lastDate}</span></p>`;
        document.getElementById('temp').innerHTML = `<p>Temperature <br/><span id='result'>${lastTemp}&#176;F<span></p>`;
        document.getElementById('content').innerHTML = `<p>Feelings <br/><span id='result'>${lastFeeling}<span></p>`;

    } catch (error) {
        console.log("error", error);
    }
};

// POST GET
function postGET(d) {
    postData('/add', d).then(retrieveData('/data'));
}

// Click Event Function
async function generateEntry(e) {
    const temp = await getData(weatherAPIUrl, weatherAPIKey);
    const feelings = document.getElementById('feelings').value;

    const newData = {
        date: newDate,
        temp: temp,
        feelings: feelings,
    }; 

    postGET(newData);

    document.getElementById('feelings').value = '';
    document.getElementById('zip').value = '';
}


// Click Event
document.getElementById('generate').addEventListener('click', generateEntry);