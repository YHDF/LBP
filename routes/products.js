var express = require('express');
var router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const Provider = require('../models/Provider');
const User = require('../models/User');
const cors = require('cors');

/*************************************************    PRODUCTS ROUTER    ************************************************************/



/******enabling CORS for Front End Server************/
router.use(cors({origin : 'http://localhost:3000'}))
/****************************************************/



/* GET home page. */
router.get('/all', async function (req, res, next) {
    var product = await Product.init();
    const products = await product.findAll();
    res.json(products)

});

router.get('/category',async function (req, res, next) {
    var category = await Category.init();
    const categories = await category.findAll();
    var user = await User.init();
    var users = await user.findAll();
    var admin_names = []
    categories.forEach(element => {
        users.forEach(elt => {
            if (elt.admin_id === element.admin_id) {
                admin_names.push(elt.name)
                return false;
            }
        })
    });
    var category_arr = [];
    for (var n = 0; n < categories.length; n++) {
        category_arr.push(
            {
                "categories": categories[n],
                "admin_name": admin_names[n]
            }
        )
    }

    res.send(category_arr);

});


router.get('/provider',async function (req, res, next) {
    var provider = await Provider.init();
    const providers = await provider.findAll();
    var user = await User.init();
    var users = await user.findAll();
    var admin_names = []
    providers.forEach(element => {
        users.forEach(elt => {
            if (elt.admin_id === element.admin_id) {
                admin_names.push(elt.name)
                return false;
            }
        })
    });
    var provider_arr = [];
    for (var n = 0; n < providers.length; n++) {
        provider_arr.push(
            {
                "providers": providers[n],
                "admin_name": admin_names[n]
            }
        )
    }
    res.send(provider_arr);

});


router.post('/modifycategory' , async function (req, res, next) {
    const cat = req.body;
    var category = await Category.init();
    await category.update({ name: cat.category }, {
        where: {
            id_category: cat.catid
        }
    });
    res.json({
        "name" : cat.category
    });
});


router.delete('/deletecategory' , async function (req, res, next) {
    const cat_id = req.query[0];
    console.log(cat_id)
    var category = await Category.init();
    await category.destroy({
        where: {
            id_category: cat_id
        }
    });
    console.log("desroy result is "  + result);

    res.json({
        "message" : "succes"
    });
});

router.post('/modifyprovider' , async function (req, res, next) {
    const prov = req.body;
    console.log("this is prov : " + prov.prov_id)
    var provider = await Provider.init();
    await provider.update({ name:  prov.provider }, {
        where: {
            id_provider: prov.prov_id
        }
    });
    res.json({
        "message" : "succes"
    });
});
router.delete('/deleteprovider' , async function (req, res, next) {
    const prov_id = req.query[0];
    var provider = await Provider.init();
    await provider.destroy({
        where: {
            id_provider: prov_id
        }
    });

    res.json({
        "message" : "succes"
    });
});


module.exports = router;
