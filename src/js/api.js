let producto = document.querySelector('#product');
let shoppingCart = [];
let totalPrice = 0;



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

//productos
function info(result){
    
    const productList = document.getElementById('product-list');
    const template = document.getElementById('product-template').content;

    result.forEach(product => {
        const clone = document.importNode(template, true);

        clone.querySelector('.product-image').src = "producto-raíces" //product.category.img; 
        clone.querySelector('.product-name').textContent = product.title;
        clone.querySelector('.product-code').textContent = `Código: ${product.category.id}`;
        clone.querySelector('.product-price').textContent = `Precio: $${product.price.toFixed(2)}`
        clone.querySelectorAll('.add-cart').forEach((boton)=>{
            boton.addEventListener('click', ()=>{
                addCart(product)
            })
        })
        
        
        productList.appendChild(clone)
    });
}

//carrito
function addCart(product){
    let cartCounter = document.querySelector('.cart-counter')
    let cartButton = document.querySelector('#cart-button')
    
    cartButton.textContent = shoppingCart.length >= 0 ? "Finalizar compra":"carrito Vacío"
    cartCounter.textContent = shoppingCart.length + 1
    shoppingCart.push(product)
    totalPrice += product.price
    console.log(shoppingCart[shoppingCart.length - 1])
    let ultimoElemento = shoppingCart[shoppingCart.length - 1]
    verCarrito(ultimoElemento)
  
}



//renderizar productos
 function verCarrito(contenido){
    let template = document.querySelector('#cart-template').content;
    let container = document.querySelector('.cart-container');
    let total = document.querySelector('#total');
    

    
            const clone = document.importNode(template, true);

            const img = clone.querySelector('#img-product')
            img.src = contenido.category.img;
            img.alt = "img-producto-raices"
            const parrafo = clone.querySelector('#p-product')
            parrafo.textContent = contenido.title
            const precio = clone.querySelector('#precio-producto')
            precio.textContent = `Precio: $${contenido.price.toFixed(2)}` 
            
            container.appendChild(clone) 
        total.textContent = `Total: ${totalPrice.toFixed(2)}`
 
    //total.textContent = `Total: ${}`
    
    
 }

