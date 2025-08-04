// NAV: menú hamburguesa y navegación suave
document.getElementById("nav-toggle").addEventListener("click", () => {
  document.getElementById("nav-menu").classList.toggle("active");
});

// Navegación suave al hacer clic en los enlaces del menú
document.querySelectorAll('nav a[href^="#"]').forEach((enlace) => {
  enlace.addEventListener("click", (e) => {
    e.preventDefault();
    const destino = document.querySelector(enlace.getAttribute("href"));
    if (destino) {
      destino.scrollIntoView({ behavior: "smooth" });
    }
    // Cierra el menú en móviles después de hacer clic
    if (window.innerWidth < 768) {
      document.getElementById("nav-menu").classList.remove("active");
    }
  });
});

// LÍNEA DE TIEMPO: animación por scroll usando Intersection Observer
const eventos = document.querySelectorAll(".evento");

const observer = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visible");
      observer.unobserve(entrada.target); // deja de observar una vez que es visible
    }
  });
}, { threshold: 0.1 });

eventos.forEach((evento) => observer.observe(evento));

// MODAL: galería accesible con navegación por clic, teclado y swipe táctil

// Elementos del modal
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");

let currentImageIndex = 0;
let galleryImages = [];

// Variables para detectar deslizamiento táctil (swipe)
let startX = 0;
let endX = 0;

// Captura todas las imágenes de cada galería
document.querySelectorAll(".gallery").forEach((gallery) => {
  const images = Array.from(gallery.querySelectorAll("img"));

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      galleryImages = images;
      currentImageIndex = index;
      openModal(currentImageIndex);
    });
  });
});

// Abre el modal con la imagen correspondiente
function openModal(index) {
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("open");
  modalImg.src = galleryImages[index].src;
  modalImg.alt = galleryImages[index].alt;
  modal.style.display = "flex";
  modal.focus();
}

// Cierra el modal
function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  modal.classList.remove("open");
  modal.style.display = "none";
}

// Cierre del modal con el botón X
modalClose.addEventListener("click", closeModal);

// Botón siguiente imagen
modalNext.addEventListener("click", () => {
  if (currentImageIndex < galleryImages.length - 1) {
    currentImageIndex++;
    openModal(currentImageIndex);
  }
});

// Botón imagen anterior
modalPrev.addEventListener("click", () => {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    openModal(currentImageIndex);
  }
});

// Navegación con teclado: Escape, flecha izquierda y derecha
document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("open")) {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") modalNext.click();
    if (e.key === "ArrowLeft") modalPrev.click();
  }
});

// SWIPE TÁCTIL en dispositivos móviles para navegar imágenes

// Inicia el gesto táctil
modal.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

// Finaliza el gesto táctil y evalúa el desplazamiento
modal.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

// Evalúa si el gesto es lo suficientemente largo como para cambiar de imagen
function handleSwipe() {
  const swipeThreshold = 50; // distancia mínima en px para considerar swipe

  if (startX - endX > swipeThreshold) {
    // Deslizar a la izquierda → siguiente imagen
    if (currentImageIndex < galleryImages.length - 1) {
      currentImageIndex++;
      openModal(currentImageIndex);
    }
  } else if (endX - startX > swipeThreshold) {
    // Deslizar a la derecha → imagen anterior
    if (currentImageIndex > 0) {
      currentImageIndex--;
      openModal(currentImageIndex);
    }
  }
}

// Cambia la apariencia de la navegación al hacer scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.sticky-nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});
