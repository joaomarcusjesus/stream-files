require('dotenv').config();
const express = require('express');
const uploadRoute = require('./routes/uploadRoute');

const app = express();
const port = 3000;

app.use('/upload', uploadRoute);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
