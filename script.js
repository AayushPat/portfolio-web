// Add 'scroll-active' class to body on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        document.body.classList.add('scroll-active');
    } else {
        document.body.classList.remove('scroll-active');
    }
});

// JavaScript to animate boxes exiting the screen on first interaction
document.body.addEventListener('click', () => {
    const brownBox = document.querySelector('.brown-box');
    const grayBox = document.querySelector('.gray-box');

    if (brownBox && grayBox) {
        brownBox.classList.add('exit');
        grayBox.classList.add('exit');
    }
});
// Animate boxes exiting or entering the screen
let e = true;
const container = document.querySelector('.container');
document.body.addEventListener('click', function(event) {
    if (event.target === container) {
        const brownBox = document.querySelector('.brown-box');
        const grayBox = document.querySelector('.gray-box');
         
        if (brownBox && grayBox) {
            brownBox.classList.remove('exit', 'enter');
            grayBox.classList.remove('exit', 'enter');

            if (e) {
                brownBox.classList.add('exit');
                grayBox.classList.add('exit');
            } else {
                brownBox.classList.add('enter');
                grayBox.classList.add('enter');
            }
            
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
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside of the modal content
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};

// Dragging functionality for the modal (supports both mouse and touch events)
function startDrag(event, modalId) {
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
