var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var cors = require('cors');
var fs = require('fs');

const saltRounds = 10;
const User = require('../models/User');
const db = require('../public/javascripts/db');
const hasher = require('../public/javascripts/hash');


var bodyparser = express.json();
var token = email = password = username = "";
router.use(cors({ origin: 'http://localhost:3000' }));




const host_email = 'uness.houdaifa@gmail.com';
const host_password = 'yhix2012';


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: host_email,
        pass: host_password,
    }
});



router.get('/login', function (req, res, next) {
    res.render('login');
});
router.get('/join', function (req, res, next) {
    res.render('signup')
});

router.post('/connect', bodyparser, async function (req, res, next) {

    email = req.body.email;
    password = req.body.password;
    req.session.email = email;
    var user = await User.init();
    const users = await user.findAll();
    users.forEach(user => {
        if (user.email === email && bcrypt.compareSync(password, user.password) == true) {
            token = req.session.token = user.api_token;
            return res.redirect("http://localhost:3000");
        }
    });
});

router.post('/create', async function (req, res, next) {
    password = req.body.password
    email = req.body.email;
    username = req.body.username;
    req.session.email = email;
    db.connect();
    await hasher.hash().then(async (value) => {
        var user = await User.init();
        user = await user.create({ name: req.body.username, email: req.body.email, password: value });
    });
    var rand_num = Math.floor(Math.random() * 1000);
    bcrypt.hash(rand_num.toString(), saltRounds, async function (err, hash) {
        return new Promise(async function (resolve, reject) { resolve(hash) }).then(async (value) => {
            return new Promise(async (resolve, reject) => {
                token = value.slice(value.length - 8);
                const text = `Your Verification token is : ${token}  `;
                var mailOptions = {
                    from: host_email,
                    to: email,
                    subject: 'Hot Price : Your Verification token',
                    text: text,
                };
                await transporter.sendMail(mailOptions, async function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        resolve(token)
                    }

                })
            }).then(async (value) => {
                var apiAuthData = {
                    eml: email,
                    tkn: token
                }
                await fs.readFile(__dirname + '/../public/JSONFiles/apiAuthData.json', 'utf-8', async (err, data) => {
                    if (err) throw err;
                    var array = JSON.parse(data);
                    array.push(apiAuthData)
                    array = JSON.stringify(array)
                    await fs.open(__dirname + '/../public/JSONFiles/apiAuthData.json', 'w', async (err, fd) => {
                        await fs.writeFile(fd, array, 'utf-8', async (err) => {
                            await fs.close(fd, (err) => {
                                if (err) throw err;
                            });
                            if (err) throw err;
                            //return res.redirect('/auth/validate-token/');
                        });
                    })
                });
            });
        });


    });
    res.redirect('/auth/validate-token/');
});

router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/')
        }
        res.clearCookie(SESS_NAME);
        res.redirect('/');
    });
})

router.get('/validate-token', function (req, res, next) {
    res.render('tokenize');
});

router.post('/store-token', async function (req, res, next) {
    await fs.readFile(__dirname + '/../public/JSONFiles/apiAuthData.json', 'utf-8', async (err, data) => {
        if (err) throw err;
        var array = JSON.parse(data);
        console.log(array.length)
        for (var index = array.length - 1; index >= 0; index--) {
            console.log(array[index])
            if (array[index].eml === req.session.email) {
                console.log("done")
                var user = await User.init();
                if (array[index].tkn === req.body.token) {
                    await user.update({ api_token: req.body.token, admin_id : Math.random() }, {
                        where: {
                            email: array[index].eml
                        }
                    });
                    token = req.session.token = req.body.token;
                    res.redirect('http://localhost:3000')
                } else {
                    res.redirect('/');
                }
                break;
            }
        }

    });




});




module.exports = router;
