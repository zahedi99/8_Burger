/* =========================================================
   BRANCHES
   ========================================================= */
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
   MENU proxy
   ========================================================= */
const MENU_PROXY_ENDPOINT =
  "https://burger8-menu-proxy.parsazahedi78.workers.dev/menu";

/* =========================================================
   LOCAL MENU IMAGES
   ========================================================= */
const IMAGE_BASE = "assets/PNG-20260116T144520Z-3-001/PNG";

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

const LOADED_FRIES_IMAGES = {
  "bbq bacon loaded fries": `${IMAGE_BASE}/Loaded Fries/BBQ Bacon Loaded Fries.png`,
  "burger loaded fries": `${IMAGE_BASE}/Loaded Fries/Burger Loaded Fries.png`,
  "chicken loaded fries": `${IMAGE_BASE}/Loaded Fries/Chicken Loaded Fries.png`,
  "original loaded fries": `${IMAGE_BASE}/Loaded Fries/Original Loaded Fries.png`,
  "spicy loaded fries": `${IMAGE_BASE}/Loaded Fries/Spicy Loaded Fries.png`,
};

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

/* =========================================================
   DOM
   ========================================================= */
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

/* Item modal */
const menuModal = document.getElementById("menuModal");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalPrice = document.getElementById("modalPrice");
const modalLines = document.getElementById("modalLines");
const modalAddToCart = document.getElementById("modalAddToCart");

/* hero slider */
const heroImg = document.getElementById("heroImg");
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");
const heroIndex = document.getElementById("heroIndex");
const heroTotal = document.getElementById("heroTotal");

/* Cart DOM */
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const cartList = document.getElementById("cartList");
const cartEmpty = document.getElementById("cartEmpty");
const cartItemsCount = document.getElementById("cartItemsCount");
const cartTotal = document.getElementById("cartTotal");
const cartClear = document.getElementById("cartClear");
const cartCheckout = document.getElementById("cartCheckout");
const cartHint = document.getElementById("cartHint");

/* =========================================================
   Helpers
   ========================================================= */
if (yearEl) yearEl.textContent = new Date().getFullYear();

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

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
    if (!Number.isFinite(b.lat) || !Number.isFinite(b.lon)) continue;
    const d = haversineKm(userLat, userLon, b.lat, b.lon);
    if (d < bestDist) {
      bestDist = d;
      best = b;
    }
  }
  return { branch: best, distanceKm: bestDist };
}

/* =========================================================
   CART (pre-order)
   ========================================================= */
const CART_KEY = "burger8_cart_v1";
let CART = []; // [{id,name,price,qty,category}]

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    CART = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(CART)) CART = [];
  } catch {
    CART = [];
  }
}
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(CART));
}
function cartCountTotal() {
  return CART.reduce((s, it) => s + (it.qty || 0), 0);
}
function cartTotalPrice() {
  return CART.reduce((s, it) => s + (Number(it.price) || 0) * (it.qty || 0), 0);
}

function openCart() {
  if (!cartDrawer) return;
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  if (!cartDrawer) return;
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderCart() {
  if (!cartList) return;

  const count = cartCountTotal();
  if (cartCount) cartCount.textContent = String(count);
  if (cartItemsCount) cartItemsCount.textContent = String(count);
  if (cartTotal) cartTotal.textContent = moneyGBP(cartTotalPrice());

  if (cartHint) cartHint.textContent = "";

  cartList.innerHTML = "";
  const empty = CART.length === 0;
  if (cartEmpty) cartEmpty.style.display = empty ? "block" : "none";
  if (empty) return;

  for (const item of CART) {
    const row = document.createElement("div");
    row.className = "cartItem";

    row.innerHTML = `
      <div>
        <div class="cartItem__name">${escapeHtml(item.name)}</div>
        <div class="cartItem__meta">${escapeHtml(item.category || "")} • ${moneyGBP(Number(item.price) || 0)}</div>
      </div>
      <div class="cartItem__right">
        <div class="qty">
          <button class="qtyBtn" type="button" data-act="dec" data-id="${escapeHtml(item.id)}">−</button>
          <div class="qtyVal">${item.qty}</div>
          <button class="qtyBtn" type="button" data-act="inc" data-id="${escapeHtml(item.id)}">+</button>
        </div>
        <button class="removeBtn" type="button" data-act="rm" data-id="${escapeHtml(item.id)}">Remove</button>
      </div>
    `;

    cartList.appendChild(row);
  }

  cartList.querySelectorAll("button[data-act]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const act = btn.getAttribute("data-act");
      const id = btn.getAttribute("data-id");
      if (!id) return;

      if (act === "inc") cartAdjust(id, +1);
      if (act === "dec") cartAdjust(id, -1);
      if (act === "rm") cartRemove(id);
    });
  });
}

function cartAdd(menuItem) {
  if (!menuItem || !menuItem.id) return;
  const id = String(menuItem.id);
  const existing = CART.find((x) => x.id === id);
  if (existing) existing.qty += 1;
  else {
    CART.push({
      id,
      name: String(menuItem.name || "Item"),
      price: Number(menuItem.price) || 0,
      qty: 1,
      category: String(menuItem.category || "Menu"),
    });
  }
  saveCart();
  renderCart();
}

function cartAdjust(id, delta) {
  const it = CART.find((x) => x.id === id);
  if (!it) return;
  it.qty += delta;
  if (it.qty <= 0) CART = CART.filter((x) => x.id !== id);
  saveCart();
  renderCart();
}

function cartRemove(id) {
  CART = CART.filter((x) => x.id !== id);
  saveCart();
  renderCart();
}

function cartClearAll() {
  CART = [];
  saveCart();
  renderCart();
}

function buildOrderSummaryText(branch) {
  const lines = [];
  lines.push("Burger 8 — Order summary");
  if (branch) lines.push(`Branch: ${branch.name}`);
  lines.push("");

  CART.forEach((it) => {
    const itemTotal = (Number(it.price) || 0) * (it.qty || 0);
    lines.push(`${it.qty} x ${it.name}  (${moneyGBP(itemTotal)})`);
  });

  lines.push("");
  lines.push(`Total: ${moneyGBP(cartTotalPrice())}`);
  return lines.join("\n");
}

/* Cart UI events */
cartBtn?.addEventListener("click", () => {
  openCart();
  renderCart();
});
cartDrawer?.addEventListener("click", (e) => {
  if (e.target?.dataset?.cartClose === "1") closeCart();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && cartDrawer?.classList.contains("is-open")) closeCart();
});
cartClear?.addEventListener("click", () => cartClearAll());

cartCheckout?.addEventListener("click", async () => {
  if (CART.length === 0) {
    if (cartHint) cartHint.textContent = "Add items to your cart first.";
    return;
  }

  const branchId = branchSelect?.value || "";
  const branch = BRANCHES.find((b) => b.id === branchId) || null;

  if (!branch) {
    if (cartHint) cartHint.textContent = "Select a branch before checkout.";
    document.getElementById("locations")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const summary = buildOrderSummaryText(branch);

  try {
    await navigator.clipboard.writeText(summary);
    if (cartHint) cartHint.textContent = "Order summary copied. Opening branch checkout…";
  } catch {
    if (cartHint) cartHint.textContent = "Opening branch checkout… (could not auto-copy)";
  }

  window.open(branch.orderUrl, "_blank", "noopener,noreferrer");
});

/* =========================================================
   Branch rendering
   ========================================================= */
function renderSelectOptions() {
  if (!branchSelect) return;
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
      <h3 class="store__name">${escapeHtml(branch.town)}</h3>
      <span class="store__badge">${escapeHtml(branch.postcode || "Branch")}</span>
    </div>
    <p class="store__addr">${escapeHtml(branch.name)}</p>
    <div class="store__actions">
      <button class="smallBtn smallBtn--primary" type="button">Select</button>
      <a class="smallBtn" href="${branch.mapsUrl}" target="_blank" rel="noopener noreferrer">Directions</a>
    </div>
  `;

  const selectBtn = card.querySelector("button");
  selectBtn.addEventListener("click", () => {
    if (branchSelect) branchSelect.value = branch.id;
    setSelectedBranch(branch, { panMap: true, openPopup: true });
  });

  card.addEventListener("click", (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (tag === "a" || tag === "button") return;
    if (branchSelect) branchSelect.value = branch.id;
    setSelectedBranch(branch, { panMap: true, openPopup: true });
  });

  return card;
}

function renderStoreGrid(list) {
  if (!storeGrid) return;
  storeGrid.innerHTML = "";
  list.forEach((b) => storeGrid.appendChild(createStoreCard(b)));
  highlightSelected(branchSelect?.value || null);
}

function highlightSelected(branchId) {
  document.querySelectorAll(".store").forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.id === branchId);
  });
}

function setSelectedBranch(branch, opts = { panMap: false, openPopup: false }) {
  if (!branch) {
    setOrderEnabled(false, "#locations");
    highlightSelected(null);
    if (opts.panMap) panMapToAllBranches();
    return;
  }

  setOrderEnabled(true, branch.orderUrl);
  highlightSelected(branch.id);

  if (opts.panMap) panMapToBranch(branch.id);
  if (opts.openPopup) openBranchPopup(branch.id);
}

/* =========================================================
   Leaflet map
   ========================================================= */
let branchMap = null;
let branchLayer = null;
let userMarker = null;
const branchMarkersById = new Map();

function initBranchMap() {
  const mapEl = document.getElementById("branchMap");
  if (!mapEl || typeof L === "undefined") return;

  const points = BRANCHES
    .filter((b) => Number.isFinite(b.lat) && Number.isFinite(b.lon))
    .map((b) => [b.lat, b.lon]);

  const defaultCenter = points.length ? points[0] : [54.97, -1.6];

  branchMap = L.map("branchMap", { scrollWheelZoom: false }).setView(defaultCenter, 9);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(branchMap);

  branchLayer = L.layerGroup().addTo(branchMap);

  branchMarkersById.clear();
  branchLayer.clearLayers();

  for (const b of BRANCHES) {
    if (!Number.isFinite(b.lat) || !Number.isFinite(b.lon)) continue;

    const marker = L.marker([b.lat, b.lon], { title: b.name });

    const popupHtml = `
      <div style="font-weight:900;letter-spacing:.06em;text-transform:uppercase;">
        ${escapeHtml(b.town)}
      </div>
      <div style="margin-top:4px;color:#555;">
        ${escapeHtml(b.name)}
      </div>
      <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">
        <button data-branch="${escapeHtml(b.id)}"
          style="cursor:pointer;border:0;padding:8px 10px;border-radius:10px;background:#d1162c;color:#fff;font-weight:900;letter-spacing:.06em;text-transform:uppercase;font-size:11px;">
          Select
        </button>
        <a href="${b.mapsUrl}" target="_blank" rel="noopener noreferrer"
          style="text-decoration:none;border:1px solid rgba(0,0,0,.14);padding:8px 10px;border-radius:10px;color:#111;font-weight:900;letter-spacing:.06em;text-transform:uppercase;font-size:11px;">
          Directions
        </a>
      </div>
    `;

    marker.bindPopup(popupHtml);
    marker.addTo(branchLayer);

    marker.on("click", () => {
      if (branchSelect) branchSelect.value = b.id;
      setSelectedBranch(b, { panMap: false, openPopup: true });
    });

    branchMarkersById.set(b.id, marker);
  }

  if (points.length) {
    const bounds = L.latLngBounds(points);
    branchMap.fitBounds(bounds.pad(0.2));
  }

  branchMap.on("popupopen", (e) => {
    const node = e.popup.getElement();
    if (!node) return;
    const btn = node.querySelector("button[data-branch]");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-branch");
      const b = BRANCHES.find((x) => x.id === id);
      if (!b) return;
      if (branchSelect) branchSelect.value = b.id;
      setSelectedBranch(b, { panMap: true, openPopup: true });
    });
  });
}

function panMapToAllBranches() {
  if (!branchMap) return;
  const points = BRANCHES
    .filter((b) => Number.isFinite(b.lat) && Number.isFinite(b.lon))
    .map((b) => [b.lat, b.lon]);
  if (!points.length) return;
  const bounds = L.latLngBounds(points);
  branchMap.fitBounds(bounds.pad(0.2));
}

function panMapToBranch(branchId) {
  if (!branchMap) return;
  const marker = branchMarkersById.get(branchId);
  if (!marker) return;
  const latlng = marker.getLatLng();
  branchMap.setView(latlng, Math.max(branchMap.getZoom(), 13), { animate: true });
}

function openBranchPopup(branchId) {
  if (!branchMap) return;
  const marker = branchMarkersById.get(branchId);
  if (!marker) return;
  marker.openPopup();
}

/* =========================================================
   Geo button
   ========================================================= */
geoBtn?.addEventListener("click", () => {
  if (geoHint) geoHint.textContent = "Requesting location…";

  if (!navigator.geolocation) {
    if (geoHint) geoHint.textContent = "Geolocation is not supported in this browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      const { branch, distanceKm } = findClosestBranch(latitude, longitude);

      if (branchMap && typeof L !== "undefined") {
        if (userMarker) userMarker.remove();
        userMarker = L.circleMarker([latitude, longitude], {
          radius: 7,
          weight: 2,
          color: "#111",
          fillColor: "#111",
          fillOpacity: 0.9,
        })
          .addTo(branchMap)
          .bindPopup("You are here");
      }

      if (!branch) {
        if (geoHint) geoHint.textContent = "Could not find a nearby branch.";
        return;
      }

      if (branchSelect) branchSelect.value = branch.id;
      setSelectedBranch(branch, { panMap: true, openPopup: true });
      if (geoHint) geoHint.textContent = `Closest branch: ${branch.town} (${distanceKm.toFixed(1)} km).`;
    },
    (err) => {
      if (!geoHint) return;
      if (err.code === err.PERMISSION_DENIED) geoHint.textContent = "Location permission denied.";
      else geoHint.textContent = "Could not get your location.";
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
  );
});

branchSelect?.addEventListener("change", () => {
  const id = branchSelect.value;
  const branch = BRANCHES.find((b) => b.id === id) || null;
  if (geoHint) geoHint.textContent = "";
  setSelectedBranch(branch, { panMap: true, openPopup: true });
});

clearBranch?.addEventListener("click", () => {
  if (branchSelect) branchSelect.value = "";
  if (geoHint) geoHint.textContent = "";
  setSelectedBranch(null, { panMap: true, openPopup: false });
});

/* =========================================================
   MENU: 
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

function toImageFromStoreApi(p) {
  const src = p?.images?.[0]?.src;
  return typeof src === "string" && src.trim().length > 0 ? src : "";
}

async function loadMenuFromProxy() {
  if (menuStatus) menuStatus.textContent = "Loading menu…";

  const res = await fetch(MENU_PROXY_ENDPOINT, { method: "GET" });
  if (!res.ok) throw new Error(`Menu proxy HTTP ${res.status}`);

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Menu proxy returned non-array JSON");

  const categoryCounters = {};
  const mapped = data.map((p) => {
    const category = toCategoryFromStoreApi(p);
    const price = toPriceNumberFromStoreApi(p);
    const desc = stripHtml(p?.short_description || p?.description || "");
    const apiImg = toImageFromStoreApi(p);

    const idx = categoryCounters[category] ?? 0;
    categoryCounters[category] = idx + 1;

    const nameKey = String(p?.name || "").toLowerCase().trim();

    let localImg = "";
    if (category === "Loaded Fries") {
      localImg = LOADED_FRIES_IMAGES[nameKey] || "";
    }
    if (!localImg) {
      localImg = LOCAL_IMAGE_MAP[category]?.[idx] || "";
    }

    return {
      id: String(p?.id ?? crypto.randomUUID()),
      name: String(p?.name ?? "Item").toUpperCase(),
      category: String(category || "Menu"),
      price,
      description: desc,
      image: localImg || apiImg || "",
    };
  });

  MENU = mapped.filter((x) => x.name && x.name.trim().length > 0);
  if (menuStatus) menuStatus.textContent = MENU.length ? "" : "Menu is empty.";
}

/* =========================================================
    category bar + sections
   ========================================================= */
const CATEGORY_ORDER = ["Specials", "Burgers", "Loaded Fries", "Wings", "Milkshakes", "Sides", "Sauces"];

function normalizeCat(c) {
  return String(c || "").trim();
}

function getCategoriesOrdered() {
  const set = new Set(MENU.map((x) => normalizeCat(x.category)));
  const cats = Array.from(set);

  const ordered = [];
  for (const c of CATEGORY_ORDER) if (cats.includes(c)) ordered.push(c);

  const leftovers = cats.filter((c) => !ordered.includes(c)).sort((a, b) => a.localeCompare(b));
  return [...ordered, ...leftovers];
}

function splitToLines(item) {
  const raw = String(item.description || "")
    .replace(/\r/g, "")
    .replace(/•/g, ",")
    .replace(/\|/g, ",")
    .trim();

  if (!raw) return [];
  const parts = raw.split(/\n|,/).map((s) => s.trim()).filter(Boolean);
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
  if (!catBar) return;
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
  if (!menuSections) return;
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

    items.forEach((item) => {
      const row = document.createElement("article");
      row.className = "menuItem";
      row.tabIndex = 0;

      const img = hasImage(item)
        ? `<img class="menuItem__img" src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy" />`
        : `<div class="menuItem__img" aria-hidden="true"></div>`;

      const lines = splitToLines(item)
        .slice(0, 18)
        .map((l) => `<div class="line">${escapeHtml(l)}</div>`)
        .join("");

      row.innerHTML = `
        <div class="menuItem__left">${img}</div>
        <div class="menuItem__right">
          <div class="menuItem__meta">
            <h3 class="menuItem__name">${escapeHtml(item.name)}</h3>
            <div class="menuItem__price">${moneyGBP(item.price)}</div>
          </div>
          <div class="menuItem__lines">${lines}</div>
          <div class="menuItem__row">
            <button class="addBtn" type="button">ADD</button>
            <a class="smallLink" href="#" onclick="return false;">ALLERGENS</a>
          </div>
        </div>
      `;

      // Click row -> modal (but not when clicking ADD)
      const open = () => openMenuModal(item);
      row.addEventListener("click", (e) => {
        const tag = e.target.tagName.toLowerCase();
        if (tag === "a" || tag === "button") return;
        open();
      });
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });

      // ADD button
      const addBtn = row.querySelector("button.addBtn");
      addBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        cartAdd(item);
        openCart();
      });

      section.appendChild(row);
    });

    menuSections.appendChild(section);
  });

  setupActiveCategoryObserver();
}

/* =========================================================
   Modal
   ========================================================= */
function openMenuModal(item) {
  if (!menuModal) return;

  if (modalTitle) modalTitle.textContent = item.name;
  if (modalCategory) modalCategory.textContent = (item.category || "Menu").toUpperCase();
  if (modalPrice) modalPrice.textContent = moneyGBP(item.price);

  if (modalLines) {
    modalLines.innerHTML = "";
    splitToLines(item).slice(0, 24).forEach((l) => {
      const div = document.createElement("div");
      div.className = "line";
      div.textContent = l;
      modalLines.appendChild(div);
    });
  }

  if (modalAddToCart) {
    modalAddToCart.onclick = () => {
      cartAdd(item);
      closeMenuModal();
      openCart();
    };
  }

  menuModal.classList.add("is-open");
  menuModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeMenuModal() {
  if (!menuModal) return;
  menuModal.classList.remove("is-open");
  menuModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

menuModal?.addEventListener("click", (e) => {
  const close = e.target?.dataset?.close === "1";
  if (close) closeMenuModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuModal?.classList.contains("is-open")) closeMenuModal();
});

/* =========================================================
   Active category highlighting
   ========================================================= */
let catObserver = null;

function setupActiveCategoryObserver() {
  if (catObserver) catObserver.disconnect();

  const catIds = getCategoriesOrdered().map((cat) => `cat-${cat.toLowerCase().replace(/\s+/g, "-")}`);
  const els = catIds.map((id) => document.getElementById(id)).filter(Boolean);
  if (!els.length) return;

  catObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const id = visible.target.id.replace("cat-", "");
      const activeCat = id
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      renderCategoryBar(activeCat);
    },
    { root: null, threshold: [0.12, 0.2, 0.35, 0.5] }
  );

  els.forEach((el) => catObserver.observe(el));
}

/* =========================================================
   Hero slider
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
  if (heroTotal) heroTotal.textContent = String(HERO_IMAGES.length);
  if (heroIndex) heroIndex.textContent = String(heroPos + 1);
  heroImg.src = HERO_IMAGES[heroPos];
}
function heroStep(delta) {
  heroPos = (heroPos + delta + HERO_IMAGES.length) % HERO_IMAGES.length;
  renderHero();
}
heroPrev?.addEventListener("click", () => heroStep(-1));
heroNext?.addEventListener("click", () => heroStep(1));

/* =========================================================
   INIT
   ========================================================= */
(function init() {
  loadCart();
  renderCart();

  renderSelectOptions();
  renderStoreGrid(BRANCHES);
  setSelectedBranch(null);

  initBranchMap();
  renderHero();

  loadMenuFromProxy()
    .then(() => renderMenuSections())
    .catch((err) => {
      console.warn("Menu load failed, using fallback MENU:", err);
      if (menuStatus) menuStatus.textContent = "Menu unavailable right now. (Fallback loaded.)";
      renderMenuSections();
    });
})();
