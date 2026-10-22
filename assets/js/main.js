/* TAXI DU VIC-BILH — JS minimal (menu mobile, en-tête, apparitions, formulaire) */
(function () {
  var doc = document.documentElement;
  doc.classList.add('js');

  /* Menu mobile */
  var toggle = document.querySelector('.menu-toggle');
  var panel = document.getElementById('mobile-nav');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      panel.classList.toggle('is-open', !open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        panel.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  /* One-page : fermer le menu mobile au clic sur une ancre */
  if (panel) {
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a[href*="#"]')) {
        toggle.setAttribute('aria-expanded', 'false');
        panel.classList.remove('is-open');
      }
    });
  }

  /* One-page : surligner la section en cours dans le menu */
  var navLinks = document.querySelectorAll('.nav a[href^="#"], .mobile-nav a[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          if (a.getAttribute('href') === '#' + entry.target.id) a.setAttribute('aria-current', 'location');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) spy.observe(target);
    });
  }

  /* Filet sous l'en-tête au défilement */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Apparition douce des blocs */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Pré-remplissage du formulaire de contact (planificateur ou paramètres d'URL) */
  function fillBooking(d) {
    var set = function (id, v) { var f = document.getElementById(id); if (f && v) f.value = v; };
    set('f-arr', d.arr);
    set('f-heure', d.heure);
    set('f-pax', d.pax);
    set('f-type', d.type);
    set('f-msg', d.msg);
  }
  if (document.getElementById('reserver') && window.URLSearchParams && window.location.search) {
    var params = new URLSearchParams(window.location.search);
    if (params.get('arr')) {
      fillBooking({ arr: params.get('arr'), heure: params.get('heure'), pax: params.get('pax'), type: params.get('type'), msg: params.get('msg') });
      setTimeout(function () { var n = document.getElementById('f-nom'); if (n) n.focus({ preventScroll: true }); }, 400);
    }
  }

  /* Le planificateur de la famille : « On part à quelle heure ? » */
  var planner = document.getElementById('planner');
  if (planner) {
    var $ = function (id) { return document.getElementById(id); };
    var dest = $('p-dest'), rdv = $('p-heure'), bag = $('p-bagages');
    var counts = { adultes: 2, enfants: 1 };
    var limits = { adultes: [1, 8], enfants: [0, 6] };
    var fmt = function (m) {
      m = ((m % 1440) + 1440) % 1440;
      var h = Math.floor(m / 60), mn = m % 60;
      return h + ' h ' + (mn < 10 ? '0' : '') + mn;
    };
    var hhmm = function (m) {
      m = ((m % 1440) + 1440) % 1440;
      var h = Math.floor(m / 60), mn = m % 60;
      return (h < 10 ? '0' : '') + h + ':' + (mn < 10 ? '0' : '') + mn;
    };
    var plural = function (n, s, p) { return n + ' ' + (n > 1 ? p : s); };
    var state = {};

    var render = function () {
      var opt = dest.options[dest.selectedIndex];
      var dur = opt.dataset.min ? parseInt(opt.dataset.min, 10) : null;
      var air = opt.dataset.type === 'air';
      var parts = (rdv.value || '09:00').split(':');
      var rdvMin = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      var a = counts.adultes, e = counts.enfants, total = a + e, taxis = Math.ceil(total / 4);
      var margin = air ? 90 : 15;
      var dep = dur !== null ? rdvMin - dur - margin : null;

      $('p-depart').textContent = dep !== null ? fmt(dep) : 'Sur devis';
      $('p-route').innerHTML = opt.dataset.name + '<small>' +
        (dur !== null ? opt.dataset.km + ' · environ ' + opt.dataset.time + ' de route' : 'Toutes distances : on calcule ensemble votre trajet') + '</small>';

      // Sièges : un groupe de 4 par taxi
      var seats = '', placed = 0;
      for (var t = 0; t < taxis; t++) {
        if (t > 0) seats += '<li class="is-gap" aria-hidden="true"></li>';
        for (var s = 0; s < 4; s++, placed++) {
          if (placed < a) seats += '<li class="is-adult" title="Adulte">A</li>';
          else if (placed < total) seats += '<li class="is-child" title="Enfant">E</li>';
          else seats += '<li title="Place libre"></li>';
        }
      }
      $('p-seats').innerHTML = seats;
      $('p-seats').setAttribute('aria-label', plural(a, 'adulte', 'adultes') + ', ' + plural(e, 'enfant', 'enfants') + ', ' + plural(taxis, 'taxi', 'taxis'));

      var check = '<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>';
      var notes = [];
      notes.push(air ? 'Dépose 1 h 30 avant le décollage, bagages chargés par nos soins'
        : (dur !== null ? 'Arrivée 15 minutes avant votre rendez-vous' : 'Devis gratuit, prix annoncé avant le départ'));
      if (e > 0) notes.push(plural(e, 'siège enfant installé', 'sièges enfants installés') + ' avant votre arrivée');
      if (taxis > 1) notes.push('On vient à ' + taxis + ' taxis : la famille au complet au volant');
      if (bag.checked) notes.push('Place prévue dans le coffre pour les valises, la poussette ou le fauteuil');
      $('p-notes').innerHTML = notes.map(function (n) { return '<li>' + check + '<span>' + n + '</span></li>'; }).join('');

      var hand = 'On s’occupe du reste !';
      if (dep !== null && ((dep % 1440) + 1440) % 1440 < 360) hand = 'Pas de souci, nous, on sera réveillés !';
      else if (e > 0) hand = 'Pensez au doudou !';
      $('p-hand').textContent = hand;

      state = { name: opt.dataset.name, air: air, dep: dep, rdv: hhmm(rdvMin), a: a, e: e, total: total, taxis: taxis, bag: bag.checked };
    };

    planner.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-step]');
      if (!btn) return;
      var key = btn.dataset.step, delta = parseInt(btn.dataset.delta, 10);
      counts[key] = Math.min(limits[key][1], Math.max(limits[key][0], counts[key] + delta));
      $('p-' + key).textContent = counts[key];
      planner.querySelectorAll('[data-step="' + key + '"]').forEach(function (b) {
        var d = parseInt(b.dataset.delta, 10);
        b.disabled = (d < 0 && counts[key] <= limits[key][0]) || (d > 0 && counts[key] >= limits[key][1]);
      });
      render();
    });
    [dest, rdv, bag].forEach(function (el) { el.addEventListener('change', render); el.addEventListener('input', render); });

    // « Envoyer ce trajet » : pré-remplit le formulaire de contact
    // (sur la même page s'il existe, sinon via contact.html?… )
    $('p-book').addEventListener('click', function () {
      var data = {
        arr: state.name,
        heure: state.dep !== null ? hhmm(state.dep) : '',
        pax: state.total > 4 ? 'Plus de 4' : String(state.total),
        type: state.air ? 'Gares & aéroports' : '',
        msg: 'Rendez-vous / vol à ' + state.rdv + '. ' + plural(state.a, 'adulte', 'adultes') + ', ' +
          plural(state.e, 'enfant', 'enfants') + (state.e > 0 ? ' (siège auto à prévoir, âges : …)' : '') +
          (state.bag ? '. Bagages / poussette / fauteuil.' : '.')
      };
      if (!$('reserver')) {
        var q = Object.keys(data).filter(function (k) { return data[k]; })
          .map(function (k) { return k + '=' + encodeURIComponent(data[k]); }).join('&');
        window.location.href = 'contact.html?' + q + '#reserver';
        return;
      }
      fillBooking(data);
      var target = $('reserver');
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      setTimeout(function () { var n = $('f-nom'); if (n) n.focus({ preventScroll: true }); }, 500);
    });

    render();
  }

  /* Année du pied de page */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* Formulaire de contact : envoi AJAX si un endpoint est configuré */
  var form = document.querySelector('form[data-booking]');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      if (form.action.indexOf('VOTRE_ID') !== -1) {
        // Endpoint non configuré : on bascule vers l'e-mail pour ne perdre aucune demande
        e.preventDefault();
        var data = new FormData(form);
        var body = [];
        data.forEach(function (v, k) { if (k !== '_gotcha' && k !== 'rgpd') body.push(k + ' : ' + v); });
        window.location.href = 'mailto:taxiduvicbilh@gmail.com?subject=' +
          encodeURIComponent('Formulaire de contact — site web') + '&body=' + encodeURIComponent(body.join('\n'));
        return;
      }
      if (!window.fetch) return;
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      status.textContent = 'Envoi en cours…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          form.reset();
          status.textContent = 'Merci ! Votre demande est bien partie. Nous vous rappelons très vite.';
        })
        .catch(function () {
          status.textContent = "L'envoi n'a pas abouti. Appelez-nous directement au 06 12 69 43 31.";
        })
        .finally(function () { btn.disabled = false; });
    });
  }
})();
