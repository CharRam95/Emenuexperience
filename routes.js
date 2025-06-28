const express = require('express');
const router = express.Router();

const pantallas = [
  { id: 2085, nombre: "Demo", url: "https://videos.com/demo.mp4", activo: true }
];

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { usuario, clave } = req.body;
  if (usuario === 'admin' && clave === '123') {
    req.session.user = 'admin';
    res.redirect('/panel');
  } else {
    res.send('Credenciales incorrectas');
  }
});

router.get('/panel', (req, res) => {
  if (req.session.user !== 'admin') return res.redirect('/');
  res.render('panel', { pantallas });
});

router.get('/api/pantalla/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pantalla = pantallas.find(p => p.id === id && p.activo);
  if (!pantalla) return res.status(404).json({ valido: false });
  res.json({ valido: true, nombre: pantalla.nombre, url: pantalla.url });
});

module.exports = router;
