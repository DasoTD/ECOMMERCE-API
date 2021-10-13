const router = require('express').Router();
const {verifyTokenAndAdmin } = require('../../middlewares/verify');

const { createProduct } = require('./productController');

router.post('/createProduct', verifyTokenAndAdmin, createProduct);

module.exports = router;