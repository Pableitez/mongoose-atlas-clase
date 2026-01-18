const express = require('express');
const { dbConnection } = require('./config/config');
const routes = require('./routes');

const app = express();
const PORT = 8080;

// Middleware para parsear JSON
app.use(express.json());

// Conectar rutas
app.use('/', routes);

// Conectar base de datos
dbConnection()
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Levantar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
