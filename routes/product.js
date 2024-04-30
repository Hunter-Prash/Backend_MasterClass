const express = require('express')
const router=express.Router();
const productController=require('../controller/product');

router
  .get('/products',productController.getAllProd)
  .get('/products/:id',productController.getSingleProd)
  .post('/products',productController.createProduct)
  .put('/products/:id',productController.putProd)
  .delete('/products/:id', productController.deleteProd)

  exports.routes=router;