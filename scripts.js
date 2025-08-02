// NAV: menú hamburguesa y navegación suave
document.getElementById("nav-toggle").addEventListener("click", () => {
  document.getElementById("nav-menu").classList.toggle("active");
});

document.querySelectorAll('nav a[href^="#"]').forEach((enlace) => {
  enlace.addEventListener("click", (e) => {
    e.preventDefault();
    const destino = document.querySelector(enlace.getAttribute("href"));
    if (destino) {
      destino.scrollIntoView({ behavior: "smooth" });
    }
    if (window.innerWidth < 768) {
      document.getElementById("nav-menu").classList.remove("active");
    }
  });
});

// LÍNEA DE TIEMPO: animación por scroll
const eventos = document.querySelectorAll(".evento");

const observer = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visible");
      observer.unobserve(entrada.target);
    }
  });
}, { threshold: 0.1 });

eventos.forEach((evento) => observer.observe(evento));

// MODAL: galería accesible
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");

let currentImageIndex = 0;
let galleryImages = [];

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

function openModal(index) {
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("open");
  modalImg.src = galleryImages[index].src;
  modalImg.alt = galleryImages[index].alt;
  modal.style.display = "flex";
  modal.focus();
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  modal.classList.remove("open");
  modal.style.display = "none";
}

modalClose.addEventListener("click", closeModal);

modalNext.addEventListener("click", () => {
  if (currentImageIndex < galleryImages.length - 1) {
    currentImageIndex++;
    openModal(currentImageIndex);
  }
});

modalPrev.addEventListener("click", () => {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    openModal(currentImageIndex);
  }
});

document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("open")) {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") modalNext.click();
    if (e.key === "ArrowLeft") modalPrev.click();
  }
});


window.addEventListener('scroll', () => {
  const nav = document.querySelector('.sticky-nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});