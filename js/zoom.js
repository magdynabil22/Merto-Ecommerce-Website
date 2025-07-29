function initZoomEffect(container, image) {
    let isZooming = false;

    container.addEventListener('mouseenter', function () {
        isZooming = true;
    });

    container.addEventListener('mouseleave', function () {
        isZooming = false;
        image.style.transform = 'scale(1)';
        image.style.transformOrigin = 'center center';
    });

    container.addEventListener('mousemove', function (e) {
        if (!isZooming) return;

        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        image.style.transformOrigin = `${x}% ${y}%`;
        image.style.transform = 'scale(1.4)';
    });
}

// Initialize zoom effect for all tab containers after DOM loads
document.addEventListener('DOMContentLoaded', function () {
    // Find all zoom containers and initialize zoom effect
    document.querySelectorAll('.advanced-zoom-container').forEach(container => {
        const image = container.querySelector('.advanced-zoom-image');
        if (image) {
            initZoomEffect(container, image);
        }
    });
});