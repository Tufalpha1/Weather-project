require('dotenv').config()
const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))
app.get("/",function(req, res){
   res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const unit = "metric";
    const apiKey = process.env.API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
    https.get(url , function(response){
    
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temperature in " + query + " is: " + temp + " degree celsius.</h1>");
            res.write("<p>The weathen is currently: " + weatherDescription +  "</p>");
            res.write("<img src=" + imageURL + "></img>");
            res.send();
        })
    })
})


app.listen(3000, function(){
    console.log("Server is listening on port 3000");
})