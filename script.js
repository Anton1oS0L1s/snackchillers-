const snacks = [
    { id: 1, nombre: "Classic Apple", tipo: "dulce", precio: 35, descripcion: "Manzana forrada sabor chamoy, acompañada de chamoy de la casa." },
    { id: 2, nombre: "Gummy Chill", tipo: "dulce", precio: 30, descripcion: "Gomitas variadas, ahogadas en el chamoy de la casa y chile en polvo." },
    { id: 3, nombre: "Apple Crazy", tipo: "dulce", precio: 85, descripcion: "Manzana forrada sabor chamoy, gomitas enchiladas y tarrito de chamoy." },
    { id: 4, nombre: "Tarrito de Chamoy", tipo: "extra", precio: 25, descripcion: "Tarrito de chamoy para acompañar tus snacks." },
  ];
  
  const snackList = document.getElementById("snack-list");
  const categoryFilter = document.getElementById("category-filter");
  const searchInput = document.getElementById("search-input");
  
  const cartButton = document.getElementById("cart-button");
  const cartPanel = document.getElementById("cart-panel");
  const closeCart = document.getElementById("close-cart");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  
  let carrito = [];
  
  // Mostrar snacks
  function mostrarSnacks(lista) {
    snackList.innerHTML = "";
    lista.forEach(snack => {
      const card = document.createElement("div");
      card.className = "snack-card";
      card.innerHTML = `
        <h3>${snack.nombre}</h3>
        <p>${snack.descripcion}</p>
        <p>Precio: $${snack.precio}</p>
        <button onclick="agregarAlCarrito(${snack.id})">Agregar al carrito</button>
      `;
      snackList.appendChild(card);
    });
  }
  
  // Filtrar snacks
  function filtrarSnacks() {
    const tipo = categoryFilter.value;
    const search = searchInput.value.toLowerCase();
    const filtrados = snacks.filter(s =>
      (tipo === "" || s.tipo === tipo) &&
      s.nombre.toLowerCase().includes(search)
    );
    mostrarSnacks(filtrados);
  }
  
  // Carrito
  function agregarAlCarrito(id) {
    const snack = snacks.find(s => s.id === id);
    carrito.push(snack);
    actualizarCarrito();
  }
  
  function actualizarCarrito() {
    cartItems.innerHTML = "";
    let total = 0;
    carrito.forEach((item, i) => {
      total += item.precio;
      const div = document.createElement("div");
      div.innerHTML = `${item.nombre} - $${item.precio} <button onclick="eliminarDelCarrito(${i})">❌</button>`;
      cartItems.appendChild(div);
    });
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = carrito.length;
  }
  
  function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
  }
  
  // Eventos
  categoryFilter.addEventListener("change", filtrarSnacks);
  searchInput.addEventListener("input", filtrarSnacks);
  
  cartButton.addEventListener("click", () => {
    cartPanel.style.display = "block";
  });
  
  closeCart.addEventListener("click", () => {
    cartPanel.style.display = "none";
  });
  
  // Iniciar
  mostrarSnacks(snacks);
  