(function () {
  const el = (id) => document.getElementById(id);
  const root = el('root');
  const show = (cond, node) => node.classList.toggle('hidden', !cond);

  function update(d) {
    // Nation flag (local asset)
    const flag = el('flag');
    if (d.nation) { flag.src = 'asset/flags/' + String(d.nation).toLowerCase() + '.webp'; show(true, flag); }
    else show(false, flag);

    // Race number plate
    if (d.number != null) { el('num').textContent = d.number; show(true, el('num')); }
    else show(false, el('num'));

    el('name').textContent = d.name || '—';

    // Record-holder marker
    const recs = d.records || 0;
    show(recs > 0, el('rec'));
    el('rec').textContent = (recs > 1) ? ('REC ' + recs) : 'REC';

    if (d.rank) { el('rank').textContent = d.rank; show(true, el('rank')); }
    else show(false, el('rank'));

    if (d.crew) { el('crew').textContent = d.crew; show(true, el('crew')); }
    else show(false, el('crew'));

    // Status
    const status = el('status');
    if (d.racing) {
      const bits = ['RACING'];
      if (d.position != null) bits.push('P' + d.position);
      if (d.lap != null) bits.push('L' + d.lap);
      status.textContent = bits.join(' · ');
      status.className = 'status-val racing';
    } else {
      status.textContent = 'FREEROAM';
      status.className = 'status-val freeroam';
    }

    // Speed
    el('speed').textContent = d.speed != null ? d.speed : 0;
    el('veh').textContent = d.vehicle || 'On foot';

    el('counter').textContent = (d.index || 1) + ' / ' + (d.total || 1);
  }

  // Base theme (server.cfg spz_theme_* convars, pushed from spz-core).
  const THEME_VARS = { accent: '--primary', gold: '--gold' };
  const THEME_RGB_VARS = { accent: '--primary-rgb' };
  function hexToRgbTriplet(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '');
    return m ? `${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}` : null;
  }
  function applyTheme(theme) {
    if (!theme) return;
    for (const key in THEME_VARS) {
      if (theme[key]) document.documentElement.style.setProperty(THEME_VARS[key], theme[key]);
    }
    for (const key in THEME_RGB_VARS) {
      const rgb = theme[key] && hexToRgbTriplet(theme[key]);
      if (rgb) document.documentElement.style.setProperty(THEME_RGB_VARS[key], rgb);
    }
  }

  window.addEventListener('message', (e) => {
    const m = e.data || {};
    if (m.action === 'show') {
      root.classList.remove('hidden');
    } else if (m.action === 'hide') {
      root.classList.add('hidden');
    } else if (m.action === 'update') {
      root.classList.remove('hidden');
      update(m.data || {});
    } else if (m.action === 'theme') {
      applyTheme(m.theme);
    }
  });
})();
