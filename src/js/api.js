let producto = document.querySelector('#product')
let shoppingCart = []
let button;
let dato;

async function productos(){
    try{
        const response = await fetch('https://api.escuelajs.co/api/v1/products')
        const result = await response.json()
        console.log(result)
        result.forEach(element => {
            console.log(element.category.img)
        });
        info(result)
        

    }catch (error){
        console.error(error);

    }
};

producto.addEventListener('click', productos())

function info(result){
    
    const productList = document.getElementById('product-list');
    const template = document.getElementById('product-template').content;

    result.forEach(product => {
        const clone = document.importNode(template, true);

        clone.querySelector('.product-image').src = product.category.img; 
        clone.querySelector('.product-name').textContent = product.title;
        clone.querySelector('.product-code').textContent = `Código: ${product.category.id}`;
        clone.querySelector('.product-price').textContent = `Precio: $${product.price.toFixed(2)}`
        button = clone.querySelector('.add-cart');
        
        button.addEventListener('click',()=>{dato.textContent = product})
        productList.appendChild(clone)
    });
}
button.addEventListener('click', 
    addCart(dato))
function addCart(dato){
  shoppingCart.push(dato)
  console.log(`hola soy el cart: ${shoppingCart.length}`)
}
