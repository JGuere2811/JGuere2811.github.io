// Artículos: barra de progreso, índice que marca la sección visible y zoom de capturas.
(() => {
  const barra = document.getElementById('progreso');
  const alDesplazar = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    if (barra) barra.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
  };
  addEventListener('scroll', alDesplazar, { passive: true });
  alDesplazar();

  const enlaces = [...document.querySelectorAll('.indice a')];
  if (enlaces.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entradas => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        for (const a of enlaces) a.classList.toggle('activo', a.getAttribute('href') === '#' + e.target.id);
      }
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('article section[id]').forEach(s => obs.observe(s));
  }

  const zoom = document.getElementById('zoom');
  if (zoom) {
    const img = zoom.querySelector('img');
    document.querySelectorAll('[data-zoom]').forEach(b => b.addEventListener('click', () => {
      img.src = b.dataset.zoom;
      img.alt = b.querySelector('img')?.alt || '';
      zoom.showModal();
    }));
    zoom.addEventListener('click', () => zoom.close());
  }
  const y = document.getElementById('anio');
  if (y) y.textContent = new Date().getFullYear();
})();
