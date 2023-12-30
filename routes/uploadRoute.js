const express = require('express');
const multer = require('multer');
const fileUtils = require('../utils/fileUtils');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
    const filePath = req.file.path;

    try {
        console.time('base64');
        await fileUtils.convertToBase64(filePath);
        console.timeEnd('base64');
        res.send('Arquivo enviado com sucesso');
    } catch (error) {
        res.status(500).send('Erro ao processar o arquivo: ' + error.message);
    } finally {
        fileUtils.cleanUpFile(filePath);
    }
});

module.exports = router;
