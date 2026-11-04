document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.mainnav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  var overlayImg = document.createElement('img');
  overlay.appendChild(overlayImg);
  document.body.appendChild(overlay);

  document.querySelectorAll('.lightbox-img').forEach(function (img) {
    img.addEventListener('click', function () {
      overlayImg.src = img.src;
      overlayImg.alt = img.alt;
      overlay.classList.add('active');
    });
  });

  overlay.addEventListener('click', function () {
    overlay.classList.remove('active');
    overlayImg.src = '';
  });
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.yt-lite').forEach(function (box) {
    var btn = box.querySelector('.yt-play');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var id = box.getAttribute('data-yt');
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      f.title = 'Video de YouTube';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      box.innerHTML = '';
      box.appendChild(f);
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var sc = document.querySelector('.avh-scroller');
  if (!sc) return;
  document.querySelectorAll('.avh-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var card = sc.querySelector('.avh-item');
      var step = card ? card.getBoundingClientRect().width + 24 : 320;
      sc.scrollBy({ left: step * parseInt(b.getAttribute('data-dir'), 10), behavior: 'smooth' });
    });
  });
  var down = false, sx = 0, sl = 0, moved = false;
  sc.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse') return;
    down = true; moved = false; sx = e.clientX; sl = sc.scrollLeft;
  });
  window.addEventListener('pointermove', function (e) {
    if (!down) return;
    var dx = e.clientX - sx;
    if (Math.abs(dx) > 5) { moved = true; sc.classList.add('dragging'); }
    sc.scrollLeft = sl - dx;
  });
  window.addEventListener('pointerup', function () { down = false; sc.classList.remove('dragging'); });
  sc.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);
});
