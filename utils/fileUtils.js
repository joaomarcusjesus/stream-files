const fs = require('fs');
const stream = require('stream');
const util = require('util');
const pipeline = util.promisify(stream.pipeline);

const convertToBase64 = async (filePath) => {
    const readStream = fs.createReadStream(filePath);
    let base64Chunks = [];

    const transformStream = new stream.Transform({
        transform(chunk, encoding, callback) {
            base64Chunks.push(chunk.toString('base64'));
            callback();
        }
    });

    await pipeline(readStream, transformStream);

    return base64Chunks.join('');
};

const cleanUpFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) console.error('Erro ao deletar o arquivo temporário:', err);
    });
};

module.exports = { convertToBase64, cleanUpFile };
