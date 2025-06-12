// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        scrollToSection(this.getAttribute('href').substring(1));
    });
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
        // Close mobile menu if open
        document.querySelector('.nav-links').classList.remove('active');
    }
}

// Mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
    
    // Toggle icon between bars and X
    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !mobileMenu.contains(e.target)) {
        navLinks.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Countdown Timer
function updateCountdown() {
    // Set the countdown to reset every 6 days
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const cycleDay = dayOfYear % 6; // 0-5 days in cycle
    
    // Calculate time until end of current day
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    let diff = tomorrow - now;
    
    // Add remaining days in cycle
    const daysLeft = 5 - cycleDay;
    
    // Update DOM
    document.getElementById('days').textContent = String(daysLeft).padStart(2, '0');
    document.getElementById('hours').textContent = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
    diff %= (1000 * 60 * 60);
    document.getElementById('minutes').textContent = String(Math.floor(diff / (1000 * 60))).padStart(2, '0');
    diff %= (1000 * 60);
    document.getElementById('seconds').textContent = String(Math.floor(diff / 1000)).padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            const answer = item.querySelector('.faq-answer');
            answer.style.maxHeight = null;
        });
        
        // If the clicked item wasn't active, open it
        if (!isActive) {
            faqItem.classList.add('active');
            const answer = faqItem.querySelector('.faq-answer');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// Initialize first FAQ item as open
document.querySelector('.faq-item').classList.add('active');
const firstAnswer = document.querySelector('.faq-item .faq-answer');
firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-card, .content-item, .testimonial-card, .faq-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-fade-in');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on page load
