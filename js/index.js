function onClick(element) {
  const iframe = document.getElementById("courseIframe");
  const url = element.dataset.url;

  // Show IE window (important after close)
  const ieWindow = document.getElementById("ie-window");
  ieWindow.style.display = "block";

  // Update address bar
  document.getElementById("ie-url").textContent = url;

  // IE loading UI
  const loading = document.getElementById("ie-loading");
  const bar = document.getElementById("ie-progress-bar");

  loading.classList.remove("hidden");
  bar.style.width = "0%";

  // Fake progress (IE-like)
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 90) progress = 90;
    bar.style.width = progress + "%";
  }, 150);

  // Load page
  iframe.style.display = "none";
  iframe.src = url;

  iframe.onload = function () {
    clearInterval(interval);
    bar.style.width = "100%";

    setTimeout(() => {
      loading.classList.add("hidden");
      iframe.style.display = "block";
    }, 300);
  };
}

window.onload = function () {
  const iframe = document.getElementById("courseIframe");
  const defaultUrl = "default.html";

  // Show IE window on load
  document.getElementById("ie-window").style.display = "block";

  // Set default URL
  document.getElementById("ie-url").textContent = defaultUrl;
  iframe.src = defaultUrl;
};

function closeIE() {
  document.getElementById("ie-window").style.display = "none";
}
