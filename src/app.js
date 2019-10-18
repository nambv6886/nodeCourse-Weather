const express = require('express');
const hbs = require('hbs');

const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewPath);
app.use(express.static(path.join(__dirname, '../public')));
hbs.registerPartials(partialsPath);


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: "Nambv"
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Nambv'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    message: 'Leave your question here'
  })
})

app.get('/weather', (req, res) => {
  const query = req.query;
  if(!query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  return res.send({
    address: query.address
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found  ',
    title: '404',
    name: 'Nambv'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    title: '404',
    name: 'Nambv'
  })
})

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
})