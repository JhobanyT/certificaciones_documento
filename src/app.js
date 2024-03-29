const express = require('express');
const documentoRouter = require('./routes/documentoRouter.js');

const app = express();

// Configurar encabezados de seguridad
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
});

    // Manejar errores de forma segura
    app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
});


app.use(express.json());

app.use('/api', documentoRouter);

module.exports = app;