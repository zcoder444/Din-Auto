// 1. Initialize Lucide Icons
lucide.createIcons();

// 2. Initialize Lenis Smooth Scroll
let lenis;

try {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
} catch (e) {
  console.warn("Lenis failed to load, falling back to native scroll.", e);
}

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && lenis) {
  gsap.registerPlugin(ScrollTrigger);

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0, 0);
}


// 3. Smooth Scroll Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      if (lenis) {
        lenis.scrollTo(targetElement, {
          offset: -80,
          duration: 1.2,
        });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// 4. Hero Car Slider
const heroCars = [
  {
    title: 'Porsche 911 GT3 RS',
    tag: 'FEATURED HYPERCAR',
    price: '$224,500',
    img: 'https://pngimg.com/uploads/porsche/porsche_PNG10622.png',
    bg: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1920&q=80',
    tagline: '// Premier Automotive Superstore & Atelier',
    headlineMain: 'Uncompromising',
    headlineSub: 'Power & Precision.',
    description: 'Buy luxury supercars, rent high-performance vehicles for the track, or upgrade your machine with authentic aerospace-grade OEM spare parts.'
  },
  {
    title: 'Ferrari F8 Tributo',
    tag: 'ITALIAN PERFORMANCE',
    price: '$280,000',
    img: 'https://pngimg.com/uploads/ferrari/ferrari_PNG10678.png',
    bg: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1920&q=80',
    tagline: '// Italian Engineering, Pure Emotion',
    headlineMain: 'Relentless',
    headlineSub: 'Speed & Elegance.',
    description: 'Twin-turbo V8 dominance wrapped in iconic Italian design — engineered for uncompromising track performance and everyday theatre.'
  },
  {
    title: 'Audi R8 V10 Performance',
    tag: 'SUPERCAR CLASS',
    price: '$158,600',
    img: 'https://pngimg.com/uploads/audi/audi_PNG1737.png',
    bg: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=80',
    tagline: '// German Precision, Quattro Dominance',
    headlineMain: 'Engineered',
    headlineSub: 'For Perfection.',
    description: 'A naturally-aspirated V10 heart wrapped in Quattro all-wheel-drive confidence — precision engineering at every single corner.'
  },
  {
    title: 'Toyota Supra GR',
    tag: 'SPORT COUPE',
    price: '$58,500',
    img: 'https://pngimg.com/uploads/toyota/toyota_PNG1916.png',
    bg: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1920&q=80',
    tagline: '// Legendary Heritage, Reborn',
    headlineMain: 'Pure',
    headlineSub: 'Driving Emotion.',
    description: 'The iconic Supra returns with turbocharged inline-six power and razor-sharp handling built for true enthusiasts.'
  }
];

let currentCarIndex = 0;
const carImgEl = document.getElementById('hero-car-img');
const carTitleEl = document.getElementById('hero-car-title');
const carTagEl = document.getElementById('hero-car-tag');
const carPriceEl = document.getElementById('hero-car-price');

// Left-column text block (tagline, headline, description)
const heroTextBlock = document.getElementById('hero-text-block');
const heroTaglineEl = document.getElementById('hero-tagline');
const heroHeadlineMainEl = document.getElementById('hero-headline-main');
const heroHeadlineSubEl = document.getElementById('hero-headline-sub');
const heroDescriptionEl = document.getElementById('hero-description');

// Hero background crossfade layers (two stacked divs, alternately faded in/out)
const heroBgA = document.getElementById('hero-bg-a');
const heroBgB = document.getElementById('hero-bg-b');
let heroBgShowingA = true;

function updateHeroBackground(bgUrl) {
  if (!heroBgA || !heroBgB || !bgUrl) return;

  const incoming = heroBgShowingA ? heroBgB : heroBgA;
  const outgoing = heroBgShowingA ? heroBgA : heroBgB;

  incoming.style.backgroundImage = `url('${bgUrl}')`;
  incoming.style.opacity = '1';
  outgoing.style.opacity = '0';

  heroBgShowingA = !heroBgShowingA;
}

function updateHeroText(car) {
  if (heroTaglineEl) heroTaglineEl.innerText = car.tagline;
  if (heroHeadlineMainEl) heroHeadlineMainEl.innerText = car.headlineMain;
  if (heroHeadlineSubEl) heroHeadlineSubEl.innerText = car.headlineSub;
  if (heroDescriptionEl) heroDescriptionEl.innerText = car.description;
}

if (carImgEl) {
  setInterval(() => {
    carImgEl.style.transition = 'all 0.4s ease-in';
    carImgEl.style.transform = 'translateX(-100px)';
    carImgEl.style.opacity = '0';

    // Fade out the left-side text block at the same time
    if (heroTextBlock) heroTextBlock.style.opacity = '0';

    setTimeout(() => {
      currentCarIndex = (currentCarIndex + 1) % heroCars.length;
      const nextCar = heroCars[currentCarIndex];

      carImgEl.src = nextCar.img;
      if (carTitleEl) carTitleEl.innerText = nextCar.title;
      if (carTagEl) carTagEl.innerText = nextCar.tag;
      if (carPriceEl) carPriceEl.innerText = nextCar.price;

      // Crossfade the hero section background in sync with the car change
      updateHeroBackground(nextCar.bg);

      // Swap the left-side text while it's invisible, then fade it back in
      updateHeroText(nextCar);
      if (heroTextBlock) heroTextBlock.style.opacity = '1';

      carImgEl.style.transition = 'none';
      carImgEl.style.transform = 'translateX(100px)';

      void carImgEl.offsetWidth;

      carImgEl.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      carImgEl.style.transform = 'translateX(0)';
      carImgEl.style.opacity = '1';
    }, 400);

  }, 2400);
}

// 5. Price Range Live Update
const priceRange = document.getElementById('price-range');
const maxPriceVal = document.getElementById('max-price-val');

if (priceRange && maxPriceVal) {
  priceRange.addEventListener('input', (e) => {
    maxPriceVal.innerText = Number(e.target.value).toLocaleString();
  });
}

// 6. Dynamic Data Rendering for Cars Showcase
const carsData = [
  {
    name: 'Porsche 911 GT3 RS',
    price: '$224,500',
    type: 'Supercar',
    img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    specs: '518 HP // 0-60 3.0s',
  },
  {
    name: 'Ferrari SF90 Stradale',
    price: '$524,000',
    type: 'Hybrid Supercar',
    img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
    specs: '986 HP // 0-60 2.5s',
  },
  {
    name: 'BMW M4 CSL',
    price: '$140,000',
    type: 'Coupe',
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    specs: '543 HP // Track Pack',
  },
  {
    name: 'Lamborghini Revuelto',
    price: '$604,000',
    type: 'V12 Hybrid',
    img: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80',
    specs: '1001 HP // 0-60 2.5s',
  },
  {
    name: 'McLaren 750S Spider',
    price: '$345,000',
    type: 'Supercar',
    img: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=800&q=80',
    specs: '740 HP // 0-60 2.7s',
  },
  {
    name: 'Mercedes-AMG GT BS',
    price: '$325,000',
    type: 'Track Edition',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    specs: '720 HP // V8 Biturbo',
  },
];

const carsGrid = document.getElementById('cars-grid');
if (carsGrid) {
  carsGrid.innerHTML = carsData
    .map(
      (car) => `
    <div class="car-card rounded-lg sm:rounded-2xl overflow-hidden group border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:border-rose-600 hover:shadow-md flex flex-col justify-between">
      <div class="relative overflow-hidden h-20 sm:h-56">
        <img src="${car.img}" alt="${car.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
        <span class="absolute top-1 right-1 sm:top-3 sm:right-3 bg-rose-600 text-white text-[7px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full shadow-sm">${car.type}</span>
      </div>
      <div class="p-1.5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="text-[9px] sm:text-xl font-bold text-stone-900 mb-0.5 sm:mb-2 font-serif truncate leading-tight">${car.name}</h3>
          <p class="text-stone-500 text-[8px] sm:text-xs font-mono mb-1.5 sm:mb-4 truncate">${car.specs}</p>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between border-t border-stone-100 pt-1.5 sm:pt-4 gap-1">
          <span class="text-stone-900 font-bold text-[9px] sm:text-lg font-mono leading-none">${car.price}</span>
          <a href="#contact" class="text-rose-600 hover:text-rose-700 text-[8px] sm:text-xs font-semibold tracking-wide transition-colors">Inquire +</a>
        </div>
      </div>
    </div>
  `
    )
    .join('');
}


// 7. Dynamic Data Rendering for Auto Parts
const productsData = [
  {
    id: 1,
    name: 'Brembo Carbon Ceramic Brake System',
    category: 'braking',
    price: '$12,400',
    specs: '6-Piston Monobloc Calipers & Carbon Rotors',
    img: 'https://images.pexels.com/photos/32132991/pexels-photo-32132991.jpeg',
  },
  {
    id: 2,
    name: 'Akrapovič Titanium Exhaust System',
    category: 'powertrain',
    price: '$8,900',
    specs: 'Ultralight Titanium / Carbon Tailpipes',
    img: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=800', 
  },
  {
    id: 3,
    name: 'Bilstein B16 Adjustable Coilover Kit',
    category: 'suspension',
    price: '$4,200',
    specs: 'Electronic Damping Control & Track Setup',
    img: 'https://images.pexels.com/photos/34357291/pexels-photo-34357291.jpeg',
  },
  {
    id: 4,
    name: 'Garrett GTX3582R Gen II Turbocharger',
    category: 'powertrain',
    price: '$3,150',
    specs: 'Dual Ball Bearing / 850+ HP Capacity',
    img: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=800', 
  },
  {
    id: 5,
    name: 'BBS FI-R Forged Light Alloy Wheels',
    category: 'wheels',
    price: '$9,800',
    specs: '20" Staggered Fitment / Ultra Lightweight',
    img: 'https://images.pexels.com/photos/244553/pexels-photo-244553.jpeg?auto=compress&cs=tinysrgb&w=800', 
  },
  {
    id: 6,
    name: 'Carbon Fiber High-Flow Air Intake',
    category: 'powertrain',
    price: '$1,850',
    specs: 'Pre-preg Carbon Fiber Cold Air Chamber',
    img: 'https://images.pexels.com/photos/190537/pexels-photo-190537.jpeg?auto=compress&cs=tinysrgb&w=800', 
  }
];

const productGrid = document.getElementById('product-grid');

function renderProducts(filter = 'all') {
  if (!productGrid) return;

  const filteredData = filter === 'all' 
    ? productsData 
    : productsData.filter(item => item.category === filter);

  productGrid.innerHTML = filteredData
    .map(
      (item) => `
    <div class="product-card rounded-xl sm:rounded-2xl overflow-hidden p-2 sm:p-5 border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:border-rose-600 hover:shadow-md flex flex-col justify-between">
      <div class="relative overflow-hidden rounded-lg sm:rounded-xl h-28 sm:h-52 bg-stone-100">
        <img src="${item.img}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
        <span class="absolute top-1 right-1 sm:top-3 sm:right-3 bg-white/95 backdrop-blur-md border border-stone-200 text-rose-600 text-[7px] sm:text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-full shadow-sm">
          ${item.category}
        </span>
      </div>
      <div class="mt-2 space-y-1 sm:space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="font-serif text-xs sm:text-lg font-bold text-stone-900 line-clamp-2 leading-snug">${item.name}</h3>
          <p class="text-stone-500 text-[8px] sm:text-xs font-mono line-clamp-1 mt-0.5">${item.specs}</p>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pt-2 sm:pt-4 border-t border-stone-100 gap-1.5">
          <span class="font-mono text-xs sm:text-base text-stone-900 font-bold">${item.price}</span>
          <button onclick="addToCart('${item.name}')" class="bg-rose-600 hover:bg-rose-700 text-white text-[9px] sm:text-xs font-mono font-bold px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-full transition-colors flex items-center justify-center gap-1 shadow-sm w-full sm:w-auto">
            <span>Buy Part</span> &rarr;
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join('');
}

// Initial render
renderProducts();

// Category Filter Functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.getAttribute('data-filter');
    renderProducts(filter);
  });
});

// 8. Shopping Cart Functionality
let cartCount = 0;
function addToCart(partName) {
  cartCount++;
  const cartNavCount = document.getElementById('nav-cart-count');
  if (cartNavCount) {
    cartNavCount.innerText = cartCount;
  }
  alert(`"${partName}" was added to your cart!`);
}

// 9. VIN Verification
const vinBtn = document.getElementById('vin-check-btn');
const vinInput = document.getElementById('vin-input');
const vinResult = document.getElementById('vin-result');

if (vinBtn && vinInput && vinResult) {
  vinBtn.addEventListener('click', () => {
    const val = vinInput.value.trim();
    if (val.length === 17) {
      vinResult.className = 'text-xs font-mono text-emerald-600 font-bold';
      vinResult.innerText = `✓ VIN ${val.toUpperCase()} VALIDATED. All OEM parts guaranteed compatible.`;
    } else {
      vinResult.className = 'text-xs font-mono text-rose-600 font-bold';
      vinResult.innerText = '✕ Error: Please enter a valid 17-character VIN.';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }
});
// ==========================================================================
// DARK MODE TOGGLE
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('[data-theme-toggle]');

  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      try {
        localStorage.setItem('din-auto-theme', isDark ? 'dark' : 'light');
      } catch (e) {
        console.warn('Could not persist theme preference.', e);
      }
    });
  });
});
