/**
 * @file detailRenderer.js
 * @description Controller duy nhất cho trang project-detail.html.
 *
 * Luồng hoạt động:
 *   DOMContentLoaded
 *     └─ (1) extractIdFromUrl()       → lấy ?id= từ URL
 *     └─ (2) findProjectById()        → tìm dữ liệu trong projectsData.js
 *     └─ (3) renderPage()             → điền nội dung vào DOM
 *         ├─ renderHero()             → số thứ tự, danh mục, tiêu đề
 *         ├─ renderObjective()        → mục tiêu học tập
 *         ├─ renderProcess()          → quy trình thực hiện (tách thành steps)
 *         └─ renderOutput()           → gallery ảnh / link sản phẩm
 *     └─ (4) renderErrorState()       → hiển thị lỗi nếu id không hợp lệ
 *
 * @module detailRenderer
 * @requires ./projectsData.js
 */

import { getProjectById, getAllProjects } from './projectsData.js';

/* ══════════════════════════════════════════════════════════
   PHẦN 0 — TIỆN ÍCH NỘI BỘ (Utilities)
══════════════════════════════════════════════════════════ */

/**
 * Định dạng số nguyên thành chuỗi 2 chữ số.
 * @example padId(3) → "03"
 * @param {number} n
 * @returns {string}
 */
const padId = (n) => String(n).padStart(2, '0');

/**
 * Escape các ký tự HTML đặc biệt để tránh XSS
 * khi inject chuỗi tùy ý vào innerHTML.
 * @param {*} value - Bất kỳ giá trị nào (sẽ được ép kiểu về string)
 * @returns {string}
 */
const esc = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

/**
 * Lấy một phần tử DOM theo id, kèm cảnh báo nếu không tìm thấy.
 * @param {string} id
 * @returns {HTMLElement|null}
 */
const getEl = (id) => {
  const el = document.getElementById(id);
  if (!el) console.warn(`[detailRenderer] Không tìm thấy #${id} trong DOM.`);
  return el;
};

/**
 * Gán textContent cho một phần tử (an toàn, không cần escape thêm).
 * @param {string} id  - id của phần tử DOM
 * @param {string} text
 */
const setText = (id, text) => {
  const el = getEl(id);
  if (el) el.textContent = text;
};

/* ══════════════════════════════════════════════════════════
   PHẦN 1 — TRÍCH XUẤT ID TỪ URL
   Nhiệm vụ: Đọc tham số ?id= và trả về số nguyên hợp lệ.
══════════════════════════════════════════════════════════ */

/**
 * Trích xuất tham số `id` từ query string của URL hiện tại.
 *
 * Ví dụ:
 *   URL: project-detail.html?id=3  →  trả về 3
 *   URL: project-detail.html?id=   →  trả về null
 *   URL: project-detail.html       →  trả về null
 *
 * @returns {number|null} id dưới dạng số nguyên dương, hoặc null nếu không hợp lệ.
 */
const extractIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const raw    = params.get('id');       // chuỗi hoặc null
  const parsed = parseInt(raw, 10);     // parse về số

  // Kiểm tra: phải là số hữu hạn và dương
  if (!Number.isFinite(parsed) || parsed <= 0) {
    console.warn(`[detailRenderer] Tham số id không hợp lệ: "${raw}"`);
    return null;
  }

  return parsed;
};

/* ══════════════════════════════════════════════════════════
   PHẦN 2 — TÌM KIẾM DỮ LIỆU BÀI TẬP
   Nhiệm vụ: Dùng id để tìm đối tượng Project tương ứng.
══════════════════════════════════════════════════════════ */

/**
 * Tìm đối tượng bài tập theo id từ mảng dữ liệu trong projectsData.js.
 *
 * @param {number} id - Mã định danh bài tập (1–6)
 * @returns {import('./projectsData.js').Project|null}
 *   Trả về đối tượng Project nếu tìm thấy, null nếu không tồn tại.
 */
const findProjectById = (id) => {
  const project = getProjectById(id);

  if (!project) {
    console.warn(`[detailRenderer] Không tìm thấy bài tập với id = ${id}.`);
    return null;
  }

  return project;
};

/* ══════════════════════════════════════════════════════════
   PHẦN 3 — ĐIỀN NỘI DUNG VÀO DOM (Render)
   Được chia thành 4 hàm con theo từng khu vực trang.
══════════════════════════════════════════════════════════ */

/* ── 3a. Hero: số thứ tự, danh mục, tiêu đề ─────────── */

/**
 * Render khu vực hero: cập nhật <title>, breadcrumb,
 * số thứ tự trang trí, tag danh mục, và tiêu đề bài tập.
 *
 * @param {import('./projectsData.js').Project} project
 */
const renderHero = (project) => {
  const { id, title, category } = project;
  const numStr = padId(id);

  // Cập nhật <title> trên tab trình duyệt
  document.title = `Bài ${numStr}: ${title} — Digital Portfolio`;

  // Breadcrumb (hiển thị "Bài 03" ở cuối)
  setText('breadcrumbTitle', `Bài ${numStr}`);

  // Số thứ tự khổng lồ (trang trí nền)
  setText('detailNumber', numStr);

  // Tag danh mục
  setText('detailCategory', category);

  // Tiêu đề chính
  setText('detailTitle', title);

  // Sidebar: mã bài tập và danh mục
  setText('sidebarId',       `Bài ${numStr}`);
  setText('sidebarCategory', category);
};

/* ── 3b. Objective: mục tiêu học tập ────────────────── */

/**
 * Render khối "Mục tiêu học tập" vào phần tử #detailObjective.
 *
 * @param {import('./projectsData.js').Project} project
 */
const renderObjective = (project) => {
  setText('detailObjective', project.objective);
};

/* ── 3c. Process: quy trình thực hiện ───────────────── */

/**
 * Tách chuỗi process thành mảng các bước có nghĩa.
 *
 * Chiến lược tách:
 *   - Split tại ". " / "! " / "? " (sau dấu câu kết thúc câu)
 *   - Lọc bỏ mảnh quá ngắn (< 15 ký tự)
 *   - Fallback: nếu chỉ còn 1 phần tử, trả về nguyên văn
 *
 * @param {string} processText
 * @returns {string[]} Mảng các bước (ít nhất 1 phần tử)
 */
const splitIntoSteps = (processText) => {
  const sentences = processText
    .split(/(?<=[.!?])\s+/)       // split SAU dấu câu, giữ dấu câu ở bước trước
    .map((s) => s.trim())
    .filter((s) => s.length >= 15); // bỏ mảnh quá ngắn, vô nghĩa

  return sentences.length > 1 ? sentences : [processText.trim()];
};

/**
 * Tạo HTML string cho một bước trong quy trình.
 *
 * @param {string} text    - Nội dung bước
 * @param {number} index   - Chỉ số 0-based
 * @returns {string}       - HTML string của .process-step
 */
const createStepHTML = (text, index) => `
  <div class="process-step" role="listitem">
    <div class="step-num" aria-label="Bước ${index + 1}">${padId(index + 1)}</div>
    <div class="step-content">
      <p class="step-body">${esc(text)}</p>
    </div>
  </div>
`.trim();

/**
 * Render khối "Quy trình thực hiện" vào phần tử #detailProcessSteps.
 * Mỗi câu trong chuỗi process được hiển thị thành một bước riêng biệt
 * với số thứ tự và đường nối timeline.
 *
 * @param {import('./projectsData.js').Project} project
 */
const renderProcess = (project) => {
  const container = getEl('detailProcessSteps');
  if (!container) return;

  const steps = splitIntoSteps(project.process);

  // Dùng DocumentFragment để chỉ reflow DOM một lần
  const fragment = document.createDocumentFragment();
  const temp     = document.createElement('div');

  steps.forEach((stepText, i) => {
    temp.innerHTML = createStepHTML(stepText, i);
    const node = temp.firstElementChild;
    if (node) fragment.appendChild(node);
  });

  container.innerHTML = '';
  container.appendChild(fragment);
};

/* ── 3d. Output: gallery ảnh / link sản phẩm ────────── */

/**
 * Kiểm tra xem một đường dẫn URL trỏ tới file ảnh hay liên kết ngoài.
 *
 * @param {string} url
 * @returns {'image'|'link'}
 */
const detectUrlType = (url) => {
  const imageExts = /\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$/i;
  const externalUrl = /^https?:\/\//i;

  if (imageExts.test(url))    return 'image';
  if (externalUrl.test(url))  return 'link';
  return 'image'; // đường dẫn tương đối không phải ảnh vẫn thử tải ảnh
};

/**
 * Tạo HTML cho một ảnh minh chứng trong gallery.
 *
 * @param {string} src   - Đường dẫn ảnh
 * @param {string} label - Alt text / caption
 * @returns {string}
 */
const createImageItemHTML = (src, label) => `
  <div class="output-item" role="listitem">
    <div class="output-img-wrap">
      <img
        src="${esc(src)}"
        alt="${esc(label)}"
        class="output-img"
        loading="lazy"
        decoding="async"
        onerror="
          this.closest('.output-img-wrap').innerHTML =
            '<div class=\\'output-img-placeholder\\'>' +
              '<span>🖼</span>' +
              '<p>Ảnh chưa có — đang được cập nhật</p>' +
            '</div>';
        "
      />
      <div class="output-img-overlay" aria-hidden="true">
        <span>🔍</span>
      </div>
    </div>
    <p class="output-img-caption">${esc(label)}</p>
  </div>
`.trim();

/**
 * Tạo HTML cho một liên kết sản phẩm (file PDF, trang web, v.v.).
 *
 * @param {string} href    - URL đích
 * @param {number} index   - Thứ tự (để đặt nhãn)
 * @returns {string}
 */
const createLinkItemHTML = (href, index) => `
  <a
    href="${esc(href)}"
    class="output-link-item"
    target="_blank"
    rel="noopener noreferrer"
    role="listitem"
    aria-label="Xem sản phẩm số ${index + 1}"
  >
    <div class="output-link-icon" aria-hidden="true">📄</div>
    <div class="output-link-text">
      <p class="output-link-label">Xem sản phẩm ${index + 1}</p>
      <p class="output-link-sub">Nhấn để mở liên kết ↗</p>
    </div>
    <span class="output-link-arrow" aria-hidden="true">→</span>
  </a>
`.trim();

/**
 * Map output.type thành nhãn tiếng Việt cho sidebar.
 * @param {string} type - 'image' | 'link' | 'mixed'
 * @returns {string}
 */
const formatOutputType = (type) => {
  const labels = {
    image: '📷 Hình ảnh minh chứng',
    link:  '🔗 Liên kết sản phẩm',
    mixed: '📎 Hình ảnh & Liên kết',
  };
  return labels[type] ?? type;
};

/**
 * Render khối "Sản phẩm cuối cùng":
 *   - Mô tả output
 *   - Gallery: mỗi URL trong output.urls được render thành ảnh hoặc link
 *   - Sidebar: loại sản phẩm
 *
 * @param {import('./projectsData.js').Project} project
 */
const renderOutput = (project) => {
  const { title, output } = project;

  // Mô tả output
  setText('detailOutputDesc', output.description);

  // Sidebar: loại sản phẩm
  setText('sidebarOutputType', formatOutputType(output.type));

  // Gallery
  const gallery = getEl('outputGallery');
  if (!gallery) return;

  // Trường hợp chưa có URL nào
  if (!output.urls || output.urls.length === 0) {
    gallery.innerHTML = `
      <div class="output-img-placeholder" style="border-radius:var(--radius-md); min-height:160px;" role="status">
        <span>🖼</span>
        <p>Sản phẩm chưa được tải lên</p>
      </div>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();
  const temp     = document.createElement('div');

  output.urls.forEach((url, i) => {
    const type  = detectUrlType(url);
    const label = `Minh chứng ${i + 1} — ${title}`;

    temp.innerHTML =
      type === 'image'
        ? createImageItemHTML(url, label)
        : createLinkItemHTML(url, i);

    const node = temp.firstElementChild;
    if (node) fragment.appendChild(node);
  });

  gallery.innerHTML = '';
  gallery.appendChild(fragment);
};

/* ── 3e. Sidebar navigation: nút Trước / Tiếp ───────── */

/**
 * Render nút điều hướng Prev / Next trong sidebar.
 *
 * @param {number} currentId   - id bài hiện tại
 * @param {number} totalCount  - tổng số bài tập
 */
const renderSidebarNav = (currentId, totalCount) => {
  const container = getEl('sidebarNav');
  if (!container) return;

  const hasPrev = currentId > 1;
  const hasNext = currentId < totalCount;

  const btnClass = (enabled) =>
    `sidebar-nav-btn${enabled ? '' : ' sidebar-nav-btn--disabled'}`;

  const disabledAttrs = (enabled) =>
    enabled ? '' : 'aria-disabled="true" tabindex="-1"';

  container.innerHTML = `
    <a
      href="project-detail.html?id=${currentId - 1}"
      class="${btnClass(hasPrev)}"
      ${disabledAttrs(hasPrev)}
      aria-label="Bài tập trước"
    >← Trước</a>
    <a
      href="project-detail.html?id=${currentId + 1}"
      class="${btnClass(hasNext)}"
      ${disabledAttrs(hasNext)}
      aria-label="Bài tập tiếp theo"
    >Tiếp →</a>
  `.trim();
};

/* ── Hàm tổng hợp renderPage ─────────────────────────── */

/**
 * Gọi lần lượt tất cả các hàm render con để điền dữ liệu
 * của một bài tập vào toàn bộ trang.
 *
 * @param {import('./projectsData.js').Project} project
 * @param {number} totalCount - tổng số bài tập (cho sidebar nav)
 */
const renderPage = (project, totalCount) => {
  renderHero(project);
  renderObjective(project);
  renderProcess(project);
  renderOutput(project);
  renderSidebarNav(project.id, totalCount);
};

/* ══════════════════════════════════════════════════════════
   PHẦN 4 — XỬ LÝ NGOẠI LỆ (Error State)
   Nhiệm vụ: Hiển thị thông báo lỗi thân thiện + nút quay lại.
══════════════════════════════════════════════════════════ */

/**
 * Các thông điệp lỗi theo từng trường hợp.
 * @enum {string}
 */
const ERROR_MESSAGES = {
  NO_ID:        'Đường dẫn không chứa mã bài tập. Vui lòng chọn bài tập từ danh sách.',
  INVALID_ID:   (id) => `Bài tập số ${padId(id)} không tồn tại trong dữ liệu. Có thể nội dung đang được cập nhật.`,
  GENERIC:      'Đã có lỗi xảy ra khi tải trang. Vui lòng thử lại sau.',
};

/**
 * Hiển thị giao diện lỗi thân thiện, thay thế toàn bộ nội dung .container.
 * Luôn có nút "← Quay lại danh sách" để người dùng thoát khỏi trang lỗi.
 *
 * @param {string} [message=ERROR_MESSAGES.GENERIC] - Thông điệp hiển thị cho người dùng
 */
const renderErrorState = (message = ERROR_MESSAGES.GENERIC) => {
  // Ghi log kỹ thuật ra console để debug
  console.error('[detailRenderer] Lỗi render:', message);

  // Cập nhật <title>
  document.title = 'Không tìm thấy bài tập — Digital Portfolio';

  // Tìm container chính để inject giao diện lỗi
  const container = document.querySelector('.detail-main .container');
  if (!container) return;

  container.innerHTML = `
    <!-- Nút quay lại — luôn hiển thị dù lỗi -->
    <div class="detail-nav-row" style="margin-bottom: var(--space-xl);">
      <a href="index.html#projects" class="back-btn" aria-label="Quay lại danh sách bài tập">
        <span class="back-arrow" aria-hidden="true">←</span>
        <span class="back-label">Quay lại danh sách</span>
      </a>
    </div>

    <!-- Khối thông báo lỗi -->
    <div class="detail-error" role="alert" aria-live="assertive">
      <p class="error-emoji" aria-hidden="true">🌸</p>
      <h2 class="error-title">Ôi, không tìm thấy bài tập</h2>
      <p class="error-body">${esc(message)}</p>
      <a
        href="index.html#projects"
        class="footer-back-btn"
        style="margin-top: var(--space-md); display: inline-flex;"
      >
        ← Về danh sách bài tập
      </a>
    </div>
  `.trim();
};

/* ══════════════════════════════════════════════════════════
   PHẦN UI PHỤ — Navbar & Scroll Reveal
   (Tái sử dụng logic từ main.js, chạy trên mọi trạng thái)
══════════════════════════════════════════════════════════ */

/** Thêm class .navbar--scrolled khi trang cuộn quá 60px. */
const initNavbarScroll = () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handle = () =>
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 60);

  window.addEventListener('scroll', handle, { passive: true });
  handle(); // trạng thái ban đầu
};

/** Hamburger menu cho mobile. */
const initMobileNav = () => {
  const toggle  = document.getElementById('navToggle');
  const links   = document.getElementById('navLinks');
  const navbar  = document.getElementById('navbar');
  if (!toggle || !links) return;

  const open  = () => { links.classList.add('nav-links--open');    toggle.classList.add('nav-toggle--open');    toggle.setAttribute('aria-expanded', 'true');  };
  const close = () => { links.classList.remove('nav-links--open'); toggle.classList.remove('nav-toggle--open'); toggle.setAttribute('aria-expanded', 'false'); };

  toggle.addEventListener('click', () =>
    links.classList.contains('nav-links--open') ? close() : open()
  );
  links.querySelectorAll('.nav-link').forEach((l) => l.addEventListener('click', close));
  document.addEventListener('click',   (e) => { if (navbar && !navbar.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
};

/** IntersectionObserver cho hiệu ứng scroll reveal [data-aos]. */
const initScrollReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.aosDelay ?? '0', 10);
        setTimeout(() => entry.target.classList.add('aos-animate'), delay);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-aos]').forEach((el) => observer.observe(el));
};

/* ══════════════════════════════════════════════════════════
   ENTRY POINT — DOMContentLoaded
   Đây là hàm duy nhất được gọi tự động, điều phối
   toàn bộ 4 nhiệm vụ theo thứ tự.
══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Luôn khởi tạo UI navbar trước, bất kể có lỗi hay không
  initNavbarScroll();
  initMobileNav();

  /* ── Bước 1: Trích xuất id từ URL ─────────────── */
  const id = extractIdFromUrl();

  if (id === null) {
    // Không có ?id= hoặc ?id= không phải số
    renderErrorState(ERROR_MESSAGES.NO_ID);
    return;
  }

  /* ── Bước 2: Tìm dữ liệu bài tập ─────────────── */
  const project = findProjectById(id);

  if (project === null) {
    // id hợp lệ nhưng không tồn tại trong data
    renderErrorState(ERROR_MESSAGES.INVALID_ID(id));
    return;
  }

  /* ── Bước 3: Điền toàn bộ nội dung vào DOM ───── */
  const allProjects = getAllProjects();
  renderPage(project, allProjects.length);

  /* ── Khởi tạo scroll reveal sau khi DOM đã đầy ─ */
  initScrollReveal();

  console.info(
    `[detailRenderer] ✓ Render thành công — Bài ${padId(id)}: "${project.title}"`
  );
});