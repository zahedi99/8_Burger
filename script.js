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
   LOCAL MENU IMAGES (ALL PNGs)
   IMPORTANT: filenames must match your assets exactly
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

  "Loaded Fries": [
    `${IMAGE_BASE}/Loaded Fries/BBQ Bacon Loaded Fries.png`,
    `${IMAGE_BASE}/Loaded Fries/Burger Loaded Fries.png`,
    `${IMAGE_BASE}/Loaded Fries/Chicken Loaded Fries.png`,
    `${IMAGE_BASE}/Loaded Fries/Original Loaded Fries.png`,
    `${IMAGE_BASE}/Loaded Fries/Spicy Loaded Fries.png`,
  ],

  Sauces: [
    `${IMAGE_BASE}/Sauces/BBQ Sauce.png`,
    `${IMAGE_BASE}/Sauces/Buffalo Sauce.png`,
    `${IMAGE_BASE}/Sauces/Chipotle Sauce.png`,
    `${IMAGE_BASE}/Sauces/Garlic Mayo.png`,
    `${IMAGE_BASE}/Sauces/Ketchup.png`,
    `${IMAGE_BASE}/Sauces/Mayo.png`,
    `${IMAGE_BASE}/Sauces/Sriracha Sauce.png`,
    `${IMAGE_BASE}/Sauces/Sweet Chilli.png`,
  ],

  Shakes: [
    `${IMAGE_BASE}/Shakes/Biscoff.png`,
    `${IMAGE_BASE}/Shakes/Bubblegum.png`,
    `${IMAGE_BASE}/Shakes/Caramel.png`,
    `${IMAGE_BASE}/Shakes/DSC08103-Edit.png`,
    `${IMAGE_BASE}/Shakes/Kinder Bueno.png`,
    `${IMAGE_BASE}/Shakes/Malteaser.png`,
    `${IMAGE_BASE}/Shakes/Nutella.png`,
    `${IMAGE_BASE}/Shakes/Oreo.png`,
  ],

  Sides: [
    `${IMAGE_BASE}/Sides/Fries.png`,
    `${IMAGE_BASE}/Sides/Jalapeno Cheese Bites.png`,
    `${IMAGE_BASE}/Sides/Mozzerella Sticks.png`,
    `${IMAGE_BASE}/Sides/Onion Rings.png`,
    `${IMAGE_BASE}/Sides/Sweet Potato Fries.png`,
  ],

  Wings: [
    `${IMAGE_BASE}/Wings/BBQ Wings.png`,
    `${IMAGE_BASE}/Wings/Buffalo Wings.png`,
    `${IMAGE_BASE}/Wings/Chipotle Wings.png`,
    `${IMAGE_BASE}/Wings/Salt & Pepper Wings.png`,
    `${IMAGE_BASE}/Wings/Sriracha Wings.png`,
    `${IMAGE_BASE}/Wings/Sweet Chilli Wings.png`,
  ],
};

/* =========================================================
   SMART IMAGE RESOLVER v2
   ========================================================= */

// Map API category names -> your folder names
const CATEGORY_ALIAS = {
  Milkshakes: "Shakes",
  "Milk Shakes": "Shakes",
  Shake: "Shakes",
  "Loaded fries": "Loaded Fries",
  "Loaded Fries ": "Loaded Fries",
  Sauce: "Sauces",
  "Burger Sauces": "Sauces",
  Side: "Sides",
  "Wings ": "Wings",
};

function normalizeCategory(cat) {
  const c = String(cat || "").trim();
  return CATEGORY_ALIAS[c] || c;
}

function normKey(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function fileBase(path) {
  const p = String(path || "");
  const just = p.split("/").pop() || p;
  return just.replace(/\.[^.]+$/, "");
}

// category -> [{src, key, index, tokens}]
const LOCAL_LIST = (() => {
  const out = {};
  for (const [cat, arr] of Object.entries(LOCAL_IMAGE_MAP)) {
    out[cat] = arr.map((src, index) => {
      const base = fileBase(src);
      const key = normKey(base);
      const tokens = new Set(key.split(" ").filter(Boolean));
      return { src, key, index, tokens };
    });
  }
  return out;
})();

// Track used images per category so fallback assigns next unused one
const USED_LOCAL_INDEX = (() => {
  const out = {};
  for (const cat of Object.keys(LOCAL_IMAGE_MAP)) out[cat] = new Set();
  return out;
})();

function burgerNumberFromName(name) {
  const n = String(name || "").toUpperCase();
  let m = n.match(/#\s*(\d+)/);
  if (m) return Number(m[1]);
  m = n.match(/\bNO\.?\s*(\d+)\b/);
  if (m) return Number(m[1]);
  m = n.match(/^\s*(\d+)\b/);
  if (m) return Number(m[1]);
  return null;
}

function overlapScore(aTokens, bTokens) {
  if (!aTokens.size || !bTokens.size) return 0;
  let hit = 0;
  for (const t of aTokens) if (bTokens.has(t)) hit++;
  return hit / Math.max(aTokens.size, bTokens.size);
}

function bestMatchInCategory(category, itemName) {
  const list = LOCAL_LIST[category];
  if (!list || !list.length) return null;

  const itemKey = normKey(itemName);
  const itemTokens = new Set(itemKey.split(" ").filter(Boolean));

  const exact = list.find((x) => x.key === itemKey);
  if (exact) return exact;

  const contains = list.find((x) => itemKey.includes(x.key) || x.key.includes(itemKey));
  if (contains) return contains;

  let best = null;
  let bestScore = 0;
  for (const cand of list) {
    const s = overlapScore(itemTokens, cand.tokens);
    if (s > bestScore) {
      bestScore = s;
      best = cand;
    }
  }

  if (best && bestScore >= 0.34) return best;
  return null;
}

function nextUnusedInCategory(category) {
  const list = LOCAL_LIST[category];
  if (!list || !list.length) return null;

  const used = USED_LOCAL_INDEX[category] || new Set();
  const free = list.find((x) => !used.has(x.index));
  return free || list[0];
}

function resolveLocalImage(categoryRaw, itemNameRaw) {
  const category = normalizeCategory(categoryRaw);
  const name = String(itemNameRaw || "");

  if (category === "Burgers") {
    const num = burgerNumberFromName(name);
    if (num != null) {
      const targetKey1 = normKey(`No.${num}`);
      const targetKey2 = normKey(`No ${num}`);
      const list = LOCAL_LIST.Burgers || [];
      const hit =
        list.find((x) => x.key === targetKey1) ||
        list.find((x) => x.key === targetKey2);
      if (hit) {
        USED_LOCAL_INDEX.Burgers.add(hit.index);
        return hit;
      }
    }
  }

  const matched = bestMatchInCategory(category, name);
  if (matched) {
    USED_LOCAL_INDEX[category]?.add(matched.index);
    return matched;
  }

  const fallback = nextUnusedInCategory(category);
  if (fallback) {
    USED_LOCAL_INDEX[category]?.add(fallback.index);
    return fallback;
  }

  return null;
}

/* =========================================================
   MENU (fallback)
   ========================================================= */
let MENU = [
  {
    id: "fallback-1",
    name: "#1 CLASSIC",
    category: "Burgers",
    price: 10.6,
    description:
      "SERVED WITH SEASONED FRIES, 2 x SMASHED BEEF PATTIES, CHEESE, LETTUCE, RED ONION, DILL PICKLE, HOMEMADE BURGER SAUCE, TOASTED BRIOCHE BUN, LEVEL UP?, EXTRA TOPPINGS",
    image: `${IMAGE_BASE}/Burgers/No.1.png`,
    _localOrder: 0,
  },
];

/* =========================================================
   DOM
   ========================================================= */
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

/* hero slider */
const heroImg = document.getElementById("heroImg");
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");
const heroIndex = document.getElementById("heroIndex");
const heroTotal = document.getElementById("heroTotal");

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
  return Boolean(item?.image && String(item.image).trim().length > 0);
}

/* Featured = items with png image */
function hasPngImage(item) {
  const src = String(item?.image || "").trim();
  if (!src) return false;
  const clean = src.split("?")[0].toLowerCase();
  return clean.endsWith(".png");
}

/* Open selected branch page */
function openBranchSite(branch) {
  if (!branch?.orderUrl) return;
  window.open(branch.orderUrl, "_blank", "noopener,noreferrer");
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
    // Option A behavior: select -> open branch
    openBranchSite(branch);
  });

  card.addEventListener("click", (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (tag === "a" || tag === "button") return;

    if (branchSelect) branchSelect.value = branch.id;
    setSelectedBranch(branch, { panMap: true, openPopup: true });
    // Option A behavior: click card -> open branch
    openBranchSite(branch);
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
    highlightSelected(null);
    if (opts.panMap) panMapToAllBranches();
    return;
  }

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
    attribution: "&copy; OpenStreetMap contributors",
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
      // Keep map click as select-only (popup already open)
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

      // Option A behavior: selecting from map popup opens branch
      openBranchSite(b);
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
      if (geoHint)
        geoHint.textContent = `Closest branch: ${branch.town} (${distanceKm.toFixed(1)} km).`;

      // Option A behavior: using location -> open branch
      openBranchSite(branch);
    },
    (err) => {
      if (!geoHint) return;
      if (err.code === err.PERMISSION_DENIED) geoHint.textContent = "Location permission denied.";
      else geoHint.textContent = "Could not get your location.";
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
  );
});

/* =========================================================
   ✅ OPTION A: Dropdown selection opens branch immediately
   ========================================================= */
branchSelect?.addEventListener("change", () => {
  const id = branchSelect.value;
  const branch = BRANCHES.find((b) => b.id === id) || null;
  if (geoHint) geoHint.textContent = "";
  setSelectedBranch(branch, { panMap: true, openPopup: true });

  if (branch?.orderUrl) {
    openBranchSite(branch);
  }
});

clearBranch?.addEventListener("click", () => {
  if (branchSelect) branchSelect.value = "";
  if (geoHint) geoHint.textContent = "";
  setSelectedBranch(null, { panMap: true, openPopup: false });
});

/* =========================================================
   MENU: API mapping
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
    p?.categories && p.categories[0] && p.categories[0].name ? p.categories[0].name : "Menu";
  return cat;
}

function toImageFromStoreApi(p) {
  const src = p?.images?.[0]?.src;
  return typeof src === "string" && src.trim().length > 0 ? src : "";
}

async function loadMenuFromProxy() {
  if (menuStatus) menuStatus.textContent = "Loading menu…";

  // reset used markers per load so fallbacks distribute nicely
  for (const cat of Object.keys(USED_LOCAL_INDEX)) USED_LOCAL_INDEX[cat].clear();

  const res = await fetch(MENU_PROXY_ENDPOINT, { method: "GET" });
  if (!res.ok) throw new Error(`Menu proxy HTTP ${res.status}`);

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Menu proxy returned non-array JSON");

  const mapped = data.map((p) => {
    const rawCategory = toCategoryFromStoreApi(p);
    const category = normalizeCategory(rawCategory);

    const price = toPriceNumberFromStoreApi(p);
    const desc = stripHtml(p?.short_description || p?.description || "");
    const apiImg = toImageFromStoreApi(p);

    const nameRaw = String(p?.name ?? "Item");
    const name = nameRaw.toUpperCase();

    const localMatch = resolveLocalImage(category, nameRaw);
    const localImg = localMatch?.src || "";

    return {
      id: String(p?.id ?? crypto.randomUUID()),
      name,
      category: String(category || "Menu"),
      price,
      description: desc,
      image: localImg || apiImg || "",
      _localOrder: Number.isFinite(localMatch?.index) ? localMatch.index : 9999,
    };
  });

  MENU = mapped.filter((x) => x.name && x.name.trim().length > 0);
  if (menuStatus) menuStatus.textContent = MENU.length ? "" : "Menu is empty.";
}

/* =========================================================
    category bar + sections
   ========================================================= */
// Match VS Code folder order
const CATEGORY_ORDER = ["Burgers", "Loaded Fries", "Sauces", "Shakes", "Sides", "Wings", "Specials"];

function normalizeCat(c) {
  return String(c || "").trim();
}

function getCategoriesOrdered() {
  const set = new Set(MENU.map((x) => normalizeCat(x.category)));
  const cats = Array.from(set);

  const ordered = [];
  for (const c of CATEGORY_ORDER) if (cats.includes(c)) ordered.push(c);

  const leftovers = cats
    .filter((c) => !ordered.includes(c))
    .sort((a, b) => a.localeCompare(b));

  return ["Featured", ...ordered, ...leftovers];
}

function splitToLines(item) {
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

function getLocalOrderVal(x) {
  return Number.isFinite(x?._localOrder) ? x._localOrder : 9999;
}

function featuredCategoryRank(cat) {
  const order = ["Burgers", "Loaded Fries", "Sauces", "Shakes", "Sides", "Wings", "Specials"];
  const idx = order.indexOf(cat);
  return idx === -1 ? 9999 : idx;
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

    const items =
      cat === "Featured"
        ? MENU.filter(hasPngImage).sort((a, b) => {
            const ar = featuredCategoryRank(a.category);
            const br = featuredCategoryRank(b.category);
            if (ar !== br) return ar - br;

            const ao = getLocalOrderVal(a);
            const bo = getLocalOrderVal(b);
            if (ao !== bo) return ao - bo;

            return String(a.name || "").localeCompare(String(b.name || ""));
          })
        : MENU.filter((x) => normalizeCat(x.category) === cat).sort((a, b) => {
            const ao = getLocalOrderVal(a);
            const bo = getLocalOrderVal(b);
            if (ao !== bo) return ao - bo;
            return String(a.name || "").localeCompare(String(b.name || ""));
          });

    if (cat === "Featured" && items.length === 0) {
      const empty = document.createElement("div");
      empty.className = "status";
      empty.textContent = "No featured items yet.";
      section.appendChild(empty);
      menuSections.appendChild(section);
      return;
    }

    items.forEach((item) => {
      const row = document.createElement("article");
      row.className = "menuItem";
      row.tabIndex = 0;

      const img = hasImage(item)
        ? `<img class="menuItem__img" src="${item.image}" alt="${escapeHtml(
            item.name
          )}" loading="lazy" />`
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
        </div>
      `;

      const open = () => openMenuModal(item);

      row.addEventListener("click", open);
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
    splitToLines(item)
      .slice(0, 24)
      .forEach((l) => {
        const div = document.createElement("div");
        div.className = "line";
        div.textContent = l;
        modalLines.appendChild(div);
      });
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

  const catIds = getCategoriesOrdered().map(
    (cat) => `cat-${cat.toLowerCase().replace(/\s+/g, "-")}`
  );
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
