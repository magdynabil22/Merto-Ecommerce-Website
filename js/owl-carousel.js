// Category Carousel (unchanged)
const container = document.querySelector('.category-carousel');
const duration = 400;

// Calculate the actual item width including gap
function getItemWidth() {
  const firstItem = container.children[0];
  const computedStyle = window.getComputedStyle(container);
  const gap = parseFloat(computedStyle.gap) || 16;
  const itemWidth = firstItem.offsetWidth + gap;
  return itemWidth;
}

function rotateLeftSeamless() {
  const itemWidth = getItemWidth();
  const firstItem = container.children[0];
  const clone = firstItem.cloneNode(true);
  
  container.appendChild(clone);
  
  container.style.transition = `transform ${duration}ms ease`;
  container.style.transform = `translateX(-${itemWidth}px)`;
  
  setTimeout(() => {
    container.style.transition = 'none';
    container.style.transform = 'translateX(0)';
    container.removeChild(firstItem);
  }, duration);
}

// Start autoplay with seamless version
if (container) {
  setInterval(rotateLeftSeamless, 3000);
}

// UNIVERSAL CAROUSEL FUNCTION - Works for both Flash Deals and Best Sellers
function initializeCarousel(sectionSelector) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;
  
  const flashContainer = section.querySelector('.flash-deals-container');
  const flashPrevBtn = section.querySelector('.owl-prev');
  const flashNextBtn = section.querySelector('.owl-next');
  const flashDuration = 400;
  
  let isAnimating = false;
  
  // Get all flash deal cards
  function getFlashCards() {
    return flashContainer.querySelectorAll('.flash-deals-card');
  }
  
  // Calculate flash deals item width (20% of container + margin)
  function getFlashItemWidth() {
    const cards = getFlashCards();
    if (cards.length === 0) return 0;
    
    // Each card is 20% width, so moving by one card means 20% of container
    const containerWidth = flashContainer.offsetWidth;
    return containerWidth * 0.2; // 20% for each card
  }
  
  // Flash Deals - Move Right (show next items)
  function flashMoveToNext() {
    if (isAnimating) return;
    
    const cards = getFlashCards();
    if (cards.length === 0) return;
    
    isAnimating = true;
    const itemWidth = getFlashItemWidth();
    
    // Get the first card and clone it
    const firstCard = cards[0];
    const clone = firstCard.cloneNode(true);
    
    // Add clone to the end
    flashContainer.appendChild(clone);
    
    // Animate container to the left
    flashContainer.style.transition = `transform ${flashDuration}ms ease`;
    flashContainer.style.transform = `translateX(-${itemWidth}px)`;
    
    setTimeout(() => {
      // Reset position and remove original first card
      flashContainer.style.transition = 'none';
      flashContainer.style.transform = 'translateX(0)';
      flashContainer.removeChild(firstCard);
      isAnimating = false;
    }, flashDuration);
  }
  
  // Flash Deals - Move Left (show previous items)  
  function flashMoveToPrevious() {
    if (isAnimating) return;
    
    const cards = getFlashCards();
    if (cards.length === 0) return;
    
    isAnimating = true;
    const itemWidth = getFlashItemWidth();
    
    // Get the last card and clone it
    const lastCard = cards[cards.length - 1];
    const clone = lastCard.cloneNode(true);
    
    // Insert clone at the beginning
    flashContainer.insertBefore(clone, cards[0]);
    
    // Set initial position (shifted left by one item width)
    flashContainer.style.transition = 'none';
    flashContainer.style.transform = `translateX(-${itemWidth}px)`;
    
    // Animate back to normal position
    setTimeout(() => {
      flashContainer.style.transition = `transform ${flashDuration}ms ease`;
      flashContainer.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
      // Remove the original last card
      flashContainer.style.transition = 'none';
      flashContainer.removeChild(lastCard);
      isAnimating = false;
    }, flashDuration);
  }
  
  // Alternative approach - Direct DOM manipulation
  function flashSlideNext() {
    if (isAnimating) return;
    
    const cards = getFlashCards();
    if (cards.length === 0) return;
    
    isAnimating = true;
    
    // Simply move the first card to the end
    const firstCard = cards[0];
    flashContainer.appendChild(firstCard);
    
    // Add smooth transition effect
    flashContainer.style.transition = `transform ${flashDuration}ms ease`;
    flashContainer.style.transform = 'translateX(-5px)';
    
    setTimeout(() => {
      flashContainer.style.transform = 'translateX(0)';
    }, 50);
    
    setTimeout(() => {
      flashContainer.style.transition = 'none';
      isAnimating = false;
    }, flashDuration);
  }
  
  function flashSlidePrevious() {
    if (isAnimating) return;
    
    const cards = getFlashCards();
    if (cards.length === 0) return;
    
    isAnimating = true;
    
    // Move the last card to the beginning
    const lastCard = cards[cards.length - 1];
    flashContainer.insertBefore(lastCard, cards[0]);
    
    // Add smooth transition effect
    flashContainer.style.transition = `transform ${flashDuration}ms ease`;
    flashContainer.style.transform = 'translateX(5px)';
    
    setTimeout(() => {
      flashContainer.style.transform = 'translateX(0)';
    }, 50);
    
    setTimeout(() => {
      flashContainer.style.transition = 'none';
      isAnimating = false;
    }, flashDuration);
  }
  
  // Event listeners for flash deals buttons
  if (flashNextBtn && flashPrevBtn) {
    flashNextBtn.addEventListener('click', flashMoveToNext);
    flashPrevBtn.addEventListener('click', flashMoveToPrevious);
    
    // Alternative: Use the simpler slide approach (uncomment to use)
    // flashNextBtn.addEventListener('click', flashSlideNext);
    // flashPrevBtn.addEventListener('click', flashSlidePrevious);
  }
}

// Initialize carousels for both sections
initializeCarousel('.flash-deals-section');
initializeCarousel('.best-sellers-section');

// Countdown Timer
function updateCountdown() {
  const now = new Date().getTime();
  const endTime = now + (24 * 60 * 60 * 1000); // 24 hours from now
  
  const timeLeft = endTime - now;
  
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');
  
  if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
  if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
  if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call