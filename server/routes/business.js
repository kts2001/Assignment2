let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let Business = require('../models/business');


let businessController = require('../controllers/business');
router.get('/', businessController.displayContactList);

router.get('/add', businessController.displayAddPage);
router.post('/add', businessController.processAddPage);

router.get('/edit/:id', businessController.displayEditPage);


router.post('/edit/:id', businessController.processEditPage);


router.get('/delete/:id', businessController.performDelete);

module.exports = router;