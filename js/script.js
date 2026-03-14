// 1. Липкая шапка
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('header--scrolled', window.scrollY > 50);
});



const navLinks = document.querySelectorAll('.nav__link');
const logo = document.querySelector('.logo'); // Выбираем логотип

// 1. Универсальная функция сброса
const resetMenu = () => {
  navLinks.forEach(link => link.classList.remove('active'));
  window.removeEventListener('wheel', resetMenu);
  window.removeEventListener('touchmove', resetMenu);
};

// 2. Обработка клика по ссылкам меню
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    resetMenu();
    this.classList.add('active');

    setTimeout(() => {
      window.addEventListener('wheel', resetMenu, { once: true });
      window.addEventListener('touchmove', resetMenu, { once: true });
    }, 200); 
  });
});

// 3. НОВОЕ: Обработка клика по логотипу
if (logo) {
  logo.addEventListener('click', () => {
    resetMenu(); // Просто гасим все подсветки при возврате наверх
  });
}




// 2. Умное появление блоков (Intersection Observer)
const revealOptions = { threshold: 0.15 };

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, revealOptions);

document.querySelectorAll('.reveal, .about').forEach(el => {
  el.classList.add('reveal'); 
  revealObserver.observe(el);
});

// --- БУРГЕР-МЕНЮ (Начало) ---
const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');

// ДОБАВЛЕНО: Проверка на существование кнопок (чтобы не было ошибок в консоли)
if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('open');   
      mobileMenu.classList.toggle('active'); 
      
      // Блокируем скролл страницы при открытом меню
      document.body.classList.toggle('no-scroll'); 
    });
}

// Закрываем меню при клике на любую ссылку
// ДОБАВЛЕНО: Выбираем не только .nav__link, но и кнопку "Презентация" внутри меню
document.querySelectorAll('.nav__link, .header__mobile-wrapper .btn').forEach(link => {
  link.addEventListener('click', () => {
    if (burgerBtn && mobileMenu) {
        burgerBtn.classList.remove('open');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
  });
});
// --- БУРГЕР-МЕНЮ (Конец) ---

// 3. ДОБАВЛЕНО: Закрытие меню при клике ВНЕ его области (по фону)
document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !burgerBtn.contains(e.target)) {
        burgerBtn.classList.remove('open');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});






// Инициализация главного слайдера
const heroSwiper = new Swiper('.heroSwiper', {
  loop: true,
  speed: 1200,
  effect: 'fade',
  fadeEffect: { crossFade: true },
  autoplay: { delay: 6000, disableOnInteraction: false },
  pagination: {
    el: '.main-hero-pagination',
    clickable: true
  },
  // grabCursor: true
  speed: 1200,
  loop: true,
});

// Инициализация слайдера в блоке "О нас"
const aboutSwiper = new Swiper('.aboutSwiper', {
  loop: true,
  autoplay: { delay: 5000 },
  pagination: {
    el: '.about-dots-pagination',
    clickable: true
  },
  // grabCursor: true
  loop: true,
});


const projectsSwiper = new Swiper('.projectsSwiper', {
  slidesPerView: 1, // По умолчанию 1 для мобилок
  spaceBetween: 25, // Отступ между карточками
  loop: false,      // Обычно для проектов loop не ставят, чтобы видеть конец списка
  
  // Навигация
  navigation: {
    nextEl: '.project-next',
    prevEl: '.project-prev',
  },

  // Адаптивные настройки
  breakpoints: {
    // Если экран >= 768px (iPad/планшеты)
    768: {
      slidesPerView: 2,
    },
    // Если экран >= 1200px (десктоп)
    1200: {
      slidesPerView: 4,
    }
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.interactive-marker, .interactive-card');

  function getLinked(el) {
    const ref = el.getAttribute('data-ref');
    const section = el.closest('section');
    return {
      marker: section.querySelector(`.interactive-marker[data-ref="${ref}"]`),
      card: section.querySelector(`.interactive-card[data-ref="${ref}"]`)
    };
  }

  elements.forEach(el => {
    // ХОВЕР
    el.addEventListener('mouseenter', () => {
      const { marker, card } = getLinked(el);
      marker.classList.add('is-hover');
      card.classList.add('is-hover');
    });

    el.addEventListener('mouseleave', () => {
      const { marker, card } = getLinked(el);
      marker.classList.remove('is-hover');
      card.classList.remove('is-hover');
    });

    // КЛИК (ACTIVE)
    el.addEventListener('click', () => {
      const section = el.closest('section');
      const { marker, card } = getLinked(el);
      
      const wasActive = card.classList.contains('is-active');

      // Сбрасываем все активные элементы в этой секции
      section.querySelectorAll('.is-active').forEach(item => {
        item.classList.remove('is-active');
      });

      // Если элемент не был активен — активируем пару
      if (!wasActive) {
        marker.classList.add('is-active');
        card.classList.add('is-active');
        
        // Для мобилок прокручиваем слайдер к карточке
        if (window.innerWidth <= 1024) {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    });
  });
});




