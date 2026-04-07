/* Raja Roadlines — Logo injector
   Uses the PNG logo from images/logo.png */

document.querySelectorAll('.logo-mark').forEach(el => {
  const baseSize = parseInt(el.dataset.size || 48);
  const isNavLogo = Boolean(el.closest('nav'));
  const viewportWidth = window.innerWidth;

  // Responsive scaling
  let scaleFactor = 1;
  if (isNavLogo) {
    if (viewportWidth < 640) scaleFactor = 1.8;       // mobile: bigger
    else if (viewportWidth < 1024) scaleFactor = 1.9; // tablet
    else scaleFactor = 2;                              // desktop
  } else {
    if (viewportWidth < 640) scaleFactor = 1.3;
    else scaleFactor = 1.5;
  }

  const scaledSize = Math.round(baseSize * scaleFactor);
  const img = document.createElement('img');
  img.src = 'images/logo.png';
  img.alt = 'Raja Roadlines';
  img.style.height = scaledSize + 'px';
  img.style.width = 'auto';
  img.style.display = 'block';
  img.style.objectFit = 'contain';
  img.onerror = () => {
    el.innerHTML = '🚛'; // Fallback emoji if image fails
  };
  el.appendChild(img);
});
