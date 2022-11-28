const productForm = document.getElementById('productForm');
//const productForm2 = document.getElementById('productForm2');

const { remote } = require('electron');
const main = remote.require('./main')

const productName = document.getElementById('name');
const productPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const productsList = document.getElementById('products');

let products = []
let editingStatus= false;
let editProductId = '';

/*
let sound = new Audio('../Song.mp3')

play.addEventListener('click', ()=>{
    sound.play();
    sound.loop = true;
})
pause.addEventListener('click', ()=>{
    sound.pause();
})
*/

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

    if(!editingStatus) {
        const result = await main.createProduct(newProduct);
        console.log(result)
    }else{
        await main.updateProduct(editProductId, newProduct);
        editingStatus = false;
        editProductId = '';
    }
    
    productForm.reset();
    productName.focus();
    
    getProducts();
})

async function deleteProduct(id){
    const response = confirm('Are you sure you want to delete this product?')
    if (response){
        await main.deleteProduct(id)
        await getProducts();
    }
    return;
}

async function editProduct(id){
    const product = await main.getProductById(id)
    //console.log(product)
    productName.value = product.name;
    productPrice.value = product.price;
    productDescription.value = product.description;
    
    editingStatus = true;
    editProductId = product.id;
}

function renderProducts(products) {
    productsList.innerHTML='';
    products.forEach(product =>{
        productsList.innerHTML += `
            <div class="card card-body my-2 animate__animated animate__bounceInLeft">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <h3>${product.price}</h3>
                <p>
                    <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">
                        DELETE
                    </button>
                    <button class="btn btn-info" onclick="editProduct('${product.id}')">
                        UPDATE
                    </button>
                </p>
            </div>
        `;
    })
}

const getProducts = async () =>{
    products = await main.getProducts();
    renderProducts(products);
}

async function init(){
    await getProducts();
}
init();