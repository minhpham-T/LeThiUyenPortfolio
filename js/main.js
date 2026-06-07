/**
 * @file main.js
 * @description Entry point cho trang index.html.
 *   - Import dữ liệu từ projectsData.js
 *   - Render động 6 project card vào #projectsGrid
 *   - Khởi tạo: scroll-reveal, navbar scroll effect, mobile nav toggle
 *   - Tất cả DOM manipulation được bọc trong DOMContentLoaded
 */

import { getAllProjects } from './projectsData.js';

/* ═══════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════ */

/**
 * Định dạng id thành chuỗi 2 chữ số (1 → "01", 12 → "12").
 * @param {number} id
 * @returns {string}
 */
const padId = (id) => String(id).padStart(2, '0');

/**
 * Tạo đoạn tóm tắt ngắn từ chuỗi objective dài (≤ 120 ký tự, cắt tại dấu cách).
 * @param {string} text
 * @param {number} [maxLen=120]
 * @returns {string}
 */
const truncate = (text, maxLen = 120) => {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
};

/**
 * Escape HTML entities để tránh XSS khi inject chuỗi vào innerHTML.
 * @param {string} str
 * @returns {string}
 */
const escapeHtml = (str) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

/* ═══════════════════════════════════════════════════
   CARD TEMPLATE
═══════════════════════════════════════════════════ */

/**
 * Tạo HTML string cho một project card.
 * @param {import('./projectsData.js').Project} project
 * @param {number} index - Thứ tự trong mảng (0-based), dùng tính animation delay.
 * @returns {string} HTML string của <article>
 */
const createCardHTML = (project, index) => {
  const { id, title, coverImage, category, objective } = project;
  const detailUrl  = `project-detail.html?id=${id}`;
  const numberStr  = padId(id);
  const excerpt    = escapeHtml(truncate(objective));
  const safeTitle  = escapeHtml(title);
  const safeCat    = escapeHtml(category);
  const safeImg    = escapeHtml(coverImage);
  const delay      = index * 80; // stagger: mỗi card cách nhau 80ms

  return `
    <article
      class="project-card"
      data-project-id="${id}"
      data-aos
      data-aos-delay="${delay}"
      role="listitem"
    >
      <!-- Lớp phủ toàn card — dùng cho click điều hướng -->
      <a
        href="${detailUrl}"
        class="card-link-overlay"
        aria-label="Xem chi tiết ${safeTitle}"
        tabindex="-1"
      ></a>

      <!-- Hình ảnh bìa -->
      <div class="card-image-wrap">
        <img
          src="${safeImg}"
          alt="Ảnh bìa ${safeTitle}"
          class="card-image"
          loading="lazy"
          decoding="async"
          onerror="this.src='images/mockups/placeholder.jpg'; this.alt='Ảnh chưa có';"
        />
        <div class="card-image-overlay" aria-hidden="true">
          <span class="overlay-icon">→</span>
        </div>
        <span class="card-number" aria-hidden="true">${numberStr}</span>
      </div>

      <!-- Nội dung thẻ -->
      <div class="card-body">
        <span class="card-category">${safeCat}</span>
        <h3 class="card-title">${safeTitle}</h3>
        <p class="card-excerpt">${excerpt}</p>
        <a
          href="${detailUrl}"
          class="card-btn"
          aria-label="Xem chi tiết bài tập: ${safeTitle}"
        >
          Xem chi tiết <span class="btn-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  `.trim();
};

/* ═══════════════════════════════════════════════════
   RENDER GRID
═══════════════════════════════════════════════════ */

/**
 * Render toàn bộ danh sách project card vào container.
 * @param {HTMLElement} container - Phần tử #projectsGrid
 * @param {import('./projectsData.js').Project[]} projects
 */
const renderProjectGrid = (container, projects) => {
  if (!container) {
    console.warn('[main.js] Không tìm thấy phần tử #projectsGrid trong DOM.');
    return;
  }

  if (!projects || projects.length === 0) {
    container.innerHTML = `
      <p class="grid-empty-msg">
        Chưa có dữ liệu bài tập. Vui lòng kiểm tra file projectsData.js.
      </p>
    `;
    return;
  }

  // Dùng DocumentFragment để tránh nhiều lần reflow
  const fragment = document.createDocumentFragment();
  const tempDiv  = document.createElement('div');

  projects.forEach((project, index) => {
    tempDiv.innerHTML = createCardHTML(project, index);
    const card = tempDiv.firstElementChild;
    if (card) fragment.appendChild(card);
  });

  // Xóa nội dung cũ (các card tĩnh viết tay trong HTML) rồi mount
  container.innerHTML = '';
  container.setAttribute('role', 'list');
  container.appendChild(fragment);
};

/* ═══════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════ */

/**
 * Khởi tạo IntersectionObserver để reveal các phần tử [data-aos].
 * Chạy lại sau khi grid được render để các card mới cũng được observe.
 */
const initScrollReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const delay = parseInt(entry.target.dataset.aosDelay || '0', 10);
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, delay);

        observer.unobserve(entry.target); // Chỉ animate một lần
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-aos]').forEach((el) => observer.observe(el));
};

/* ═══════════════════════════════════════════════════
   NAVBAR — SCROLL EFFECT
═══════════════════════════════════════════════════ */

/**
 * Thêm class .navbar--scrolled khi trang scroll quá 60px.
 */
const initNavbarScroll = () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const SCROLL_THRESHOLD = 60;

  const onScroll = () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > SCROLL_THRESHOLD);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Kiểm tra trạng thái ban đầu (nếu reload ở giữa trang)
};

/* ═══════════════════════════════════════════════════
   NAVBAR — MOBILE TOGGLE
═══════════════════════════════════════════════════ */

/**
 * Xử lý hamburger menu trên mobile.
 * Click ngoài vùng nav sẽ tự động đóng menu.
 */
const initMobileNav = () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  const navbar    = document.getElementById('navbar');

  if (!navToggle || !navLinks) return;

  const openMenu = () => {
    navLinks.classList.add('nav-links--open');
    navToggle.classList.add('nav-toggle--open');
    navToggle.setAttribute('aria-label', 'Đóng menu');
    navToggle.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    navLinks.classList.remove('nav-links--open');
    navToggle.classList.remove('nav-toggle--open');
    navToggle.setAttribute('aria-label', 'Mở menu');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('nav-links--open');
    isOpen ? closeMenu() : openMenu();
  });

  // Đóng menu khi click vào link (anchor scrolling)
  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Đóng menu khi click ra ngoài
  document.addEventListener('click', (e) => {
    if (navbar && !navbar.contains(e.target)) {
      closeMenu();
    }
  });

  // Đóng menu khi nhấn Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
};

/* ═══════════════════════════════════════════════════
   ACTIVE NAV LINK — SCROLL SPY
═══════════════════════════════════════════════════ */

/**
 * Cập nhật class .active trên nav-link dựa theo vị trí scroll hiện tại.
 * Các section cần có id tương ứng với href của nav-link.
 */
const initScrollSpy = () => {
  const navLinkEls = document.querySelectorAll('.nav-link[href^="#"]');
  if (navLinkEls.length === 0) return;

  const sectionIds = Array.from(navLinkEls).map((link) =>
    link.getAttribute('href').slice(1)
  );

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setActive = () => {
    const scrollMid = window.scrollY + window.innerHeight * 0.4;

    let currentId = '';
    sections.forEach((section) => {
      if (section.offsetTop <= scrollMid) {
        currentId = section.id;
      }
    });

    navLinkEls.forEach((link) => {
      const href = link.getAttribute('href').slice(1);
      link.classList.toggle('active', href === currentId);
    });

    // Nếu ở trên cùng (không section nào), highlight "Trang chủ"
    const homeLink = document.querySelector('.nav-link[href="index.html"]');
    if (homeLink) {
      homeLink.classList.toggle('active', currentId === '');
    }
  };

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
};

/* ═══════════════════════════════════════════════════
   ENTRY POINT
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Lấy dữ liệu
  const projects = getAllProjects();

  // 2. Render card grid
  const grid = document.getElementById('projectsGrid');
  renderProjectGrid(grid, projects);

  // 3. Khởi tạo các tính năng UI
  //    (scroll reveal chạy SAU khi grid đã được render)
  initScrollReveal();
  initNavbarScroll();
  initMobileNav();
  initScrollSpy();

  console.info(`[main.js] Đã render thành công ${projects.length} project cards.`);
});