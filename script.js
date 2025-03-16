document.addEventListener('DOMContentLoaded', function() {
    // Script to copy to clipboard
    const scriptText = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/JustVibey/Scripts/refs/heads/main/VibeHub.lua"))()';
    const copyButton = document.getElementById('copyScript');
    const notification = document.getElementById('copyNotification');
    
    // Copy script function
    copyButton.addEventListener('click', function() {
        navigator.clipboard.writeText(scriptText).then(function() {
            // Show notification
            notification.classList.add('show');
            
            // Add button animation
            copyButton.classList.add('clicked');
            
            // Hide notification after 2 seconds
            setTimeout(function() {
                notification.classList.remove('show');
                copyButton.classList.remove('clicked');
            }, 2000);
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    });
    
    // Add animation to game cards
    const gameCards = document.querySelectorAll('.game-card');
    
    // Add animation delay to each card
    gameCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.querySelector('.game-icon').style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.game-icon').style.transform = 'scale(1)';
        });
    });
    
    // Add scroll reveal animation
    window.addEventListener('scroll', revealOnScroll);
    
    function revealOnScroll() {
        const elements = document.querySelectorAll('.game-card');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial check for elements in view
    revealOnScroll();
});