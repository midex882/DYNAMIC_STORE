//DOM PARA LISTA DE PRODUCTOS
const productos = document.getElementById("lista");
//DOM PARA MENU
const select_categoria = document.getElementById("categories_select");
const price = document.getElementById("range");
const price_legend = document.getElementById("price-legend");
const date_start = document.getElementById("date-start");
const date_end = document.getElementById("date-end");
const search = document.getElementById("search");
const previous_page = document.getElementById("previous");
const next_page = document.getElementById("next");
const loading = document.getElementById("loading");

//DOM PARA MODAL
const modal = document.querySelector(".modal");
const modal_close = document.querySelector(".modal-close");
const contenido_modal = document.querySelector(".modal-content");
const modal_buy_button = document.querySelector(".modal-buy-button");


//DOM PARA CARRITO
const cart_opener = document.querySelector(".cart-opener")
const cart_container = document.getElementById("cart-container");
const cart_menu_list = document.querySelector(".cart-items");
/* const cart_menu_list_children = document.querySelectorAll(".cart-item");*/
const close_cart = document.querySelector(".cart-close");
const empty_cart = document.getElementById("empty_cart");
const delete_cart_item = document.querySelectorAll(".cart-item-remove");
const cart_total = document.querySelector(".cart-total");
const checkout = document.getElementById("checkout");

//DOM ALERTAS
const alerta = document.querySelector(".alerta")
//-------------------------------

modal_buy_button.addEventListener('click',
    (evento) => {
      const id_producto = modal_buy_button.children[0].getAttribute("data-id");

      const buscado=lista.find(p=>p.id===id_producto);
      const check = cart_list.find(p=>p.id===id_producto);
      if(check == undefined)
      {
        const con_unidades = {...buscado, units:1};
        cart_list.push(con_unidades);
      }else{
        let unidades = check.units;
        unidades++;
        check.units = unidades; 
      }

      cart_menu_list.innerHTML = "";
      renderizar(cart_list, cart_menu_list,printCartItem);

      /* const nuevo_item_carrito=printCartItem(buscado);
      cart_menu_list.appendChild(nuevo_item_carrito); */
      localStorage.removeItem("cart");
      localStorage.setItem("cart",
                            JSON.stringify(cart_list));
      cart_price();

      popMessage("Producto añadido al carrito","success"); 
    });

    next_page.addEventListener("click",changePage);

    previous_page.addEventListener("click",changePage);
    
    function changePage(event){
      event.preventDefault();
      Start(event.target.href);
    }
    




empty_cart.addEventListener("click",
  ()=>{
    localStorage.removeItem("cart");
    cart_menu_list.innerHTML = "";
    cart_list = [];
    cart_price();
  }
);


cart_opener.addEventListener("click",
  ()=>{
    cart_container.classList.add("show");
  }
);
/* delete_cart_item.forEach(
  (button)=>{
    console.log("añadiendo...");
    button.addEventListener("click",
      (button)=>{
        id = button.parentElement.parentElement.parentElement.getAttribute("data-id");
        console.log(id);
        delete_product(id);
      }  
    );
  }
); */

checkout.addEventListener("click",
  ()=>{
    if(cart_list.length <= 0)
    {
      popMessage("Aún no has añadido ningún producto al carrito","danger"); 
    }else{
      popMessage("Muchas gracias por su compra","success");
      localStorage.removeItem("cart");
      cart_menu_list.innerHTML = "";
      cart_list = [];
      cart_price();
    }
  }
);

close_cart.addEventListener("click",
  ()=> {
    hide_cart(); 
  }
);

modal_close.addEventListener("click",
  () => {
    modal.classList.remove("modal-visible");
  });

price.addEventListener("change",
() => {
  let filter_price;
  let limit = price.value;
  //ACTUALIZAR EL LIMITE
  price_legend.innerText = "Precio máximo: " + limit+" €";

  //FILTRAR
  filter_price = lista.filter(item => item.price <= limit);

  //RENDERIZAR EL CONTENIDO
  if (filter_price.length == 0) {
    productos.innerHTML = `<h3 class='filter-error'>
                                        No hay elementos que coincidan con tu búsqueda
                                    </h3>`;
  } else {
    renderizar(filter_price, productos, imprimirProducto);
  }
});

date_start.addEventListener("change",
() => {
    date_filter(date_start.value, date_end.value);
});
date_end.addEventListener("change",
() => {
    date_filter(date_start.value, date_end.value);
});

search.addEventListener("keyup",
  () => {
    let filter;
    let search_keys = search.value.trim().toLowerCase();
    if (search_keys === "") {
      filter = [...lista];
    } else {
      filter = lista.filter(item => item.title.toLowerCase()
                                    .includes(search_keys));
    }

    if (filter.length === 0) {
      productos.innerHTML = `<h3 class='filter-error'>
                                          No hay elementos que coincidan con tu búsqueda
                                        </h3>`;
    } else {
      renderizar(filter, productos, imprimirProducto);
    }
  });

//-----------------------------------------

//FUNCIONES

//FUNCION PARA ESCONDER CARRITO
function hide_cart(){
  cart_container.classList.remove("show")
} 



//FUNCION PARA ELIMINAR PRODUCTO DEL CARRITO
function delete_product(id){
    const prod = cart_list.filter(p=> p.id == id);
    cart_list = cart_list.filter(p=> p.id != id);
    cart_menu_list.innerHTML = "";
    localStorage.removeItem("cart");
    localStorage.setItem("cart",
    JSON.stringify(cart_list));
    renderizar(cart_list, cart_menu_list,printCartItem);
    let cart_menu_list_children = document.querySelectorAll(".cart-item");
} 

//FUNCION PARA CARGAR UNIDADES ELEGIDAS
function selected_units()
{

}


//FUNCION PARA MOSTRAR BREVEMENTE EL CARRITO
function flashCart()
{
    setTimeout(() => {cart_container.classList.add("show")}, 1000);
    setTimeout(() => {cart_container.classList.remove("show")}, 2000);
    
}


//FUNCION PARA CALCULAR PRECIO DEL CARRITO
function cart_price()
{
  let total = 0;
  let cart_menu_list_children = document.querySelectorAll(".cart-item");
  if(cart_menu_list_children.length > 0)
  {
    cart_menu_list_children.forEach(
      (p)=>{
        let id = p.getAttribute("data-id");
        const element = cart_list.find(element=> element.id == id);
        let amount = parseInt(p.lastElementChild.lastElementChild.
        firstElementChild.nextElementSibling.
        nextElementSibling.value);
        total+=  (element.price * amount)/* .toFixed(2) */;
      }
    );
  }
 

  cart_total.innerText = `total : ${total.toFixed(2)} €`;
}



//FUNCION PARA AÑADIR UN CERO A LOS NÚMEROS MENORES DE 10

function add_zero(number){
    if(number<10)
    {
      number = "0" + number;
    }
    return number;
}



//GETTER DE FECHA DE HOY
function get_fecha_hoy(separador)
{
    let today = new Date();
    let hoy = today.getFullYear() + separador + (add_zero(today.getMonth()+1)) + separador + (add_zero(today.getDay()+1))  ;
    return hoy;
}





//FUNCION DE FORMATEO DE FECHA
function fecha_trans(fecha,separador)
{
    let fecha_split = fecha.split(separador);
    let fecha_nueva = fecha_split[2] + "/" + fecha_split[1] + "/" + fecha_split[0];
    /* let fecha_nueva = fecha.replaceAll(separador, "/"); */
    return fecha_nueva;
}





//FUNCION DE FILTRO POR FECHA
function date_filter(date_start, date_end)
{
    let filter;
    let start = Date.parse(date_start,"-");
    let end = Date.parse(date_end,"-");

    filter= lista.filter(item => Date.parse(item.fecha) >= start && Date.parse(item.fecha) <= end);

    if (filter == 0) {
      productos.innerHTML = `<h3 class='filter-error'>
                                No hay elementos que coincidan con tu búsqueda
                              </h3>`;
    } else {
      renderizar(filter, productos, imprimirProducto);
    }
}




//FUNCION DE CARGAR UN CONJUNTO
function renderizar(lista, contenedor_dom, creador_dom) {
    contenedor_dom.innerHTML = "";
  
    lista.forEach(
      (item) => {
        const product = creador_dom(item);
        contenedor_dom.appendChild(product);
      });
  }







//FUNCION DE IMPRIMIR UN PRODUCTO DE LA LISTA
function imprimirProducto(produc) {
    const producto = document.createElement("article");
    producto.innerHTML = `<article class="product" data-id="${produc.id}">
    <div class="product-img-container">
        <img class="modal-trigger" src="${produc.img}" alt="">
        <div class="cart-button-container">
            <img src="img/cart2.png" alt="">
        </div>   
    </div>
    <div class="container-lower-info">
        <div class="product-title-class">
            <span class="product-title">${produc.title}</span>
            <span class="product-class">${produc.category}</span>
        </div>

        <h3 class="product-price">${produc.price}€</h3>
    </div>              
</article> `;

  
    const modal_trigger = producto.querySelector(".modal-trigger");
    modal_trigger.addEventListener('click',
      (evento) => {
        const parent = evento.currentTarget.parentElement.parentElement;
        const id = parent.getAttribute("data-id");
  
        const chosen_game = lista.find(item => item.id === id);
        contenido_modal.children[0].innerHTML = chosen_game.video;
        contenido_modal.children[1].children[0].innerText = chosen_game.title;
        contenido_modal.children[1].children[1].innerText = chosen_game.category;
        contenido_modal.children[1].children[2].innerText =  fecha_trans(chosen_game.fecha, "/");
        contenido_modal.children[1].children[3].innerText =  chosen_game.price + "€";
        modal_buy_button.innerHTML = `<button class="cart-modal-button" data-id="${id}">
                                                    <img src="img/cart2.png" alt="">
                                                  </button>`; 

        
        

        modal.classList.add("modal-visible");
      });
  
  
    const cart = producto.querySelector(".cart-button-container");
    cart.addEventListener('click',
      (evento) => {
        const contenedor_padre = evento.currentTarget.parentElement.parentElement;
        const id_producto = contenedor_padre.getAttribute("data-id");
  
        const buscado=lista.find(p=>p.id===id_producto);
        const check = cart_list.find(p=>p.id===id_producto);
  
/*         cart_list.push(buscado);
        
        const nuevo_item_carrito=printCartItem(buscado);
        cart_menu_list.appendChild(nuevo_item_carrito); */

        if(check == undefined)
            {
              const con_unidades = {...buscado, units:1};
              cart_list.push(con_unidades);
            }else{
              let unidades = check.units;
              unidades++;
              check.units = unidades; 
            }

            cart_menu_list.innerHTML = "";
            renderizar(cart_list, cart_menu_list,printCartItem);

            /* const nuevo_item_carrito=printCartItem(buscado);
            cart_menu_list.appendChild(nuevo_item_carrito); */
            localStorage.removeItem("cart");
            localStorage.setItem("cart",
                                  JSON.stringify(cart_list));
            cart_price();

        cart_price();
  
        localStorage.setItem("cart",
                             JSON.stringify(cart_list));
                             

        popMessage("Producto añadido al carrito","success");
      });
  
    return producto;
  }












//FUNCION PARA CREAR ARTÍCULOS DEL CARRO
function printCartItem(data) {
  const new_item = document.createElement('article');
  new_item.classList.add('cart-item');
  new_item.setAttribute('data-id', data.id);
  new_item.innerHTML = `
  <img src="${data.image}"
            class="cart-item-img"
            alt="${data.title}"
          />  
          <div>
            <h4 class="cart-item-name">${data.title}</h4>
            <p class="cart-item-price">${data.price}</p>
            <div class="cart-item-controls">
              <button class="cart-item-remove">Eliminar <i class="fas fa-times"></i></button>
              <button class="plus-cart">+</button>
              <input class="product-quantity-display" min="0" value="${data.units}">
              <button class="minus-cart">-</button>
            </div>

          </div>`;
  new_item.lastElementChild.lastElementChild
  .firstElementChild.addEventListener("click",
    (evento)=>{
      id = evento.currentTarget.parentElement.parentElement.parentElement.getAttribute("data-id");
      delete_product(id);
      cart_price();
    }  
  );

  new_item.lastElementChild.lastElementChild.
    firstElementChild.nextElementSibling.addEventListener("click",
    (evento)=>{
      cantidad = parseInt(evento.currentTarget.nextElementSibling.value);
      cantidad += 1;
      evento.currentTarget.nextElementSibling.value = cantidad;
      id = evento.currentTarget.parentElement.parentElement.parentElement.getAttribute("data-id");
      const buscado = cart_list.find(p=>p.id == id);
      buscado.units = cantidad;
      localStorage.removeItem("cart");
      localStorage.setItem("cart",
      JSON.stringify(cart_list));
      cart_price();
    }  
  );

  new_item.lastElementChild.lastElementChild.
    firstElementChild.nextElementSibling.
    nextElementSibling.nextElementSibling.addEventListener("click",
    (evento)=>{
      cantidad = parseInt(evento.currentTarget.previousElementSibling.value);
      cantidad -= 1;
      evento.currentTarget.previousElementSibling.value = cantidad;
      if(evento.currentTarget.previousElementSibling.value <= 0)
      {
        id = evento.currentTarget.parentElement.parentElement.parentElement.getAttribute("data-id");
        delete_product(id);
      }else{
        id = evento.currentTarget.parentElement.parentElement.parentElement.getAttribute("data-id");
        const buscado = cart_list.find(p=>p.id == id);
        let cantidad = buscado.units;
        cantidad--;
        buscado.units = cantidad;
        localStorage.removeItem("cart");
        localStorage.setItem("cart",
        JSON.stringify(cart_list));
      }
      cart_price();
    }  
  );

  new_item.lastElementChild.lastElementChild.
  firstElementChild.nextElementSibling.
  nextElementSibling.addEventListener("change",
  (evento)=>{
    if(evento.currentTarget.value <= 0)
    {
      id = evento.currentTarget.parentElement.parentElement.parentElement.getAttribute("data-id");
      delete_product(id);
    }else{
      id = evento.currentTarget.parentElement.parentElement.parentElement.getAttribute("data-id");
      const buscado = cart_list.find(p=>p.id == id);
      let cantidad = buscado.units;
      cantidad--;
      buscado.units = cantidad;
      localStorage.removeItem("cart");
      localStorage.setItem("cart",
      JSON.stringify(cart_list));
    }
    cart_price();
  }  
);

  flashCart();
  
  return new_item;
}






//FUNCION DE MENSAJES
function popMessage(text, type)
{
  alerta.innerHTML = `<h3>${text}</h3>`;

  alerta.classList.add(type);
  setTimeout(() => {
    alerta.innerText = "";
    alerta.classList.remove(type);
  }, 1000);
}







//FUNCION DE INICIO
async function Start(url_api="list.php") {

    loading.style.display="block";
    const package = await fetch(url_api);
    const data = await package.json();

    lista = data["list"];

    console.log(data["next"]);

    if(data["next"] != "null")
    {
      console.log("eee");
      next_page.setAttribute("href","http://"+data["next"]);
      next_page.style.display = "block";
    }else{
      next_page.style.display = "none";
    }

    if(data["previous"] != "null")
    {
      previous_page.setAttribute("href","http://"+data["previous"]);
      previous_page.style.display = "block";
    }else{
      previous_page.style.display = "none";
    }



    renderizar(lista, productos, imprimirProducto);
    const categories_list = lista.map(item => item.category)
      .filter((c, i, array) =>
        array.indexOf(c) === i);
    select_categoria.innerHTML = `<option class="category-filter">all</option>`;
    categories_list.forEach(
      item => {
        select_categoria.innerHTML += `<option class="category-filter">${item}</option>`;
      });
    select_categoria.addEventListener("change",
      (event)=>{
        let filter;
            if (select_categoria.value.toLowerCase() === "all") {
              filter = [...lista];
            } else {
              filter= lista.filter(
                (item) => item.category.toLowerCase()
                  ===
                  select_categoria.value.toLowerCase())
            }
            renderizar(filter, productos, imprimirProducto);
      }
    )
    const max = Math.ceil(lista.map(item => item.price)
      .sort((a, b) => b - a)[0]);
    price.setAttribute("max", max);
    price.value = max;
    price_legend.innerText = "Precio máximo: " + max +" €";

    date_start.value = get_fecha_hoy("-");
    date_end.value = get_fecha_hoy("-");

    loading.style.display="none";


    /* cart_list = JSON.parse(localStorage.getItem("cart") ?? "[]"); */
    
}







//COMIENZO

let cart_list = JSON.parse(localStorage.getItem("cart") ?? "[]");
renderizar(cart_list, cart_menu_list,printCartItem);

cart_price();


Start();