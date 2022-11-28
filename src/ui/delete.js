const { remote } = require('electron');
const main = remote.require('./main')
const productsList = document.getElementById('products');

let products = []

async function deleteProduct(id){
    const response = confirm('Are you sure you want to delete this product?')
    if (response){
        await main.deleteProduct(id)
        await getProducts();
    }
    return;
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