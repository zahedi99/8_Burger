/* ---------- Data (edit these) ---------- */
const BRANCHES = [
  {
    id: "hartlepool",
    name: "Hartlepool — 31 Mires Avenue, Hartlepool, TS24 9HH",
    town: "Hartlepool",
    postcode: "TS24 9HH",
    lat: 54.6857,
    lon: -1.2100,
    orderUrl: "https://example.com/order/hartlepool",
    mapsUrl: "https://www.google.com/maps?q=31+Mires+Avenue+Hartlepool+TS24+9HH"
  },
  {
    id: "london",
    name: "London — 10 Example Street, London, EC1A 1AA",
    town: "London",
    postcode: "EC1A 1AA",
    lat: 51.5099,
    lon: -0.1181,
    orderUrl: "https://example.com/order/london",
    mapsUrl: "https://www.google.com/maps?q=10+Example+Street+London+EC1A+1AA"
  },
  {
    id: "manchester",
    name: "Manchester — 22 Example Road, Manchester, M1 1AE",
    town: "Manchester",
    postcode: "M1 1AE",
    lat: 53.4808,
    lon: -2.2426,
    orderUrl: "https://example.com/order/manchester",
    mapsUrl: "https://www.google.com/maps?q=22+Example+Road+Manchester+M1+1AE"
  }
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

document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Helpers ---------- */
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

/* ---------- Render ---------- */
function renderSelectOptions() {
  for (const b of BRANCHES) {
    const opt = document.createElement("option");
    opt.value = b.id;
    opt.textContent = b.name;
    branchSelect.appendChild(opt);
  }
}

function createStoreCard(branch) {
  const card = document.createElement("article");
  card.className = "store";
  card.dataset.id = branch.id;

  card.innerHTML = `
    <div class="store__top">
      <h3 class="store__name">${branch.town}</h3>
      <span class="store__badge">${branch.postcode}</span>
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

  // Click anywhere on card selects (except links)
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

/* ---------- Events ---------- */
window.addEventListener("scroll", () => {
  header.classList.toggle("header--scrolled", window.scrollY > 60);
});

if (burgerBtn) {
  burgerBtn.addEventListener("click", () => {
    const isOpen = burgerBtn.getAttribute("aria-expanded") === "true";
    burgerBtn.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.hidden = isOpen;
  });
}

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
  if (!q) {
    renderStoreGrid(BRANCHES);
    return;
  }
  const filtered = BRANCHES.filter((b) => {
    return (
      b.name.toLowerCase().includes(q) ||
      b.town.toLowerCase().includes(q) ||
      b.postcode.toLowerCase().includes(q)
    );
  });
  renderStoreGrid(filtered);
});

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
      if (err.code === err.PERMISSION_DENIED) {
        geoHint.textContent = "Location permission denied.";
      } else {
        geoHint.textContent = "Could not get your location.";
      }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
  );
});

/* ---------- Init ---------- */
renderSelectOptions();
renderStoreGrid(BRANCHES);
setSelectedBranch(null);
