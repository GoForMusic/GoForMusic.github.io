// Typing bootline
const bootline = document.getElementById("bootline");
const bootText = "Initializing portal... OK Loading glitter... OK Connecting to VIA... OK";
let i = 0;

function typeBoot() {
  if (!bootline) return;
  bootline.textContent = bootText.slice(0, i++);
  if (i <= bootText.length) setTimeout(typeBoot, 18);
}
typeBoot();

// Fake visitor counter (local)
const counterEl = document.getElementById("visitorCount");
const key = "retroVisitorCount";
let count = Number(localStorage.getItem(key) || "1");
count += 1;
localStorage.setItem(key, String(count));
if (counterEl) counterEl.textContent = String(count).padStart(6, "0");

// Clock
const clock = document.getElementById("clock");
function tick() {
  if (!clock) return;
  const d = new Date();
  clock.textContent = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}
setInterval(tick, 1000);
tick();

// Sparkles on click (classic)
const sparkleChars = ["✦", "✧", "✨", "★", "☆"];
function sparkle(x, y) {
  for (let s = 0; s < 10; s++) {
    const el = document.createElement("div");
    el.className = "sparkle";
    el.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
    el.style.setProperty("--dy", (Math.random() * 120 - 80) + "px");
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 700);
  }
}

document.addEventListener("click", (e) => {
  // nu face sparkles când dai click pe popup close (ca să nu fie enervant)
  const t = e.target;
  if (t && (t.id === "popupClose" || t.id === "popupOk" || t.id === "popupCancel")) return;
  sparkle(e.clientX, e.clientY);
});

// Buttons
const clickHereBtn = document.getElementById("clickHereBtn");
const openPopupBtn = document.getElementById("openPopupBtn");
const popup = document.getElementById("popup");
const popupClose = document.getElementById("popupClose");
const popupOk = document.getElementById("popupOk");
const popupCancel = document.getElementById("popupCancel");

function showPopup() {
  if (!popup) return;
  popup.classList.remove("hidden");
}
function hidePopup() {
  if (!popup) return;
  popup.classList.add("hidden");
}

if (clickHereBtn) {
  clickHereBtn.addEventListener("click", () => {
    alert("WELCOME!!! 😄\n\nEnjoy the retro portal.\nTry the navbar up top for courses/projects.");
  });
}

if (openPopupBtn) openPopupBtn.addEventListener("click", showPopup);
if (popupClose) popupClose.addEventListener("click", hidePopup);
if (popupCancel) popupCancel.addEventListener("click", hidePopup);

if (popupOk) {
  popupOk.addEventListener("click", () => {
    hidePopup();
    alert("Just kidding 😅\nNo toolbars were installed.");
  });
}

// Drag popup (very 2000)
const title = document.getElementById("popupTitle");
let dragging = false, offsetX = 0, offsetY = 0;

if (title && popup) {
  title.addEventListener("mousedown", (e) => {
    dragging = true;
    const rect = popup.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    popup.style.left = (e.clientX - offsetX) + "px";
    popup.style.top = (e.clientY - offsetY) + "px";
    popup.style.transform = "none";
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
  });
}

// Fake downloads (no real download)
document.querySelectorAll(".dl").forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.getAttribute("data-fake");
    alert(`Downloading: ${name}\n\nEstimated time remaining: 3 hours\n(Just kidding 😄)`);
  });
});
