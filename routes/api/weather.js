var express = require('express');
const axios = require('axios');
var router = express.Router();
// const fetch = require('node-fetch');

const API_KEY = 'a3a57c49760152eb5e48acf5527cc76c&units=metric';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/weather', async (req, res) => {
//   // res.redirect('/api/weather/' + 'almaty');
// })

router.post('/search', (req, res) => {

  const city = req.body.city;

  if(!city) {
    console.log("enter name of the city")
    res.render('search');
  } else { 
    res.redirect('/api/weather/' + city);
  }
})

router.get('/weather/:city', async (req, res) => {
    console.log("router get weather/city")
    const {city} = req.params;
    console.log("city = " + city);
    // const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }
  
    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = response.data;
        console.log(data)
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

module.exports = router;