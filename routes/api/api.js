const { json } = require('express');
var express = require('express');
const sequelize = require('sequelize');
var fs = require('fs');
var router = express.Router();



const User = require('../../models/User');
const db = require('../../public/javascripts/db');
const Product = require('../../models/Product');
const Category = require('../../models/Category');
const Group = require('../../models/Group');
const Provider = require('../../models/Provider');
const Favorite = require('../../models/Favorite');
const Feedback = require('../../models/Feedback');
var email;


router.post('/store-token', async function (req, res, next) {
    var user = await User.init();
    var email = req.body.email;
    var values;
    fs.readFile(__dirname + '/../../public/JSONFiles/apiAuthData.json', 'utf-8', async (err, data) => {
        if (err) throw err;
        values = JSON.parse(data)
        for (var index = values.length -1 ; index >=  0; index--) {
            if ((values[index].eml !== email)) {
                values.splice(index, 1)
            }
        }
        if (values[values.length - 1].tkn === req.body.token) {
            
            await user.update({ api_token: req.body.token }, {
                where: {
                    email: email
                }
            });
            res.json({
                "message": "email verified successfully",
            });
        } else {
            res.json({
                "message": "email failed to verify",
            });
        }
    });
});

router.get('/loadlogin', async function (req, res, next) {
    email = req.query.email
    var user = await User.init();
    var users = await user.findAll({
        where: {
            email: email
        }
    });
    return res.json({
        email: users[0].email,
        name: users[0].name,
        token: users[0].api_token,
    });
});


router.get('/user', async function (req, res, next) {
    token = req.query.api_token
    var user = await User.init();
    var favorite = await Favorite.init();
    var feedback = await Feedback.init();
    var users = await user.findOne({
        where: {
            api_token: token
        }
    });
    var feedbacks = await feedback.count({
        where: {
            user_id: users.id,
        },
    });
    var favorites = await favorite.count({
        where: {
            user_id: users.id,
        }
    })
    return res.json({
        User: users,
        Favs: favorites,
        Feeds: feedbacks,
    });
});


router.get('/favourite', async function (req, res, next) {
    token = req.query.api_token
    var user = await User.init();
    var users = await user.findOne({
        where: {
            api_token: token
        }
    });
    var favorite = await Favorite.init();
    var favorites = await favorite.findAll({
        where: {
            user_id: users.id,
        }
    });
    return res.json({
        favourits: favorites,
    });
});

router.post('/favourite', async function (req, res, next) {
    token = req.body.api_token
    product_id = req.body.product_id;
    var user = await User.init();
    var users = await user.findOne({
        where: {
            api_token: token
        }
    });
    var product = await Product.init();
    var products = await product.findOne({
        where: {
            id: product_id
        }
    });
    var favorite = await Favorite.init();
    await favorite.create({
        user_id: users.id,
        product_id: products.id,
        name: products.name,
        image: products.image,
        link: products.link,
        price: products.price,
        available: 1,
    });
    return res.json({
        "success": "Favorite created succesfully",
    });
});


router.delete('/favourite', async function (req, res, next) {
    token = req.query.api_token
    favorite_id = req.query.favourite_id;
    var user = await User.init();
    var users = await user.findOne({
        where: {
            api_token: token
        }
    });
    var favorite = await Favorite.init();
    await favorite.destroy({
        where: {
            id_favourite: favorite_id,
            user_id: users.id,
        }
    });
    return res.json({
        "success": "Favorite deleted succesfully",
    });
});

router.get('/feedback', async function (req, res, next) {
    token = req.query.api_token
    var user = await User.init();
    var users = await user.findOne({
        where: {
            api_token: token
        }
    });
    var feedback = await Feedback.init();
    var feedbacks = await feedback.findAll({
        where: {
            user_id: users.id,
        }
    });
    return res.json({
        feedbacks: feedbacks,
    });
});


router.post('/feedback', async function (req, res, next) {
    token = req.body.api_token;
    subject = req.body.subject;
    text = req.body.text;
    var user = await User.init();
    var users = await user.findOne({
        where: {
            api_token: token
        }
    });
    var feedback = await Feedback.init();
    await feedback.create({
        user_id: users.id,
        subject: subject,
        text: text
    });
    return res.json({
        "message": "Feedback created succesfully",
    });
});


router.post('/visit', async function (req, res, next) {
    token = req.body.api_token;
    products_id = req.body.product_id
    var product = await Product.init();
    var products = await product.findOne({
        where: {
            id: products_id
        }
    })
    await product.update({ visits: products.visits + 1 }, {
        where: {
            id: products_id
        }
    });
    return res.json({
        "succes": "Visit Incremented succesfully",
    });
});




router.get('/load', async function (req, res, next) {
    var product = await Product.init();
    var products = await product.findAll();
    var category = await Category.init();
    var categories = await category.findAll();
    var group = await Group.init();
    var groups = await group.findAll();
    var provider = await Provider.init();
    var providers = await provider.findAll();
    var products_by_visits = await product.findAll({
        order: sequelize.literal('visits DESC'),
        limit: 5,
    });
    var products_by_best = await product.findAll({
        where: {
            best: 1,
        }
    });
    return res.json({
        'products_by_visits': products_by_visits,
        'products_by_best': products_by_best,
        'products_all': products,
        'groups_all': groups,
        'categories_all': categories,
        'providers_all': providers,
    });
});




module.exports = router;