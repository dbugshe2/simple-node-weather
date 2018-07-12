const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const apiKey = 'f0e7402fd2c3fd1825a682f2f397deb5';


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index',  {weather: null, error: null});
});

app.post('/', (req, res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    request(url, (err, response, body) => {
        if(err) {
            res.render('index', {weather: null, error: 'Error Plaese try again.'});
        } else {
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error PLease try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees Celsius in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
});


app.listen(3000, () => console.log('Exaple app listening on port 3000!'));