document.addEventListener('DOMContentLoaded', () => {
    const clickSound = document.getElementById('click-sound');
    
    // Set a low volume for the click sound
    if(clickSound) {
        clickSound.volume = 0.4; // Adjust volume (0.0 to 1.0)
    } else {
        console.warn('Click sound audio element not found!');
        return; // Exit if the element isn't found
    }

    // Listen for all clicks on the document
    document.body.addEventListener('click', (event) => {
      // Check if the clicked element is a link with href OR a button
      // We use .closest() to check the element itself and its parents
      const targetElement = event.target.closest('a[href], button');

      if (targetElement) {
        // Reset playback to the beginning (allows rapid clicks)
        clickSound.currentTime = 0;
        // Play the sound
        clickSound.play().catch(error => {
          console.warn("Click sound playback failed:", error);
          // Browsers might block audio until first user interaction anywhere on page
        });
      }
    });
  });