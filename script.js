/* =========================================================
   Burger 8 — script.js (FULL)
========================================================= */

/* ================= HERO SLIDESHOW (ALL JPGs + SHUFFLE) ================= */

const HERO_BASE =
  "assets/1350 x 1080 - Social Posts-20260207T153633Z-3-001/1350 x 1080 - Social Posts";

// Burgers: No.1.jpg → No.8.jpg
const HERO_BURGERS = Array.from({ length: 8 }, (_, i) => `${HERO_BASE}/Burgers/No.${i + 1}.jpg`);

// Sides (JPG)
const HERO_SIDES = [
  `${HERO_BASE}/Sides/Cheesy Jalapeno Bites.jpg`,
  `${HERO_BASE}/Sides/Curly Fries.jpg`,
  `${HERO_BASE}/Sides/Fries.jpg`,
  `${HERO_BASE}/Sides/Mozzerella Sticks.jpg`,
  `${HERO_BASE}/Sides/Onion Rings.jpg`,
  `${HERO_BASE}/Sides/Sweet Potato Fries.jpg`,
];

// Shakes (JPG)
const HERO_SHAKES = [
  `${HERO_BASE}/Shakes/Malteaser.jpg`,
  `${HERO_BASE}/Shakes/Mint Aero.jpg`,
  `${HERO_BASE}/Shakes/Mint Aero Single.jpg`,
  `${HERO_BASE}/Shakes/Nutella.jpg`,
  `${HERO_BASE}/Shakes/Nutella Single.jpg`,
  `${HERO_BASE}/Shakes/Oreo.jpg`,
  `${HERO_BASE}/Shakes/Oreo Single.jpg`,
];

const HERO_IMAGES = [
  ...HERO_BURGERS,
  ...HERO_SIDES,
  ...HERO_SHAKES,
];

function initHeroSlideshow() {
  const track = document.getElementById("heroTrack");
  if (!track) return;

  track.innerHTML = "";

  // Shuffle each refresh (Fisher–Yates)
  const slides = HERO_IMAGES.slice();
  for (let i = slides.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [slides[i], slides[j]] = [slides[j], slides[i]];
  }

  slides.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Burger 8 slide ${i + 1}`;
    img.loading = i === 0 ? "eager" : "lazy";
    track.appendChild(img);
  });

  const imgs = track.querySelectorAll("img");
  if (imgs.length <= 1) return;

  let index = 0;
  const count = imgs.length;

  setInterval(() => {
    index = (index + 1) % count;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, 4000);
}

/* ===================== BRANCHES ===================== */
const BRANCHES = [
  { id:"hartlepool", name:"Burger 8 — Hartlepool", town:"Hartlepool", lat:54.70705484704487, lon:-1.2214848646442373, orderUrl:"https://burger8hartlepool.briteat.co.uk/", mapsUrl:"https://www.google.com/maps?q=Burger%208%20Hartlepool" },
  { id:"benton", name:"Burger 8 — Benton", town:"Benton", lat:55.007947172166844, lon:-1.5782965020026007, orderUrl:"https://burger8benton.briteat.co.uk/", mapsUrl:"https://www.google.com/maps?q=Burger%208%20Benton" },
  { id:"easington", name:"Burger 8 — Easington", town:"Easington", lat:54.78825128410204, lon:-1.3255925253066914, orderUrl:"https://burger8easington.briteat.co.uk/", mapsUrl:"https://www.google.com/maps?q=Burger%208%20Easington" },
  { id:"ashington", name:"Burger 8 — Ashington", town:"Ashington", lat:55.183361786072375, lon:-1.571623667610947, orderUrl:"https://burger8ashington.briteat.co.uk/", mapsUrl:"https://www.google.com/maps?q=Burger%208%20Ashington" },
  { id:"birtley", name:"Burger 8 — Birtley", town:"Birtley", lat:54.89415511371937, lon:-1.5768603081097352, orderUrl:"https://burger8birtley.briteat.co.uk/", mapsUrl:"https://www.google.com/maps?q=Burger%208%20Birtley" },
  { id:"blyth", name:"Burger 8 — Blyth", town:"Blyth", lat:55.126359423544635, lon:-1.510574867614533, orderUrl:"https://burger8blyth.briteat.co.uk/", mapsUrl:"https://www.google.com/maps?q=Burger%208%20Blyth" },
  { id:"bedlington", name:"Burger 8 — Bedlington", town:"Bedlington", lat:55.140780449160076, lon:-1.5668576467265456, orderUrl:"https://burger8bedlington.briteat.co.uk/", mapsUrl:"https://www.google.com/maps?q=Burger%208%20Bedlington" },
];

const MENU_PROXY_ENDPOINT = "https://burger8-menu-proxy.parsazahedi78.workers.dev/menu";
const BACKUP_MENU_IMAGE = "assets/burger8_menu_converted.png";

/* Only these categories, in this order */
const REQUIRED_CATEGORY_ORDER = [
  "Monthly Special",
  "Burgers",
  "Loaded Fries",
  "Wings",
  "Milkshakes",
  "Sides",
  "Drinks",
  "Sauces",
];

/* ===================== LOCAL PNGS (menu item images) ===================== */
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

const CATEGORY_ALIAS = {
  Milkshakes: "Shakes",
  "Milk Shakes": "Shakes",
  Shake: "Shakes",
  Sauce: "Sauces",
  "Burger Sauces": "Sauces",
  Side: "Sides",
};

function normalizeCategory(cat) {
  const c = String(cat || "").trim();
  return CATEGORY_ALIAS[c] || c;
}

function fileBase(path) {
  const p = String(path || "");
  const just = p.split("/").pop() || p;
  return just.replace(/\.[^.]+$/, "");
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

function stripHtml(html) {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || "").trim();
}

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

/* Build searchable local list */
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
        list.find((x) => x.key === targetKey1) || list.find((x) => x.key === targetKey2);
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

/* ===================== DOM ===================== */
const yearEl = document.getElementById("year");
const branchSelect = document.getElementById("branchSelect");
const geoHint = document.getElementById("geoHint");

const menuStatus = document.getElementById("menuStatus");
const catBar = document.getElementById("catBar");
const menuSections = document.getElementById("menuSections");
const backupMenu = document.getElementById("backupMenu");

const orderNowBtn = document.getElementById("orderNowBtn");

// Modal DOM
const upsellBackdrop = document.getElementById("upsellBackdrop");
const upsellModal = document.getElementById("upsellModal");
const upsellClose = document.getElementById("upsellClose");
const upsellSkip = document.getElementById("upsellSkip");
const upsellGoOrder = document.getElementById("upsellGoOrder");
const upsellOptionsRoot = document.getElementById("upsellOptions");
const upsellForItem = document.getElementById("upsellForItem");

if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===================== Branch selection ===================== */
let selectedBranchId = "";

function renderSelectOptions() {
  if (!branchSelect) return;
  branchSelect.innerHTML = `<option value="">Select…</option>`;
  BRANCHES.forEach((b) => {
    const opt = document.createElement("option");
    opt.value = b.id;
    opt.textContent = b.name;
    branchSelect.appendChild(opt);
  });
}

function setSelectedBranch(id) {
  selectedBranchId = id || "";
  if (branchSelect) branchSelect.value = selectedBranchId;

  const branch = BRANCHES.find((b) => b.id === selectedBranchId) || null;

  if (geoHint) geoHint.textContent = branch ? `Selected: ${branch.town}` : "Select a branch to order.";
  if (orderNowBtn) orderNowBtn.disabled = !branch;

  if (branch && branchMap && branchMarkersById.has(branch.id)) {
    const m = branchMarkersById.get(branch.id);
    try { branchMap.setView(m.getLatLng(), 12, { animate: true }); m.openPopup(); } catch {}
  }
}

function goToBranch(branch) {
  if (!branch || !branch.orderUrl) return;
  window.location.href = branch.orderUrl;
}

orderNowBtn?.addEventListener("click", () => {
  const branch = BRANCHES.find((b) => b.id === selectedBranchId) || null;
  if (!branch) {
    document.getElementById("locations")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  goToBranch(branch);
});

branchSelect?.addEventListener("change", () => setSelectedBranch(branchSelect.value));

/* ===================== Leaflet map ===================== */
let branchMap = null;
let branchLayer = null;
const branchMarkersById = new Map();

function initBranchMap() {
  const mapEl = document.getElementById("branchMap");
  if (!mapEl) return;

  // If Leaflet didn't load, don't crash the page.
  if (typeof L === "undefined") {
    console.warn("Leaflet not loaded. Map will not render.");
    mapEl.innerHTML = `<div style="padding:16px;font-weight:900;color:#444;">Map failed to load.</div>`;
    return;
  }

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

    marker.on("click", () => setSelectedBranch(b.id));
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
    btn.addEventListener("click", () => setSelectedBranch(btn.getAttribute("data-branch")));
  });
}

/* ===================== Menu proxy mapping ===================== */
let MENU = [];

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
  const cat = p?.categories?.[0]?.name ? p.categories[0].name : "Menu";
  return cat;
}

function toImageFromStoreApi(p) {
  const src = p?.images?.[0]?.src;
  return typeof src === "string" && src.trim().length > 0 ? src : "";
}

async function loadMenuFromProxy() {
  if (menuStatus) menuStatus.textContent = "Loading menu…";
  for (const cat of Object.keys(USED_LOCAL_INDEX)) USED_LOCAL_INDEX[cat].clear();

  const res = await fetch(MENU_PROXY_ENDPOINT, { method: "GET" });
  if (!res.ok) throw new Error(`Menu proxy HTTP ${res.status}`);

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Menu proxy returned non-array JSON");

  MENU = data.map((p) => {
    const rawCategory = toCategoryFromStoreApi(p);
    const category = normalizeCategory(rawCategory);

    const price = toPriceNumberFromStoreApi(p);

    const nameRaw = String(p?.name ?? "Item").trim();
    const descRaw = stripHtml(p?.short_description || p?.description || "");

    const apiImg = toImageFromStoreApi(p);
    const localMatch = resolveLocalImage(category, nameRaw);
    const localImg = localMatch?.src || "";

    return {
      id: String(p?.id ?? crypto.randomUUID()),
      name: nameRaw,
      category: String(category || "Menu"),
      price,
      description: descRaw,
      image: localImg || apiImg || "",
      _localOrder: Number.isFinite(localMatch?.index) ? localMatch.index : 9999,
    };
  }).filter(x => x.name && x.name.trim().length > 0);

  if (menuStatus) menuStatus.textContent = "";
}

/* ===================== Rules ===================== */
function ensureDescription(item) {
  const d = String(item.description || "").trim();
  return d ? item : { ...item, description: "See in-store menu for full details." };
}

function enforceBurgerFries(item) {
  if (item.category !== "Burgers") return item;
  const add = "Served with Skin-on Fries.";
  const d = String(item.description || "").trim();
  const has = d.toLowerCase().includes("skin-on fries");
  return {
    ...item,
    description: has ? d : (d ? `${d} • ${add}` : add),
    _badge: "Served with Skin-on Fries",
  };
}

function burgerSortKey(name) {
  const n = burgerNumberFromName(name);
  if (Number.isFinite(n)) return n;
  const low = String(name || "").toLowerCase();
  const map = { one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8 };
  for (const [w, v] of Object.entries(map)) if (low.includes(`number ${w}`)) return v;
  return 999;
}

function onlyRequiredCategories(items) {
  return items.filter(it => REQUIRED_CATEGORY_ORDER.includes(it.category));
}

function orderedCategoriesPresent(items) {
  const present = new Set(items.map(i => i.category));
  return REQUIRED_CATEGORY_ORDER.filter(c => present.has(c));
}

function splitWings(items) {
  const out = [];
  const flavourNames = (LOCAL_IMAGE_MAP.Wings || []).map(fileBase);

  for (const it of items) {
    if (it.category !== "Wings") { out.push(it); continue; }

    const nameKey = normKey(it.name);
    const isGeneric = (nameKey === "wings" || nameKey === "chicken wings");
    if (!isGeneric) { out.push(it); continue; }

    for (const fl of flavourNames) {
      out.push({
        ...it,
        id: `${it.id}-${normKey(fl).replace(/\s+/g, "-")}`,
        name: fl,
        description: it.description ? `${it.description} Flavour: ${fl}.` : `Flavour: ${fl}.`,
        image: resolveLocalImage("Wings", fl)?.src || it.image,
      });
    }
  }
  return out;
}

/* ===================== Render ===================== */
function scrollToSection(cat) {
  const id = `cat-${cat.toLowerCase().replace(/\s+/g, "-")}`;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderCategoryBar(activeCat, cats) {
  if (!catBar) return;
  catBar.innerHTML = "";
  cats.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "catBtn" + (cat === activeCat ? " is-active" : "");
    btn.type = "button";
    btn.textContent = cat.toUpperCase();
    btn.addEventListener("click", () => scrollToSection(cat));
    catBar.appendChild(btn);
  });
}

function splitToLines(item) {
  const raw = String(item.description || "").replace(/\r/g, "").replace(/•/g, ",").trim();
  if (!raw) return [];
  const parts = raw.split(/\n|,/).map(s => s.trim()).filter(Boolean);
  return parts.length <= 1 ? [raw] : parts;
}

function renderMenuSections(items) {
  if (!menuSections) return;
  menuSections.innerHTML = "";
  if (backupMenu) backupMenu.hidden = true;

  const cats = orderedCategoriesPresent(items);
  renderCategoryBar(cats[0] || "", cats);

  cats.forEach((cat) => {
    const section = document.createElement("section");
    section.className = "menuSection";
    section.id = `cat-${cat.toLowerCase().replace(/\s+/g, "-")}`;

    const head = document.createElement("div");
    head.className = "menuSection__head";
    head.textContent = cat.toUpperCase();
    section.appendChild(head);

    if (cat === "Burgers") {
      const note = document.createElement("div");
      note.className = "menuSection__note";
      note.textContent = "All burgers are served with Skin-on Fries.";
      section.appendChild(note);
    }

    const catItems = items
      .filter(x => x.category === cat)
      .sort((a,b) => {
        if (cat === "Burgers") {
          const ak = burgerSortKey(a.name);
          const bk = burgerSortKey(b.name);
          if (ak !== bk) return ak - bk;
        }
        const ao = Number.isFinite(a._localOrder) ? a._localOrder : 9999;
        const bo = Number.isFinite(b._localOrder) ? b._localOrder : 9999;
        if (ao !== bo) return ao - bo;
        return String(a.name||"").localeCompare(String(b.name||""));
      });

    catItems.forEach((item) => {
      const row = document.createElement("article");
      row.className = "menuItem";
      row.dataset.itemId = item.id;

      const img = item.image
        ? `<img class="menuItem__img" src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy" />`
        : `<div class="menuItem__img" aria-hidden="true"></div>`;

      const lines = splitToLines(item).slice(0, 14).map(l => `<div class="line">${escapeHtml(l)}</div>`).join("");
      const badge = item._badge ? `<div class="badgeRow"><span class="badge">${escapeHtml(item._badge)}</span></div>` : "";

      row.innerHTML = `
        <div class="menuItem__left">${img}</div>
        <div class="menuItem__right">
          <div class="menuItem__meta">
            <h3 class="menuItem__name">${escapeHtml(item.name)}</h3>
            <div class="menuItem__price">${moneyGBP(item.price)}</div>
          </div>
          <div class="menuItem__lines">${lines}</div>
          ${badge}
        </div>
      `;

      row.addEventListener("click", () => openUpsell(item));
      section.appendChild(row);
    });

    menuSections.appendChild(section);
  });

  setupActiveCategoryObserver(cats);
}

let catObserver = null;
function setupActiveCategoryObserver(cats) {
  if (catObserver) catObserver.disconnect();

  const els = cats
    .map(cat => document.getElementById(`cat-${cat.toLowerCase().replace(/\s+/g, "-")}`))
    .filter(Boolean);

  if (!els.length) return;

  catObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;

    const id = visible.target.id.replace("cat-", "");
    const activeCat = id.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    renderCategoryBar(activeCat, cats);
  }, { threshold:[0.12, 0.2, 0.35, 0.5] });

  els.forEach(el => catObserver.observe(el));
}

function showBackupMenuImage() {
  if (menuStatus) menuStatus.textContent = "Showing backup menu image (API unavailable).";
  if (catBar) catBar.innerHTML = "";
  if (backupMenu) backupMenu.hidden = false;

  if (!menuSections) return;
  menuSections.innerHTML = `
    <section class="menuSection" id="cat-backup">
      <div class="menuSection__head">MENU</div>
      <div class="status" style="margin:12px 0 18px;">
        Live menu is unavailable right now. Here’s our backup menu:
      </div>
      <div style="width:100%;display:flex;justify-content:center;">
        <img
          src="${BACKUP_MENU_IMAGE}"
          alt="Burger 8 menu"
          style="max-width:980px;width:100%;height:auto;border-radius:16px;border:1px solid rgba(0,0,0,.10);"
          loading="lazy"
        />
      </div>
    </section>
  `;
}

/* ===================== Upsell modal ===================== */
const UPSELL_OPTIONS = [
  { id: "fries", name: "Extra Skin-on Fries", desc: "Crispy upgrade." },
  { id: "drink", name: "Add a Drink", desc: "Perfect pairing." },
  { id: "sauce", name: "Add a Sauce", desc: "Pick a dip." },
];

let upsellSelected = new Set();
let lastClickedItem = null;

function closeUpsellHard() {
  document.getElementById("upsellBackdrop")?.setAttribute("hidden", "");
  document.getElementById("upsellModal")?.setAttribute("hidden", "");
  upsellSelected = new Set();
  lastClickedItem = null;
}
window.closeUpsellHard = closeUpsellHard;

function openUpsell(item) {
  lastClickedItem = item;
  upsellSelected = new Set();

  if (!upsellOptionsRoot || !upsellForItem || !upsellBackdrop || !upsellModal) return;

  upsellForItem.textContent = `For: ${item.name}`;
  upsellOptionsRoot.innerHTML = "";

  UPSELL_OPTIONS.forEach((opt) => {
    const div = document.createElement("div");
    div.className = "upsellOpt";
    div.dataset.id = opt.id;
    div.innerHTML = `
      <div class="upsellOpt__name">${escapeHtml(opt.name)}</div>
      <div class="upsellOpt__desc">${escapeHtml(opt.desc)}</div>
    `;
    div.addEventListener("click", () => {
      const id = div.dataset.id;
      if (upsellSelected.has(id)) {
        upsellSelected.delete(id);
        div.classList.remove("is-selected");
      } else {
        upsellSelected.add(id);
        div.classList.add("is-selected");
      }
    });
    upsellOptionsRoot.appendChild(div);
  });

  upsellBackdrop.removeAttribute("hidden");
  upsellModal.removeAttribute("hidden");
}

upsellClose?.addEventListener("click", closeUpsellHard);
upsellSkip?.addEventListener("click", closeUpsellHard);

upsellBackdrop?.addEventListener("click", (e) => {
  if (e.target === upsellBackdrop) closeUpsellHard();
});

upsellGoOrder?.addEventListener("click", () => {
  closeUpsellHard();
  const branch = BRANCHES.find((b) => b.id === selectedBranchId) || null;
  if (!branch) {
    document.getElementById("locations")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  goToBranch(branch);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeUpsellHard();
});

/* ===================== INIT ===================== */
(async function init() {
  initHeroSlideshow();

  renderSelectOptions();
  setSelectedBranch(""); // disables Order Now until branch chosen
  initBranchMap();

  try {
    await loadMenuFromProxy();

    let items = MENU.map(ensureDescription).map(enforceBurgerFries);
    items = onlyRequiredCategories(items);
    items = splitWings(items);

    renderMenuSections(items);
    if (menuStatus) menuStatus.textContent = "";
  } catch (err) {
    console.warn("Menu load failed:", err);
    showBackupMenuImage();
  }
})();
