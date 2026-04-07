/* Raja Roadlines — Logo injector
   Uses the actual logo image from images/logo.png */

document.querySelectorAll('.logo-mark').forEach(el => {
  const size = parseInt(el.dataset.size || 36);
  const img = document.createElement('img');
  img.src = 'images/logo.png';
  img.alt = 'Raja Roadlines';
  img.style.height = size + 'px';
  img.style.width = 'auto';
  img.style.display = 'block';
  el.appendChild(img);
});
