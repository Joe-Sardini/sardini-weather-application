const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const pubDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Static express directory to serve
app.use(express.static(pubDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Joe'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Joe Sardini'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather help',
        message: 'This is the help page',
        name: 'Joe Sardini'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please enter an address."
        });
    };
    
    geoCode(req.query.address, (error, { lat, long, name } = {}) => {
        if (error) { return res.send({error:error}) }
            forecast(lat, long, (error, forecastData) => {
                if (error) { return res.send({error:error}) };
                    res.send({
                        forecast: forecastData,
                        name,
                        address: req.query.address
                    });                
            });
    });
    
    
});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "Please enter a search term."
        });
    };
    
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error Page',
        errorMessage: 'Help article not found.',
        name: 'Joe Sardini'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error Page',
        errorMessage: 'Page not found.',
        name: 'Joe Sardini'
    });
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});