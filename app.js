const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');


app.get('/weather', (req, res) => {
    console.log(req.query.count);
    axios.get('https://www.random.org/sequences/?min=0&max=180&col=1&format=plain&rnd=new')
        .then(response => {
           // console.log(response.data);
            let savedData = response.data;
            //console.log(typeof savedData);
            const array = savedData.split('\n ');
            //console.log(array);

            let latitude;
            let longitude;
            let i;
            for (i = 0; i < savedData.length; i++) {
                if (savedData[i] < 91) {
                    latitude = savedData[i]
                    longitude = savedData[i + 1]
                    break
                }
              }
            console.log(latitude);
            console.log(longitude);
            axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=df899e9520e3a450206cd47049916463`)
                .then(response2 => {
                    //console.log(response2.data);
                    res.send(response2.data);
                })
                .catch(error => {
                    console.log(error);
                });
            // res.send(savedData);
        })
        .catch(error => {
            console.log(error);
        });
})
app.get('/goodbye', (req, res) => res.send('Goodbye'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))