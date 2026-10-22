/*
 * Gusify portfolio preview — paste this into marlerenterprises.com and 2kdhoodcleaning.com
 * (just before </body>). It does NOTHING for normal visitors.
 *
 * Only when the page is shown inside the Gusify portfolio (in a frame, with ?gusify-preview=1)
 * it slowly scrolls the page from top to bottom, pauses, glides back to the top, and loops.
 */
(function () {
  try {
    if (window.top === window.self) return;
  } catch (e) { /* cross-origin top — we are framed */ }
  if (!/[?&]gusify-preview=1\b/.test(location.search)) return;

  var SPEED = 90;        // px per second going down
  var START_DELAY = 2200; // ms before the first scroll (lets the hero play)
  var PAUSE = 1600;       // ms at the bottom and top
  var root = document.scrollingElement || document.documentElement;
  root.style.scrollBehavior = 'auto';
  var hide = document.createElement('style');
  hide.textContent = 'html,body{scrollbar-width:none}html::-webkit-scrollbar,body::-webkit-scrollbar{display:none}';
  document.head.appendChild(hide);

  var y = 0, mode = 'wait', waitLeft = START_DELAY, last = null;
  function max() { return Math.max(0, root.scrollHeight - window.innerHeight); }

  function frame(t) {
    if (last === null) last = t;
    var dt = Math.min(64, t - last); last = t;
    if (mode === 'wait') {
      waitLeft -= dt;
      if (waitLeft <= 0) mode = y > 0 ? 'up' : 'down';
    } else if (mode === 'down') {
      y = Math.min(max(), y + (SPEED * dt) / 1000);
      root.scrollTop = y;
      if (y >= max() - 1) { mode = 'wait'; waitLeft = PAUSE; }
    } else if (mode === 'up') {
      y = Math.max(0, y - Math.max(6, y * 0.08) * (dt / 16));
      root.scrollTop = y;
      if (y <= 0) { mode = 'wait'; waitLeft = PAUSE + 800; }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
