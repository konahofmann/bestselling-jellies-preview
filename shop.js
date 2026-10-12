(function () {
  var cfg = window.SHOP_CONFIG;
  if (!cfg) return;
  var KEY = 'ap_basket';
  var basketMode = !!cfg.checkoutEndpoint;

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save(b) { localStorage.setItem(KEY, JSON.stringify(b)); }
  function find(id) {
    return cfg.products.filter(function (p) { return p.id === id; })[0];
  }
  function fmt(p) {
    return p.price == null ? 'Price on request' : cfg.currencySymbol + Number(p.price).toFixed(2);
  }

  function renderBar() {
    var bar = document.getElementById('basket-bar');
    if (!bar) return;
    var b = load(), n = 0, sum = 0, ids = Object.keys(b);
    ids.forEach(function (id) {
      var p = find(id);
      if (p) { n += b[id]; sum += b[id] * (p.price || 0); }
    });
    bar.hidden = n === 0;
    bar.querySelector('[data-count]').textContent = n + (n === 1 ? ' item' : ' items');
    bar.querySelector('[data-sum]').textContent = cfg.currencySymbol + sum.toFixed(2);
  }

  function checkout() {
    var b = load();
    var items = Object.keys(b).map(function (id) { return { id: id, qty: b[id] }; });
    if (!items.length) return;
    fetch(cfg.checkoutEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items })
    }).then(function (r) { return r.json(); }).then(function (d) {
      if (d.url) { window.location.href = d.url; } else { throw new Error('no url'); }
    }).catch(function () {
      alert('Checkout is not available right now. Please message us on Instagram.');
    });
  }

  document.querySelectorAll('[data-product]').forEach(function (card) {
    var p = find(card.getAttribute('data-product'));
    var price = card.querySelector('[data-price]');
    var slot = card.querySelector('[data-action]');
    if (!p || !slot) return;
    if (price) price.textContent = fmt(p);
    var a = document.createElement(basketMode && p.price != null ? 'button' : 'a');
    a.className = 'btn small';
    if (basketMode && p.price != null) {
      a.type = 'button';
      a.textContent = 'Add to basket';
      a.addEventListener('click', function () {
        var b = load();
        b[p.id] = (b[p.id] || 0) + 1;
        save(b);
        renderBar();
      });
    } else if (p.paymentLink) {
      a.href = p.paymentLink;
      a.textContent = 'Order now';
    } else {
      a.href = cfg.instagramUrl;
      a.textContent = 'Order via Instagram';
      a.target = '_blank';
      a.rel = 'noopener';
      a.className += ' ghost';
    }
    slot.appendChild(a);
  });

  var bar = document.getElementById('basket-bar');
  if (bar && basketMode) {
    bar.querySelector('[data-checkout]').addEventListener('click', checkout);
    bar.querySelector('[data-clear]').addEventListener('click', function () { save({}); renderBar(); });
    renderBar();
  }
})();
