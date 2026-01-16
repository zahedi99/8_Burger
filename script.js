

/* ---------- Branch data ---------- */
const BRANCHES = [
  {
    id: "hartlepool",
    name: "Burger 8 — Hartlepool",
    town: "Hartlepool",
    postcode: "",
    lat: 54.70705484704487,
    lon: -1.2214848646442373,
    orderUrl: "https://burger8hartlepool.briteat.co.uk/",
    mapsUrl: "https://www.google.com/maps?q=Burger%208%20Hartlepool",
  },
  {
    id: "benton",
    name: "Burger 8 — Benton",
    town: "Benton",
    postcode: "",
    lat: 55.007947172166844,
    lon: -1.5782965020026007,
    orderUrl: "https://burger8benton.briteat.co.uk/",
    mapsUrl: "https://www.google.com/maps?q=Burger%208%20Benton",
  },
  {
    id: "easington",
    name: "Burger 8 — Easington",
    town: "Easington",
    postcode: "",
    lat: 54.78825128410204,
    lon: -1.3255925253066914,
    orderUrl: "https://burger8easington.briteat.co.uk/",
    mapsUrl: "https://www.google.com/maps?q=Burger%208%20Easington",
  },
  {
    id: "ashington",
    name: "Burger 8 — Ashington",
    town: "Ashington",
    postcode: "",
    lat: 55.183361786072375,
    lon: -1.571623667610947,
    orderUrl: "https://burger8ashington.briteat.co.uk/",
    mapsUrl: "https://www.google.com/maps?q=Burger%208%20Ashington",
  },
  {
    id: "birtley",
    name: "Burger 8 — Birtley",
    town: "Birtley",
    postcode: "",
    lat: 54.89415511371937,
    lon: -1.5768603081097352,
    orderUrl: "https://burger8birtley.briteat.co.uk/",
    mapsUrl: "https://www.google.com/maps?q=Burger%208%20Birtley",
  },
  {
    id: "blyth",
    name: "Burger 8 — Blyth",
    town: "Blyth",
    postcode: "",
    lat: 55.126359423544635,
    lon: -1.510574867614533,
    orderUrl: "https://burger8blyth.briteat.co.uk/",
    mapsUrl: "https://www.google.com/maps?q=Burger%208%20Blyth",
  },
  {
    id: "bedlington",
    name: "Burger 8 — Bedlington",
    town: "Bedlington",
    postcode: "",
    lat: 55.140780449160076,
    lon: -1.5668576467265456,
    orderUrl: "https://burger8bedlington.briteat.co.uk/",
    mapsUrl: "https://www.google.com/maps?q=Burger%208%20Bedlington",
  },
];

/* =========================================================
   MENU: Pull menu through Cloudflare Worker (proxy)
   ========================================================= */
const MENU_PROXY_ENDPOINT =
  "https://burger8-menu-proxy.parsazahedi78.workers.dev/menu";

/* =========================================================
   LOCAL MENU IMAGES (Option 2)
   Your real folder:
   assets/PNG-20260116T144520Z-3-001/PNG/<Category>/...
   ========================================================= */
const IMAGE_BASE = "assets/PNG-20260116T144520Z-3-001/PNG";

/* Index-based images (numbered No.X.png) */
const LOCAL_IMAGE_MAP = {
  Burgers: [
    `${IMAGE_BASE}/Burgers/No.1.png`,
    `${IMAGE_BASE}/Burgers/No.2.png`,
    `${IMAGE_BASE}/Burgers/No.3.png`,
    `${IMAGE_BASE}/Burgers/No.4.png`,
    `${IMAGE_BASE}/Burgers/No.5.png`,
    `${IMAGE_BASE}/Burgers/No.6.png`,
    `${IMAGE_BASE}/Burgers/No.7.png`,
    `${IMAGE_BASE}/Burgers/No.8.png`,
  ],
};

/* Name-based images for Loaded Fries */
const LOADED_FRIES_IMAGES = {
  "bbq bacon loaded fries": `${IMAGE_BASE}/Loaded Fries/BBQ Bacon Loaded Fries.png`,
  "burger loaded fries": `${IMAGE_BASE}/Loaded Fries/Burger Loaded Fries.png`,
  "chicken loaded fries": `${IMAGE_BASE}/Loaded Fries/Chicken Loaded Fries.png`,
  "original loaded fries": `${IMAGE_BASE}/Loaded Fries/Original Loaded Fries.png`,
  "spicy loaded fries": `${IMAGE_BASE}/Loaded Fries/Spicy Loaded Fries.png`,
};

/* fallback menu (only used if proxy fails) */
let MENU = [
  {
    id: "fallback-1",
    name: "Classic Cheeseburger",
    category: "Burgers",
    price: 9.5,
    description: "Smashed beef, cheddar, pickles, house sauce.",
    tags: ["BEEF"],
    image: `${IMAGE_BASE}/Burgers/No.1.png`,
  },
];

/* ---------- DOM ---------- */
const header = document.getElementById("siteHeader");
const burgerBtn = document.querySelector(".burger");
const mobileMenu = document.getElementById("mobileMenu");

const branchSelect = document.getElementById("branchSelect");
const storeGrid = document.getElementById("storeGrid");
const storeSearch = document.getElementById("storeSearch");

const geoBtn = document.getElementById("geoBtn");
const geoHint = document.getElementById("geoHint");

const selectedWrap = document.getElementById("selectedWrap");
const selectedName = document.getElementById("selectedName");
const clearBranch = document.getElementById("clearBranch");

const orderBtn = document.getElementById("orderBtn");
const orderBtnMobile = document.getElementById("orderBtnMobile");
const orderHeroBtn = document.getElementById("orderHeroBtn");

const menuTabs = document.getElementById("menuTabs");
const menuGrid = document.getElementById("menuGrid");
const menuSearch = document.getElementById("menuSearch");
const menuStatus = document.getElementById("menuStatus");

const menuModal = document.getElementById("menuModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalCategory = document.getElementById("modalCategory");
const modalPrice = document.getElementById("modalPrice");
const modalTags = document.getElementById("modalTags");

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Helpers ---------- */
function moneyGBP(n) {
  if (typeof n !== "number" || Number.isNaN(n)) return "£—";
  return `£${n.toFixed(2)}`;
}

function stripHtml(html) {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || "").trim();
}

function setOrderEnabled(enabled, url) {
  const items = [orderBtn, orderBtnMobile, orderHeroBtn];
  items.forEach((el) => {
    if (!el) return;
    if (enabled) {
      el.setAttribute("aria-disabled", "false");
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    } else {
      el.setAttribute("aria-disabled", "true");
      el.href = "#locations";
      el.removeAttribute("target");
      el.removeAttribute("rel");
    }
  });
}

function highlightSelected(branchId) {
  document.querySelectorAll(".store").forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.id === branchId);
  });
}

function setSelectedBranch(branch) {
  if (!branch) {
    selectedWrap.hidden = true;
    selectedName.textContent = "—";
    setOrderEnabled(false, "#locations");
    highlightSelected(null);
    return;
  }
  selectedWrap.hidden = false;
  selectedName.textContent = branch.name;
  setOrderEnabled(true, branch.orderUrl);
  highlightSelected(branch.id);
}

/* Haversine distance (km) */
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function findClosestBranch(userLat, userLon) {
  let best = null;
  let bestDist = Infinity;
  for (const b of BRANCHES) {
    if (typeof b.lat !== "number" || typeof b.lon !== "number") continue;
    const d = haversineKm(userLat, userLon, b.lat, b.lon);
    if (d < bestDist) {
      bestDist = d;
      best = b;
    }
  }
  return { branch: best, distanceKm: bestDist };
}

/* =========================================================
   Branch rendering
   ========================================================= */
function renderSelectOptions() {
  BRANCHES.forEach((b) => {
    const opt = document.createElement("option");
    opt.value = b.id;
    opt.textContent = b.name;
    branchSelect.appendChild(opt);
  });
}

function createStoreCard(branch) {
  const card = document.createElement("article");
  card.className = "store";
  card.dataset.id = branch.id;

  card.innerHTML = `
    <div class="store__top">
      <h3 class="store__name">${branch.town}</h3>
      <span class="store__badge">${branch.postcode || "Branch"}</span>
    </div>
    <p class="store__addr">${branch.name}</p>
    <div class="store__actions">
      <button class="smallBtn smallBtn--primary" type="button">Select</button>
      <a class="smallBtn" href="${branch.mapsUrl}" target="_blank" rel="noopener noreferrer">Directions</a>
    </div>
  `;

  const selectBtn = card.querySelector("button");
  selectBtn.addEventListener("click", () => {
    branchSelect.value = branch.id;
    setSelectedBranch(branch);
  });

  card.addEventListener("click", (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (tag === "a" || tag === "button") return;
    branchSelect.value = branch.id;
    setSelectedBranch(branch);
  });

  return card;
}

function renderStoreGrid(list) {
  storeGrid.innerHTML = "";
  list.forEach((b) => storeGrid.appendChild(createStoreCard(b)));
  highlightSelected(branchSelect.value || null);
}

/* =========================================================
   MENU: Convert proxy JSON → our menu model
   ========================================================= */
function toPriceNumberFromStoreApi(p) {
  try {
    const minorUnit = Number(p?.prices?.currency_minor_unit ?? 2);
    const raw = p?.prices?.price;
    if (raw == null) return NaN;
    const n = Number(raw);
    if (Number.isNaN(n)) return NaN;
    return n / 10 ** minorUnit;
  } catch {
    return NaN;
  }
}

function toCategoryFromStoreApi(p) {
  const cat =
    p?.categories && p.categories[0] && p.categories[0].name
      ? p.categories[0].name
      : "Menu";
  return cat;
}

function toTagsFromStoreApi(p) {
  const tags = [];
  if (p?.type) tags.push(String(p.type).toUpperCase());
  if (Array.isArray(p?.categories)) {
    p.categories.slice(0, 2).forEach((c) => c?.name && tags.push(c.name));
  }
  return Array.from(new Set(tags)).slice(0, 4);
}

function toImageFromStoreApi(p) {
  const src = p?.images?.[0]?.src;
  return typeof src === "string" && src.trim().length > 0 ? src : "";
}

async function loadMenuFromProxy() {
  menuStatus.textContent = "Loading menu…";

  const res = await fetch(MENU_PROXY_ENDPOINT, { method: "GET" });
  if (!res.ok) throw new Error(`Menu proxy HTTP ${res.status}`);

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Menu proxy returned non-array JSON");

  const categoryCounters = {}; // for index-based images

  const mapped = data.map((p) => {
    const category = toCategoryFromStoreApi(p);
    const price = toPriceNumberFromStoreApi(p);
    const desc = stripHtml(p?.short_description || p?.description || "");
    const apiImg = toImageFromStoreApi(p);

    const idx = categoryCounters[category] ?? 0;
    categoryCounters[category] = idx + 1;

    const nameKey = String(p?.name || "").toLowerCase().trim();

    // 1) Loaded Fries -> NAME mapping
    let localImg = "";
    if (category === "Loaded Fries") {
      localImg = LOADED_FRIES_IMAGES[nameKey] || "";
    }

    // 2) Everything else -> INDEX mapping (e.g., Burgers -> No.1.png, No.2.png...)
    if (!localImg) {
      localImg = LOCAL_IMAGE_MAP[category]?.[idx] || "";
    }

    return {
      id: String(p?.id ?? crypto.randomUUID()),
      name: String(p?.name ?? "Item"),
      category,
      price,
      description: desc,
      tags: toTagsFromStoreApi(p),

      // priority: local -> api -> none
      image: localImg || apiImg || "",
    };
  });

  MENU = mapped.filter((x) => x.name && x.name.trim().length > 0);
  menuStatus.textContent = MENU.length ? "" : "Menu is empty.";
}


let activeCategory = "Featured";

function hasImage(item) {
  return Boolean(item.image && String(item.image).trim().length > 0);
}

function isFeaturedItem(item) {
  const cat = String(item.category || "").toLowerCase();
  return hasImage(item) && (cat === "burgers" || cat === "loaded fries");
}

/* ---------- Tabs list ---------- */
function getCategories() {
  const set = new Set(MENU.map((x) => x.category));
  const cats = Array.from(set).sort((a, b) => a.localeCompare(b));
  return ["Featured", "All", ...cats];
}

function renderTabs() {
  menuTabs.innerHTML = "";
  const cats = getCategories();

  cats.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "tab";
    btn.type = "button";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", String(cat === activeCategory));
    btn.textContent = cat;

    btn.addEventListener("click", () => {
      activeCategory = cat;
      if (menuSearch) menuSearch.value = ""; // optional: clear search when switching
      renderTabs();
      renderMenuGrid();
    });

    menuTabs.appendChild(btn);
  });
}

function matchesSearch(item, q) {
  if (!q) return true;
  const hay = `${item.name} ${item.description || ""} ${(item.tags || []).join(
    " "
  )} ${item.category}`.toLowerCase();
  return hay.includes(q);
}

function getFilteredMenu() {
  const q = (menuSearch?.value || "").trim().toLowerCase();
  const searching = q.length > 0;

  return MENU.filter((item) => {
    // Category filter:
    // - When searching, ignore category lock (user wants full menu)
    let catOk = true;

    if (!searching) {
      if (activeCategory === "Featured") {
        catOk = isFeaturedItem(item);
      } else if (activeCategory === "All") {
        catOk = true;
      } else {
        catOk = item.category === activeCategory;
      }
    }

    // Search filter:
    const searchOk = searching ? matchesSearch(item, q) : true;

    return catOk && searchOk;
  });
}

function menuCard(item) {
  const el = document.createElement("article");
  el.className = "menuItem";
  el.tabIndex = 0;

  const tags = (item.tags || [])
    .slice(0, 4)
    .map((t) => `<span class="pill">${t}</span>`)
    .join("");

  // REQUIRED ORDER: Name → Description → Image
  const imgHtml = hasImage(item)
    ? `<img class="menuItem__img" src="${item.image}" alt="${item.name}" loading="lazy" />`
    : "";

  el.innerHTML = `
    <div class="menuItem__top">
      <h3 class="menuItem__name">${item.name}</h3>
      <span class="menuItem__price">${moneyGBP(item.price)}</span>
    </div>

    <p class="menuItem__desc">${item.description || ""}</p>

    ${imgHtml}

    <div class="menuItem__tags">${tags}</div>
  `;

  const open = () => openMenuModal(item);
  el.addEventListener("click", open);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });

  return el;
}

function renderMenuGrid() {
  const list = getFilteredMenu();

  list.sort((a, b) => {
    const aHasImg = hasImage(a) ? 1 : 0;
    const bHasImg = hasImage(b) ? 1 : 0;

    
    if (aHasImg !== bHasImg) return bHasImg - aHasImg;

    
    if (activeCategory === "Featured") {
      const aCat = String(a.category || "").toLowerCase();
      const bCat = String(b.category || "").toLowerCase();

      if (aCat === "burgers" && bCat === "loaded fries") return -1;
      if (aCat === "loaded fries" && bCat === "burgers") return 1;
    }

    // Otherwise keep original order
    return 0;
  });

  menuGrid.innerHTML = "";
  list.forEach((item) => menuGrid.appendChild(menuCard(item)));
}

/* ---------- Modal ---------- */
function openMenuModal(item) {
  modalTitle.textContent = item.name;
  modalDesc.textContent = item.description || "";
  modalCategory.textContent = item.category || "Menu";
  modalPrice.textContent = moneyGBP(item.price);

  modalTags.innerHTML = "";
  (item.tags || []).forEach((t) => {
    const span = document.createElement("span");
    span.className = "pill";
    span.textContent = t;
    modalTags.appendChild(span);
  });

  menuModal.classList.add("is-open");
  menuModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeMenuModal() {
  menuModal.classList.remove("is-open");
  menuModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

menuModal.addEventListener("click", (e) => {
  const close = e.target?.dataset?.close === "1";
  if (close) closeMenuModal();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuModal.classList.contains("is-open")) {
    closeMenuModal();
  }
});

/* ---------- Header scroll behavior ---------- */
window.addEventListener("scroll", () => {
  header.classList.toggle("header--scrolled", window.scrollY > 60);
});

/* ---------- Mobile menu behavior ---------- */
if (burgerBtn) {
  burgerBtn.addEventListener("click", () => {
    const isOpen = burgerBtn.getAttribute("aria-expanded") === "true";
    burgerBtn.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.hidden = isOpen;
  });
}

function syncMobileMenuForDesktop() {
  if (window.innerWidth > 720) {
    if (burgerBtn) burgerBtn.setAttribute("aria-expanded", "false");
    if (mobileMenu) mobileMenu.hidden = true;
  }
}
window.addEventListener("resize", syncMobileMenuForDesktop);

/* ---------- Events: Branch select ---------- */
branchSelect.addEventListener("change", () => {
  const id = branchSelect.value;
  const branch = BRANCHES.find((b) => b.id === id) || null;
  geoHint.textContent = "";
  setSelectedBranch(branch);
});

clearBranch.addEventListener("click", () => {
  branchSelect.value = "";
  geoHint.textContent = "";
  setSelectedBranch(null);
});

storeSearch.addEventListener("input", () => {
  const q = storeSearch.value.trim().toLowerCase();
  if (!q) return renderStoreGrid(BRANCHES);

  const filtered = BRANCHES.filter((b) => {
    return (
      b.name.toLowerCase().includes(q) ||
      b.town.toLowerCase().includes(q) ||
      (b.postcode || "").toLowerCase().includes(q)
    );
  });

  renderStoreGrid(filtered);
});

/* ---------- Geo: closest branch ---------- */
geoBtn.addEventListener("click", () => {
  geoHint.textContent = "Requesting location…";

  if (!navigator.geolocation) {
    geoHint.textContent = "Geolocation is not supported in this browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      const { branch, distanceKm } = findClosestBranch(latitude, longitude);

      if (!branch) {
        geoHint.textContent = "Could not find a nearby branch.";
        return;
      }

      branchSelect.value = branch.id;
      setSelectedBranch(branch);
      geoHint.textContent = `Closest branch: ${branch.town} (${distanceKm.toFixed(
        1
      )} km).`;

      const locSection = document.getElementById("locations");
      if (locSection) {
        locSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    (err) => {
      if (err.code === err.PERMISSION_DENIED)
        geoHint.textContent = "Location permission denied.";
      else geoHint.textContent = "Could not get your location.";
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
  );
});

/* Menu search:
   
*/
menuSearch.addEventListener("input", () => renderMenuGrid());

/* ---------- Init ---------- */
(function init() {
  syncMobileMenuForDesktop();

  // Branches
  renderSelectOptions();
  renderStoreGrid(BRANCHES);
  setSelectedBranch(null);

  // Menu (API first, fallback if fails)
  loadMenuFromProxy()
    .then(() => {
      activeCategory = "Featured"; // default view
      renderTabs();
      renderMenuGrid();
    })
    .catch((err) => {
      console.warn("Menu load failed, using fallback MENU:", err);
      menuStatus.textContent = "Menu unavailable right now. (Fallback loaded.)";
      activeCategory = "Featured";
      renderTabs();
      renderMenuGrid();
    });
})();
