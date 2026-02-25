/* ============================================================
   SHASHVATH P — PORTFOLIO JAVASCRIPT
   File: js/main.js
   ============================================================ */

/* ─────────────────────────────────────────────
   1. GLOBAL PARTICLE BACKGROUND CANVAS
───────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function Particle() {
    this.reset = function () {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r  = Math.random() * 1.6 + 0.3;
      this.a  = Math.random() * 0.45 + 0.08;
      this.col = ['#3b82f6', '#06b6d4', '#8b5cf6', '#22c55e'][
        Math.floor(Math.random() * 4)
      ];
    };
    this.reset();
  }

  for (let i = 0; i < 100; i++) {
    const p = new Particle();
    p.x = Math.random() * W;
    p.y = Math.random() * H;
    particles.push(p);
  }

  (function loop() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) p.reset();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col;
      ctx.globalAlpha = p.a;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // Draw connection lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(59,130,246,${0.1 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(loop);
  })();
})();


/* ─────────────────────────────────────────────
   2. PROJECT CANVAS ANIMATIONS
───────────────────────────────────────────── */

/**
 * Canvas 1 — AI Cheating Detection
 * Visual: Purple/blue animated neural network with scan line
 */
function initCanvas1() {
  const canvas = document.getElementById('c1');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let t = 0, nodes = [];

  function setup() {
    canvas.width  = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    nodes = [];
    for (let i = 0; i < 22; i++) {
      nodes.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }
  }
  setup();

  (function loop() {
    t++;
    if (canvas.width !== canvas.parentElement.offsetWidth) setup();
    const W = canvas.width, H = canvas.height;

    ctx.fillStyle = '#0a0518';
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(139,92,246,0.1)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 28) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 28) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Horizontal scan line
    const sy = ((t * 1.8) % (H + 40)) - 20;
    const sg = ctx.createLinearGradient(0, sy, 0, sy + 30);
    sg.addColorStop(0,   'rgba(139,92,246,0)');
    sg.addColorStop(0.5, 'rgba(139,92,246,0.3)');
    sg.addColorStop(1,   'rgba(139,92,246,0)');
    ctx.fillStyle = sg;
    ctx.fillRect(0, sy, W, 30);

    // Move nodes
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // Edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(139,92,246,${0.5 * (1 - d / 100)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    // Nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#a78bfa';
      ctx.fill();
    });

    // Label
    ctx.fillStyle = 'rgba(139,92,246,0.6)';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('DETECTING...', 10, H - 12);

    requestAnimationFrame(loop);
  })();
}


/**
 * Canvas 2 — Smart IoT Plant Watering
 * Visual: Green hexagonal grid with pulse ripples & data streams
 */
function initCanvas2() {
  const canvas = document.getElementById('c2');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let t = 0;

  const pulses = [];
  for (let i = 0; i < 6; i++) {
    pulses.push({
      x:   Math.random() * 360,
      y:   Math.random() * 200,
      r:   0,
      max: 50 + Math.random() * 40,
      sp:  0.8 + Math.random() * 1.2
    });
  }

  (function loop() {
    t++;
    canvas.width  = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    const W = canvas.width, H = canvas.height;

    ctx.fillStyle = '#010e05';
    ctx.fillRect(0, 0, W, H);

    // Hexagonal grid
    const sz = 20, sq3 = Math.sqrt(3);
    ctx.strokeStyle = 'rgba(34,197,94,0.1)';
    ctx.lineWidth = 0.5;
    for (let row = -1; row < H / sz / sq3 + 2; row++) {
      for (let col = -1; col < W / sz / 1.5 + 2; col++) {
        const x = col * sz * 1.5;
        const y = row * sz * sq3 + (col % 2) * sz * sq3 / 2;
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const a = (Math.PI / 3) * k;
          ctx.lineTo(x + sz * Math.cos(a), y + sz * Math.sin(a));
        }
        ctx.closePath();
        ctx.stroke();
      }
    }

    // Pulse ripples
    pulses.forEach(p => {
      p.r += p.sp;
      if (p.r > p.max) { p.r = 0; p.x = Math.random() * W; p.y = Math.random() * H; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(34,197,94,${0.7 * (1 - p.r / p.max)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Moving data packets
    for (let i = 0; i < 4; i++) {
      const y = 30 + i * 45;
      const x = (t * 2 + i * 90) % W;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(Math.min(x + 25, W), y);
      ctx.strokeStyle = 'rgba(34,197,94,0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.fill();
    }

    // Label
    ctx.fillStyle = 'rgba(34,197,94,0.6)';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('MOISTURE: 72%', 10, H - 12);

    requestAnimationFrame(loop);
  })();
}


/**
 * Canvas 3 — Health Monitoring Wearable
 * Visual: Pink ECG heartbeat waveform with glow
 */
function initCanvas3() {
  const canvas = document.getElementById('c3');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let t = 0;

  // ECG waveform shape
  const ecg = [0, 0, 0.05, 0.1, 0.05, 0, -0.05, 0, 0.25, 0.9, -0.5, 0.15, 0, 0, -0.05, 0, 0, 0, 0, 0];

  (function loop() {
    t++;
    canvas.width  = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    const W = canvas.width, H = canvas.height;

    ctx.fillStyle = '#080510';
    ctx.fillRect(0, 0, W, H);

    // Radial glow
    const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, H * 0.7);
    g.addColorStop(0, 'rgba(236,72,153,0.09)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(236,72,153,0.08)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 28) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 28) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // ECG waveform
    const cy = H / 2, amp = 50, period = ecg.length, speed = 3;
    ctx.beginPath();
    for (let x = 0; x <= W; x++) {
      const idx = Math.floor(((x + t * speed) / 10) % period);
      ctx.lineTo(x, cy - ecg[idx] * amp);
    }
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ec4899';
    ctx.stroke();
    ctx.shadowBlur = 0;

    // BPM display
    ctx.fillStyle = 'rgba(236,72,153,0.8)';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('72 BPM', W - 10, H - 12);
    ctx.textAlign = 'left';

    // Pulsing indicator dot
    ctx.beginPath();
    ctx.arc(W - 18, 16, 5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(236,72,153,${0.5 + 0.5 * Math.sin(t * 0.07)})`;
    ctx.fill();

    requestAnimationFrame(loop);
  })();
}


/**
 * Canvas 4 — Juriscentra AI Legal Chatbot
 * Visual: Blue diagonal grid, floating legal symbols, pulsing scales icon
 */
function initCanvas4() {
  const canvas = document.getElementById('c4');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let t = 0;

  const symbols = ['§', '¶', '©', '®', '∑', '⚖'];
  const floats = [];
  for (let i = 0; i < 16; i++) {
    floats.push({
      x:   Math.random() * 400,
      y:   Math.random() * 200 + 200,
      spd: 0.4 + Math.random() * 0.5,
      ch:  symbols[Math.floor(Math.random() * symbols.length)],
      sz:  10 + Math.random() * 10
    });
  }

  (function loop() {
    t++;
    canvas.width  = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    const W = canvas.width, H = canvas.height;

    ctx.fillStyle = '#080c18';
    ctx.fillRect(0, 0, W, H);

    // Radial glow
    const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, H * 0.8);
    g.addColorStop(0, 'rgba(59,130,246,0.08)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Diagonal lines
    ctx.strokeStyle = 'rgba(99,102,241,0.06)';
    ctx.lineWidth = 0.5;
    for (let d = -H; d < W + H; d += 28) {
      ctx.beginPath();
      ctx.moveTo(d, 0);
      ctx.lineTo(d + H, H);
      ctx.stroke();
    }

    // Floating legal characters
    floats.forEach(f => {
      f.y -= f.spd;
      if (f.y < -20) { f.y = H + 20; f.x = Math.random() * W; }
      ctx.fillStyle = `rgba(99,102,241,${0.12 + 0.08 * Math.sin(t * 0.02 + f.x)})`;
      ctx.font = `${f.sz}px serif`;
      ctx.fillText(f.ch, f.x, f.y);
    });

    // Central pulsing orb
    const pr = 18 + 7 * Math.sin(t * 0.04);
    const rg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, pr);
    rg.addColorStop(0, 'rgba(99,102,241,0.55)');
    rg.addColorStop(1, 'rgba(99,102,241,0)');
    ctx.fillStyle = rg;
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, pr, 0, Math.PI * 2);
    ctx.fill();

    // Scales emoji at center
    ctx.font = `${26 + 4 * Math.sin(t * 0.04)}px serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(99,102,241,0.65)';
    ctx.fillText('⚖', W / 2, H / 2 + 9);
    ctx.textAlign = 'left';

    // Label
    ctx.fillStyle = 'rgba(99,102,241,0.5)';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('60+ JURISDICTIONS', 10, H - 12);

    requestAnimationFrame(loop);
  })();
}


/* ─────────────────────────────────────────────
   3. INITIALISE CANVASES AFTER PAGE LOAD
───────────────────────────────────────────── */
window.addEventListener('load', () => {
  // Small delay ensures parent elements have rendered dimensions
  setTimeout(() => {
    initCanvas1();
    initCanvas2();
    initCanvas3();
    initCanvas4();
  }, 100);
});


/* ─────────────────────────────────────────────
   4. NAV ACTIVE SECTION HIGHLIGHT
   Uses IntersectionObserver to update nav link
   as user scrolls through sections
───────────────────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
})();
