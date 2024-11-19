const toggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// carrousel
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    const updateCarousel = () => {
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    };

    const showNextImage = () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    };

    document.getElementById('prev-btn').addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
        updateCarousel();
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        showNextImage();
    });

    // Cambia automáticamente cada 3 segundos
    setInterval(showNextImage, 5000);

    // Inicializa el carrusel
    updateCarousel();
});


//categorias

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

//faq
document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach((question) => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });
});







