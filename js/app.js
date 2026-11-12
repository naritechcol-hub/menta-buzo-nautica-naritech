/* =========================================================
   MENTA SHOP — Landing Page JS
   ========================================================= */

const COLORS = [
  { name: 'Amarillo Claro', hex: '#f5e6a3', img: 'img/amarillo-claro.jpg' },
  { name: 'Azul Oscuro', hex: '#1a3a5c', img: 'img/azul-oscuro.jpg' },
  { name: 'Blanco', hex: '#f5f5f0', img: 'img/blanco.jpg' },
  { name: 'Gris Niebla', hex: '#b0b0b0', img: 'img/gris-niebla.jpg' },
  { name: 'Naranja', hex: '#e67e22', img: 'img/naranja.jpg' },
  { name: 'Rojo Intenso', hex: '#c0392b', img: 'img/rojo-intenso.jpg' },
  { name: 'Verde Militar', hex: '#4a5d23', img: 'img/verde-militar.jpg' },
  { name: 'Verde Navidad', hex: '#1b5e20', img: 'img/verde-navidad.jpg' },
  { name: 'Verde Oliva', hex: '#556b2f', img: 'img/verde-oliva.jpg' },
];

const PRICE_SINGLE = 159900;
const PRICE_MULTI = 139000;

// Gallery images for the auto-sliding carousel (hoodies & models)
const CAROUSEL_IMAGES = [
  { src: 'img/amarillo-claro.jpg', label: 'Amarillo Claro' },
  { src: 'img/azul-oscuro.jpg', label: 'Azul Oscuro' },
  { src: 'img/blanco.jpg', label: 'Blanco' },
  { src: 'img/gris-niebla.jpg', label: 'Gris Niebla' },
  { src: 'img/naranja.jpg', label: 'Naranja' },
  { src: 'img/rojo-intenso.jpg', label: 'Rojo Intenso' },
  { src: 'img/verde-militar.jpg', label: 'Verde Militar' },
  { src: 'img/verde-navidad.jpg', label: 'Verde Navidad' },
  { src: 'img/verde-oliva.jpg', label: 'Verde Oliva' },
];

// Instagram shipping proof images
const IG_IMAGES = [
  { src: 'img/envio-1.jpg', caption: 'Envío realizado' },
  { src: 'img/envio-2.jpg', caption: 'Cliente satisfecho' },
  { src: 'img/envio-3.jpg', caption: 'Pedido entregado' },
  { src: 'img/envio-4.jpg', caption: 'Envío exitoso' },
  { src: 'img/envio-5.jpg', caption: 'Cliente feliz' },
  { src: 'img/envio-6.jpg', caption: 'Entrega realizada' },
  { src: 'img/envio-7.jpg', caption: 'Envío rápido' },
  { src: 'img/envio-8.jpg', caption: 'Pedido confirmado' },
  { src: 'img/envio-9.jpg', caption: 'Entrega exitosa' },
  { src: 'img/envio-10.jpg', caption: 'Cliente contento' },
  { src: 'img/envio-11.jpg', caption: 'Envío seguro' },
  { src: 'img/envio-12.jpg', caption: 'Pedido entregado' },
  { src: 'img/envio-13.jpg', caption: 'Envío a domicilio' },
  { src: 'img/envio-14.jpg', caption: 'Cliente satisfecho' },
  { src: 'img/envio-15.jpg', caption: 'Entrega realizada' },
  { src: 'img/envio-16.jpg', caption: 'Envío exitoso' },
];

// Customer reviews
const REVIEWS = [
  { name: 'María G.', location: 'Bogotá', text: 'El buso es hermoso, la tela es súper suave y el envío llegó muy rápido. 100% recomendado.', stars: 5 },
  { name: 'Carlos R.', location: 'Medellín', text: 'Excelente calidad, el corte oversize queda perfecto. El pago contra entrega me dio mucha confianza.', stars: 5 },
  { name: 'Laura P.', location: 'Cali', text: 'Compré 2 busos y me salió mucho más económico. La atención por WhatsApp fue inmediata. Volveré a comprar.', stars: 5 },
  { name: 'Andrés M.', location: 'Pasto', text: 'Muy buena calidad, el color es exactamente como en las fotos. Envío gratis y rápido.', stars: 5 },
  { name: 'Sofía T.', location: 'Barranquilla', text: 'El buso es súper cómodo y el material es de primera. Llegó en perfectas condiciones.', stars: 5 },
  { name: 'Diego L.', location: 'Bucaramanga', text: 'Me encantó el buso, la talla L me quedó perfecta. El servicio fue excelente.', stars: 5 },
];

let selectedColor = COLORS[5]; // Rojo Intenso (main product image)
let selectedSize = 'L';
let qty = 1;

const mainImage = document.getElementById('mainImage');
const colorName = document.getElementById('colorName');
const colorOptions = document.getElementById('colorOptions');
const sizeOptions = document.getElementById('sizeOptions');
const qtyInput = document.getElementById('qtyInput');
const qtyHint = document.getElementById('qtyHint');
const priceDisplay = document.getElementById('priceDisplay');
const summaryColor = document.getElementById('summaryColor');
const summarySize = document.getElementById('summarySize');
const summaryQty = document.getElementById('summaryQty');
const summaryUnitPrice = document.getElementById('summaryUnitPrice');
const summaryTotal = document.getElementById('summaryTotal');

const galleryThumbs = document.getElementById('galleryThumbs');
const galleryImages = [
  'img/amarillo-claro.jpg', 'img/azul-oscuro.jpg', 'img/blanco.jpg',
  'img/gris-niebla.jpg', 'img/naranja.jpg', 'img/rojo-intenso.jpg',
  'img/verde-militar.jpg', 'img/verde-navidad.jpg', 'img/verde-oliva.jpg',
];

function formatMoney(n) {
  return '$' + n.toLocaleString('es-CO');
}

function updatePrice() {
  const unitPrice = qty >= 2 ? PRICE_MULTI : PRICE_SINGLE;
  const total = unitPrice * qty;
  priceDisplay.textContent = formatMoney(total);
  summaryUnitPrice.textContent = formatMoney(unitPrice);
  summaryTotal.textContent = formatMoney(total);
  summaryQty.textContent = qty;
  if (qty >= 2) {
    qtyHint.textContent = `Precio por unidad: ${formatMoney(PRICE_MULTI)} (ahorro ${formatMoney(PRICE_SINGLE - PRICE_MULTI)} por unidad)`;
  } else {
    qtyHint.textContent = 'Compra 2 o más y paga $139.000 c/u';
  }
}

function renderColors() {
  colorOptions.innerHTML = COLORS.map((c, i) => `
    <button class="color-btn ${i === 5 ? 'active' : ''}" data-color="${c.name}" style="background-image: url('${c.img}'); background-color: ${c.hex};" title="${c.name}">
      <span class="color-tooltip">${c.name}</span>
    </button>
  `).join('');

  colorOptions.querySelectorAll('.color-btn').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      colorOptions.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedColor = COLORS[i];
      colorName.textContent = selectedColor.name;
      summaryColor.textContent = selectedColor.name;
      mainImage.src = selectedColor.img;
      mainImage.alt = `Buzo Náutica Algodón Polar Mujer - ${selectedColor.name}`;
    });
  });
}

function renderGallery() {
  galleryThumbs.innerHTML = galleryImages.map((src, i) => `
    <img src="${src}" alt="Vista ${i + 1}" class="${i === 0 ? 'active' : ''}" data-src="${src}">
  `).join('');

  galleryThumbs.querySelectorAll('img').forEach((img) => {
    img.addEventListener('click', () => {
      galleryThumbs.querySelectorAll('img').forEach(i => i.classList.remove('active'));
      img.classList.add('active');
      mainImage.src = img.dataset.src;
    });
  });
}

function renderSizes() {
  sizeOptions.querySelectorAll('.size-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      sizeOptions.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.dataset.size;
      summarySize.textContent = selectedSize;
    });
  });
}

// Quantity
document.getElementById('qtyMinus').addEventListener('click', () => {
  if (qty > 1) { qty--; qtyInput.value = qty; updatePrice(); }
});
document.getElementById('qtyPlus').addEventListener('click', () => {
  if (qty < 10) { qty++; qtyInput.value = qty; updatePrice(); }
});

// Order button scroll
document.getElementById('orderBtn').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('pedido').scrollIntoView({ behavior: 'smooth' });
});

// Credit modal
const creditModal = document.getElementById('creditModal');
const creditBtn = document.getElementById('creditBtn');
const creditClose = document.getElementById('creditClose');
const creditForm = document.getElementById('creditForm');

creditBtn.addEventListener('click', () => { creditModal.hidden = false; document.body.style.overflow = 'hidden'; });
creditClose.addEventListener('click', () => { creditModal.hidden = true; document.body.style.overflow = ''; });
creditModal.addEventListener('click', (e) => { if (e.target === creditModal) { creditModal.hidden = true; document.body.style.overflow = ''; } });

creditForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cName').value;
  const phone = document.getElementById('cPhone').value;
  const email = document.getElementById('cEmail').value;
  const city = document.getElementById('cCity').value;
  const amount = document.getElementById('cAmount').value;
  const msg = `Hola, quiero solicitar crédito para comprar el Buzo Náutica Algodón Polar Mujer.\n\nNombre: ${name}\nTeléfono: ${phone}\nCorreo: ${email}\nCiudad: ${city}\nMonto solicitado: ${amount}\n\nQuedo atento/a. ¡Gracias!`;
  const url = 'https://wa.me/573118863168?text=' + encodeURIComponent(msg);
  window.open(url, '_blank');
  creditModal.hidden = true;
  document.body.style.overflow = '';
});

// Order form
const orderForm = document.getElementById('orderForm');
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('oName').value.trim();
  const phone = document.getElementById('oPhone').value.trim();
  const email = document.getElementById('oEmail').value.trim();
  const address = document.getElementById('oAddress').value.trim();
  const addressExtra = document.getElementById('oAddressExtra').value.trim();
  const city = document.getElementById('oCity').value.trim();
  const dept = document.getElementById('oDept').value.trim();
  const notes = document.getElementById('oNotes').value.trim();

  if (!name || !phone || !address || !city || !dept) {
    alert('Por favor completa los campos obligatorios.');
    return;
  }

  const unitPrice = qty >= 2 ? PRICE_MULTI : PRICE_SINGLE;
  const total = unitPrice * qty;
  const color = selectedColor.name;
  const size = selectedSize;

  let msg = `Hola, quiero hacer un pedido:\n\n`;
  msg += `Producto: Buzo Náutica Algodón Polar Mujer\n`;
  msg += `Color: ${color}\n`;
  msg += `Talla: ${size}\n`;
  msg += `Cantidad: ${qty}\n`;
  msg += `Precio unitario: ${formatMoney(unitPrice)}\n`;
  msg += `Total: ${formatMoney(total)}\n\n`;
  msg += `--- Datos de envío ---\n`;
  msg += `Nombre: ${name}\n`;
  msg += `Teléfono: ${phone}\n`;
  if (email) msg += `Correo: ${email}\n`;
  msg += `Dirección: ${address}\n`;
  if (addressExtra) msg += `Info adicional: ${addressExtra}\n`;
  msg += `Ciudad: ${city}\n`;
  msg += `Departamento: ${dept}\n`;
  if (notes) msg += `Notas: ${notes}\n`;
  msg += `\nMétodo de pago: Contra entrega\n`;
  msg += `Envío: Gratis\n`;
  msg += `\n¡Gracias!`;

  const url = 'https://wa.me/573118863168?text=' + encodeURIComponent(msg);
  window.open(url, '_blank');
});

// ---- Auto-sliding Carousel (Hoodies & Models) ----
function initHoodieCarousel() {
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  if (!track) return;

  track.innerHTML = CAROUSEL_IMAGES.map(img => `
    <div class="carousel-slide">
      <img src="${img.src}" alt="${img.label}" loading="lazy">
      <div class="slide-label">${img.label}</div>
    </div>
  `).join('');

  const slides = track.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;
  const visibleCount = Math.floor(track.parentElement.offsetWidth / 300) || 3;
  let currentIndex = 0;
  const maxIndex = Math.max(0, totalSlides - visibleCount);

  // Create dots
  const dotCount = Math.ceil(totalSlides / visibleCount);
  dotsContainer.innerHTML = Array.from({ length: dotCount }, (_, i) =>
    `<span class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
  ).join('');

  function updateCarousel() {
    const slideWidth = slides[0].offsetWidth + 16;
    const offset = currentIndex * slideWidth * visibleCount;
    track.style.transform = `translateX(-${offset}px)`;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === Math.floor(currentIndex / (1 / dotCount)));
    });
  }

  // Auto-advance
  let autoTimer = setInterval(() => {
    currentIndex = (currentIndex + 1) % (maxIndex + 1);
    if (currentIndex > maxIndex) currentIndex = 0;
    updateCarousel();
  }, 3000);

  // Dot clicks
  dotsContainer.querySelectorAll('.carousel-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      clearInterval(autoTimer);
      currentIndex = parseInt(dot.dataset.index);
      updateCarousel();
      autoTimer = setInterval(() => {
        currentIndex = (currentIndex + 1) % (maxIndex + 1);
        if (currentIndex > maxIndex) currentIndex = 0;
        updateCarousel();
      }, 3000);
    });
  });

  // Pause on hover
  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.parentElement.addEventListener('mouseleave', () => {
    autoTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % (maxIndex + 1);
      if (currentIndex > maxIndex) currentIndex = 0;
      updateCarousel();
    }, 3000);
  });
}

// ---- Instagram Shipping Carousel ----
function initIgCarousel() {
  const track = document.getElementById('igTrack');
  const dotsContainer = document.getElementById('igDots');
  if (!track) return;

  track.innerHTML = IG_IMAGES.map(img => `
    <div class="ig-slide">
      <img src="${img.src}" alt="${img.caption}" loading="lazy">
      <div class="ig-caption">${img.caption}</div>
    </div>
  `).join('');

  const slides = track.querySelectorAll('.ig-slide');
  const totalSlides = slides.length;
  const visibleCount = Math.floor(track.parentElement.offsetWidth / 220) || 3;
  let currentIndex = 0;
  const maxIndex = Math.max(0, totalSlides - visibleCount);

  const dotCount = Math.ceil(totalSlides / visibleCount);
  dotsContainer.innerHTML = Array.from({ length: dotCount }, (_, i) =>
    `<span class="ig-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
  ).join('');

  function updateIg() {
    const slideWidth = slides[0].offsetWidth + 16;
    const offset = currentIndex * slideWidth * visibleCount;
    track.style.transform = `translateX(-${offset}px)`;
  }

  let autoTimer = setInterval(() => {
    currentIndex = (currentIndex + 1) % (maxIndex + 1);
    if (currentIndex > maxIndex) currentIndex = 0;
    updateIg();
  }, 2500);

  dotsContainer.querySelectorAll('.ig-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      clearInterval(autoTimer);
      currentIndex = parseInt(dot.dataset.index);
      updateIg();
      autoTimer = setInterval(() => {
        currentIndex = (currentIndex + 1) % (maxIndex + 1);
        if (currentIndex > maxIndex) currentIndex = 0;
        updateIg();
      }, 2500);
    });
  });

  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.parentElement.addEventListener('mouseleave', () => {
    autoTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % (maxIndex + 1);
      if (currentIndex > maxIndex) currentIndex = 0;
      updateIg();
    }, 2500);
  });
}

// ---- Customer Reviews ----
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;
  grid.innerHTML = REVIEWS.map(r => `
    <div class="review-card">
      <div class="review-stars">${'★'.repeat(r.stars)}</div>
      <p class="review-text">"${r.text}"</p>
      <p class="review-author">${r.name}</p>
      <p class="review-location">${r.location}</p>
    </div>
  `).join('');
}

// ---- Mobile Nav ----
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    const isOpen = !mobileNav.hidden;
    mobileNav.hidden = isOpen;
    burger.classList.toggle('active', !isOpen);
    burger.setAttribute('aria-expanded', String(!isOpen));
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.hidden = true;
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}
// ---- Swipe/Touch for Carousels ----
function addSwipe(container, onSwipeLeft, onSwipeRight) {
  let startX = 0;
  let startY = 0;
  let isDragging = false;

  container.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startX - endX;
    const diffY = startY - endY;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) onSwipeLeft();
      else onSwipeRight();
    }
  }, { passive: true });
}

const hoodieCarousel = document.getElementById('hoodieCarousel');
if (hoodieCarousel) {
  addSwipe(hoodieCarousel, () => {
    const dots = document.querySelectorAll('.carousel-dot');
    const activeDot = document.querySelector('.carousel-dot.active');
    const idx = Array.from(dots).indexOf(activeDot);
    if (idx < dots.length - 1) dots[idx + 1].click();
    else dots[0].click();
  }, () => {
    const dots = document.querySelectorAll('.carousel-dot');
    const activeDot = document.querySelector('.carousel-dot.active');
    const idx = Array.from(dots).indexOf(activeDot);
    if (idx > 0) dots[idx - 1].click();
    else dots[dots.length - 1].click();
  });
}

const igCarousel = document.getElementById('igCarousel');
if (igCarousel) {
  addSwipe(igCarousel, () => {
    const dots = document.querySelectorAll('.ig-dot');
    const activeDot = document.querySelector('.ig-dot.active');
    const idx = Array.from(dots).indexOf(activeDot);
    if (idx < dots.length - 1) dots[idx + 1].click();
    else dots[0].click();
  }, () => {
    const dots = document.querySelectorAll('.ig-dot');
    const activeDot = document.querySelector('.ig-dot.active');
    const idx = Array.from(dots).indexOf(activeDot);
    if (idx > 0) dots[idx - 1].click();
    else dots[dots.length - 1].click();
  });
}

renderColors();
renderGallery();
renderSizes();
updatePrice();
renderReviews();
setTimeout(() => {
  initHoodieCarousel();
  initIgCarousel();
}, 100);
