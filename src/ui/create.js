const productForm = document.getElementById('productForm');
//const productForm2 = document.getElementById('productForm2');

const { remote } = require('electron');
const main = remote.require('./main')

const productName = document.getElementById('name');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    //console.log(productName.value)
    //console.log(productPrice.value)
    //console.log(productDescription.value)

    const newProduct = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value
    }

        const result = await main.createProduct(newProduct);
        console.log(result)
    
    productForm.reset();
    productName.focus();
})