/* =========================================================
   Burger 8 — Landing Page JS (Branches + Menu via Proxy)
   ========================================================= */

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
    mapsUrl: "https://www.google.com/maps?q=Burger%208%20Hartlepool"
  },
  {
    id: "benton",
    name: "Burger 8 — Benton",
    town: "Benton",
    postcode: "",
    lat: 55.007947172166844,
    lon: -1.5782965020026007,
    orderUrl: "https://burger8benton.briteat.co.uk/",
    mapsUrl: "https://www.google.com/maps?q=Burger%208%20Benton"
  },
  {
    id: "easington",
    name: "Burger 8 — Easington",
    town: "Easington",
    postcode: "",
    lat: 54.78825128410204,
    lon: -1.3255925253066914,
    orderUrl: "https://burger8easington.briteat.co.uk/",
    mapsUrl: "https://www.google.com/maps?q=Burger%208%20Easington"
  },
  {
    id: "ashington",
    name: "Burger 8 — Ashington",
    town: "Ashington",
    postcode: "",
    lat: 55.183361786072375,
    lon: -1.571623667610947,
    orderUrl: "https://burger8ashington.briteat.co.uk/",
    mapsUrl: "https://www.google.com/maps?q=Burger%208%20Ashington"
  },
  {
    id: "birtley",
    name: "Burger 8 — Birtley",
    town: "Birtley",
    postcode: "",
    lat: 54.89415511371937,
    lon: -1.5768603081097352,
    orderUrl: "https://burger8birtley.briteat.co.uk/",
    mapsUrl: "https://www.google.com/maps?q=Burger%208%20Birtley"
  },
  {
    id: "blyth",
    name: "Burger 8 — Blyth",
    town: "Blyth",
    postcode: "",
    lat: 55.126359423544635,
    lon: -1.510574867614533,
    orderUrl: "https://burger8blyth.briteat.co.uk/",
    mapsUrl: "https://www.google.com/maps?q=Burger%208%20Blyth"
  },
  {
    id: "bedlington",
    name: "Burger 8 — Bedlington",
    town: "Bedlington",
    postcode: "",
    lat: 55.140780449160076,
    lon: -1.5668576467265456,
    orderUrl: "https://burger8bedlington.briteat.co.uk/",
    mapsUrl: "https://www.google.com/maps?q=Burger%208%20Bedlington"
  }
];

/* =========================================================
   MENU: Pull full menu through your Cloudflare Worker
   =========================================================
   Your worker already supports:
   https://burger8-menu-proxy.parsazahedi78.workers.dev/menu
*/
const MENU_PROXY_ENDPOINT = "https://burger8-menu-proxy.parsazahedi78.workers.dev/menu";

/* fallback menu (only used if proxy fails) */
let MENU = [
  { id: "classic-cheeseburger", name: "Classic Cheeseburger", category: "Burgers", price: 9.5, description: "Smashed beef, cheddar, pickles, house sauce.", tags: ["Beef"] },
  { id: "crispy-chicken", name: "Crispy Chicken Burger", category: "Burgers", price: 10.5, description: "Crispy chicken, lettuce, mayo, pickles.", tags: ["Chicken"] },
  { id: "classic-wings", name: "Classic Wings", category: "Wings", price: 7.0, description: "Crispy wings — choose your flavour.", tags: ["Wings"] },
  { id: "loaded-fries", name: "Loaded Fries", category: "Loaded Fries", price: 8.2, description: "Fries, cheese sauce, toppings.", tags: ["Loaded"] },
  { id: "vanilla-shake", name: "Vanilla Milkshake", category: "Milkshakes", price: 6.5, description: "Creamy shake (470ml).", tags: ["Milkshake"] },
  { id: "cola", name: "Cola", category: "Drinks", price: 2.0, description: "Chilled can/bottle.", tags: ["Cold"] }
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

document.getElementById("year").textContent = new Date().getFullYear();

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

function highlightSelected(branchId) {
  document.querySelectorAll(".store").forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.id === branchId);
  });
}

/* Haversine distance (km) */
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
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

/* ---------- Render: Branches ---------- */
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

/* ---------- MENU: Convert proxy JSON → our menu model ---------- */
function toPriceNumberFromStoreApi(p) {
  // Woo store API often provides minor units as string: "999" with currency_minor_unit: 2
  try {
    const minorUnit = Number(p?.prices?.currency_minor_unit ?? 2);
    const raw = p?.prices?.price;
    if (raw == null) return NaN;
    const n = Number(raw);
    if (Number.isNaN(n)) return NaN;
    return n / (10 ** minorUnit);
  } catch {
    return NaN;
  }
}

function toCategoryFromStoreApi(p) {
  const cat = (p?.categories && p.categories[0] && p.categories[0].name) ? p.categories[0].name : "Menu";
  return cat;
}

function toTagsFromStoreApi(p) {
  const tags = [];
  if (p?.type) tags.push(String(p.type).toUpperCase());
  if (Array.isArray(p?.categories)) {
    p.categories.slice(0, 2).forEach(c => c?.name && tags.push(c.name));
  }
  return Array.from(new Set(tags)).slice(0, 4);
}

async function loadMenuFromProxy() {
  menuStatus.textContent = "Loading menu…";

  const res = await fetch(MENU_PROXY_ENDPOINT, { method: "GET" });
  if (!res.ok) throw new Error(`Menu proxy HTTP ${res.status}`);

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Menu proxy returned non-array JSON");

  const mapped = data.map((p) => {
    const price = toPriceNumberFromStoreApi(p);
    const desc = stripHtml(p?.short_description || p?.description || "");
    return {
      id: String(p?.id ?? crypto.randomUUID()),
      name: String(p?.name ?? "Item"),
      category: toCategoryFromStoreApi(p),
      price: price,
      description: desc,
      tags: toTagsFromStoreApi(p)
    };
  });

  // remove empty names
  MENU = mapped.filter(x => x.name && x.name.trim().length > 0);

  menuStatus.textContent = MENU.length ? "" : "Menu is empty.";
}

/* ---------- Render: Menu ---------- */
let activeCategory = "All";

function getCategories() {
  const set = new Set(MENU.map((x) => x.category));
  return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
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
      renderTabs();
      renderMenuGrid();
    });

    menuTabs.appendChild(btn);
  });
}

function matchesSearch(item, q) {
  if (!q) return true;
  const hay = `${item.name} ${item.description || ""} ${(item.tags || []).join(" ")} ${item.category}`.toLowerCase();
  return hay.includes(q);
}

function getFilteredMenu() {
  const q = (menuSearch?.value || "").trim().toLowerCase();
  return MENU.filter((item) => {
    const catOk = activeCategory === "All" ? true : item.category === activeCategory;
    return catOk && matchesSearch(item, q);
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

  el.innerHTML = `
    <div class="menuItem__top">
      <h3 class="menuItem__name">${item.name}</h3>
      <span class="menuItem__price">${moneyGBP(item.price)}</span>
    </div>
    <p class="menuItem__desc">${item.description || ""}</p>
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

// Force-close mobile menu on desktop widths
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
      geoHint.textContent = `Closest branch: ${branch.town} (${distanceKm.toFixed(1)} km).`;
      document.getElementById("locations").scrollIntoView({ behavior: "smooth", block: "start" });
    },
    (err) => {
      if (err.code === err.PERMISSION_DENIED) geoHint.textContent = "Location permission denied.";
      else geoHint.textContent = "Could not get your location.";
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
  );
});

/* Menu search */
menuSearch.addEventListener("input", () => renderMenuGrid());

/* ---------- Init ---------- */
(function init() {
  syncMobileMenuForDesktop();

  renderSelectOptions();
  renderStoreGrid(BRANCHES);
  setSelectedBranch(null);

  // Try load real menu from proxy; fallback if it fails
  loadMenuFromProxy()
    .then(() => {
      // If URL hash suggests a menu category, you can auto-select later.
      activeCategory = "All";
      renderTabs();
      renderMenuGrid();

      // Optional: if they arrive at #menu-burgers -> pick Burgers if exists
      const hash = (location.hash || "").toLowerCase();
      if (hash.includes("menu")) {
        const cats = getCategories();
        const preferred = cats.find(c => c.toLowerCase() === "burgers");
        if (preferred) {
          activeCategory = preferred;
          renderTabs();
          renderMenuGrid();
        }
      }
    })
    .catch((err) => {
      console.warn("Menu load failed, using fallback MENU:", err);
      menuStatus.textContent = "Menu unavailable right now. (Fallback loaded.)";
      activeCategory = "All";
      renderTabs();
      renderMenuGrid();
    });
})();
