/* ============================================================
   DARKSOUL ASCENT — script.js
   Clean, production-ready, no errors
   ============================================================ */

(function () {
    'use strict';

    /* ════════════════════════════════════════════
       INTRO SCREEN
    ════════════════════════════════════════════ */
    const introScreen  = document.getElementById('intro-screen');
    const introFill    = document.getElementById('intro-bar-fill');
    const introText    = document.getElementById('intro-bar-text');
    const introSkip    = document.getElementById('intro-skip');
    const mainSite     = document.getElementById('main-site');

    const loadingLines = [
        'Awakening the Soul...',
        'Binding the Wraith...',
        'Forging Spectral Chains...',
        'Opening the Crypt...',
        'Rise...'
    ];

    let introProgress = 0;
    let introInterval = null;

    function showMainSite() {
        introScreen.style.transition = 'opacity 0.7s ease';
        introScreen.style.opacity    = '0';
        mainSite.style.opacity       = '1';
        mainSite.style.pointerEvents = 'auto';
        setTimeout(function () {
            introScreen.style.display = 'none';
        }, 750);
        showCookieBanner();
    }

    function advanceIntro() {
        introProgress += (Math.random() * 2.2 + 0.8);
        if (introProgress > 100) introProgress = 100;
        introFill.style.width = introProgress + '%';

        // Update text
        var idx = Math.min(Math.floor(introProgress / 22), loadingLines.length - 1);
        introText.textContent = loadingLines[idx];

        if (introProgress >= 100) {
            clearInterval(introInterval);
            setTimeout(showMainSite, 400);
        }
    }

    introInterval = setInterval(advanceIntro, 60);

    introSkip.addEventListener('click', function () {
        clearInterval(introInterval);
        introProgress = 100;
        introFill.style.width = '100%';
        introText.textContent = loadingLines[loadingLines.length - 1];
        setTimeout(showMainSite, 250);
    });

    /* ── Intro canvas particles ───────────────── */
    (function initIntroCanvas() {
        var canvas = document.getElementById('intro-canvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var W, H, particles = [];

        function resize() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        for (var i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                r: Math.random() * 1.4 + 0.3,
                vy: -(Math.random() * 0.6 + 0.2),
                vx: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        function drawIntro() {
            if (!introScreen || introScreen.style.display === 'none') return;
            ctx.clearRect(0, 0, W, H);
            particles.forEach(function (p) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(74,179,212,' + p.opacity + ')';
                ctx.fill();
                p.x += p.vx;
                p.y += p.vy;
                if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
            });
            requestAnimationFrame(drawIntro);
        }
        drawIntro();
    }());

    /* ════════════════════════════════════════════
       COOKIE BANNER
    ════════════════════════════════════════════ */
    var cookieBanner = document.getElementById('cookie-banner');

    function showCookieBanner() {
        if (localStorage.getItem('ds_cookie_consent')) return;
        setTimeout(function () { cookieBanner.classList.add('show'); }, 800);
    }

    document.getElementById('cookie-accept').addEventListener('click', function () {
        localStorage.setItem('ds_cookie_consent', '1');
        cookieBanner.classList.remove('show');
    });
    document.getElementById('cookie-decline').addEventListener('click', function () {
        localStorage.setItem('ds_cookie_consent', '0');
        cookieBanner.classList.remove('show');
    });

    /* ════════════════════════════════════════════
       HEADER — scroll behaviour & burger
    ════════════════════════════════════════════ */
    var header    = document.getElementById('main-header');
    var burger    = document.getElementById('burger');
    var navLinks  = document.getElementById('nav-links');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    burger.addEventListener('click', function () {
        burger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            burger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    /* ════════════════════════════════════════════
       SCROLL PROGRESS BAR
    ════════════════════════════════════════════ */
    var scrollBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', function () {
        var scrolled = window.scrollY;
        var total    = document.body.scrollHeight - window.innerHeight;
        var pct      = total > 0 ? (scrolled / total) * 100 : 0;
        scrollBar.style.width = pct + '%';
    }, { passive: true });

    /* ════════════════════════════════════════════
       SCROLL TO TOP
    ════════════════════════════════════════════ */
    var scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ════════════════════════════════════════════
       HERO PARTICLES
    ════════════════════════════════════════════ */
    function initHeroParticles() {
        var container = document.getElementById('hero-particles');
        if (!container) return;
        for (var i = 0; i < 35; i++) {
            (function (i) {
                var p = document.createElement('div');
                p.style.cssText = [
                    'position:absolute',
                    'width:' + (Math.random() * 2 + 1) + 'px',
                    'height:' + (Math.random() * 2 + 1) + 'px',
                    'background:rgba(74,179,212,' + (Math.random() * 0.5 + 0.1) + ')',
                    'border-radius:50%',
                    'left:' + Math.random() * 100 + '%',
                    'top:' + Math.random() * 100 + '%',
                    'animation:particleRise ' + (Math.random() * 8 + 5) + 's linear ' + (Math.random() * 6) + 's infinite',
                    'pointer-events:none'
                ].join(';');
                container.appendChild(p);
            }(i));
        }

        // Inject keyframes once
        if (!document.getElementById('particle-kf')) {
            var style = document.createElement('style');
            style.id  = 'particle-kf';
            style.textContent = [
                '@keyframes particleRise {',
                '  0%   { transform: translateY(0) translateX(0); opacity: 0; }',
                '  10%  { opacity: 1; }',
                '  90%  { opacity: 0.4; }',
                '  100% { transform: translateY(-70vh) translateX(20px); opacity: 0; }',
                '}'
            ].join('');
            document.head.appendChild(style);
        }
    }
    initHeroParticles();

    /* ════════════════════════════════════════════
       COUNTER ANIMATION
    ════════════════════════════════════════════ */
    function animateCounter(el) {
        var target   = parseInt(el.getAttribute('data-target'), 10);
        var duration = 1800;
        var start    = null;
        function step(ts) {
            if (!start) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var ease     = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(ease * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target.toLocaleString();
        }
        requestAnimationFrame(step);
    }

    var countersTriggered = false;
    function checkCounters() {
        if (countersTriggered) return;
        var hero = document.getElementById('home');
        if (!hero) return;
        var rect = hero.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            countersTriggered = true;
            document.querySelectorAll('.hnum[data-target]').forEach(animateCounter);
        }
    }

    /* ════════════════════════════════════════════
       SCROLL REVEAL
    ════════════════════════════════════════════ */
    var revealEls = document.querySelectorAll('.reveal');

    function checkReveal() {
        revealEls.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                el.classList.add('visible');
            }
        });
        checkCounters();
    }

    window.addEventListener('scroll', checkReveal, { passive: true });
    // Run once on page load
    setTimeout(checkReveal, 100);

    /* ════════════════════════════════════════════
       GALLERY LIGHTBOX
    ════════════════════════════════════════════ */
    var lightbox = document.getElementById('lightbox');
    var lbImg    = document.getElementById('lb-img');
    var lbCap    = document.getElementById('lb-caption');
    var lbClose  = document.getElementById('lb-close');

    window.openLightbox = function (src, caption) {
        lbImg.src         = src;
        lbImg.alt         = caption || '';
        lbCap.textContent = caption || '';
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
        lbImg.src = '';
    }

    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
    });

    /* ════════════════════════════════════════════
       STAR RATING
    ════════════════════════════════════════════ */
    var starSelector = document.getElementById('star-selector');
    var selectedStar = 0;

    if (starSelector) {
        var stars = starSelector.querySelectorAll('.star-opt');

        stars.forEach(function (star) {
            star.addEventListener('mouseenter', function () {
                var val = parseInt(this.getAttribute('data-val'), 10);
                stars.forEach(function (s) {
                    s.classList.toggle('active', parseInt(s.getAttribute('data-val'), 10) <= val);
                });
            });

            star.addEventListener('mouseleave', function () {
                stars.forEach(function (s) {
                    s.classList.toggle('active', parseInt(s.getAttribute('data-val'), 10) <= selectedStar);
                });
            });

            star.addEventListener('click', function () {
                selectedStar = parseInt(this.getAttribute('data-val'), 10);
                stars.forEach(function (s) {
                    s.classList.toggle('active', parseInt(s.getAttribute('data-val'), 10) <= selectedStar);
                });
            });

            star.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    /* ════════════════════════════════════════════
       SUBMIT REVIEW
    ════════════════════════════════════════════ */
    var submitBtn     = document.getElementById('submit-review');
    var reviewSuccess = document.getElementById('review-success');

    if (submitBtn) {
        submitBtn.addEventListener('click', function () {
            var name = document.getElementById('review-name').value.trim();
            var text = document.getElementById('review-textarea').value.trim();
            if (!selectedStar || !name || !text) return;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            setTimeout(function () {
                document.getElementById('review-name').value    = '';
                document.getElementById('review-textarea').value = '';
                selectedStar = 0;
                if (starSelector) {
                    starSelector.querySelectorAll('.star-opt').forEach(function (s) {
                        s.classList.remove('active');
                    });
                }
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Review';
                if (reviewSuccess) {
                    reviewSuccess.style.display = 'block';
                    setTimeout(function () {
                        reviewSuccess.style.display = 'none';
                    }, 3500);
                }
            }, 900);
        });
    }

    /* ════════════════════════════════════════════
       DOWNLOAD HANDLER
    ════════════════════════════════════════════ */
    window.handleDownload = function () {
        var notif = document.getElementById('dl-notification');
        if (!notif) return;
        notif.classList.add('show');
        setTimeout(function () { notif.classList.remove('show'); }, 5000);
    };

    /* ════════════════════════════════════════════
       SMOOTH SCROLL for nav anchors
    ════════════════════════════════════════════ */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            var offset = target.getBoundingClientRect().top + window.pageYOffset - 68;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        });
    });

}());

/* ════════════════════════════════════════════
   CODEX TABS
════════════════════════════════════════════ */
(function initCodexTabs() {
    var tabs = document.querySelectorAll('.ctab');
    if (!tabs.length) return;

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
            tab.classList.add('active');
            tab.setAttribute('aria-selected','true');

            document.querySelectorAll('.codex-panel').forEach(function(p) {
                p.classList.remove('active');
            });
            var target = document.getElementById('tab-' + tab.getAttribute('data-tab'));
            if (target) {
                target.classList.add('active');
                // re-trigger reveals inside this panel
                target.querySelectorAll('.reveal').forEach(function(el) {
                    var rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight * 1.1) el.classList.add('visible');
                });
            }
        });
    });
}());

/* ════════════════════════════════════════════
   FAQ ACCORDION
════════════════════════════════════════════ */
(function initFAQ() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function(item) {
        var btn = item.querySelector('.faq-q');
        var ans = item.querySelector('.faq-a');
        if (!btn || !ans) return;

        btn.addEventListener('click', function() {
            var isOpen = btn.getAttribute('aria-expanded') === 'true';

            // close all
            items.forEach(function(i) {
                var b = i.querySelector('.faq-q');
                var a = i.querySelector('.faq-a');
                if (b) b.setAttribute('aria-expanded','false');
                if (a) a.classList.remove('open');
            });

            // open this one if was closed
            if (!isOpen) {
                btn.setAttribute('aria-expanded','true');
                ans.classList.add('open');
            }
        });
    });
}());

/* ════════════════════════════════════════════
   WRAITH CANVAS ANIMATION
════════════════════════════════════════════ */
(function initWraithCanvas() {
    var canvas = document.getElementById('wraith-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W, H;

    function resize() {
        var rect = canvas.parentElement.getBoundingClientRect();
        W = canvas.width  = rect.width  || 600;
        H = canvas.height = rect.height || (rect.width * 9 / 16) || 337;
    }
    resize();
    window.addEventListener('resize', function() { resize(); });

    // --- Scene state ---
    var t = 0;

    // Ground tiles (pixel-art style platforms)
    var platforms = [
        { x: 0,    y: 0.72, w: 0.35 },
        { x: 0.38, y: 0.65, w: 0.28 },
        { x: 0.70, y: 0.55, w: 0.30 },
        { x: 0.15, y: 0.45, w: 0.22 },
        { x: 0.50, y: 0.38, w: 0.18 },
        { x: 0.05, y: 0.28, w: 0.15 },
    ];

    // Wraith character state
    var wraith = {
        x: 0.12, y: 0.72,
        vy: 0, vx: 0.0018,
        onGround: false,
        facing: 1,
        state: 'run', // run, jump, dash, attack
        stateTimer: 0,
        dashTimer: 0,
        attackTimer: 0,
        platIdx: 0,
        jumped: false,
    };

    // Particles (soul shards + trail)
    var particles = [];
    function spawnParticle(x, y, type) {
        particles.push({
            x: x, y: y,
            vx: (Math.random() - 0.5) * 0.008 * (type === 'blast' ? 4 : 1),
            vy: -(Math.random() * 0.012 + 0.003) * (type === 'blast' ? 3 : 1),
            life: 1,
            decay: type === 'blast' ? 0.04 : 0.018 + Math.random() * 0.015,
            r: type === 'blast' ? (Math.random() * 4 + 2) : (Math.random() * 2.5 + 0.5),
            color: type === 'blast' ? [232, 100, 10] : [74, 179, 212],
            type: type
        });
    }

    // Background stars
    var stars = [];
    for (var s = 0; s < 60; s++) {
        stars.push({ x: Math.random(), y: Math.random() * 0.65, r: Math.random() * 1.2 + 0.2, twinkle: Math.random() * Math.PI * 2 });
    }

    // Floating runes
    var runes = ['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ','ᚺ','ᚾ','ᛁ','ᛃ','ᛇ','ᛈ','ᛉ','ᛊ','ᛏ','ᛒ','ᛖ','ᛗ','ᛚ','ᛜ','ᛞ','ᛟ'];
    var floatRunes = [];
    for (var r2 = 0; r2 < 8; r2++) {
        floatRunes.push({
            ch: runes[Math.floor(Math.random() * runes.length)],
            x: Math.random(),
            y: Math.random() * 0.5 + 0.1,
            opacity: Math.random() * 0.18 + 0.04,
            speed: Math.random() * 0.00008 + 0.00003,
            phase: Math.random() * Math.PI * 2,
            size: Math.floor(Math.random() * 8 + 7)
        });
    }

    // Enemy (skeleton warrior)
    var enemy = { x: 0.75, y: 0.55, alive: true, hitTimer: 0, hp: 3 };

    // Action sequence controller
    var actionSeq = 0;
    var actionTimer = 0;
    var ACTIONS = ['run-to-jump', 'jump', 'land', 'run-attack', 'attack', 'dash', 'rest'];
    var seqPhase = 0;

    function drawBackground() {
        // Dark gradient sky
        var sky = ctx.createLinearGradient(0, 0, 0, H * 0.7);
        sky.addColorStop(0, '#010308');
        sky.addColorStop(0.5, '#040a15');
        sky.addColorStop(1, '#07111e');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H * 0.75);

        // Moon
        var moonX = W * 0.82, moonY = H * 0.12;
        ctx.save();
        var moonGlow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, W * 0.12);
        moonGlow.addColorStop(0, 'rgba(74,179,212,0.04)');
        moonGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = moonGlow;
        ctx.beginPath(); ctx.arc(moonX, moonY, W * 0.12, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(moonX, moonY, W * 0.035, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,230,255,0.85)'; ctx.fill();
        ctx.restore();

        // Stars
        stars.forEach(function(st) {
            var tw = Math.sin(t * 0.02 + st.twinkle);
            ctx.beginPath();
            ctx.arc(st.x * W, st.y * H, st.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(180,210,240,' + (0.3 + tw * 0.25) + ')';
            ctx.fill();
        });

        // Distant castle silhouette
        ctx.save();
        ctx.fillStyle = 'rgba(5,8,14,0.95)';
        var cx = W * 0.5;
        // Castle body
        ctx.fillRect(cx - W*0.12, H*0.28, W*0.24, H*0.42);
        // Towers
        ctx.fillRect(cx - W*0.15, H*0.22, W*0.07, H*0.48);
        ctx.fillRect(cx + W*0.08, H*0.22, W*0.07, H*0.48);
        ctx.fillRect(cx - W*0.20, H*0.32, W*0.06, H*0.38);
        ctx.fillRect(cx + W*0.14, H*0.32, W*0.06, H*0.38);
        // Battlements
        for (var b = 0; b < 5; b++) {
            ctx.fillRect(cx - W*0.12 + b*W*0.05, H*0.20, W*0.03, H*0.09);
        }
        // Windows glow
        ctx.fillStyle = 'rgba(74,100,212,0.15)';
        ctx.fillRect(cx - W*0.04, H*0.34, W*0.03, H*0.05);
        ctx.fillRect(cx + W*0.01, H*0.34, W*0.03, H*0.05);
        ctx.fillRect(cx - W*0.04, H*0.44, W*0.03, H*0.05);
        ctx.fillRect(cx + W*0.01, H*0.44, W*0.03, H*0.05);
        ctx.restore();

        // Floating runes
        floatRunes.forEach(function(ru) {
            ru.x += ru.speed;
            if (ru.x > 1.05) ru.x = -0.05;
            var yOff = Math.sin(t * 0.015 + ru.phase) * 0.015;
            ctx.save();
            ctx.font = ru.size + 'px serif';
            ctx.fillStyle = 'rgba(74,179,212,' + ru.opacity + ')';
            ctx.fillText(ru.ch, ru.x * W, (ru.y + yOff) * H);
            ctx.restore();
        });

        // Ground (pixel-art soil)
        var groundY = H * 0.88;
        var groundGrad = ctx.createLinearGradient(0, groundY, 0, H);
        groundGrad.addColorStop(0, '#0d1a28');
        groundGrad.addColorStop(1, '#050c14');
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0, groundY, W, H - groundY);
        // Ground edge glow
        ctx.strokeStyle = 'rgba(74,179,212,0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(W, groundY); ctx.stroke();
    }

    function drawPlatforms() {
        platforms.forEach(function(p) {
            var px = p.x * W, py = p.y * H, pw = p.w * W, ph = 10;
            // Shadow glow
            ctx.save();
            var grd = ctx.createLinearGradient(px, py, px, py + ph * 3);
            grd.addColorStop(0, 'rgba(74,179,212,0.08)');
            grd.addColorStop(1, 'transparent');
            ctx.fillStyle = grd;
            ctx.fillRect(px, py, pw, ph * 3);
            // Platform body (pixel brick style)
            ctx.fillStyle = '#0d1822';
            ctx.fillRect(px, py, pw, ph);
            ctx.fillStyle = '#162233';
            ctx.fillRect(px, py, pw, 3);
            ctx.strokeStyle = 'rgba(74,179,212,0.22)';
            ctx.lineWidth = 1;
            ctx.strokeRect(px, py, pw, ph);
            // Brick pattern
            ctx.fillStyle = 'rgba(74,179,212,0.06)';
            for (var bx = 0; bx < pw; bx += pw / 4) {
                ctx.fillRect(px + bx, py + 3, 1, ph - 3);
            }
            ctx.restore();
        });
    }

    function drawEnemy(en) {
        if (!en.alive) return;
        var ex = en.x * W, ey = en.y * H;
        var hit = en.hitTimer > 0;
        ctx.save();
        ctx.translate(ex, ey);

        // Skeleton warrior body
        var sc = Math.min(W, H) * 0.055;

        // Glow when hit
        if (hit) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'rgba(232,100,10,0.9)';
        }

        // Body
        ctx.strokeStyle = hit ? 'rgba(255,180,80,0.9)' : 'rgba(200,200,180,0.7)';
        ctx.lineWidth = Math.max(1.5, sc * 0.08);
        ctx.lineCap = 'round';

        var bob = Math.sin(t * 0.04) * 2;

        // Skull
        ctx.beginPath();
        ctx.arc(0, -sc * 2.5 + bob, sc * 0.55, 0, Math.PI * 2);
        ctx.stroke();
        // Eye sockets
        ctx.fillStyle = hit ? 'rgba(255,100,0,0.9)' : 'rgba(180,50,50,0.8)';
        ctx.beginPath(); ctx.arc(-sc*0.18, -sc*2.6 + bob, sc*0.12, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(+sc*0.18, -sc*2.6 + bob, sc*0.12, 0, Math.PI*2); ctx.fill();

        // Spine
        ctx.beginPath();
        ctx.moveTo(0, -sc*1.9 + bob); ctx.lineTo(0, -sc*0.8 + bob);
        ctx.stroke();
        // Rib cage lines
        ctx.lineWidth = Math.max(1, sc * 0.05);
        for (var rb = 0; rb < 3; rb++) {
            ctx.beginPath();
            ctx.moveTo(0, -sc*(1.7 - rb*0.3) + bob);
            ctx.lineTo(-sc*0.5, -sc*(1.5 - rb*0.3) + bob);
            ctx.moveTo(0, -sc*(1.7 - rb*0.3) + bob);
            ctx.lineTo(+sc*0.5, -sc*(1.5 - rb*0.3) + bob);
            ctx.stroke();
        }

        // Arms
        var armSwing = Math.sin(t * 0.06) * 0.4;
        ctx.lineWidth = Math.max(1.5, sc * 0.07);
        ctx.beginPath();
        ctx.moveTo(-sc*0.1, -sc*1.7 + bob);
        ctx.lineTo(-sc*0.8, -sc*(1.1 + armSwing) + bob);
        ctx.lineTo(-sc*0.5, -sc*0.5 + bob);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(+sc*0.1, -sc*1.7 + bob);
        ctx.lineTo(+sc*0.8, -sc*(1.1 - armSwing) + bob);
        ctx.lineTo(+sc*0.5, -sc*0.5 + bob);
        ctx.stroke();

        // Sword (right hand)
        ctx.save();
        ctx.translate(sc*0.5, -sc*(0.5 - armSwing*0.5) + bob);
        ctx.rotate(0.3 + armSwing);
        ctx.strokeStyle = hit ? 'rgba(255,220,100,0.9)' : 'rgba(180,180,200,0.75)';
        ctx.lineWidth = Math.max(2, sc * 0.1);
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(sc*1.1, -sc*0.4); ctx.stroke();
        ctx.lineWidth = Math.max(1, sc * 0.06);
        ctx.beginPath(); ctx.moveTo(-sc*0.12, 0); ctx.lineTo(sc*0.12, 0); ctx.stroke();
        ctx.restore();

        // Legs
        var legSwing = Math.sin(t * 0.04) * 0.25;
        ctx.lineWidth = Math.max(1.5, sc * 0.08);
        ctx.beginPath();
        ctx.moveTo(-sc*0.15, -sc*0.8 + bob);
        ctx.lineTo(-sc*(0.3 + legSwing), 0);
        ctx.lineTo(-sc*0.2, sc*0.6);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(+sc*0.15, -sc*0.8 + bob);
        ctx.lineTo(+sc*(0.3 - legSwing), 0);
        ctx.lineTo(+sc*0.2, sc*0.6);
        ctx.stroke();

        ctx.restore();
        if (en.hitTimer > 0) en.hitTimer--;
    }

    function drawWraith(wr) {
        var wx = wr.x * W, wy = wr.y * H;
        ctx.save();
        ctx.translate(wx, wy);
        if (wr.facing < 0) ctx.scale(-1, 1);

        var sc = Math.min(W, H) * 0.065;
        var bob = wr.state === 'run' ? Math.sin(t * 0.12) * sc * 0.05 : 0;
        var isAttacking = wr.attackTimer > 0;
        var isDashing = wr.dashTimer > 0;

        // Wraith glow aura
        var auraSize = sc * (isDashing ? 2.8 : isAttacking ? 2.2 : 1.8);
        var auraColor = isDashing ? 'rgba(74,179,212,0.22)' : isAttacking ? 'rgba(232,100,10,0.18)' : 'rgba(74,179,212,0.12)';
        var aura = ctx.createRadialGradient(0, -sc + bob, 0, 0, -sc + bob, auraSize);
        aura.addColorStop(0, auraColor);
        aura.addColorStop(1, 'transparent');
        ctx.fillStyle = aura;
        ctx.beginPath(); ctx.arc(0, -sc + bob, auraSize, 0, Math.PI * 2); ctx.fill();

        ctx.shadowBlur = isDashing ? 30 : isAttacking ? 25 : 15;
        ctx.shadowColor = isDashing ? 'rgba(74,179,212,0.9)' : isAttacking ? 'rgba(232,100,10,0.8)' : 'rgba(74,179,212,0.7)';

        var mainColor = isDashing ? 'rgba(150,230,255,0.95)' : isAttacking ? 'rgba(255,160,60,0.95)' : 'rgba(125,216,245,0.9)';
        ctx.strokeStyle = mainColor;
        ctx.fillStyle   = mainColor;
        ctx.lineCap = 'round';

        // === WRAITH HEAD (hooded skull) ===
        var headY = -sc * 2.8 + bob;
        // Hood shape
        ctx.lineWidth = Math.max(1.5, sc * 0.07);
        ctx.beginPath();
        ctx.moveTo(-sc * 0.45, headY + sc * 0.6);
        ctx.quadraticCurveTo(-sc * 0.55, headY - sc * 0.1, 0, headY - sc * 0.55);
        ctx.quadraticCurveTo(sc * 0.55, headY - sc * 0.1, sc * 0.45, headY + sc * 0.6);
        ctx.stroke();
        // Skull face
        ctx.beginPath(); ctx.arc(0, headY + sc * 0.1, sc * 0.32, 0, Math.PI * 2); ctx.stroke();
        // Eyes (glowing)
        ctx.fillStyle = isDashing ? 'rgba(0,200,255,1)' : isAttacking ? 'rgba(255,120,0,1)' : 'rgba(125,216,245,1)';
        ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(-sc*0.12, headY + sc*0.05, sc*0.08, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(+sc*0.12, headY + sc*0.05, sc*0.08, 0, Math.PI*2); ctx.fill();
        ctx.shadowBlur = isDashing ? 30 : 15;
        ctx.fillStyle = mainColor;
        ctx.strokeStyle = mainColor;

        // === BODY (spectral robes) ===
        ctx.lineWidth = Math.max(2, sc * 0.1);
        // Torso
        ctx.beginPath();
        ctx.moveTo(-sc*0.2, headY + sc*0.65);
        ctx.lineTo(-sc*0.25, -sc*0.3 + bob);
        ctx.lineTo(0, -sc*0.1 + bob);
        ctx.lineTo(sc*0.25, -sc*0.3 + bob);
        ctx.lineTo(sc*0.2, headY + sc*0.65);
        ctx.stroke();

        // Robe wisps (spectral trailing effect)
        ctx.lineWidth = Math.max(1, sc * 0.06);
        ctx.globalAlpha = 0.65;
        for (var w2 = 0; w2 < 4; w2++) {
            var wOff = (w2 - 1.5) * sc * 0.14;
            var wLen = sc * (0.8 + Math.sin(t * 0.08 + w2) * 0.3);
            ctx.beginPath();
            ctx.moveTo(wOff, -sc*0.1 + bob);
            ctx.quadraticCurveTo(wOff + Math.sin(t * 0.06 + w2) * sc * 0.15, sc * 0.4, wOff * 0.5, sc * 0.4 + wLen);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;

        // === ARMS ===
        ctx.lineWidth = Math.max(2, sc * 0.09);
        var shoulderY = -sc * 2.1 + bob;

        if (isAttacking) {
            // Attack pose — arm extended forward
            ctx.beginPath();
            ctx.moveTo(sc*0.2, shoulderY);
            ctx.lineTo(sc*1.4, shoulderY - sc*0.1);
            ctx.stroke();
            // Spectral blast effect
            var blastPulse = Math.sin(wr.attackTimer * 0.3) * 0.5 + 0.5;
            ctx.save();
            ctx.shadowBlur = 40;
            ctx.shadowColor = 'rgba(232,100,10,1)';
            ctx.fillStyle = 'rgba(255,160,60,' + (0.6 + blastPulse * 0.4) + ')';
            ctx.beginPath(); ctx.arc(sc*1.6, shoulderY - sc*0.1, sc*(0.25 + blastPulse*0.15), 0, Math.PI*2); ctx.fill();
            // Sparks
            for (var sp = 0; sp < 6; sp++) {
                var sAngle = (sp / 6) * Math.PI * 2 + t * 0.15;
                var sR = sc * (0.35 + blastPulse * 0.2);
                ctx.fillStyle = 'rgba(255,200,80,0.7)';
                ctx.beginPath(); ctx.arc(sc*1.6 + Math.cos(sAngle)*sR, shoulderY - sc*0.1 + Math.sin(sAngle)*sR, sc*0.06, 0, Math.PI*2); ctx.fill();
            }
            ctx.restore();
            // Other arm back
            ctx.strokeStyle = mainColor;
            ctx.beginPath();
            ctx.moveTo(-sc*0.2, shoulderY);
            ctx.lineTo(-sc*0.8, shoulderY + sc*0.4);
            ctx.stroke();
        } else {
            // Run/idle arm swing
            var armSwingW = Math.sin(t * 0.12) * sc * 0.3;
            ctx.beginPath();
            ctx.moveTo(sc*0.2, shoulderY);
            ctx.lineTo(sc*0.75, shoulderY + armSwingW + sc*0.3);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-sc*0.2, shoulderY);
            ctx.lineTo(-sc*0.75, shoulderY - armSwingW + sc*0.3);
            ctx.stroke();
        }

        // === SHADOW DASH TRAIL ===
        if (isDashing) {
            for (var di = 1; di <= 4; di++) {
                ctx.save();
                ctx.globalAlpha = (1 - di * 0.22) * 0.5;
                ctx.translate(-di * sc * 0.4, 0);
                ctx.strokeStyle = 'rgba(74,179,212,0.6)';
                ctx.lineWidth = Math.max(1, sc * 0.08);
                ctx.beginPath();
                ctx.moveTo(-sc*0.25, -sc*0.3 + bob);
                ctx.lineTo(0, -sc*0.1 + bob);
                ctx.lineTo(sc*0.25, -sc*0.3 + bob);
                ctx.stroke();
                ctx.restore();
            }
        }

        ctx.restore();

        // Trail particles from wraith
        if (t % 3 === 0) spawnParticle(wr.x + (wr.facing > 0 ? -0.02 : 0.02), wr.y - 0.06, 'trail');
        if (isAttacking && t % 2 === 0) spawnParticle(wr.x + wr.facing * 0.08, wr.y - 0.10, 'blast');
    }

    function drawParticles() {
        particles = particles.filter(function(p) { return p.life > 0; });
        particles.forEach(function(p) {
            ctx.save();
            ctx.globalAlpha = p.life * 0.85;
            ctx.beginPath();
            ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + p.color[0] + ',' + p.color[1] + ',' + p.color[2] + ',' + p.life + ')';
            if (p.type === 'blast') {
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(232,100,10,0.8)';
            } else {
                ctx.shadowBlur = 6;
                ctx.shadowColor = 'rgba(74,179,212,0.6)';
            }
            ctx.fill();
            ctx.restore();
            p.x += p.vx; p.y += p.vy;
            p.life -= p.decay;
        });
    }

    // Wraith AI / movement
    function updateWraith() {
        actionTimer++;

        // Platform physics
        var curPlat = platforms[wraith.platIdx];
        var platLeft  = curPlat.x;
        var platRight = curPlat.x + curPlat.w;
        var platY     = curPlat.y;

        // Gravity
        wraith.vy += 0.00035;
        wraith.y  += wraith.vy;

        // Land on platform
        if (wraith.y >= platY && wraith.vy >= 0) {
            wraith.y  = platY;
            wraith.vy = 0;
            wraith.onGround = true;
            wraith.state = 'run';
        }

        // Move horizontally
        wraith.x += wraith.vx * wraith.facing;

        // Near edge — jump to next platform
        var edgeThreshold = wraith.facing > 0 ? platRight - 0.04 : platLeft + 0.04;
        if ((wraith.facing > 0 && wraith.x >= edgeThreshold) ||
            (wraith.facing < 0 && wraith.x <= edgeThreshold)) {

            if (wraith.onGround && !wraith.jumped) {
                // pick next platform
                wraith.platIdx = (wraith.platIdx + 1) % platforms.length;
                var nextPlat = platforms[wraith.platIdx];
                // Face toward next platform center
                wraith.facing = (nextPlat.x + nextPlat.w / 2 > wraith.x) ? 1 : -1;
                // Jump
                wraith.vy = -0.018;
                wraith.onGround = false;
                wraith.state = 'jump';
                wraith.jumped = true;
                setTimeout(function() { wraith.jumped = false; }, 600);
            }
        }

        // Clamp to screen
        if (wraith.x < 0.02) { wraith.x = 0.02; wraith.facing = 1; }
        if (wraith.x > 0.98) { wraith.x = 0.98; wraith.facing = -1; }

        // Attack near enemy
        if (enemy.alive) {
            var dist = Math.abs(wraith.x - enemy.x);
            if (dist < 0.08 && wraith.attackTimer === 0 && actionTimer % 90 === 0) {
                wraith.attackTimer = 35;
                wraith.state = 'attack';
                enemy.hitTimer = 20;
                enemy.hp--;
                if (enemy.hp <= 0) {
                    enemy.alive = false;
                    for (var ep = 0; ep < 18; ep++) spawnParticle(enemy.x, enemy.y - 0.05, 'blast');
                    // Respawn enemy
                    setTimeout(function() {
                        enemy.x = 0.65 + Math.random() * 0.2;
                        enemy.y = 0.55;
                        enemy.alive = true;
                        enemy.hp = 3;
                    }, 2200);
                }
            }
        }

        // Occasional dash
        if (wraith.onGround && actionTimer % 150 === 0 && wraith.dashTimer === 0) {
            wraith.dashTimer = 22;
            wraith.vx = 0.004;
        }

        if (wraith.attackTimer > 0) wraith.attackTimer--;
        if (wraith.dashTimer > 0) {
            wraith.dashTimer--;
            if (wraith.dashTimer === 0) wraith.vx = 0.0018;
        }
    }

    function drawVignette() {
        var vig = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*0.85);
        vig.addColorStop(0, 'transparent');
        vig.addColorStop(1, 'rgba(2,4,8,0.75)');
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
    }

    // Main loop
    function loop() {
        ctx.clearRect(0, 0, W, H);
        drawBackground();
        drawPlatforms();
        drawEnemy(enemy);
        updateWraith();
        drawWraith(wraith);
        drawParticles();
        drawVignette();
        t++;
        requestAnimationFrame(loop);
    }
    loop();
}());
