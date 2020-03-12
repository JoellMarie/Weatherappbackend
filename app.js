const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');
const cors = require('cors');

app.use(cors())
app.get('/weather', (req, res) => {
            console.log(req.query.count);
            axios.get('https://www.random.org/sequences/?min=0&max=180&num=180&col=1&format=plain&rnd=new')
                .then(response => {
                    // console.log(response.data);
                    let savedData = response.data;
                    //console.log(typeof savedData);
                    const array = savedData.split('\n');
                    //console.log(array);

                    let latitude;
                    let longitude;
                    let i;
                    let j;
                    let promises = [];
                    let responses = [];
                    for (j = 0; j < req.query.count; j++) {
                        latitude = array.filter(number=>number<=90)[j]
                        longitude = array[j + 1]
                        const call = axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=df899e9520e3a450206cd47049916463`)
                            .then(response2 => {
                                responses.push(response2.data)
                            })
                            .catch(error => {
                                console.log(error);
                            });
                        promises.push(call)
                    }

                    Promise.all(promises).then(() => res.json({
                            data: responses
                        }))
                        .catch(error => {
                            console.log(error);
                        });
                })
                })
            app.get('/goodbye', (req, res) => res.send('Goodbye'))

            app.listen(port, () => console.log(`Example app listening on port ${port}!`))