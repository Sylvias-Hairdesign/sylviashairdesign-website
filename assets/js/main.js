/**
 * Sylvia's Hairdesign - Hoofd JavaScript Functionaliteit
 * 
 * Bevat:
 * 1. Real-time Openingstijden Checker (Nu geopend / gesloten indicator)
 * 2. Mobiel menu toggle & smooth auto-close
 * 3. Galerij Lightbox (zoom weergave met toetsenbord support)
 * 4. Prijslijst Categorie Filter (Alles, Knippen, Kleuren, Specials)
 * 5. Scroll-to-top knop & actieve navigatie spy
 */

document.addEventListener('DOMContentLoaded', () => {
  initOpeningHours();
  initMobileMenu();
  initGalleryLightbox();
  initPriceFilter();
  initBackToTop();
  initFaqAccordion();
  initTeamTabs();
});

/* ==========================================================================
   Team Tabs Functionaliteit
   ========================================================================== */
function initTeamTabs() {
  const tabBtns = document.querySelectorAll('.team-tab-btn');
  const teamStories = document.querySelectorAll('.team-story');

  if (!tabBtns.length || !teamStories.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      // Update button states
      tabBtns.forEach(b => {
        b.classList.remove('active', 'border-brand-700', 'text-warmgray-900');
        b.classList.add('border-transparent', 'text-warmgray-500', 'opacity-70');
      });
      btn.classList.add('active', 'border-brand-700', 'text-warmgray-900');
      btn.classList.remove('border-transparent', 'text-warmgray-500', 'opacity-70');

      // Update story visibility
      teamStories.forEach(story => {
        if (story.id === targetId) {
          story.classList.remove('hidden');
          story.classList.add('block');
        } else {
          story.classList.add('hidden');
          story.classList.remove('block');
        }
      });
    });
  });
}

/* ==========================================================================
   1. Real-time Openingstijden & Status Indicator
   ========================================================================== */
function initOpeningHours() {
  // Openingstijden schema: dag (0=zondag, 1=maandag, ... 6=zaterdag)
  // Tijden in minuten vanaf middernacht (bijv. 8:30 = 8*60 + 30 = 510)
  const salonSchedule = {
    0: null,                                      // Zondag: Gesloten
    1: null,                                      // Maandag: Gesloten
    2: { open: 8 * 60 + 30, close: 17 * 60 + 30, text: '08:30 - 17:30' }, // Dinsdag
    3: { open: 8 * 60 + 30, close: 15 * 60 + 0,  text: '08:30 - 15:00' }, // Woensdag
    4: { open: 8 * 60 + 30, close: 17 * 60 + 30, text: '08:30 - 17:30' }, // Donderdag
    5: { open: 8 * 60 + 30, close: 17 * 60 + 30, text: '08:30 - 17:30' }, // Vrijdag
    6: { open: 8 * 60 + 30, close: 12 * 60 + 30, text: '08:30 - 12:30' }, // Zaterdag
  };

  const dayNames = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];

  const now = new Date();
  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const statusBadge = document.getElementById('salon-live-status');
  const statusBadgeHero = document.getElementById('salon-live-status-hero');
  const tableRows = document.querySelectorAll('[data-day]');

  // Markeer de huidige dag in de openingstijden tabel
  tableRows.forEach(row => {
    const day = parseInt(row.getAttribute('data-day'), 10);
    if (day === currentDay) {
      row.classList.add('bg-amber-100/70', 'font-semibold', 'text-amber-900');
      const todayBadge = document.createElement('span');
      todayBadge.className = 'ml-2 text-xs bg-amber-700 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold';
      todayBadge.textContent = 'Vandaag';
      const dayCell = row.querySelector('td:first-child');
      if (dayCell) dayCell.appendChild(todayBadge);
    }
  });

  const todayHours = salonSchedule[currentDay];
  let isOpen = false;
  let statusText = '';
  let subText = '';

  if (todayHours && currentMinutes >= todayHours.open && currentMinutes < todayHours.close) {
    isOpen = true;
    const closeHours = Math.floor(todayHours.close / 60);
    const closeMins = (todayHours.close % 60).toString().padStart(2, '0');
    statusText = `Nu geopend tot ${closeHours}:${closeMins}`;
    subText = 'Bel direct voor een afspraak';
  } else {
    isOpen = false;
    // Bepaal wanneer de salon weer open gaat
    let nextOpenDay = null;
    for (let i = 1; i <= 7; i++) {
      const checkDay = (currentDay + i) % 7;
      if (salonSchedule[checkDay]) {
        nextOpenDay = {
          dayIndex: checkDay,
          name: i === 1 ? 'Morgen' : dayNames[checkDay],
          time: '08:30'
        };
        break;
      }
    }

    if (todayHours && currentMinutes < todayHours.open) {
      statusText = 'Nu gesloten • Vandaag open om 08:30';
    } else if (nextOpenDay) {
      statusText = `Nu gesloten • ${nextOpenDay.name} geopend vanaf ${nextOpenDay.time}`;
    } else {
      statusText = 'Nu gesloten';
    }
    subText = 'Uitsluitend op afspraak';
  }

  // Render status in de DOM
  const renderBadge = (element) => {
    if (!element) return;
    element.innerHTML = `
      <span class="status-dot ${isOpen ? 'open' : 'closed'}"></span>
      <span class="font-medium ${isOpen ? 'text-emerald-700' : 'text-amber-800'}">${statusText}</span>
    `;
  };

  renderBadge(statusBadge);
  renderBadge(statusBadgeHero);
}

/* ==========================================================================
   2. Mobiele Navigatie & Drawer
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('menu-close-btn');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.remove('-translate-x-full');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.add('-translate-x-full');
    backdrop.classList.remove('opacity-100', 'pointer-events-auto');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Sluit automatisch bij het klikken op een menu link
  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. Galerij Lightbox
   ========================================================================== */
function initGalleryLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-image');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-trigger');

  if (!modal || !modalImg) return;

  const openLightbox = (imgSrc, captionText) => {
    modalImg.src = imgSrc;
    if (modalCaption) modalCaption.textContent = captionText || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      modalImg.src = '';
    }, 300);
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const img = item.querySelector('img');
      const caption = item.getAttribute('data-caption') || (img ? img.alt : '');
      const fullSrc = item.getAttribute('data-full-src') || (img ? img.src : '');
      if (fullSrc) openLightbox(fullSrc, caption);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-backdrop')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   4. Prijslijst Categorie Filter
   ========================================================================== */
function initPriceFilter() {
  const filterBtns = document.querySelectorAll('.price-filter-btn');
  const priceCategories = document.querySelectorAll('.price-category-block');

  if (!filterBtns.length || !priceCategories.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      // Update actieve knop stijlen
      filterBtns.forEach(b => {
        b.classList.remove('bg-amber-700', 'text-white', 'shadow-md');
        b.classList.add('bg-stone-100', 'text-stone-700', 'hover:bg-stone-200');
      });
      btn.classList.remove('bg-stone-100', 'text-stone-700', 'hover:bg-stone-200');
      btn.classList.add('bg-amber-700', 'text-white', 'shadow-md');

      // Filter blokken
      priceCategories.forEach(catBlock => {
        const catName = catBlock.getAttribute('data-category');
        if (category === 'all' || category === catName) {
          catBlock.style.display = 'block';
          catBlock.classList.add('animate-fade-in');
        } else {
          catBlock.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Scroll to Top Knop
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   6. Veelgestelde Vragen (FAQ) Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-button');
    const content = item.querySelector('.faq-content');
    if (!btn || !content) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Sluit eventueel andere geopende items voor een clean overzicht
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          const otherBtn = otherItem.querySelector('.faq-button');
          if (otherContent) otherContent.style.maxHeight = null;
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle het huidige item
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

