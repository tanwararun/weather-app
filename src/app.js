const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
const port=process.env.PORT || 3000

const app = express()


const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Arun Tanwar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Arun Tanwar',
        text : 'Hope you are liking it. Contact : tanwararun5@gmail.com'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Arun Tanwar'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : "You must provide the address"
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
        if(error)
        return res.send({
            error : error
        });
        forecast(latitude,longitude,(err,{weather,temperature,feelsLike}={})=>{
            if(err)
            return res.send({
                error : err
            });
            res.send({
                Weather : weather,
                Temperature : temperature+ " degrees celcius",
                FeelsLike : feelsLike + " degrees celcius",
                Location : location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arun Tanwar',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arun Tanwar',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port : '+port)
})