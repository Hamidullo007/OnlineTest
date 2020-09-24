const mongoose = require('mongoose');
const config = require('config');
const GridFsStorage = require('multer-gridfs-storage');

const mongoURI = config.get('mongodbConnect');

const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;

conn.once("open", () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "savollar" });
});


const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return { bucketName: 'savollar', metadata: req.body }
    },

});

exports.gfs = gfs;
exports.storage = storage;