// JavaScript to add the scroll-active class to the body on scroll
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

// Dragging functionality for the modal
function startDrag(event, modalId) {
    const modal = document.getElementById(modalId);

    let shiftX = event.clientX - modal.getBoundingClientRect().left;
    let shiftY = event.clientY - modal.getBoundingClientRect().top;

    // Move modal to the current mouse position adjusted by the initial shift
    function moveAt(pageX, pageY) {
        modal.style.left = pageX - shiftX + 'px';
        modal.style.top = pageY - shiftY + 'px';
    }

    // Function to follow the mouse when dragging
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // Add mousemove listener to drag the modal while the mouse is held down
    document.addEventListener('mousemove', onMouseMove);

    // Remove mousemove listener when mouse button is released
    document.addEventListener('mouseup', function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    });
}

// Attach event listener to initiate dragging on mousedown on modal-content
document.querySelectorAll('.modal-content').forEach(item => {
    item.addEventListener('mousedown', (event) => {
        // Ensure the click target is not the close button or a link
        if (!event.target.classList.contains('close') && event.target.tagName !== 'A') {
            startDrag(event, item.closest('.modal').id);
        }
    });

    // Prevent default dragging behavior (e.g., text selection)
    item.ondragstart = function() {
        return false;
    };
});
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
