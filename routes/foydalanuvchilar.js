const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { Foydalanuvchi, validate } = require('../models/foydalanuvchi');
//const gfs = require('../middleware/getGfs');
const mongoose = require('mongoose');
const multer = require('multer');
const config = require('config');
const GridFsStorage = require('multer-gridfs-storage');

const mongoURI = config.get('mongodbConnect');

const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;

conn.once("open", () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "savollar" });
});

router.get('/rekord', async (req, res) => {
    const foydalanuvchi = await Foydalanuvchi.find().sort('tjs').limit(1);
    res.status(200).send(foydalanuvchi);
});

router.get('/', async (req, res) => {
    const foydalanuvchi = await Foydalanuvchi.find();
    res.status(200).send(foydalanuvchi);
});

router.post('/', (req, res) => {
    if (!gfs) {
        const error = "Kutilmagan xato yuz berdi.";
        console.log(error);
        res.send(error);
        process.exit(0);
    };
    gfs.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.render('index', {
                files: false
            });
        } else {
            const f = files
                .sort((a, b) => {
                    return (
                        new Date(b['uploadDate']).getTime(),
                        new Date(a['uploadDate']).getTime()
                    );
                });
            gets(f);
        };
    });

    function gets(fayllar) {
        let foydalanuvchi, savol, javob;
        let tjs = 0;
        let njs = 0;

        if (!fayllar) {
            return res.send("Siz serverga mavjud bo'lmagan xabar jo'natdingiz.");
        };

        for (let i = 1; i <= 10; i++) {
            if (i == 1) {
                savol = req.body.savol1;
                javob = req.body.javob1;
            } else if (i == 2) {
                savol = req.body.savol2;
                javob = req.body.javob2;
            } else if (i == 3) {
                savol = req.body.savol3;
                javob = req.body.javob3;
            } else if (i == 4) {
                savol = req.body.savol4;
                javob = req.body.javob4;
            } else if (i == 5) {
                savol = req.body.savol5;
                javob = req.body.javob5;
            } else if (i == 6) {
                savol = req.body.savol6;
                javob = req.body.javob6;
            } else if (i == 7) {
                savol = req.body.savol7;
                javob = req.body.javob7;
            } else if (i == 8) {
                savol = req.body.savol8;
                javob = req.body.javob8;
            } else if (i == 9) {
                savol = req.body.savol9;
                javob = req.body.javob9;
            } else if (i == 10) {
                savol = req.body.savol10;
                javob = req.body.javob10;
            }

            for (let j = 0; j < fayllar.length; j++) {
                if (fayllar[j]._id == savol && fayllar[j].metadata.tj == javob) {
                    tjs++;
                    break;
                }
            }
        }

        njs = 10 - tjs;

        foydalanuvchi = new Foydalanuvchi({
            nomi: req.body.nomi,
            vaqt: req.body.vaqt,
            tjs: tjs,
            njs: njs
        });
        foydalanuvchi = foydalanuvchi.save();
        res.status(201).send(`${tjs}`);

    }

});

router.get('/royxati', async (req, res) => {
    let users = await Foydalanuvchi.find().sort('vaqt');
    if (!users) {
        res.send("Bironta ham foydalanuvchi mavjud emas.");
    }
    res.render('foydalanuvchilar', { users: users });
});

module.exports = router;