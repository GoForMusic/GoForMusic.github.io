let clickCount = 0;
let timer = null;
let santaInterval = null;
let santaTimeout = null;
const SANTA_IDLE = "../resources/christmas/santa_idle.gif";
const SANTA_WALK = "../resources/christmas/santa_walking.gif";
const XP_SOUND   = "../resources/sounds/windows-xp-ding.mp3";

document.addEventListener("click", (e) => {
  // ignorăm clickurile din iframe
  if (e.target.closest("iframe")) return;

  clickCount++;

  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    clickCount = 0; // reset dacă nu dai rapid click
  }, 1500);

  if (clickCount === 7) {
    toggleChristmas();
    clickCount = 0;
  }
});

function toggleChristmas() {
  const lights = document.getElementById("christmas-lights");
  const santa = document.getElementById("santa");

  const isTurningOff = !lights.classList.contains("hidden");
  lights.classList.toggle("hidden");

  if (isTurningOff) {
    santa.classList.add("hidden");
    santa.src = SANTA_IDLE;

    clearInterval(santaInterval);
    clearTimeout(santaTimeout);
    santaInterval = null;
    santaTimeout = null;
  } else {
    santa.classList.remove("hidden");
    startSantaCycle();
  }

  const sound = new Audio(XP_SOUND);
  sound.volume = 0.7;
  sound.play();
}

function startSantaCycle() {
  const santa = document.getElementById("santa");

  clearInterval(santaInterval);
  clearTimeout(santaTimeout);

  santa.src = SANTA_IDLE;

  santaTimeout = setTimeout(moveSanta, 2000 + Math.random() * 3000);
  santaInterval = setInterval(moveSanta, 12000);
}

function moveSanta() {
  const santa = document.getElementById("santa");
  if (!santa || santa.classList.contains("hidden")) return;

  // walking ON
  santa.classList.add("walking");
  santa.src = SANTA_WALK;

  const maxX = window.innerWidth - santa.offsetWidth - 20;
  const maxY = window.innerHeight - santa.offsetHeight - 20;

  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;

  // flip logic (FĂRĂ rotate)
  const currentX = santa.offsetLeft;
  santa.classList.toggle("flip", newX < currentX);

  santa.style.left = `${newX}px`;
  santa.style.top = `${newY}px`;

  // după ce ajunge → idle
  setTimeout(() => {
    santa.classList.remove("walking");
    santa.src = SANTA_IDLE;
  }, 5000);
}
