let santaMode = false;
let santas = [];

document.addEventListener("keydown", (e) => {
  if (e.key === "s") santaMode = true;
});

document.addEventListener("mousemove", (e) => {
  if (!santaMode) return;

  const s = document.createElement("div");
  s.className = "santa";
  s.style.left = e.pageX + "px";
  s.style.top = e.pageY + "px";
  document.body.appendChild(s);

  setTimeout(() => s.remove(), 1000);
});
