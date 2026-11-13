/**
 * FERMOND SAFFRON — FULLSCREEN LUXURY CONTROLLER (PHASE 3)
 * Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  const heroBgLayer = document.getElementById('heroBgLayer');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  /* ------------------------------------------------------------------------
     SUBTLE MOUSE-MOVEMENT BACKGROUND PARALLAX (Desktop Only)
     Displacement: ~5-8px in opposite direction with smooth lerp
     ------------------------------------------------------------------------ */
  if (!prefersReducedMotion && heroBgLayer && !isTouchDevice && window.innerWidth > 820) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isTicking = false;

    window.addEventListener('mousemove', (e) => {
      // Offset from center (-0.5 to 0.5)
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;

      // Small subtle displacement in opposite direction (-8px to +8px)
      targetX = -normX * 16;
      targetY = -normY * 12;

      if (!isTicking) {
        requestAnimationFrame(updateParallax);
        isTicking = true;
      }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    const updateParallax = () => {
      // Smooth linear interpolation (lerp)
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      heroBgLayer.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      // Continue animating until nearly settled
      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        requestAnimationFrame(updateParallax);
      } else {
        isTicking = false;
      }
    };
  }
});
