document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.merto-header-sticky');
    const nav = document.querySelector('nav');
    const contactSection = document.querySelector('.contact-us-section');
    
    // Check if elements exist
    if (!header || !contactSection) {
        console.error('Header or contact section not found');
        return;
    }
    
    // Calculate header + nav height for proper spacing
    const headerHeight = header.offsetHeight;
    const navHeight = nav ? nav.offsetHeight : 0;
    const totalHeaderHeight = headerHeight + navHeight;
    
    function handleScroll() {
        const contactSectionTop = contactSection.offsetTop;
        const contactSectionHeight = contactSection.offsetHeight;
        const currentScrollY = window.scrollY;
        
        // Calculate the middle point of the contact section
        const contactSectionMiddle = contactSectionTop + (contactSectionHeight / 2);
        
        // Trigger point is at the middle of the contact section
        const triggerPoint = contactSectionMiddle - (window.innerHeight / 2);
        
        // Check if we should activate fixed header
        if (currentScrollY >= triggerPoint) {
            // Make header fixed when reaching middle of contact section
            if (!header.classList.contains('fixed-mode')) {
                header.classList.add('fixed-mode');
                if (nav) nav.classList.add('fixed-mode');
                document.body.classList.add('header-fixed-active');
                
                // Add compensating space to prevent content jump
                const spacer = document.createElement('div');
                spacer.className = 'header-spacer';
                spacer.style.height = totalHeaderHeight + 'px';
                header.parentNode.insertBefore(spacer, header);
            }
        } else {
            // Keep header as normal section when above trigger point
            if (header.classList.contains('fixed-mode')) {
                header.classList.remove('fixed-mode');
                if (nav) nav.classList.remove('fixed-mode');
                document.body.classList.remove('header-fixed-active');
                
                // Remove compensating space
                const spacer = document.querySelector('.header-spacer');
                if (spacer) {
                    spacer.remove();
                }
            }
        }
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16); // ~60fps
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Initial call to set correct state
    handleScroll();
});

