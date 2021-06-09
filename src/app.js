const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialspath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Saurav B V'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Saurav B Vss'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Saurav B V'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: 'Please enter an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ errorMessage: error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ errorMessage: error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
})

app.get('/help/*',(req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found'
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search){
       return res.send({
            error: 'Please provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: req.query.search
    })
})


app.get('*',(req,res)=>{
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("Server is up on port " +port)
})