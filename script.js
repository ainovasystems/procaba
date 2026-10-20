(() => {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  const nav = document.querySelector('.nav');

  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', e => {
    if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }
  });
  const onScroll = () => nav.classList.toggle('solid', scrollY > 20);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  document.getElementById('y').textContent = new Date().getFullYear();

  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .12 });
    els.forEach(el => io.observe(el));
  } else els.forEach(el => el.classList.add('in'));

  const form = document.getElementById('form');
  const note = document.getElementById('note');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { note.textContent = 'Revisa los campos obligatorios.'; form.reportValidity(); return; }
    const d = new FormData(form);
    const body = `Nombre: ${d.get('nombre')}\nTeléfono: ${d.get('tel')}\n\n${d.get('msg')}`;
    location.href = `mailto:info@procaba.es?subject=${encodeURIComponent('Consulta web · ' + d.get('nombre'))}&body=${encodeURIComponent(body)}`;
    note.textContent = 'Abriendo tu cliente de correo…';
  });
})();
