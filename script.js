(function () {
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.01, rootMargin: '0px 0px -6% 0px' });
  items.forEach(function (el) { io.observe(el); });

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
