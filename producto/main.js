//categorias carrousel
const categoriesTrack = document.querySelector('.categories-track');
const prevBtn1 = document.getElementById('categories-prev-btn');
const nextBtn2 = document.getElementById('categories-next-btn');

const categories = Array.from(categoriesTrack.children);
const itemsToShow = 3; // Número de categorías visibles a la vez
const categoryWidth = 150; // Ancho de cada categoría incluyendo el margen
const gap = 16; // Espacio entre las categorías

// Duplicamos las categorías para hacer un carrusel infinito
categories.forEach(item => {
    const clone = item.cloneNode(true);
    categoriesTrack.appendChild(clone);
});

let currentIndex = 0;

function updateCarousel(newIndex) {
    const maxIndex = categories.length; // Número total de categorías
    currentIndex = Math.max(0, Math.min(newIndex, maxIndex));
    const offset = -(currentIndex * (categoryWidth + gap));
    categoriesTrack.style.transform = `translateX(${offset}px)`;

    // Si llegamos al final del carrusel, volvemos al principio
    if (currentIndex === maxIndex) {
        setTimeout(() => {
            categoriesTrack.style.transition = 'none'; // Desactivamos la transición temporalmente
            categoriesTrack.style.transform = `translateX(0)`; // Volvemos al principio
            currentIndex = 0;
        }, 500); // Después de que la transición se haya completado
    }

    // Restauramos la transición para el próximo desplazamiento
    setTimeout(() => {
        categoriesTrack.style.transition = 'transform 0.5s ease-in-out';
    }, 100);
}

prevBtn1.addEventListener('click', () => {
    updateCarousel(currentIndex - 1);
});

nextBtn2.addEventListener('click', () => {
    updateCarousel(currentIndex + 1);
});

//categorias

document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll('.categories-item');
    const products = document.querySelectorAll('.producto');

    categories.forEach(category => {
        category.addEventListener('click', () => {
            const selectedCategory = category.getAttribute('data-category');

            products.forEach(product => {
                if (product.getAttribute('data-category') === selectedCategory || selectedCategory === "all") {
                    product.style.display = "block"; // Muestra productos de la categoría seleccionada
                } else {
                    product.style.display = "none"; // Oculta los demás productos
                }
            });
        });
    });
});

//menu desplegable
const toggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

//carrito
document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.querySelector("#cart-button");
    const cartModal = document.querySelector(".cart-modal");
    const cartContent = document.querySelector("#cart-items");
    const closeCartButton = document.querySelector("#close-cart");
    const cartCount = document.querySelector("#cart-count"); // Referencia al contador
    const openPaymentModalButton = document.querySelector("#open-payment-modal");
    const paymentModal = document.querySelector("#payment-modal");
    const closePaymentModalButton = document.querySelector("#close-payment-modal");
    const paymentForm = document.querySelector("#payment-form");

    let cart = [];

    // Abrir el carrito
    cartButton.addEventListener("click", () => {
        cartModal.style.display = "flex";
        updateCart();
    });

    // Cerrar el carrito
    closeCartButton.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    // Añadir productos al carrito
    document.querySelectorAll(".producto button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const producto = e.target.closest(".producto");
            const productoInfo = {
                name: producto.querySelector("h3").textContent,
                description: producto.querySelector("p").textContent,
                img: producto.querySelector("img").src,
            };
            cart.push(productoInfo);
            updateCart();
        });
    });

    // Actualizar la visualización del carrito
    function updateCart() {
        cartContent.innerHTML = "";

        if (cart.length === 0) {
            cartContent.innerHTML = "<li>El carrito está vacío.</li>";
            openPaymentModalButton.style.display = "none"; // Ocultar botón de pago si el carrito está vacío
        } else {
            cart.forEach((item, index) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <div>
                        <img src="${item.img}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
                        <strong>${item.name}</strong>
                        <p>${item.description}</p>
                        <button class="remove-item" data-index="${index}">Retirar</button>
                    </div>
                `;
                cartContent.appendChild(li);
            });

            openPaymentModalButton.style.display = "block"; // Mostrar botón de pago si hay productos
        }

        // Añadir eventos de eliminar producto
        document.querySelectorAll(".remove-item").forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                cart.splice(index, 1);
                updateCart();
            });
        });

        // Actualizar contador del carrito
        cartCount.textContent = cart.length;
    }

    // Abrir el modal de pago desde el modal del carrito
    openPaymentModalButton.addEventListener("click", () => {
        cartModal.style.display = "none"; // Cerrar modal del carrito
        paymentModal.style.display = "flex"; // Abrir modal de pago
    });

    // Cerrar el modal de pago
    closePaymentModalButton.addEventListener("click", () => {
        paymentModal.style.display = "none";
    });

    // Cerrar modales al hacer clic fuera
    window.addEventListener("click", (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        } else if (event.target === paymentModal) {
            paymentModal.style.display = "none";
        }
    });

    // Confirmar pago
    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("¡Pago realizado con éxito!"); // Confirmación simple
        cart = []; // Vaciar carrito después del pago
        updateCart();
        paymentModal.style.display = "none"; // Cerrar modal de pago
    });
});

// Mostrar y ocultar el fondo oscuro junto con los modales
openPaymentModalButton.addEventListener("click", () => {
    cartModal.style.display = "none"; // Cerrar modal del carrito
    paymentModal.classList.add("show"); // Abrir modal de pago
    document.getElementById("modal-backdrop").classList.add("show"); // Mostrar backdrop
});

closePaymentModalButton.addEventListener("click", () => {
    paymentModal.classList.remove("show");
    document.getElementById("modal-backdrop").classList.remove("show");
});





