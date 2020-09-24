const _ = require('lodash');
const express = require('express');
const router = express.Router();
//const crypto = require('crypto');
//const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const config = require('config');
const GridFsStorage = require('multer-gridfs-storage');

const mongoURI = config.get('mongodbConnect');

const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;

conn.once("open", async () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "savollar" });
});

//const upload = multer({ storage });
router.get('/', async (req, res)=>{
    return res.render('index', {files: 'salom'});
});

router.get('/files', async (req, res) => {
    if (!gfs) {
        const error = "Kutilmagan xato yuz berdi.";
        console.log(error);
        res.send(error);
        process.exit(0);
    };
    await gfs.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.render('index', {
                files: false
            });
        } else {
            const f = files
                .map(file => {
                    if (file.contentType === 'image/png' || file.contentType === 'image/jpeg') {
                        file.isImage = true;
                    } else {
                        file.isImage = false;
                    };
                    file.metadata.tj = 'topolmading'
                    return file;
                })
                .sort((a, b) => {
                    return (
                        new Date(b['uploadDate']).getTime(),
                        new Date(a['uploadDate']).getTime()
                    );
                });
            return res.send(f);
        };
    });
});

router.get('/image/:filename', async (req, res) => {
    const file = await gfs
        .find({ filename: req.params.filename })
        .toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({ err: "bironta ham fayl mavjud emas." });
            }
            gfs.openDownloadStreamByName(req.params.filename).pipe(res);
        });
});

module.exports = router;