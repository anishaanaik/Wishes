// Petals/Hearts animation generator
const animationContainer = document.getElementById('animation-container');
const items = ['🌸', '💖', '✨', '🤍', '🌺'];

function createFloatingItem() {
    const el = document.createElement('div');
    el.classList.add('floating-item');
    
    // Random item
    el.innerText = items[Math.floor(Math.random() * items.length)];
    
    // Randomize initial position
    el.style.left = Math.random() * 100 + 'vw';
    
    // Randomize size
    const size = Math.random() * 1.5 + 0.8;
    el.style.fontSize = `${size}rem`;
    
    // Randomize animation duration
    const duration = Math.random() * 8 + 6; // 6 to 14 seconds
    el.style.animationDuration = `${duration}s`;
    
    // Randomize delay
    el.style.animationDelay = Math.random() * 5 + 's';
    
    // Slight horizontal sway using custom property for complex animation
    // Simplified for now - dropping straight is beautiful too
    
    animationContainer.appendChild(el);
    
    // Remove element after animation ends to prevent DOM bloating
    setTimeout(() => {
        el.remove();
    }, (duration + 5) * 1000);
}

// Generate initial batch
for (let i = 0; i < 35; i++) {
    createFloatingItem();
}

// Continuously generate new items
setInterval(createFloatingItem, 700);

// Navigation
function startJourney() {
    // Add a beautiful fade out effect
    document.body.style.transition = 'opacity 1s ease';
    document.body.style.opacity = '0';
    
    // Navigate after fade out
    setTimeout(() => {
        window.location.href = 'wish.html';
    }, 1000);
}

// --- Celebration Page specific ---
function celebrateLove() {
    // Canvas confetti burst
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Navigation to Gallery
function goToGallery() {
    document.body.style.transition = 'opacity 1s ease';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = 'gallery.html';
    }, 1000);
}

// --- Gallery Page Specific (Lightbox) ---
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    // Get image source and caption text from the clicked polaroid
    const imgElement = element.querySelector('img');
    const captionElement = element.querySelector('.caption');
    
    lightboxImg.src = imgElement.src;
    lightboxCaption.innerText = captionElement.innerText;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

    // Navigation to Message Page
function goToMessage() {
    document.body.style.transition = 'opacity 1s ease';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = 'message.html';
    }, 1000);
}

// --- Message Page Specific (Typing Effect) ---
function startTypingEffect() {
    const originalContainer = document.getElementById('original-letter');
    const typedContainer = document.getElementById('typed-letter');
    
    if (!originalContainer || !typedContainer) return;
    
    // Get all paragraphs from the hidden original content
    const paragraphs = Array.from(originalContainer.children);
    
    let currentParaIndex = 0;
    
    function typeNextParagraph() {
        if (currentParaIndex >= paragraphs.length) {
            // Un-hide the "Continue" button once finished typing
            const continueNav = document.querySelector('.message-nav');
            if (continueNav) {
                continueNav.style.display = 'flex';
                // Trigger reflow to restart animation on newly shown element
                void continueNav.offsetWidth;
                continueNav.style.opacity = '1';
                continueNav.style.animation = 'fadeInNav 2s forwards ease-out';
            }
            return;
        }
        
        const currentPara = paragraphs[currentParaIndex];
        const lang = (typeof getCurrentLang === 'function') ? getCurrentLang() : 'en';
        const text = (lang === 'kn' && currentPara.dataset.kn) ? currentPara.dataset.kn : currentPara.innerHTML;
        const className = currentPara.className;
        
        // Create new element in typed container
        const newPara = document.createElement('p');
        if (className) newPara.className = className;
        
        // Let CSS handle the paragraph fade in
        newPara.style.animationDelay = `${currentParaIndex * 0.5}s`;
        newPara.innerHTML = text;
        
        typedContainer.appendChild(newPara);
        
        currentParaIndex++;
        
        // Timeout to simulate reading/typing speed before next paragraph appears
        setTimeout(typeNextParagraph, 1500); 
    }
    
    // Hide the button initially
    const continueNav = document.querySelector('.message-nav');
    if (continueNav) {
        continueNav.style.display = 'none';
        continueNav.style.opacity = '0';
    }

    // Start typing
    typeNextParagraph();
}

// Navigation to Next Page
function goToNext() {
    document.body.style.transition = 'opacity 1s ease';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = 'next.html';
    }, 1000);
}

// Reveal Final Surprise on same page (Message page)
function revealSurprise() {
    const messageBox = document.querySelector('.message-container');
    const surpriseBox = document.getElementById('final-surprise');
    
    // Fade out everything on the message page
    if (messageBox) messageBox.style.opacity = '0';
    const navBtn = document.querySelector('.message-nav');
    if (navBtn) navBtn.style.opacity = '0';
    
    // Wait for fade out, then hide old content and show new
    setTimeout(() => {
        if(messageBox) messageBox.style.display = 'none';
        if(navBtn) navBtn.style.display = 'none';
        
        // Change background color slightly to fit surprise mood better (optional)
        document.body.style.background = 'linear-gradient(135deg, #fdfcdc 0%, #faedcd 50%, #fcd5ce 100%)';
        
        if(surpriseBox) {
            surpriseBox.style.display = 'block';
            
            // Force scroll to top of the page so the user sees the header
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Trigger reflow
            void surpriseBox.offsetWidth;
            surpriseBox.style.opacity = '1';
            surpriseBox.style.animation = 'fadeInHeading 1.5s forwards ease-out';
        }
    }, 1000);
}
