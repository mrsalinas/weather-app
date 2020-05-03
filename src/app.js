const express = require('express')
const path = require('path')
const hbs  = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Defining paths for Express configuration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup handlerbars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.get('' , (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Marcos Salinas'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Marcos Salinas'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help page',
        name: 'Marcos Salinas'
    })
})

app.get('/weather', (req, res) => {

    if ( !req.query.address ) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, placeName} = {} ) => {
        console.log('Error', error)
        //console.log('Data', data)
        
        forecast( latitude, longitude, (error, data) => {
            if ( error ) {
                return res.send({ error })
            }


            console.log('valor de forecast: ', data)
            
            res.send({
                pronostico: 'Data agregada a la respuesta del backend',
                location: placeName,
                address: req.query.address
            })  
        })
    })

})

app.get('/products', (req, res) => {

    if ( !req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        helpNotFound: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        pageNotFound: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})