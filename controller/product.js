
const fs=require('fs')
const index=fs.readFileSync('index.html','utf-8')
const data=JSON.parse(fs.readFileSync('data.json','utf-8'));
const products=data.products;

const model=require('../model/product')
const Product=model.Product;


//READ OPERATION
exports.getAllProd=(req,res)=>{
    res.json(products)
  }

  //get a single product
 exports.getSingleProd=(req,res)=>{
    const id=+req.params.id;
    const product=products.find(p=>p.id===id)
    res.json(product);
  }

//POST operation using simple nide+express
exports. createProduct=(req,res)=>{
    //The data will come from the front end in JSOn or url encoded format
  
    console.log(req.body)//Printing the data which came from the front end on the console
    products.push(req.body)
  
    res.json(req.body);
  }


  //POST using moongoose db
  exports. createProduct=(req,res)=>{
    
    const product = new Product();//creating an instance of the Product constructor
    product.title = 'PhoneX';
    product.price = 9999;
    product.rating = 5;
    product.save((err, doc) => {//this is the way to save the data in mongodb via code...
        console.log(err, doc);
        res.json(doc);
    });
  }

  // PUT operation - Update a product
exports.putProd=(req, res) => {
    const id = +req.params.id;
    const updatedProduct = req.body; // Updated product data sent from the client
  
    // Find the product with the given ID in your products array
    const productIndex = products.findIndex(p => p.id === id);
  
    // If the product with the given ID exists
    if (productIndex !== -1) {
      // Update the product data in the products array
      products[productIndex] = { ...products[productIndex], ...updatedProduct };
      //This line of code is using the spread syntax (...) to merge two objects: products[productIndex] (the existing product data) and updatedProduct (the new product data sent from the client).
  
  
  
      //If you remove the spread syntax (...) and simply assign updatedProduct directly to products[productIndex], it will replace the entire product object at the specified index with the new updatedProduct object. This means that any properties that were present in the existing product but are not included in the updatedProduct object will be lost.
  
  
      res.json(products[productIndex]); // Send back the updated product
    } else {
      // If the product with the given ID does not exist, send a 404 Not Found response
      res.status(404).json({ error: 'Product not found' });
    }
  }

// DELETE operation - Delete a product
exports.deleteProd=(req, res) => {
    const id = +req.params.id;
  
    // Find the index of the product with the given ID in the products array
    const productIndex = products.findIndex(p => p.id === id);
  
    // If the product with the given ID exists
    if (productIndex !== -1) {
      // Remove the product from the products array using splice
      products.splice(productIndex, 1);
      res.json({ message: 'Product deleted successfully' });
    } else {
      // If the product with the given ID does not exist, send a 404 Not Found response
      res.status(404).json({ error: 'Product not found' });
    }
  }

