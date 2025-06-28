const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./routes');
const app = express();

// Configuración
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'emenuSecret',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor activo en http://localhost:${port}`);
});

