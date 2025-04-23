document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll) effect for elements
    initAnimations();
    
    // Add smooth scrolling for navigation links
    initSmoothScroll();
    
    // Init Copy Script buttons
    initCopyButtons();
    
    // Init navigation active state
    initNavigation();
});

function initAnimations() {
    // Add animation classes to elements when they come into view
    const animateElements = document.querySelectorAll('.game-card, .feature, .section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = entry.target.classList.contains('game-card') 
                    ? 'translateY(0)' 
                    : 'translate(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = el.classList.contains('game-card') 
            ? 'translateY(20px)' 
            : 'translateY(10px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initSmoothScroll() {
    // Add smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });
}

function initCopyButtons() {
    // Copy script buttons functionality
    const scriptText = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/JustVibey/Scripts/refs/heads/main/VibeHub.lua"))()';
    const antiAFKScriptText = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/JustVibey/Scripts/refs/heads/main/AntiAFK"))()';
    
    // Hero section copy button
    const copyButton = document.getElementById('copy-script');
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            copyToClipboard(scriptText);
            showNotification(copyButton, 'Copied!');
        });
    }
    
    // Script section copy button
    const copyScriptButton = document.getElementById('copy-script-code');
    const copiedNotification = document.querySelector('.copied-notification');
    
    if (copyScriptButton && copiedNotification) {
        copyScriptButton.addEventListener('click', () => {
            copyToClipboard(scriptText);
            copiedNotification.style.opacity = '1';
            
            setTimeout(() => {
                copiedNotification.style.opacity = '0';
            }, 2000);
        });
    }
    
    // Anti-AFK script copy button
    const copyAntiAFKButton = document.getElementById('copy-anti-afk-code');
    const antiAFKNotification = document.querySelector('#anti-afk .copied-notification');
    
    if (copyAntiAFKButton && antiAFKNotification) {
        copyAntiAFKButton.addEventListener('click', () => {
            copyToClipboard(antiAFKScriptText);
            antiAFKNotification.style.opacity = '1';
            
            setTimeout(() => {
                antiAFKNotification.style.opacity = '0';
            }, 2000);
        });
    }
}

function copyToClipboard(text) {
    // Create temporary text area
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textarea);
}

function showNotification(button, message) {
    // Create and display a temporary notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'absolute';
    notification.style.bottom = '-40px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = 'var(--primary)';
    notification.style.color = 'white';
    notification.style.padding = '5px 10px';
    notification.style.borderRadius = '5px';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease';
    
    button.style.position = 'relative';
    button.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        
        setTimeout(() => {
            button.removeChild(notification);
        }, 300);
    }, 2000);
}

function initNavigation() {
    // Handle active navigation state based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Create parallax effect for background stars
window.addEventListener('mousemove', (e) => {
    const stars = document.querySelector('.stars');
    
    if (stars) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        stars.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    }
}); 