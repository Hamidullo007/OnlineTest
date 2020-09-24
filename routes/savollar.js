//const _ = require('lodash');
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

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return { bucketName: 'savollar', metadata: req.body }
    },

});

const upload = multer({ storage });

router.get('/', async (req, res) => {
    if (!gfs) {
        const error = "Kutilmagan xato yuz berdi.";
        console.log(error);
        res.send(error);
        process.exit(0);
    };
    await gfs.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.render('savollar', {
                files: false
            });
        } else {
            const f = files
                .map(file => {
                    if (file.contentType === 'image/png' || file.contentType === 'image/jpeg') {
                        file.isImage = true;
                    } else {
                        file.isImage = false;
                    }
                    return file;
                })
                .sort((a, b) => {
                    return (
                        new Date(b['uploadDate']).getTime(),
                        new Date(a['uploadDate']).getTime()
                    );
                });
            return res.render('savollar', { files: f });
        };
    });
});





router.post('/upload', upload.any(), async (req, res) => {
    res.redirect('/api/savollar'); ///////////////////////////////////////////// url almashritiladi
});




router.post('/del/:id', async (req, res) => {
    await gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
        if (err) {
            return res.status(404).json({ err: err.message });
        }
        res.redirect('/api/savollar');  ///////////////////////////////////////////// url almashritiladi
    });
});

module.exports = router;