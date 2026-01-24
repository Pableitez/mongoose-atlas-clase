const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const { dbConnection } = require('./config/config');
const tasksRoutes = require('./routes/tasks');

app.use(express.json());
app.use('/', tasksRoutes);

dbConnection();

app.listen(PORT, () => console.log(`Servidor iniciado en http://localhost:${PORT}`));
