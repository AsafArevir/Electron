const { remote } = require('electron');
const main = remote.require('./main')
const productsList = document.getElementById('products');

let products = []
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
function renderProducts(products) {
    productsList.innerHTML='';
    products.forEach(product =>{
        productsList.innerHTML += `    
    <div class="container p-4">
            <div class="card text-center">
                <div class="card-body">
                    <a target="_blank">
                        <h3 class="card-title text-uppercase">
                            ${product.name}
                        </h3>
                    </a>
                    <p class="m-2">${product.description}</p>
                    <p class="text-muted">Price: ${product.price}</p>
                </div>
            </div>
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
