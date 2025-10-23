document.querySelectorAll('.card').forEach(card => {
    const cardInner = card; // If you had an inner wrapper, select that instead

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2; // X position from center
      const y = e.clientY - rect.top - rect.height / 2; // Y position from center

      const rotateY = (x / (rect.width / 2)) * 10; // Max rotation 10 degrees
      const rotateX = -(y / (rect.height / 2)) * 10; // Max rotation 10 degrees

      cardInner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      cardInner.style.transition = 'transform 0.1s ease-out'; // Faster transition while moving mouse
    });

    card.addEventListener('mouseleave', () => {
      cardInner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      cardInner.style.transition = 'transform 0.4s ease-out'; // Slower transition back to normal
    });
});