// Static, decorative SVG/HTML markup carried over 1:1 from the approved prototype.
// Injected with dangerouslySetInnerHTML — these are constants, never user content.

const G = '#B08D3C';
const G_PATH = 'M72,32 L50,10 L10,50 L50,90 L90,50 L54,50';

export const logoG = (size: number, bg = '#0A0A0A', cls = '') =>
  `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" stroke-linejoin="miter" aria-hidden="true"><path d="${G_PATH}" stroke="#C9A24A" stroke-width="13"></path><path d="${G_PATH}" stroke="${bg}" stroke-width="2.4"></path></svg>`;

/* ---------- Home: rotating arch of services ---------- */
const ARCH_WORDS = ['Web design', 'Development', 'Branding', 'SEO', 'Care plans', 'E-commerce', 'UI / UX', 'Copywriting', 'Analytics', 'Hosting'];
export const ARCH = `<svg viewBox="0 0 1000 1000" width="100%" height="100%">
<g font-family="Syne, sans-serif" font-weight="700" font-size="30" fill="#0A0A0A" text-anchor="middle">
${ARCH_WORDS.map((w, i) => `<text x="500" y="82" transform="rotate(${i * 36} 500 500)">${w}</text>`).join('')}
</g>
<g font-size="16" fill="${G}" text-anchor="middle">
${ARCH_WORDS.map((_, i) => `<text x="500" y="78" transform="rotate(${i * 36 + 18} 500 500)">◆</text>`).join('')}
</g></svg>`;

/* ---------- Home: browser demo loop ---------- */
export const BROWSER_DEMO = `
<div class="browser" role="img" aria-label="Animation: a cursor clicks Launch site, a new website loads and scrolls down">
<div class="browser-bar">
<div class="browser-dots"><span></span><span></span><span></span></div>
<div class="browser-url">
<span class="b-urlA" style="color:#8A8C90">Search or enter address</span>
<span class="b-urlB" style="color:#0A0A0A;font-weight:500"><svg width="11" height="12" viewBox="0 0 24 26" fill="none" stroke="#55575C" stroke-width="2.4" aria-hidden="true"><rect x="3" y="11" width="18" height="13" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>yourbrand.com</span>
</div>
<div style="flex:0 0 47px"></div>
</div>
<div class="browser-view">
<div class="b-load" style="position:absolute;left:0;top:0;z-index:4;width:100%;height:3px;background:${G};transform-origin:0 50%"></div>
<div class="b-start" style="position:absolute;inset:0;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(12px,2vw,24px);background:#FAFAF8">
<p style="margin:0;font-family:Syne,sans-serif;font-weight:700;font-size:clamp(16px,2.4vw,30px);letter-spacing:-0.02em">Your new website is ready.</p>
<span class="b-btn" style="background:#0A0A0A;color:#FFFFFF;border-radius:999px;padding:clamp(8px,1.1vw,14px) clamp(16px,2.3vw,28px);font-size:clamp(12px,1.3vw,16px);font-weight:600">Launch site →</span>
</div>
<div class="b-ripple" style="position:absolute;z-index:4;left:50%;top:55%;width:80px;height:80px;margin:-40px 0 0 -40px;border-radius:50%;border:2px solid ${G}"></div>
<div class="b-site" style="position:absolute;inset:0;z-index:1;overflow:hidden">
<div class="b-page" style="position:absolute;left:0;right:0;top:0;height:230%;display:flex;flex-direction:column">
<div style="flex:0 0 5%;background:#0A0A0A;display:flex;align-items:center;justify-content:space-between;padding:0 5%">
<span style="width:9%;height:30%;background:${G};border-radius:3px"></span>
<span style="display:flex;gap:12%;width:30%;height:18%"><span style="flex:1;background:#4A4A4A;border-radius:2px"></span><span style="flex:1;background:#4A4A4A;border-radius:2px"></span><span style="flex:1;background:#4A4A4A;border-radius:2px"></span><span style="flex:1.4;background:${G};border-radius:999px"></span></span>
</div>
<div style="flex:0 0 36%;display:flex;gap:4%;padding:4% 5%">
<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:5%">
<span class="b-in" style="width:26%;height:3%;background:${G};border-radius:2px"></span>
<span class="b-in" style="width:94%;height:10%;background:#0A0A0A;border-radius:4px;animation-delay:.1s"></span>
<span class="b-in" style="width:72%;height:10%;background:#0A0A0A;border-radius:4px;animation-delay:.2s"></span>
<span class="b-in" style="width:84%;height:3.5%;background:#CFCBC2;border-radius:2px;animation-delay:.3s"></span>
<span class="b-in" style="width:62%;height:3.5%;background:#CFCBC2;border-radius:2px;animation-delay:.35s"></span>
<span class="b-in" style="width:30%;height:9%;background:#0A0A0A;border-radius:999px;animation-delay:.45s"></span>
</div>
<div class="b-in" style="flex:1;border-radius:10px;overflow:hidden;animation-delay:.25s">
<svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true"><rect width="100" height="80" fill="#141416"></rect><circle cx="70" cy="28" r="11" fill="${G}"></circle><polygon points="0,80 0,58 22,38 40,56 58,34 82,54 100,44 100,80" fill="#2A2A2E"></polygon><polygon points="0,80 0,68 30,52 52,66 74,56 100,70 100,80" fill="#1C1C1F"></polygon></svg>
</div>
</div>
<div style="flex:0 0 7%;display:flex;align-items:center;justify-content:center;gap:5%;border-top:1px solid #ECEAE4;border-bottom:1px solid #ECEAE4">
${'<span style="width:10%;height:16%;background:#D9D6CF;border-radius:2px"></span>'.repeat(5)}
</div>
<div style="flex:0 0 28%;display:flex;gap:3%;padding:3% 5%">
${['#E9DFC6', '#1A1A1C', '#DCD7CC'].map((c) => `<div style="flex:1;display:flex;flex-direction:column;gap:6%"><span style="flex:0 0 60%;background:${c};border-radius:8px"></span><span style="width:70%;height:6%;background:#0A0A0A;border-radius:2px"></span><span style="width:90%;height:4%;background:#CFCBC2;border-radius:2px"></span><span style="width:60%;height:4%;background:#CFCBC2;border-radius:2px"></span></div>`).join('')}
</div>
<div style="flex:0 0 16%;padding:1.5% 5%">
<div style="height:100%;background:#0A0A0A;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10%"><span style="width:42%;height:12%;background:#F5F3EE;border-radius:3px"></span><span style="width:14%;height:14%;background:${G};border-radius:999px"></span></div>
</div>
<div style="flex:0 0 8%;background:#0A0A0A;display:flex;align-items:center;justify-content:space-between;padding:0 5%"><span style="width:10%;height:14%;background:${G};border-radius:2px"></span><span style="width:34%;height:10%;background:#3A3A3A;border-radius:2px"></span></div>
</div>
</div>
<div class="b-cursor" style="position:absolute;inset:0;z-index:5;pointer-events:none">
<svg class="b-press" width="22" height="28" viewBox="0 0 22 28" aria-hidden="true" style="filter:drop-shadow(0 2px 3px rgba(0,0,0,.3))"><path d="M1 1 L1 23 L7 17.5 L11 26.5 L15 24.8 L11 16 L19.5 16 Z" fill="#0A0A0A" stroke="#FFFFFF" stroke-width="1.6" stroke-linejoin="round"></path></svg>
</div>
</div>
</div>`;

export const CURSOR_SVG = `<svg width="22" height="28" viewBox="0 0 22 28" aria-hidden="true" style="filter:drop-shadow(0 2px 3px rgba(0,0,0,.3))"><path d="M1 1 L1 23 L7 17.5 L11 26.5 L15 24.8 L11 16 L19.5 16 Z" fill="#0A0A0A" stroke="#FFFFFF" stroke-width="1.6" stroke-linejoin="round"></path></svg>`;

/* ---------- Floating service previews ---------- */
export const PANEL_WEB = `<div style="position:absolute;inset:0;background:#2C2C2C;font-family:Manrope,sans-serif;color:#B3B3B3">
<div style="position:absolute;left:0;right:0;top:0;height:30px;background:#1E1E1E;border-bottom:1px solid #333;display:flex;align-items:center;gap:8px;padding:0 10px">
<span style="width:14px;height:14px;border-radius:3px;background:#2F80ED"></span><span style="width:14px;height:14px;border-radius:3px;background:#3A3A3A"></span><span style="width:14px;height:14px;border-radius:3px;background:#3A3A3A"></span><span style="width:14px;height:14px;border-radius:50%;background:#3A3A3A"></span>
<span style="flex:1;text-align:center;font-size:10px;font-weight:500">Gusify — Homepage</span><span style="width:34px;height:16px;border-radius:4px;background:#2F80ED"></span></div>
<div style="position:absolute;left:0;top:30px;bottom:0;width:72px;background:#1E1E1E;border-right:1px solid #333;padding:10px 8px;display:flex;flex-direction:column;gap:8px">
<span style="font-size:8px;font-weight:600;color:#8A8A8A">Layers</span><span style="height:6px;width:85%;background:#3A3A3A;border-radius:2px"></span><span style="height:6px;width:62%;background:#3A3A3A;border-radius:2px;margin-left:8px"></span><span style="height:6px;width:70%;background:#3A3A3A;border-radius:2px;margin-left:8px"></span><span class="fg-layer" style="height:10px;width:100%;background:#2F80ED;border-radius:2px"></span><span style="height:6px;width:55%;background:#3A3A3A;border-radius:2px;margin-left:8px"></span><span style="height:6px;width:66%;background:#3A3A3A;border-radius:2px;margin-left:8px"></span></div>
<div style="position:absolute;right:0;top:30px;bottom:0;width:78px;background:#1E1E1E;border-left:1px solid #333;padding:10px 8px;display:flex;flex-direction:column;gap:8px">
<span style="font-size:8px;font-weight:600;color:#8A8A8A">Design</span>
<span style="display:flex;gap:4px"><span style="flex:1;height:12px;background:#2C2C2C;border-radius:2px"></span><span style="flex:1;height:12px;background:#2C2C2C;border-radius:2px"></span></span>
<span style="display:flex;gap:4px"><span style="flex:1;height:12px;background:#2C2C2C;border-radius:2px"></span><span style="flex:1;height:12px;background:#2C2C2C;border-radius:2px"></span></span>
<span style="font-size:8px;font-weight:600;color:#8A8A8A;margin-top:4px">Fill</span>
<span style="display:flex;align-items:center;gap:5px"><span style="width:12px;height:12px;border-radius:2px;background:${G}"></span><span style="flex:1;height:6px;background:#3A3A3A;border-radius:2px"></span></span>
<span style="display:flex;align-items:center;gap:5px"><span style="width:12px;height:12px;border-radius:2px;background:#0A0A0A;border:1px solid #444"></span><span style="flex:1;height:6px;background:#3A3A3A;border-radius:2px"></span></span></div>
<span style="position:absolute;left:102px;top:40px;font-size:8px;color:#9A9A9A">Home</span>
<div style="position:absolute;left:102px;top:52px;width:190px;height:206px;background:#FFF;border-radius:2px;overflow:hidden">
<div style="height:16px;background:#0A0A0A;display:flex;align-items:center;justify-content:space-between;padding:0 8px"><span style="width:18px;height:5px;background:${G};border-radius:1px"></span><span style="width:48px;height:4px;background:#4A4A4A;border-radius:1px"></span></div>
<span style="position:absolute;left:12px;top:36px;width:74px;height:9px;background:#0A0A0A;border-radius:2px"></span><span style="position:absolute;left:12px;top:50px;width:58px;height:9px;background:#0A0A0A;border-radius:2px"></span><span style="position:absolute;left:12px;top:66px;width:72px;height:4px;background:#CFCBC2;border-radius:1px"></span><span style="position:absolute;left:12px;top:74px;width:52px;height:4px;background:#CFCBC2;border-radius:1px"></span><span style="position:absolute;left:12px;top:86px;width:38px;height:11px;background:#0A0A0A;border-radius:999px"></span>
<span class="fg-slot" style="position:absolute;left:100px;top:30px;width:80px;height:70px;border:1.5px dashed #C9C6BF;border-radius:3px"></span>
<div style="position:absolute;left:10px;right:10px;top:116px;display:flex;gap:8px">
${['#F3F1EC', '#1A1A1C', '#E9DFC6'].map((c) => `<div style="flex:1;display:flex;flex-direction:column;gap:5px"><span style="height:44px;background:${c};border-radius:3px"></span><span style="height:4px;width:70%;background:#0A0A0A;border-radius:1px"></span><span style="height:3px;width:88%;background:#CFCBC2;border-radius:1px"></span></div>`).join('')}
</div>
<span style="position:absolute;left:10px;right:10px;bottom:10px;height:18px;background:#0A0A0A;border-radius:3px"></span></div>
<div class="fg-drag" style="position:absolute;left:202px;top:82px;width:80px;height:70px">
<svg viewBox="0 0 80 70" width="80" height="70" style="border-radius:3px;box-shadow:0 10px 20px -8px rgba(0,0,0,.6)"><rect width="80" height="70" fill="#141416"></rect><circle cx="56" cy="22" r="9" fill="${G}"></circle><polygon points="0,70 0,50 18,34 32,48 48,30 66,46 80,38 80,70" fill="#2A2A2E"></polygon><polygon points="0,70 0,60 24,46 42,58 60,50 80,60 80,70" fill="#1C1C1F"></polygon></svg>
<div class="fg-sel" style="position:absolute;inset:-1px;border:1.5px solid #2F80ED">
<span style="position:absolute;left:-4px;top:-4px;width:6px;height:6px;background:#FFF;border:1.5px solid #2F80ED"></span><span style="position:absolute;right:-4px;top:-4px;width:6px;height:6px;background:#FFF;border:1.5px solid #2F80ED"></span><span style="position:absolute;left:-4px;bottom:-4px;width:6px;height:6px;background:#FFF;border:1.5px solid #2F80ED"></span><span style="position:absolute;right:-4px;bottom:-4px;width:6px;height:6px;background:#FFF;border:1.5px solid #2F80ED"></span>
<span style="position:absolute;left:50%;bottom:-17px;transform:translateX(-50%);background:#2F80ED;color:#FFF;font-size:7px;font-weight:600;padding:2px 5px;border-radius:3px;white-space:nowrap">80 × 70</span></div>
<svg class="fg-cur" width="16" height="20" viewBox="0 0 22 28" style="position:absolute;left:52px;top:40px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.4))"><path d="M1 1 L1 23 L7 17.5 L11 26.5 L15 24.8 L11 16 L19.5 16 Z" fill="#0A0A0A" stroke="#FFF" stroke-width="1.6" stroke-linejoin="round"></path></svg>
</div></div>`;

const kw = (c: string, t: string) => `<span style="color:${c}">${t}</span>`;
export const PANEL_DEV = `<div style="position:absolute;inset:0;background:#1E1E1E;color:#D4D4D4;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace">
<div style="position:absolute;left:0;right:0;top:0;height:26px;background:#2D2D2D;display:flex;align-items:center;gap:6px;padding:0 10px">
<span style="width:9px;height:9px;border-radius:50%;background:#FF5F57"></span><span style="width:9px;height:9px;border-radius:50%;background:#FEBC2E"></span><span style="width:9px;height:9px;border-radius:50%;background:#28C840"></span>
<span style="flex:1;text-align:center;font-family:Manrope,sans-serif;font-size:9px;color:#9D9D9D">gusify-site — index.html</span><span style="width:39px"></span></div>
<div style="position:absolute;left:0;top:26px;bottom:18px;width:34px;background:#2C2C2C;display:flex;flex-direction:column;align-items:center;gap:14px;padding-top:12px">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E0E0E0" stroke-width="1.8"><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"></path><path d="M14 3v5h5"></path></svg>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#858585" stroke-width="1.8"><circle cx="11" cy="11" r="6"></circle><path d="M20 20l-4.5-4.5"></path></svg>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#858585" stroke-width="1.8"><circle cx="6" cy="5" r="2"></circle><circle cx="6" cy="19" r="2"></circle><circle cx="18" cy="9" r="2"></circle><path d="M6 7v10"></path><path d="M18 11c0 4-6 3-12 6"></path></svg>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#858585" stroke-width="1.8"><rect x="4" y="4" width="7" height="7"></rect><rect x="13" y="13" width="7" height="7"></rect><rect x="4" y="13" width="7" height="7"></rect></svg></div>
<div style="position:absolute;left:34px;right:0;top:26px;height:24px;background:#252526;display:flex;font-family:Manrope,sans-serif;font-size:9px">
<span style="display:flex;align-items:center;gap:6px;padding:0 12px;background:#1E1E1E;color:#E0E0E0;border-top:1.5px solid ${G}">index.html<span style="width:5px;height:5px;border-radius:50%;background:#E8A33D"></span></span><span style="display:flex;align-items:center;padding:0 12px;color:#8A8A8A">styles.css</span><span style="display:flex;align-items:center;padding:0 12px;color:#8A8A8A">diamond.js</span></div>
<div style="position:absolute;left:34px;right:0;top:58px;display:flex;font-size:10.5px;line-height:18px">
<div style="width:28px;text-align:right;padding-right:10px;color:#6E7681;flex:0 0 auto">${[1, 2, 3, 4, 5, 6, 7, 8].map((n) => `<div>${n}</div>`).join('')}</div>
<div style="flex:1;min-width:0;overflow:hidden">
<div><span class="vs-t" style="animation-delay:0s">${kw('#808080', '&lt;')}${kw('#569CD6', 'section')} ${kw('#9CDCFE', 'class')}=${kw('#CE9178', '"hero"')}${kw('#808080', '&gt;')}</span></div>
<div><span class="vs-t" style="animation-delay:.5s">  ${kw('#808080', '&lt;')}${kw('#569CD6', 'h1')}${kw('#808080', '&gt;')}Websites cut with precision.${kw('#808080', '&lt;/')}${kw('#569CD6', 'h1')}${kw('#808080', '&gt;')}</span></div>
<div><span class="vs-t" style="animation-delay:1s">  ${kw('#808080', '&lt;')}${kw('#569CD6', 'a')} ${kw('#9CDCFE', 'href')}=${kw('#CE9178', '"/contact"')}${kw('#808080', '&gt;')}Start a project${kw('#808080', '&lt;/')}${kw('#569CD6', 'a')}${kw('#808080', '&gt;')}</span></div>
<div><span class="vs-t" style="animation-delay:1.5s">${kw('#808080', '&lt;/')}${kw('#569CD6', 'section')}${kw('#808080', '&gt;')}</span></div>
<div>&#160;</div>
<div><span class="vs-t" style="animation-delay:2.1s">${kw('#569CD6', 'const')} ${kw('#4FC1FF', 'gem')} = ${kw('#569CD6', 'new')} ${kw('#4EC9B0', 'Diamond')}({ ${kw('#9CDCFE', 'facets')}: ${kw('#B5CEA8', '57')} });</span></div>
<div><span class="vs-t" style="animation-delay:2.7s">${kw('#4FC1FF', 'gem')}.${kw('#DCDCAA', 'spin')}({ ${kw('#9CDCFE', 'speed')}: ${kw('#B5CEA8', '0.32')} });</span></div>
<div><span class="vs-t" style="animation-delay:3.2s">${kw('#DCDCAA', 'launch')}(${kw('#CE9178', "'gusify.com'")});</span><span class="vs-caret"></span></div>
</div></div>
<div class="vs-toast" style="position:absolute;right:12px;bottom:28px;background:#252526;border:1px solid #3C3C3C;border-radius:4px;padding:7px 10px;font-family:Manrope,sans-serif;font-size:9px;color:#E0E0E0;display:flex;align-items:center;gap:6px"><span style="color:#28C840">✓</span>Deployed to gusify.com</div>
<div style="position:absolute;left:0;right:0;bottom:0;height:18px;background:${G};color:#0A0A0A;display:flex;align-items:center;gap:12px;padding:0 10px;font-family:Manrope,sans-serif;font-size:8.5px;font-weight:600"><span>main</span><span>✓ 0 problems</span><span style="margin-left:auto">Ln 8, Col 21</span></div>
</div>`;

export const PANEL_BRAND = `<div style="position:absolute;inset:0;background:#F6F4EF;font-family:Manrope,sans-serif">
<span style="position:absolute;left:18px;top:16px;font-size:9px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#876421">Brand identity</span>
<svg viewBox="0 0 100 100" width="170" height="170" aria-hidden="true" style="position:absolute;left:28px;top:66px;overflow:visible">
<g class="bi-guide" stroke="${G}" stroke-width="0.4" fill="none" stroke-dasharray="2 2"><circle cx="50" cy="50" r="46"></circle><circle cx="50" cy="50" r="28"></circle><line x1="-8" y1="50" x2="108" y2="50"></line><line x1="50" y1="-8" x2="50" y2="108"></line><line x1="0" y1="0" x2="100" y2="100"></line></g>
<g class="bi-f"><path d="${G_PATH}" fill="none" stroke="${G}" stroke-width="13" stroke-linejoin="miter"></path><path d="${G_PATH}" fill="none" stroke="#F6F4EF" stroke-width="2.4" stroke-linejoin="miter"></path></g>
<path class="bi-draw" d="${G_PATH}" fill="none" stroke="#0A0A0A" stroke-width="1.2" stroke-linejoin="round"></path></svg>
<div style="position:absolute;left:228px;top:62px;right:18px;display:flex;flex-direction:column;gap:14px">
<div style="display:flex;gap:10px">
${[['#0A0A0A', '0s', ''], [G, '.12s', ''], ['#FFFFFF', '.24s', 'border:1px solid #D9D6CF;']].map(([c, d, b]) => `<div class="bi-sw" style="display:flex;flex-direction:column;gap:4px;align-items:center;animation-delay:${d}"><span style="width:34px;height:34px;border-radius:50%;background:${c};${b}"></span><span style="font-size:7px;color:#6B6E73">${c}</span></div>`).join('')}
</div>
<div class="bi-sw" style="font-family:Syne,sans-serif;font-weight:800;font-size:46px;line-height:1;letter-spacing:-.03em;color:#0A0A0A;animation-delay:.32s">Aa</div>
<div class="bi-sw" style="font-size:9px;color:#6B6E73;animation-delay:.4s">Syne · Manrope</div>
<div class="bi-sw" style="font-weight:600;font-size:16px;letter-spacing:.34em;color:#0A0A0A;animation-delay:.5s">GUSIFY</div>
</div></div>`;

export const PANEL_SEO = `<div style="position:absolute;inset:0;background:#EDEAE3">
<svg viewBox="0 0 400 280" width="400" height="280" aria-hidden="true" font-family="Manrope, sans-serif">
<rect x="24" y="26" width="60" height="44" rx="2" fill="#0A0A0A"></rect><rect x="30" y="32" width="48" height="32" fill="#F6F4EF"></rect><polygon points="54,37 62,46 54,59 46,46" fill="${G}"></polygon>
<rect x="356" y="178" width="26" height="30" rx="3" fill="#0A0A0A"></rect><ellipse cx="361" cy="160" rx="8" ry="22" fill="#5E6B52" transform="rotate(-18 361 160)"></ellipse><ellipse cx="377" cy="157" rx="8" ry="24" fill="#6E7C60" transform="rotate(16 377 157)"></ellipse><ellipse cx="369" cy="150" rx="6" ry="26" fill="#56634B"></ellipse>
<rect x="118" y="26" width="214" height="146" rx="8" fill="#0A0A0A"></rect><rect x="126" y="34" width="198" height="128" rx="2" fill="#FFF"></rect><rect x="126" y="34" width="198" height="12" fill="#F3F1EC"></rect>
<circle cx="133" cy="40" r="2" fill="#D9D6CF"></circle><circle cx="139" cy="40" r="2" fill="#D9D6CF"></circle><circle cx="145" cy="40" r="2" fill="#D9D6CF"></circle>
<text x="225" y="42.5" font-size="6" fill="#8A8C90" text-anchor="middle">Blog — editor</text>
${[[0, 54, 72, 6, '#0A0A0A'], [0.6, 68, 104, 3.5, '#BDB9B0'], [1.1, 76, 98, 3.5, '#BDB9B0'], [1.6, 84, 106, 3.5, '#BDB9B0'], [2.1, 92, 76, 3.5, '#BDB9B0'], [2.6, 106, 58, 4.5, '#0A0A0A'], [3.1, 117, 102, 3.5, '#BDB9B0'], [3.6, 125, 92, 3.5, '#BDB9B0'], [4.1, 133, 60, 3.5, '#BDB9B0']].map(([d, y, w, h, c]) => `<rect class="seo-l" style="animation-delay:${d}s" x="136" y="${y}" width="${w}" height="${h}" rx="1" fill="${c}"></rect>`).join('')}
<rect x="252" y="52" width="64" height="62" rx="4" fill="#0A0A0A"></rect>
<text x="259" y="63" font-size="5.5" fill="#B9B6AE" letter-spacing="0.6">GOOGLE RANK</text>
<text class="seo-ra" x="259" y="83" font-size="16" font-weight="700" fill="#F5F3EE" font-family="Syne, sans-serif">#3</text>
<text class="seo-rb" x="259" y="83" font-size="16" font-weight="700" fill="#C9A24A" font-family="Syne, sans-serif">#1</text>
<text class="seo-rb" x="284" y="81" font-size="8" fill="#C9A24A">▲</text>
${[[0, 260, 98, 10, '#7A6230'], [0.1, 272, 94, 14, '#8F7234'], [0.2, 284, 90, 18, '#A9853A'], [0.3, 296, 86, 22, '#C9A24A']].map(([d, x, y, h, c]) => `<rect class="seo-bar" style="animation-delay:${d}s" x="${x}" y="${y}" width="8" height="${h}" fill="${c}"></rect>`).join('')}
${[['0s', 'Backup complete'], ['3s', 'Update published']].map(([d, t]) => `<g class="seo-toast" style="animation-delay:${d}"><rect x="236" y="128" width="82" height="18" rx="4" fill="#FFF" stroke="#E6E3DC"></rect><circle cx="246" cy="137" r="4" fill="${G}"></circle><text x="254" y="139.5" font-size="6" font-weight="600" fill="#0A0A0A">${t}</text></g>`).join('')}
<rect x="214" y="172" width="22" height="30" fill="#2A2A2E"></rect><rect x="190" y="200" width="70" height="7" rx="3" fill="#2A2A2E"></rect>
<rect x="0" y="206" width="400" height="74" fill="#1A1A1C"></rect><rect x="0" y="206" width="400" height="4" fill="#2E2E32"></rect>
<polygon points="168,214 292,214 300,228 160,228" fill="#3A3A3E"></polygon>
<rect x="318" y="190" width="20" height="22" rx="3" fill="#F6F4EF"></rect><rect x="318" y="196" width="20" height="4" fill="${G}"></rect><path d="M338 195 q8 0 8 6 q0 6 -8 6" fill="none" stroke="#F6F4EF" stroke-width="3"></path>
<path class="seo-steam" d="M324 186 q-4 -5 0 -10 q4 -5 0 -10" fill="none" stroke="#FFF" stroke-width="1.6" stroke-linecap="round"></path>
<path class="seo-steam" style="animation-delay:1.3s" d="M332 186 q-4 -5 0 -10 q4 -5 0 -10" fill="none" stroke="#FFF" stroke-width="1.6" stroke-linecap="round"></path>
<rect x="96" y="190" width="18" height="22" fill="#B97E55"></rect>
<path d="M14 280 L24 234 Q34 210 70 206 L140 206 Q174 210 186 234 L196 280 Z" fill="#111113"></path>
<path d="M150 210 Q182 208 200 214 L204 226 Q180 224 160 234 Z" fill="#111113"></path>
<rect x="92" y="203" width="26" height="4" rx="1" fill="#F5F3EE"></rect>
<ellipse class="seo-hand" cx="200" cy="219" rx="7" ry="4.5" fill="#C98F68"></ellipse><ellipse class="seo-hand" style="animation-delay:.17s" cx="216" cy="217" rx="7" ry="4.5" fill="#C98F68"></ellipse>
<g class="seo-head"><ellipse cx="78" cy="174" rx="4.5" ry="7" fill="#C98F68"></ellipse><ellipse cx="132" cy="174" rx="4.5" ry="7" fill="#C98F68"></ellipse><circle cx="105" cy="168" r="28" fill="#2A1B12"></circle><path d="M82 158 q23 -24 46 0" fill="none" stroke="#3E2C1F" stroke-width="3" stroke-linecap="round"></path></g>
</svg></div>`;

/* ---------- About: values art ---------- */
const caption = (t: string, s: string) => `<div style="position:absolute;left:28px;right:28px;bottom:26px"><p style="margin:0 0 6px;font-family:Syne,sans-serif;font-weight:700;font-size:30px;color:#C9A24A">${t}</p><p style="margin:0;font-size:15px;color:#B9B6AE">${s}</p></div>`;

export const ART_PRECISION = `<svg viewBox="0 0 500 500" width="100%" height="100%" aria-hidden="true">
<defs><pattern id="pgrid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#1C1C1C" stroke-width="1"></path></pattern>
<linearGradient id="pfill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF1C4"></stop><stop offset="0.5" stop-color="#C9A24A"></stop><stop offset="1" stop-color="#7A5B1C"></stop></linearGradient></defs>
<rect width="500" height="500" fill="url(#pgrid)"></rect>
<line x1="70" y1="52" x2="430" y2="52" stroke="#3A3A3A" stroke-width="4" stroke-linecap="round"></line>
<polygon class="pr-rough" points="130,215 175,182 262,175 333,190 374,232 362,302 302,382 250,414 188,374 126,300" fill="#262626" stroke="#3A3A3A" stroke-width="2"></polygon>
<polygon class="pr-fill" points="160,200 340,200 390,250 250,420 110,250" fill="url(#pfill)"></polygon>
<g fill="none" stroke="#F5F3EE" stroke-width="2" stroke-linejoin="round">
<path class="pr-cut" pathLength="1" style="animation-delay:0s" d="M160,200 L340,200 L390,250 L250,420 L110,250 Z"></path>
<path class="pr-cut" pathLength="1" style="animation-delay:.4s" d="M110,250 L390,250"></path>
<path class="pr-cut" pathLength="1" style="animation-delay:.8s" d="M160,200 L190,250 L250,200 L310,250 L340,200"></path>
<path class="pr-cut" pathLength="1" style="animation-delay:1.2s" d="M190,250 L250,420 L310,250"></path>
<path class="pr-cut" pathLength="1" style="animation-delay:1.5s" d="M250,250 L250,420"></path></g>
<g class="pr-head"><g class="pr-beam">
<rect x="245" y="64" width="10" height="136" fill="#FF4D2E" opacity="0.28"></rect><rect x="248.5" y="64" width="3" height="136" fill="#FFE3D6"></rect>
<circle cx="250" cy="200" r="9" fill="#FF8A66" opacity="0.6"></circle><circle cx="250" cy="200" r="4" fill="#FFF4EC"></circle>
<circle class="sp1" cx="250" cy="200" r="2.4" fill="#FFD27A"></circle><circle class="sp2" cx="250" cy="200" r="2" fill="#FFB199"></circle><circle class="sp3" cx="250" cy="200" r="2.2" fill="#FFE3A8"></circle><circle class="sp4" cx="250" cy="200" r="1.8" fill="#FFD27A"></circle></g>
<rect x="232" y="38" width="36" height="26" rx="4" fill="#1E1E1E" stroke="#C9A24A" stroke-width="2"></rect><rect x="244" y="60" width="12" height="6" fill="#3A3A3A"></rect></g>
</svg>${caption('Precision', 'Every facet, cut with intention.')}`;

const star = (s: number) => `M0,-${s} C${s * 0.11},-${s * 0.21} ${s * 0.21},-${s * 0.11} ${s},0 C${s * 0.21},${s * 0.11} ${s * 0.11},${s * 0.21} 0,${s} C-${s * 0.11},${s * 0.21} -${s * 0.21},${s * 0.11} -${s},0 C-${s * 0.21},-${s * 0.11} -${s * 0.11},-${s * 0.21} 0,-${s} Z`;
const rays = Array.from({ length: 12 }, (_, k) => {
  const a = (k * Math.PI) / 6;
  const p = (r: number) => `${(250 + r * Math.cos(a)).toFixed(1)}`;
  const q = (r: number) => `${(290 + r * Math.sin(a)).toFixed(1)}`;
  return `<line x1="${p(150)}" y1="${q(150)}" x2="${p(240)}" y2="${q(240)}"></line>`;
}).join('');

export const ART_CLARITY = `<svg viewBox="0 0 500 500" width="100%" height="100%" aria-hidden="true">
<defs><radialGradient id="cglow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#C9A24A" stop-opacity="0.35"></stop><stop offset="1" stop-color="#C9A24A" stop-opacity="0"></stop></radialGradient>
<clipPath id="cclip"><polygon points="160,190 340,190 400,250 250,430 100,250"></polygon></clipPath>
<linearGradient id="cband" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF" stop-opacity="0"></stop><stop offset="0.5" stop-color="#FFF" stop-opacity="0.95"></stop><stop offset="1" stop-color="#FFF" stop-opacity="0"></stop></linearGradient></defs>
<circle class="cl-glow" cx="250" cy="290" r="230" fill="url(#cglow)"></circle>
<g class="cl-rays" stroke="#C9A24A" stroke-opacity="0.25" stroke-width="2" stroke-linecap="round">${rays}</g>
<g stroke="#FFF" stroke-opacity="0.6" stroke-width="0.8" stroke-linejoin="round">
<polygon points="100,250 160,190 175,250" fill="#E9F0FA"></polygon><polygon points="160,190 250,190 175,250" fill="#FFF"></polygon><polygon points="175,250 250,190 325,250" fill="#DCE6F2"></polygon><polygon points="250,190 340,190 325,250" fill="#F4F8FF"></polygon><polygon points="340,190 400,250 325,250" fill="#B9C8DC"></polygon><polygon points="100,250 175,250 250,430" fill="#C7D4E6"></polygon><polygon points="175,250 325,250 250,430" fill="#DDE6F2"></polygon><polygon points="325,250 400,250 250,430" fill="#8FA3BF"></polygon></g>
<g clip-path="url(#cclip)"><g transform="rotate(18 250 290)"><rect class="cl-band" x="-200" y="100" width="110" height="400" fill="url(#cband)"></rect></g></g>
${[[150, 200, 14, 0, '#FFF'], [338, 212, 18, 0.7, '#FFF1C4'], [252, 310, 12, 1.3, '#FFF'], [398, 160, 14, 1.8, '#C9A24A']].map(([x, y, s, d, c]) => `<g transform="translate(${x},${y})"><path class="cl-tw" style="animation-delay:${d}s" d="${star(s as number)}" fill="${c}"></path></g>`).join('')}
</svg>${caption('Clarity', 'Nothing hidden. Everything brilliant.')}`;

export const ART_PARTNERSHIP = `<svg viewBox="0 0 500 500" width="100%" height="100%" aria-hidden="true">
<g class="hs-burst" stroke="#C9A24A" stroke-width="3" stroke-linecap="round"><line x1="250" y1="160" x2="250" y2="130"></line><line x1="322" y1="190" x2="343" y2="169"></line><line x1="178" y1="190" x2="157" y2="169"></line><line x1="352" y1="262" x2="382" y2="262"></line><line x1="148" y1="262" x2="118" y2="262"></line><line x1="322" y1="334" x2="343" y2="355"></line><line x1="178" y1="334" x2="157" y2="355"></line><line x1="250" y1="364" x2="250" y2="394"></line></g>
<g class="hs-shake">
<polygon points="-10,205 168,222 172,312 -10,330" fill="#1C1C1C" stroke="#2E2E2E" stroke-width="1.5"></polygon><polygon points="160,220 188,223 192,309 164,312" fill="#F5F3EE"></polygon><rect x="171" y="262" width="9" height="9" fill="#C9A24A"></rect>
<polygon points="510,200 334,218 330,306 510,326" fill="#C9A24A"></polygon><polygon points="340,217 312,220 308,305 336,307" fill="#F5F3EE"></polygon>
<path d="M188,226 C216,220 246,224 272,236 C284,242 290,254 286,266 C272,276 238,292 192,306 Z" fill="#C98F68"></path>
<path d="M312,222 C288,216 262,222 244,234 C232,244 228,258 236,268 C256,280 286,292 308,304 Z" fill="#8D5A3B"></path>
<g fill="none" stroke="#8D5A3B" stroke-width="11" stroke-linecap="round"><path d="M246,236 C232,246 228,262 238,278"></path><path d="M258,240 C246,252 242,268 252,284"></path><path d="M270,246 C260,258 258,274 268,290"></path></g>
<path d="M230,230 C248,220 270,218 290,224" fill="none" stroke="#C98F68" stroke-width="12" stroke-linecap="round"></path>
<g fill="none" stroke="#6E4429" stroke-width="1.6" stroke-linecap="round" opacity="0.6"><path d="M240,262 C244,266 248,268 252,268"></path><path d="M252,276 C256,280 260,282 264,282"></path></g>
</g></svg>${caption('Partnership', 'Built together — and backed after launch.')}`;
