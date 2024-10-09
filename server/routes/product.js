const express = require ('express')
const { createProduct, getProducts, getSingleProduct, deleteProduct, updateProduct } = require('../controllers/product')
const router = express.Router()
router.post('/createProduct',  createProduct)
router.get('/products', getProducts)
router .get('/product/:id',getSingleProduct)
router.delete('/deleteproduct/:id', deleteProduct)
router.patch('/updateproduct/:id',updateProduct)

module.exports = router