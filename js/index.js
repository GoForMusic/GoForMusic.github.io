// Modal Image Gallery
function onClick(element, link) {
    document.getElementById("img01").innerHTML = "<object data="+link+" width='800px' height='600px' style='overflow:auto;border:5px ridge red;' />";
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.innerText;
  }

// Function to set a random image
function setRandomImage(imgElement, customImages) {
    // Check if the image already has a source
    if (!imgElement.src || imgElement.src === 'about:blank') {
      // Check if custom images are available
      if (customImages.length > 0) {
        // Select a random index from the customImages array
        var randomIndex = Math.floor(Math.random() * customImages.length);

        // Set the image source to the randomly selected custom image
        imgElement.src = customImages[randomIndex];

        // Remove the selected custom image from the array to avoid repetition
        customImages.splice(randomIndex, 1);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Directory for random images
    var randomImageDirectory = "./resources/Random/";

    // Number of random images in the directory
    var numberOfRandomImages = 8; // Change this to the actual number of random images

    // Array of custom image sources
    var customImages = [];

    // Generate file names for random images
    for (var i = 1; i <= numberOfRandomImages; i++) {
      customImages.push(randomImageDirectory + "Random" + i + ".png");
    }

    // Get all image containers
    var imgContainers = document.querySelectorAll('.img-container');

    // Loop through each image container
    imgContainers.forEach(function (container) {
      // Get the image element inside the container
      var imgElement = container.querySelector('img');

      // Call the setRandomImage function
      setRandomImage(imgElement, customImages);
    });
  });