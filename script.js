// Add 'scroll-active' class to body on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        document.body.classList.add('scroll-active');
    } else {
        document.body.classList.remove('scroll-active');
    }
});

function slowScrollToTop(element, duration = 2000) { // 2000ms = 2 seconds
    const start = element.scrollTop;
    const change = -start; // Distance to scroll (to top: 0)
    let startTime = null;
  
    function animateScroll(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // Clamp at 1
      // Apply easing (e.g., easeInOutQuad for smooth start/end)
      const ease = easeInOutQuad(progress);
      element.scrollTop = start + (change * ease);
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }
  
    // Easing function (optional but recommended)
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
  
    requestAnimationFrame(animateScroll);
  }
  
 
// Animate boxes exiting or entering the screen
let e = true;
const container = document.querySelector('.container');
document.body.addEventListener('click', function(event) {
    if (event.target === container) {
        const brownBox = document.querySelector('.brown-box');
        const grayBox = document.querySelector('.gray-box');
        const creamBox = document.querySelector(".cream-box ")
        
        if (brownBox && grayBox) {
            brownBox.classList.remove('exit', 'enter');
            grayBox.classList.remove('exit', 'enter');

            if (e) {
                brownBox.classList.add('exit');
                grayBox.classList.add('exit');
            } else {
                brownBox.classList.add('enter');
                grayBox.classList.add('enter');
                slowScrollToTop(creamBox, 1400);

            }

            document.querySelectorAll('.modal').forEach(modal => closeModal(modal.id.replace('-modal', '')));
            
            // Toggle `e` to alternate between states
            e = !e;
        }
    }
});

// Show modal function
function showProjectModal(project) {
    const modal = document.getElementById(`${project}-modal`);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Close modal function
function closeModal(project) {
    const modal = document.getElementById(`${project}-modal`);
    if (modal) modal.style.display = 'none';
}

// Event delegation for closing modals
document.addEventListener('click', function(event) {
    // Check if click is on any of the close triggers
    const isBody = event.target === document.body;
    const isBrownBox = event.target.classList.contains('brown-box');
    const isGrayBox = event.target.classList.contains('gray-box');
    const isCreamBox = event.target.classList.contains('cream-box');
    const isCloseBtn = event.target.classList.contains('close-modal');
    
    // Find all open modals
    const openModals = document.querySelectorAll('.modal[style="display: block;"]');
    
    // If click is on any close trigger and there are open modals
    if ((isBody || isBrownBox || isGrayBox || isCreamBox || isCloseBtn) && openModals.length > 0) {
        openModals.forEach(modal => {
            // Extract project name from modal ID (assuming ID format is "projectname-modal")
            const project = modal.id.replace('-modal', '');
            closeModal(project);
        });
    }
});
// Dragging functionality for the modal (supports both mouse and touch events)
function startDrag(event, modalId) {
    event.stopPropagation(); // Prevent this click from reaching the window handler
    const modal = document.getElementById(modalId);

    const isTouchEvent = event.type === 'touchstart';
    const initialX = isTouchEvent ? event.touches[0].clientX : event.clientX;
    const initialY = isTouchEvent ? event.touches[0].clientY : event.clientY;

    let shiftX = initialX - modal.getBoundingClientRect().left;
    let shiftY = initialY - modal.getBoundingClientRect().top;

    // Function to move modal to current position
    function moveAt(pageX, pageY) {
        modal.style.left = pageX - shiftX + 'px';
        modal.style.top = pageY - shiftY + 'px';
    }

    // Event listener to track movement
    function onMove(event) {
        const pageX = isTouchEvent ? event.touches[0].pageX : event.pageX;
        const pageY = isTouchEvent ? event.touches[0].pageY : event.pageY;
        moveAt(pageX, pageY);
    }

    // Stop dragging when touch/mouse is released
    function onEnd() {
        document.removeEventListener(isTouchEvent ? 'touchmove' : 'mousemove', onMove);
        document.removeEventListener(isTouchEvent ? 'touchend' : 'mouseup', onEnd);
    }

    document.addEventListener(isTouchEvent ? 'touchmove' : 'mousemove', onMove);
    document.addEventListener(isTouchEvent ? 'touchend' : 'mouseup', onEnd);
}



       

// Attach event listeners for dragging on mousedown and touchstart
document.querySelectorAll('.modal-content').forEach(item => {
    item.addEventListener('mousedown', (event) => {
        if (!event.target.classList.contains('close') && event.target.tagName !== 'A') {
            startDrag(event, item.closest('.modal').id);
        }
    });

    item.addEventListener('touchstart', (event) => {
        if (!event.target.classList.contains('close') && event.target.tagName !== 'A') {
            startDrag(event, item.closest('.modal').id);
        }
    });

    // Prevent default dragging behavior (e.g., text selection)
    item.ondragstart = function() {
        return false;
    };
});

// Smooth scroll for navigation buttons
document.getElementById('aboutBtn').addEventListener('click', function() {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('projectsBtn').addEventListener('click', function() {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('contactBtn').addEventListener('click', function() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('resumeBtn').addEventListener('click', function() {
    window.open('Resume.pdf', '_blank');
    location.reload();
});

const cursor = document.getElementById('custom-cursor');

// Follow mouse movement
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Hover effects for buttons/links
const hoverElements = document.querySelectorAll('a, button, [data-cursor-hover]');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Click animation
document.addEventListener('mousedown', () => cursor.classList.add('click'));
document.addEventListener('mouseup', () => cursor.classList.remove('click'));

// Hide cursor if the user is on touch device
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
}