
const rightInner = document.querySelector('.right-inner');
const leftInner = document.querySelector('.left-inner');
const rightEye = document.querySelector('.right-eye');
const leftEye = document.querySelector('.left-eye');
const eyesContainer = document.querySelector('.eyes');
const body = document.body;
const switchWrapper = document.getElementById('switch-wrapper');
const cursor = document.querySelector('.cursor');

// Custom cursor movement
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    
});

// Function to calculate the direction of the pupil
function movePupils(event) {
    

    // Get mouse position relative to the viewport
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Calculate the center position of each eye
    const rightEyeRect = rightEye.getBoundingClientRect();
    const leftEyeRect = leftEye.getBoundingClientRect();

    const rightEyeCenterX = rightEyeRect.left + rightEyeRect.width / 2;
    const rightEyeCenterY = rightEyeRect.top + rightEyeRect.height / 2;

    const leftEyeCenterX = leftEyeRect.left + leftEyeRect.width / 2;
    const leftEyeCenterY = leftEyeRect.top + leftEyeRect.height / 2;

    // Calculate the angle for the pupil movement
    const rightAngle = Math.atan2(mouseY - rightEyeCenterY, mouseX - rightEyeCenterX);
    const leftAngle = Math.atan2(mouseY - leftEyeCenterY, mouseX - leftEyeCenterX);

    // Move the pupils to follow the mouse with a distance constraint to avoid them going out of bounds
    const maxDistance = 25; // Maximum distance the pupil can move from the center

    // Right pupil movement
    const rightMoveX = Math.cos(rightAngle) * maxDistance;
    const rightMoveY = Math.sin(rightAngle) * maxDistance;
    rightInner.style.transform = `translate(-50%, -50%) translate(${rightMoveX}px, ${rightMoveY}px)`;

    // Left pupil movement
    const leftMoveX = Math.cos(leftAngle) * maxDistance;
    const leftMoveY = Math.sin(leftAngle) * maxDistance;
    leftInner.style.transform = `translate(-50%, -50%) translate(${leftMoveX}px, ${leftMoveY}px)`;
}

// Add event listener for mousemove
window.addEventListener('mousemove', movePupils);


// Function to generate random position and animation timing for sparkling dots
function createSparklingDots() {
    const numDots = 80; // Number of dots you want
    const container = document.querySelector('.sparkling-dots');

    // Clear any existing dots
    container.innerHTML = '';

    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        
        // Set random position for the dot
        const randomTop = Math.random() * 100; // Random percentage from 0% to 100%
        const randomLeft = Math.random() * 100; // Random percentage from 0% to 100%
        dot.style.top = `${randomTop}%`;
        dot.style.left = `${randomLeft}%`;

        // Set random delay for animation to make the sparkle effect dynamic
        const randomDelay = Math.random() * 10; // Random delay between 0 and 5 seconds
        dot.style.animationDelay = `${randomDelay}s`;

        container.appendChild(dot);
    }
}

// Create dots when the page loads
window.addEventListener('DOMContentLoaded', createSparklingDots);

// Optional: Recreate dots every time the user resizes the window
window.addEventListener('resize', createSparklingDots);
window.addEventListener('scroll', () => {
    console.log('Scroll event triggered');
    const hero = document.querySelector('.hero');
    const sections = document.querySelectorAll('.section');
    const scrollY = window.scrollY;
    const fadeEnd = window.innerHeight * 0.8;

    // Clamp values between 0 and 1
    const progress = Math.min(scrollY / fadeEnd, 1);

    // Fade out
    hero.style.opacity = 1 - progress;

    // Scale down slightly (from 1 to 0.94)
    const scale = 1 - progress * 0.06;
    hero.style.transform = `scale(${scale})`;

    // Check if code background is in view
    const codeBackground = document.querySelector('.code-background');
    const nextSection = document.querySelector('.next-section');

    if (codeBackground && nextSection) {
        const rect = nextSection.getBoundingClientRect();
        // If the section is at least 20% visible
        if (rect.top < window.innerHeight * 1) {
            codeBackground.classList.add('visible');
        } else {
            codeBackground.classList.remove('visible');
        }
    }

    // Trigger visibility for each section
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < window.innerHeight * 0.8) {
            section.classList.add('visible'); // Add a class to trigger the animation
        } else {
            section.classList.remove('visible'); // Remove class if not in view
        }
    });
});