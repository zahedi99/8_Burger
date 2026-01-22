/* ---------- Branch data (unchanged) ---------- */
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
   LOCAL MENU IMAGES 
   ========================================================= */
const IMAGE_BASE = "assets/PNG-20260116T144520Z-3-001/PNG";

/* Index-based images (numbered No.X.png) */
const LOCAL_IMAGE_MAP = {
  Burgers: [
    `${IMAGE_BASE}/Burgers/No.8.png`,
    `${IMAGE_BASE}/Burgers/No.7.png`,
    `${IMAGE_BASE}/Burgers/No.6.png`,
    `${IMAGE_BASE}/Burgers/No.5.png`,
    `${IMAGE_BASE}/Burgers/No.4.png`,
    `${IMAGE_BASE}/Burgers/No.3.png`,
    `${IMAGE_BASE}/Burgers/No.2.png`,
    `${IMAGE_BASE}/Burgers/No.1.png`,
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
    name: "#1 CLASSIC",
    category: "Burgers",
    price: 10.6,
    description:
      "SERVED WITH SEASONED FRIES, 2 x SMASHED BEEF PATTIES, CHEESE, LETTUCE, RED ONION, DILL PICKLE, HOMEMADE BURGER SAUCE, TOASTED BRIOCHE BUN, LEVEL UP?, EXTRA TOPPINGS",
    tags: ["BEEF"],
    image: `${IMAGE_BASE}/Burgers/No.1.png`,
  },
];

/* ---------- DOM ---------- */
const orderBtn = document.getElementById("orderBtn");
const yearEl = document.getElementById("year");

const branchSelect = document.getElementById("branchSelect");
const storeGrid = document.getElementById("storeGrid");
const geoBtn = document.getElementById("geoBtn");
const geoHint = document.getElementById("geoHint");
const clearBranch = document.getElementById("clearBranch");

const menuStatus = document.getElementById("menuStatus");
const catBar = document.getElementById("catBar");
const menuSections = document.getElementById("menuSections");

const menuModal = document.getElementById("menuModal");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalPrice = document.getElementById("modalPrice");
const modalLines = document.getElementById("modalLines");

/* hero slider */
const heroImg = document.getElementById("heroImg");
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");
const heroIndex = document.getElementById("heroIndex");
const heroTotal = document.getElementById("heroTotal");

/* ---------- Helpers ---------- */
if (yearEl) yearEl.textContent = new Date().getFullYear();

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

function hasImage(item) {
  return Boolean(item.image && String(item.image).trim().length > 0);
}

function setOrderEnabled(enabled, url) {
  if (!orderBtn) return;
  if (enabled) {
    orderBtn.setAttribute("aria-disabled", "false");
    orderBtn.href = url;
    orderBtn.target = "_blank";
    orderBtn.rel = "noopener noreferrer";
  } else {
    orderBtn.setAttribute("aria-disabled", "true");
    orderBtn.href = "#locations";
    orderBtn.removeAttribute("target");
    orderBtn.removeAttribute("rel");
  }
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

function highlightSelected(branchId) {
  document.querySelectorAll(".store").forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.id === branchId);
  });
}

function setSelectedBranch(branch) {
  if (!branch) {
    setOrderEnabled(false, "#locations");
    highlightSelected(null);
    return;
  }
  setOrderEnabled(true, branch.orderUrl);
  highlightSelected(branch.id);
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
      name: String(p?.name ?? "Item").toUpperCase(),
      category: String(category || "Menu"),
      price,
      description: desc,
      tags: toTagsFromStoreApi(p),
      image: localImg || apiImg || "",
    };
  });

  MENU = mapped.filter((x) => x.name && x.name.trim().length > 0);
  menuStatus.textContent = MENU.length ? "" : "Menu is empty.";
}

/* =========================================================
   Wix-like rendering (category bar + sections)
   ========================================================= */
const CATEGORY_ORDER = [
  "Specials",
  "Burgers",
  "Loaded Fries",
  "Wings",
  "Milkshakes",
  "Sides",
  "Sauces",
];

function normalizeCat(c) {
  return String(c || "").trim();
}

function getCategoriesOrdered() {
  const set = new Set(MENU.map((x) => normalizeCat(x.category)));
  const cats = Array.from(set);

  // Order by our preferred list, then alphabetical for leftovers
  const ordered = [];
  for (const c of CATEGORY_ORDER) {
    if (cats.includes(c)) ordered.push(c);
  }
  const leftovers = cats.filter((c) => !ordered.includes(c)).sort((a, b) => a.localeCompare(b));
  return [...ordered, ...leftovers];
}

function splitToLines(item) {
  // Wix shows each ingredient on its own line.
  // We convert description into "lines" by splitting on commas / bullets / pipes / newlines.
  const raw = String(item.description || "")
    .replace(/\r/g, "")
    .replace(/•/g, ",")
    .replace(/\|/g, ",")
    .trim();

  if (!raw) return [];

  const parts = raw
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);

  // If it's one long sentence, keep it as one line
  if (parts.length <= 1) return [raw.toUpperCase()];

  return parts.map((x) => x.toUpperCase());
}

function scrollToSection(cat) {
  const id = `cat-${cat.toLowerCase().replace(/\s+/g, "-")}`;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderCategoryBar(activeCat) {
  catBar.innerHTML = "";
  const cats = getCategoriesOrdered();

  cats.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "catBtn" + (cat === activeCat ? " is-active" : "");
    btn.type = "button";
    btn.textContent = cat.toUpperCase();
    btn.addEventListener("click", () => scrollToSection(cat));
    catBar.appendChild(btn);
  });
}

function renderMenuSections() {
  menuSections.innerHTML = "";

  const cats = getCategoriesOrdered();
  renderCategoryBar(cats[0] || "Menu");

  cats.forEach((cat) => {
    const section = document.createElement("section");
    section.className = "menuSection";
    section.id = `cat-${cat.toLowerCase().replace(/\s+/g, "-")}`;

    const head = document.createElement("div");
    head.className = "menuSection__head";
    head.textContent = cat.toUpperCase();
    section.appendChild(head);

    const items = MENU.filter((x) => normalizeCat(x.category) === cat);

    // Wix: image is always shown. We still render even if missing (empty space)
    items.forEach((item) => {
      const row = document.createElement("article");
      row.className = "menuItem";
      row.tabIndex = 0;

      const img = hasImage(item)
        ? `<img class="menuItem__img" src="${item.image}" alt="${item.name}" loading="lazy" />`
        : `<div class="menuItem__img" aria-hidden="true"></div>`;

      const lines = splitToLines(item)
        .slice(0, 18)
        .map((l) => `<div class="line">${escapeHtml(l)}</div>`)
        .join("");

      row.innerHTML = `
        <div class="menuItem__left">
          ${img}
        </div>
        <div class="menuItem__right">
          <div class="menuItem__meta">
            <h3 class="menuItem__name">${escapeHtml(item.name)}</h3>
            <div class="menuItem__price">${moneyGBP(item.price)}</div>
          </div>

          <div class="menuItem__lines">${lines}</div>

          <div class="menuItem__row">
            <a class="smallLink" href="#" onclick="return false;">ALLERGENS</a>
          </div>
        </div>
      `;

      const open = () => openMenuModal(item);
      row.addEventListener("click", (e) => {
        const tag = e.target.tagName.toLowerCase();
        if (tag === "a") return; // allergens link is placeholder
        open();
      });
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });

      section.appendChild(row);
    });

    menuSections.appendChild(section);
  });

  // highlight active category while scrolling
  setupActiveCategoryObserver();
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   Modal
   ========================================================= */
function openMenuModal(item) {
  modalTitle.textContent = item.name;
  modalCategory.textContent = (item.category || "Menu").toUpperCase();
  modalPrice.textContent = moneyGBP(item.price);

  modalLines.innerHTML = "";
  splitToLines(item).slice(0, 24).forEach((l) => {
    const div = document.createElement("div");
    div.className = "line";
    div.textContent = l;
    modalLines.appendChild(div);
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

/* =========================================================
   Active category highlighting (while scrolling)
   ========================================================= */
let catObserver = null;

function setupActiveCategoryObserver() {
  if (catObserver) catObserver.disconnect();

  const catIds = getCategoriesOrdered().map((cat) => `cat-${cat.toLowerCase().replace(/\s+/g, "-")}`);
  const els = catIds.map((id) => document.getElementById(id)).filter(Boolean);

  if (!els.length) return;

  catObserver = new IntersectionObserver(
    (entries) => {
      // pick the most visible
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      const id = visible.target.id.replace("cat-", "");
      const activeCat = id.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      renderCategoryBar(activeCat);
    },
    { root: null, threshold: [0.12, 0.2, 0.35, 0.5] }
  );

  els.forEach((el) => catObserver.observe(el));
}

/* =========================================================
   Geo
   ========================================================= */
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
      geoHint.textContent = `Closest branch: ${branch.town} (${distanceKm.toFixed(1)} km).`;
    },
    (err) => {
      if (err.code === err.PERMISSION_DENIED) geoHint.textContent = "Location permission denied.";
      else geoHint.textContent = "Could not get your location.";
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
  );
});

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

/* =========================================================
   Hero slider (simple)
   Replace these with your 6 Wix images if you have them locally.
   ========================================================= */
const HERO_IMAGES = [
  "assets/mae-mu-I7A_pHLcQK8-unsplash.jpg",
  "assets/mae-mu-I7A_pHLcQK8-unsplash.jpg",
  "assets/mae-mu-I7A_pHLcQK8-unsplash.jpg",
  "assets/mae-mu-I7A_pHLcQK8-unsplash.jpg",
  "assets/mae-mu-I7A_pHLcQK8-unsplash.jpg",
  "assets/mae-mu-I7A_pHLcQK8-unsplash.jpg",
];

let heroPos = 0;

function renderHero() {
  if (!heroImg) return;
  heroTotal.textContent = String(HERO_IMAGES.length);
  heroIndex.textContent = String(heroPos + 1);
  heroImg.src = HERO_IMAGES[heroPos];
}

function heroStep(delta) {
  heroPos = (heroPos + delta + HERO_IMAGES.length) % HERO_IMAGES.length;
  renderHero();
}

if (heroPrev) heroPrev.addEventListener("click", () => heroStep(-1));
if (heroNext) heroNext.addEventListener("click", () => heroStep(1));

/* =========================================================
   Init
   ========================================================= */
(function init() {
  // Locations
  renderSelectOptions();
  renderStoreGrid(BRANCHES);
  setSelectedBranch(null);

  // Hero
  renderHero();

  // Menu (API first, fallback if fails)
  loadMenuFromProxy()
    .then(() => renderMenuSections())
    .catch((err) => {
      console.warn("Menu load failed, using fallback MENU:", err);
      menuStatus.textContent = "Menu unavailable right now. (Fallback loaded.)";
      renderMenuSections();
    });
})();
