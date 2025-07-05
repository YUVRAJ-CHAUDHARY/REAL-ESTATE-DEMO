const express = require('express');
const path = require('path');

const app = express();

// / Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Root route renders index.ejs
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/register', (req, res) => {
  res.render('register');
});
app.get('/propertyDetail', (req, res) => {
  res.render('propertyDetail');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/addProperty', (req, res) => {
  res.render('addProperty');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Vedanta Residency app running on http://localhost:${PORT}`);
});