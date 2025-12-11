const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const indexRoutes = require('./routes/index');
const healthRoutes = require('./routes/health');

const app = express();

// Middlewares de seguridad
app.use(helmet());
app.use(cors());
//^^Prueba

// Middlewares de aplicación
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.use('/', indexRoutes);
app.use('/health', healthRoutes);

// Middleware de manejo de errores 404
//Mensaje de prueba
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.path} no existe`
  });
});

// Middleware de manejo de errores general
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
  });
});

module.exports = app;
