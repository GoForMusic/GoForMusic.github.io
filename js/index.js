function onClick(element) {
  console.log(element);
  var iframe = document.getElementById("courseIframe");
  var url = element.dataset.url;
  iframe.src = url;
}

window.onload = function() {
  var iframe = document.getElementById("courseIframe");
  var defaultUrl = "default.html"; // Set the default URL here

  // Set the default URL for the iframe
  iframe.src = defaultUrl;

  var loadingScreen = document.getElementById("loading-screen");
  var iframeContainer = document.getElementById("iframe-container");
  var errorMessage = document.getElementById("error-message");
  var loadingTimeout;

  // Show loading screen when iframe starts loading
  iframe.onloadstart = function() {
      loadingScreen.style.display = "flex";
      // Set a timeout to stop loading after 30 seconds (adjust as needed)
      loadingTimeout = setTimeout(showErrorMessage, 30000);
  };

  // Hide loading screen and clear timeout when iframe finishes loading
  iframe.onload = function() {
      clearTimeout(loadingTimeout);
      loadingScreen.style.display = "none";
      iframeContainer.style.display = "block";
  };

  // Function to show error message
  function showErrorMessage() {
      loadingScreen.style.display = "none";
      errorMessage.style.display = "block";
  }
};
