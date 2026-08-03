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

  window.addEventListener('message', (e) => {
    const m = e.data || {};
    if (m.action === 'show') {
      root.classList.remove('hidden');
    } else if (m.action === 'hide') {
      root.classList.add('hidden');
    } else if (m.action === 'update') {
      root.classList.remove('hidden');
      update(m.data || {});
    }
  });
})();
