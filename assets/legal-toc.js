(function () {
  var toc = document.getElementById('toc');
  var secs = document.querySelectorAll('.legal-content section');
  secs.forEach(function (s) { var h = s.querySelector('h2'); var li = document.createElement('li'); li.innerHTML = '<a href="#' + s.id + '">' + h.textContent + '</a>'; toc.appendChild(li); });
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { toc.querySelectorAll('a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); }); } }); }, { rootMargin: '-30% 0px -60% 0px' });
  secs.forEach(function (s) { io.observe(s); });
})();
