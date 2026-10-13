// Original SVG art for Chez René. Vocabulary taken from the room: velvet, cane, gilded sunburst mirror,
// Odorico-style mosaic, fringed lamp, plates on wine-red ground. No photos, no copy of the real logo.

const C = {
  nuit: '#101018', ombre: '#181828', velours: '#384870', clair: '#486898', creme: '#FAF5EF', cognac: '#C8743F',
  gilt: '#C9A55A', teal: '#2F6F6A', wine: '#6E1F2A', pink: '#D99AA5', glow: '#F0D79A',
}

function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

let uid = 0
const id = (p: string) => `${p}${++uid}`

/** The hero mirror: gilt sunburst around a velvet glass, with the arc text. The wordmark is HTML on top. */
export function heroMirror(): string {
  const rays: string[] = []
  const n = 56
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    const long = i % 2 === 0
    const r1 = 214, r2 = long ? 292 : 262
    const x1 = 300 + Math.cos(a) * r1, y1 = 300 + Math.sin(a) * r1
    const x2 = 300 + Math.cos(a) * r2, y2 = 300 + Math.sin(a) * r2
    rays.push(`<line class="ray" pathLength="1" style="--d:${(i * 0.018).toFixed(2)}s" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="url(#g-gilt)" stroke-width="${long ? 5 : 3}" stroke-linecap="round"/>`)
  }
  const gid = id('hm')
  return `<svg viewBox="0 0 600 600" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="g-gilt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8CC86"/><stop offset=".5" stop-color="${C.gilt}"/><stop offset="1" stop-color="#8F6E2C"/></linearGradient>
    <radialGradient id="${gid}-glass" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#5C7DB0"/><stop offset=".55" stop-color="${C.velours}"/><stop offset="1" stop-color="${C.nuit}"/></radialGradient>
    <path id="${gid}-arc" d="M 300 300 m -158 0 a 158 158 0 1 1 316 0 a 158 158 0 1 1 -316 0"/>
  </defs>
  <g>${rays.join('')}</g>
  <circle cx="300" cy="300" r="206" fill="none" stroke="url(#g-gilt)" stroke-width="10"/>
  <circle cx="300" cy="300" r="196" fill="url(#${gid}-glass)"/>
  <g opacity=".35" fill="none" stroke="${C.creme}" stroke-width="1.4"><path d="M120 420 Q300 300 480 420"/><path d="M150 470 Q300 360 450 470"/><path d="M210 190 Q300 150 390 190"/></g>
  <path d="M170 160 Q300 90 430 160 Q330 130 170 160Z" fill="#fff" opacity=".09"/>
  <g class="arc-text"><text font-family="Josefin Sans Variable, sans-serif" font-size="17" letter-spacing="7.4" fill="${C.glow}" font-weight="600"><textPath href="#${gid}-arc" startOffset="0">BISTROT · DE QUARTIER · 6 BOULEVARD · LAENNEC · </textPath></text></g>
  <circle cx="300" cy="300" r="136" fill="none" stroke="${C.creme}" stroke-opacity=".28" stroke-width="1.2"/>
</svg>`
}

/** Tesserae band (Odorico-style). Tiles fall into place on scroll. */
export function tessBand(cols = 60, seed = 3): string {
  const r = rng(seed)
  const pal = [C.teal, C.gilt, C.clair, C.pink, C.velours, C.cognac]
  const w = 20
  let rects = ''
  for (let row = 0; row < 2; row++) {
    for (let i = 0; i < cols; i++) {
      const col = pal[Math.floor(r() * pal.length)]
      rects += `<rect style="--d:${((i % 30) * 0.02 + row * 0.1).toFixed(2)}s" x="${i * w + 1}" y="${row * w - 1 + 1}" width="${w - 2}" height="${w - 2}" rx="3" fill="${col}" opacity="${(0.72 + r() * 0.28).toFixed(2)}"/>`
    }
  }
  return `<div class="tess-band" aria-hidden="true"><svg viewBox="0 0 ${cols * w} 40" preserveAspectRatio="xMidYMid slice">${rects}</svg></div>`
}

export function plate(kind: 'egg' | 'terrine' | 'mousse' | 'cote' | 'vitello' | 'onglet'): string {
  const ring = `<ellipse cx="150" cy="150" rx="136" ry="120" fill="#F7F2EA"/><ellipse cx="150" cy="150" rx="112" ry="97" fill="none" stroke="#E4DCCD" stroke-width="3"/>`
  let body = ''
  if (kind === 'egg') {
    body = `<ellipse cx="150" cy="150" rx="82" ry="60" fill="#FFFDF7"/><ellipse class="yolk" cx="150" cy="150" rx="34" ry="26" fill="#E8B84A"/>
      <g fill="#6E8F3A"><circle cx="106" cy="128" r="5"/><circle cx="196" cy="120" r="4"/><circle cx="214" cy="160" r="5"/><circle cx="120" cy="186" r="4"/><circle cx="178" cy="196" r="5"/></g>
      <g stroke="#4E6B1F" stroke-width="3" stroke-linecap="round"><path d="M110 200 q14 -14 22 -2"/><path d="M190 106 q10 -12 20 -2"/></g><circle cx="150" cy="150" r="46" fill="none" stroke="#8FB04A" stroke-width="2" stroke-dasharray="3 7" opacity=".8"/>`
  } else if (kind === 'terrine') {
    body = `<rect x="76" y="110" width="150" height="80" rx="10" fill="#B9806A"/><rect x="76" y="110" width="150" height="80" rx="10" fill="none" stroke="#7B4A3A" stroke-width="3"/>
      <g fill="#3B2A22"><ellipse cx="108" cy="140" rx="9" ry="6"/><ellipse cx="150" cy="160" rx="10" ry="7"/><ellipse cx="190" cy="138" rx="9" ry="6"/><ellipse cx="126" cy="172" rx="8" ry="5"/><ellipse cx="204" cy="170" rx="8" ry="5"/></g>
      <g fill="#D3B79B"><circle cx="90" cy="125" r="4"/><circle cx="170" cy="120" r="4"/><circle cx="214" cy="150" r="3"/><circle cx="100" cy="170" r="3"/></g>
      <circle cx="230" cy="206" r="9" fill="#C23A5E"/><circle cx="214" cy="212" r="6" fill="#E8C86B"/>`
  } else if (kind === 'mousse') {
    body = `<ellipse cx="150" cy="150" rx="68" ry="62" fill="#4B2A1E"/><ellipse cx="150" cy="150" rx="68" ry="62" fill="none" stroke="#2E170F" stroke-width="3"/>
      <ellipse cx="136" cy="130" rx="30" ry="14" fill="#6A3E2B" opacity=".7"/>
      <g fill="#FFFFFF"><rect x="120" y="140" width="5" height="3" rx="1" transform="rotate(20 122 141)"/><rect x="158" y="124" width="5" height="3" rx="1"/><rect x="172" y="158" width="6" height="3" rx="1" transform="rotate(-30 175 159)"/><rect x="138" y="170" width="5" height="3" rx="1"/><rect x="186" y="136" width="4" height="3" rx="1"/><rect x="110" y="162" width="4" height="3" rx="1"/></g>
      <rect x="196" y="176" width="46" height="9" rx="4" fill="#C9A55A" transform="rotate(-24 219 180)"/>`
  } else if (kind === 'cote') {
    body = `<path d="M70 152 Q70 100 140 96 Q232 90 238 146 Q240 204 160 208 Q76 210 70 152Z" fill="#8A3B30"/><path d="M86 150 Q88 112 142 110 Q216 106 222 146 Q224 190 160 194 Q94 196 86 150Z" fill="#B35A44"/>
      <path d="M205 120 Q248 100 252 140 Q250 170 214 172Z" fill="#F0E4D2" stroke="#D2C2A6" stroke-width="2"/><g fill="#E0B96B"><ellipse cx="96" cy="206" rx="13" ry="9"/><ellipse cx="124" cy="216" rx="12" ry="8"/><ellipse cx="84" cy="224" rx="10" ry="7"/></g>
      <g fill="#fff" opacity=".8"><rect x="150" y="140" width="5" height="3" rx="1"/><rect x="176" y="156" width="5" height="3" rx="1"/></g>`
  } else if (kind === 'vitello') {
    body = `<g fill="#E9B8A8" stroke="#C98A78" stroke-width="2"><ellipse cx="120" cy="140" rx="46" ry="30" transform="rotate(-12 120 140)"/><ellipse cx="170" cy="160" rx="46" ry="30" transform="rotate(8 170 160)"/><ellipse cx="146" cy="118" rx="40" ry="26" transform="rotate(14 146 118)"/></g>
      <path d="M100 150 Q150 130 200 168 Q150 190 100 150Z" fill="#F4E7C9" opacity=".85"/><g fill="#5C7A2E"><circle cx="126" cy="150" r="5"/><circle cx="166" cy="140" r="5"/><circle cx="190" cy="166" r="4"/><circle cx="144" cy="172" r="4"/></g>
      <g fill="#F3EFE6"><path d="M118 108 q8 -10 14 0z"/><path d="M180 128 q8 -10 14 0z"/></g>`
  } else {
    body = `<path d="M62 156 Q80 112 150 118 Q232 112 246 156 Q234 200 150 196 Q76 200 62 156Z" fill="#7A2E27"/><path d="M82 156 Q96 128 150 132 Q214 130 226 156 Q214 180 150 178 Q92 180 82 156Z" fill="#9C4538"/>
      <g fill="#D8C79A"><ellipse cx="100" cy="206" rx="11" ry="8"/><ellipse cx="124" cy="214" rx="11" ry="7"/><ellipse cx="204" cy="212" rx="12" ry="8"/></g><g fill="#6E8F3A"><circle cx="150" cy="214" r="5"/><circle cx="170" cy="208" r="4"/></g>`
  }
  return `<svg viewBox="0 0 300 300" role="img" aria-label="" focusable="false">${ring}${body}</svg>`
}

export function bottle(couleur: string, style: string): string {
  const fill: Record<string, string> = { rouge: '#5B1A27', blanc: '#CFC27A', 'rosé': '#E59AA0', orange: '#D9863A', bulles: '#9DB28B' }
  const g = fill[couleur] ?? '#5B1A27'
  const foil = couleur === 'bulles' ? `<rect x="22" y="2" width="14" height="30" rx="3" fill="${C.gilt}"/>` : `<rect x="23" y="4" width="12" height="14" rx="2" fill="${couleur === 'blanc' ? '#9C8C3C' : '#2A1017'}"/>`
  const mark = style === 'nature' ? `<circle cx="29" cy="132" r="4" fill="${C.teal}"/>` : style === 'biodynamie' ? `<path d="M29 126 l4 8 -4 -2 -4 2z" fill="${C.cognac}"/><circle cx="29" cy="134" r="1.5" fill="${C.cognac}"/>` : `<rect x="24" y="130" width="10" height="2.4" fill="${C.ombre}"/>`
  return `<svg viewBox="0 0 58 190" aria-hidden="true" focusable="false">
  <path d="M23 4h12v36c0 18 18 24 18 52v90c0 5-3 8-8 8H13c-5 0-8-3-8-8V92c0-28 18-34 18-52Z" fill="${g}"/>
  <path d="M23 4h12v36c0 18 18 24 18 52" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="2"/>
  <path d="M12 60c4-6 8-10 10-18" stroke="#fff" stroke-opacity=".28" stroke-width="3" fill="none" stroke-linecap="round"/>
  ${foil}<rect x="10" y="108" width="38" height="52" rx="3" fill="#F3EBDD"/><rect x="14" y="114" width="30" height="2" fill="${C.ombre}" opacity=".6"/><rect x="18" y="120" width="22" height="2" fill="${C.ombre}" opacity=".4"/>${mark}<rect x="16" y="144" width="26" height="2" fill="${C.ombre}" opacity=".4"/></svg>`
}

export function glass(kind: string, tint = C.cognac): string {
  const liquid = (d: string) => `<path d="${d}" fill="${tint}" opacity=".85"/>`
  const stroke = `stroke="${C.gilt}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"`
  const wrap = (inner: string) => `<svg viewBox="0 0 80 110" aria-hidden="true" focusable="false">${inner}</svg>`
  switch (kind) {
    case 'coupe': return wrap(`${liquid('M12 24h56q-2 22-28 28-26-6-28-28Z')}<path d="M10 22h60q-2 24-30 30-28-6-30-30Z" ${stroke}/><path d="M40 52v42M24 96h32" ${stroke}/><circle cx="62" cy="16" r="5" fill="#F0B24A"/>`)
    case 'flute': return wrap(`${liquid('M30 18h20l-3 44q-7 4-14 0Z')}<path d="M28 10h24l-3 54q-9 5-18 0Z" ${stroke}/><path d="M40 66v28M26 96h28" ${stroke}/><circle cx="38" cy="30" r="1.8" fill="${C.creme}"/><circle cx="43" cy="42" r="1.8" fill="${C.creme}"/><circle cx="37" cy="50" r="1.8" fill="${C.creme}"/>`)
    case 'highball': return wrap(`${liquid('M22 22h36l-2 70H24Z')}<path d="M20 12h40l-3 82H23Z" ${stroke}/><rect x="30" y="34" width="10" height="10" rx="2" fill="${C.creme}" opacity=".7"/><rect x="42" y="56" width="10" height="10" rx="2" fill="${C.creme}" opacity=".7"/><path d="M48 4l8 26" stroke="${C.teal}" stroke-width="3" stroke-linecap="round"/>`)
    case 'ballon': return wrap(`${liquid('M20 44q-4 30 20 30t20-30Z')}<path d="M18 28q-6 42 22 46t22-46Z" ${stroke}/><path d="M40 76v18M26 96h28" ${stroke}/><circle cx="30" cy="50" r="6" fill="#F0B24A" opacity=".9"/>`)
    default: return wrap(`${liquid('M20 40h40l-2 46H22Z')}<path d="M18 28h44l-3 62H21Z" ${stroke}/><rect x="28" y="48" width="14" height="14" rx="2" fill="${C.creme}" opacity=".7"/><path d="M44 18q6-10 14-8" ${stroke}/>`)
  }
}

/** Gallery / journal / room scenes, drawn at 400 x 300 and centred inside a taller or wider frame. */
export function scene(kind: string, h = 300, label = ''): string {
  const r = rng(kind.length * 977 + h)
  const gid = id('sc')
  const bg = (a: string, b: string) => `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient><pattern id="${gid}c" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0h12M0 0v12" stroke="${C.gilt}" stroke-opacity=".38" stroke-width="1.5"/></pattern></defs><rect width="400" height="${h}" fill="url(#${gid})"/>`
  const shift = (h - 300) / 2
  let inner = ''
  let bgc = bg(C.velours, C.ombre)
  switch (kind) {
    case 'velvet':
      inner = `<path d="M-20 260 C100 160 220 220 420 80 L420 130 C240 270 100 220 -20 320Z" fill="#fff" opacity=".07"/><path d="M-20 200 C120 120 240 180 420 40 L420 70 C250 210 110 160 -20 240Z" fill="#fff" opacity=".05"/>`
      break
    case 'cane':
      inner = `<rect x="30" y="${-shift + 20}" width="340" height="${h - 40}" rx="16" fill="url(#${gid}c)" stroke="${C.gilt}" stroke-width="4"/><rect x="30" y="${-shift + 20}" width="340" height="${h - 40}" rx="16" fill="none" stroke="${C.nuit}" stroke-opacity=".4" stroke-width="10"/>`
      break
    case 'sunburst': {
      let rays = ''
      for (let i = 0; i < 40; i++) { const a = (i / 40) * Math.PI * 2; rays += `<line x1="${200 + Math.cos(a) * 82}" y1="${150 + Math.sin(a) * 82}" x2="${200 + Math.cos(a) * (i % 2 ? 112 : 132)}" y2="${150 + Math.sin(a) * (i % 2 ? 112 : 132)}" stroke="${C.gilt}" stroke-width="${i % 2 ? 2.5 : 4}" stroke-linecap="round"/>` }
      inner = `${rays}<circle cx="200" cy="150" r="76" fill="none" stroke="${C.gilt}" stroke-width="7"/><circle cx="200" cy="150" r="70" fill="${C.clair}" opacity=".6"/><path d="M160 120 Q200 90 240 120" stroke="#fff" stroke-opacity=".5" fill="none" stroke-width="3"/>`
      bgc = bg('#1C2440', C.nuit)
      break
    }
    case 'mosaic': {
      const pal = [C.teal, C.gilt, C.clair, C.pink, C.velours, '#E8DCC0']
      let t = ''
      for (let y = 0; y < 22; y++) for (let x = 0; x < 22; x++) { const dx = x - 10.5, dy = y - 10.5, d = Math.hypot(dx, dy); if (d < 10.4) { const ring = Math.floor(d / 2.6); t += `<rect x="${200 + dx * 8.4 - 3.7}" y="${150 + dy * 8.4 - 3.7}" width="7.4" height="7.4" rx="1.2" fill="${pal[(ring + (r() > 0.78 ? 1 : 0)) % pal.length]}"/>` } }
      inner = `<circle cx="200" cy="150" r="102" fill="${C.nuit}" stroke="${C.gilt}" stroke-width="5"/>${t}`
      bgc = bg('#2A3A5E', C.ombre)
      break
    }
    case 'lamp':
      inner = `<circle cx="200" cy="170" r="120" fill="${C.glow}" opacity=".16"/><circle cx="200" cy="170" r="70" fill="${C.glow}" opacity=".2"/><line x1="200" y1="${-shift}" x2="200" y2="50" stroke="${C.creme}" stroke-opacity=".5" stroke-width="2"/>
      <path d="M130 170 L158 70 Q200 56 242 70 L270 170Z" fill="#6B3A58" stroke="${C.gilt}" stroke-width="2"/><g fill="${C.pink}" opacity=".8"><circle cx="170" cy="110" r="7"/><circle cx="220" cy="130" r="8"/><circle cx="196" cy="90" r="5"/><circle cx="246" cy="98" r="5"/></g>
      <path d="M130 170h140" stroke="${C.gilt}" stroke-width="3"/><g stroke="${C.gilt}" stroke-width="2.4" stroke-linecap="round">${Array.from({ length: 14 }, (_, i) => `<path d="M${136 + i * 9.6} 170v${14 + (i % 3) * 5}"/>`).join('')}</g><circle cx="200" cy="176" r="9" fill="${C.glow}"/>`
      bgc = bg('#1A1424', C.nuit)
      break
    case 'egg': case 'terrine': case 'mousse': case 'cote': {
      inner = `<g transform="translate(80 -2) scale(.92)">${plate(kind).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>`
      bgc = bg('#7A2430', '#4A1220')
      break
    }
    case 'bottles': case 'cave': {
      let b = ''
      const cols = ['#5B1A27', '#CFC27A', '#E59AA0', '#D9863A', '#5B1A27', '#9DB28B', '#5B1A27']
      cols.forEach((c, i) => { b += `<g transform="translate(${44 + i * 46} ${120 + (i % 2) * 4}) scale(.6)"><path d="M23 4h12v36c0 18 18 24 18 52v90c0 5-3 8-8 8H13c-5 0-8-3-8-8V92c0-28 18-34 18-52Z" fill="${c}"/><rect x="10" y="108" width="38" height="52" rx="3" fill="#F3EBDD"/></g>` })
      inner = `${kind === 'cave' ? `<path d="M30 ${h - 60} V120 Q30 40 200 40 Q370 40 370 120 V${h - 60}" fill="none" stroke="${C.gilt}" stroke-width="3"/>` : ''}${b}<rect x="20" y="238" width="360" height="12" rx="3" fill="#6B4A2F"/><rect x="20" y="250" width="360" height="5" fill="#3D2816"/>`
      bgc = bg('#2A2020', C.nuit)
      break
    }
    case 'gin':
      inner = `<g transform="translate(120 20) scale(2.1)">${glass('highball', '#BFD8D0').replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g><g fill="#7FA05A"><circle cx="240" cy="146" r="14"/><circle cx="240" cy="146" r="9" fill="#C8E0A0"/></g>`
      bgc = bg('#19263A', C.nuit)
      break
    case 'cocktail':
      inner = `<g transform="translate(130 24) scale(1.9)">${glass('coupe', '#E6A054').replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>`
      bgc = bg('#4A2A22', C.nuit)
      break
    case 'comptoir': {
      let st = ''
      for (let i = 0; i < 3; i++) st += `<g transform="translate(${90 + i * 100} 190)"><rect x="0" y="0" width="40" height="10" rx="5" fill="${C.cognac}"/><path d="M8 10l-6 70M32 10l6 70M20 10v70" stroke="${C.gilt}" stroke-width="3"/></g>`
      inner = `<rect x="0" y="60" width="400" height="6" fill="${C.gilt}" opacity=".7"/><g fill="${C.creme}" opacity=".5">${Array.from({ length: 9 }, (_, i) => `<rect x="${30 + i * 40}" y="${24 + (i % 3) * 5}" width="12" height="${34 - (i % 3) * 5}" rx="3"/>`).join('')}</g><rect x="0" y="170" width="400" height="22" fill="#5A3B24"/>${st}
      <g stroke="${C.creme}" stroke-opacity=".5" stroke-width="1.5"><path d="M80 -20V0M200 -20V0M320 -20V0"/></g><g fill="${C.glow}"><circle cx="80" cy="6" r="9"/><circle cx="200" cy="6" r="9"/><circle cx="320" cy="6" r="9"/></g>`
      break
    }
    case 'tables': {
      let tb = ''
      for (let i = 0; i < 2; i++) tb += `<g transform="translate(${50 + i * 170} 130)"><ellipse cx="60" cy="0" rx="62" ry="12" fill="#6B4A2F"/><path d="M60 12v84M30 96h60" stroke="${C.gilt}" stroke-width="4"/><g transform="translate(-46 18)"><rect x="0" y="0" width="34" height="38" rx="4" fill="url(#${gid}c)" stroke="${C.gilt}" stroke-width="2"/><path d="M4 38v50M30 38v50" stroke="${C.gilt}" stroke-width="3"/></g><g transform="translate(106 18)"><rect x="0" y="0" width="34" height="38" rx="4" fill="url(#${gid}c)" stroke="${C.gilt}" stroke-width="2"/><path d="M4 38v50M30 38v50" stroke="${C.gilt}" stroke-width="3"/></g></g>`
      inner = `${tb}<g fill="${C.glow}" opacity=".9"><path d="M110 -20V30M280 -20V30" stroke="${C.creme}" stroke-opacity=".4"/><circle cx="110" cy="38" r="12"/><circle cx="280" cy="38" r="12"/></g>`
      break
    }
    case 'alcove':
      inner = `<path d="M70 280V120Q70 40 200 40Q330 40 330 120V280Z" fill="${C.ombre}" stroke="${C.gilt}" stroke-width="3"/><g><rect x="96" y="200" width="208" height="62" rx="26" fill="${C.cognac}"/><rect x="108" y="170" width="76" height="60" rx="26" fill="#A85E30" transform="rotate(-8 146 200)"/><rect x="214" y="168" width="76" height="62" rx="26" fill="${C.teal}" transform="rotate(7 250 200)"/></g><circle cx="200" cy="104" r="40" fill="${C.glow}" opacity=".22"/><circle cx="200" cy="104" r="12" fill="${C.glow}"/>`
      bgc = bg('#1A1C30', C.nuit)
      break
    case 'pub':
      inner = `<rect x="0" y="40" width="400" height="140" fill="#2A1A14"/><g stroke="#3C2A20" stroke-width="2">${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 46} 40v140"/>`).join('')}</g><rect x="0" y="180" width="400" height="16" fill="#4A3020"/><rect x="30" y="196" width="340" height="70" rx="12" fill="${C.cognac}"/><g fill="#8E4A22">${Array.from({ length: 6 }, (_, i) => `<circle cx="${60 + i * 56}" cy="230" r="4"/>`).join('')}</g><g fill="${C.glow}"><circle cx="90" cy="100" r="14"/><circle cx="310" cy="100" r="14"/></g><g fill="${C.glow}" opacity=".18"><circle cx="90" cy="100" r="46"/><circle cx="310" cy="100" r="46"/></g><rect x="150" y="70" width="100" height="70" fill="${C.teal}" stroke="${C.gilt}" stroke-width="4"/>`
      bgc = bg('#2A2630', C.nuit)
      break
    case 'plaque':
      inner = `<rect x="30" y="86" width="340" height="128" rx="14" fill="#123F8F" stroke="#fff" stroke-width="6"/><rect x="42" y="98" width="316" height="104" rx="8" fill="none" stroke="#fff" stroke-width="2"/><text x="200" y="128" text-anchor="middle" font-family="Josefin Sans Variable, sans-serif" font-size="14" letter-spacing="7" fill="#fff">BOULEVARD</text><text x="200" y="168" text-anchor="middle" font-family="Josefin Sans Variable, sans-serif" font-weight="700" font-size="30" letter-spacing="3" fill="#fff">RENÉ LAENNEC</text><text x="200" y="192" text-anchor="middle" font-family="Josefin Sans Variable, sans-serif" font-size="11" letter-spacing="5" fill="#fff">RENNES</text>`
      bgc = bg('#7E8A8A', '#4B5558')
      break
    case 'chair':
      inner = `<path d="M110 270V120Q110 50 200 50Q290 50 290 120V270" fill="none" stroke="${C.gilt}" stroke-width="7" stroke-linecap="round"/><rect x="128" y="76" width="144" height="124" rx="40" fill="url(#${gid}c)" stroke="#8E6B2A" stroke-width="4"/><rect x="104" y="200" width="192" height="16" rx="6" fill="#6B4A2F"/>`
      break
    case 'monogram':
      inner = `<ellipse cx="200" cy="150" rx="110" ry="128" fill="none" stroke="${C.creme}" stroke-width="2.4"/><ellipse cx="200" cy="150" rx="100" ry="118" fill="none" stroke="${C.creme}" stroke-width="1.2"/><text x="200" y="196" text-anchor="middle" font-family="Bodoni Moda Variable, serif" font-size="140" fill="${C.creme}" font-weight="500">R</text>`
      break
    case 'ardoise':
      inner = `<rect x="30" y="30" width="340" height="240" rx="6" fill="#1C1F24" stroke="#6B4A2F" stroke-width="10"/><g stroke="#EDE8DA" stroke-width="3" stroke-linecap="round" opacity=".85"><path d="M70 80h140M70 112h180M70 144h120M70 176h160M70 208h100"/></g><g stroke="#D9B377" stroke-width="3" stroke-linecap="round"><path d="M290 80h30M290 112h30M290 144h30M290 176h30"/></g>`
      bgc = bg('#2A2030', C.nuit)
      break
    default:
      inner = ''
  }
  const title = label ? `<title>${label}</title>` : ''
  return `<svg viewBox="0 0 400 ${h}" role="img" aria-label="${label}" focusable="false" preserveAspectRatio="xMidYMid slice">${title}${bgc}<g transform="translate(0 ${shift})">${inner}</g></svg>`
}

/** Radial schematic: distances are straight-line from the address (not a map). */
export function radialMap(items: { name: string; meters: number; kind: 'bus' | 'metro' | 'lieu' }[]): string {
  const cx = 300, cy = 260, k = 0.26
  let g = ''
  ;[250, 500, 750, 1000].forEach((m) => { g += `<circle cx="${cx}" cy="${cy}" r="${m * k}" fill="none" stroke="currentColor" stroke-opacity=".22" stroke-dasharray="4 6"/><text x="${cx + 4}" y="${cy - m * k + 14}" font-size="11" fill="currentColor" fill-opacity=".6" font-family="Josefin Sans Variable, sans-serif">${m} m</text>` })
  let a = -Math.PI / 2 + 0.2
  const step = (Math.PI * 2) / items.length
  items.forEach((it) => {
    const x = cx + Math.cos(a) * it.meters * k, y = cy + Math.sin(a) * it.meters * k
    const col = it.kind === 'metro' ? '#D99AA5' : it.kind === 'bus' ? '#C8743F' : '#8FB04A'
    g += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${col}" stroke-opacity=".35"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="${col}"/>`
    const anchor = Math.cos(a) >= 0 ? 'start' : 'end'
    g += `<text x="${(x + (Math.cos(a) >= 0 ? 11 : -11)).toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="${anchor}" font-size="12.5" fill="currentColor" font-family="Karla Variable, sans-serif">${it.name}</text>`
    a += step
  })
  g += `<circle cx="${cx}" cy="${cy}" r="12" fill="#C8743F"/><circle cx="${cx}" cy="${cy}" r="5" fill="#FAF5EF"/><text x="${cx}" y="${cy + 30}" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor" font-family="Karla Variable, sans-serif">6 bd Laënnec</text>`
  return `<svg viewBox="0 0 600 520" role="img" aria-label="Schéma des arrêts et lieux autour du 6 boulevard René Laënnec, distances à vol d'oiseau" focusable="false">${g}</svg>`
}

export const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#384870"/><ellipse cx="32" cy="32" rx="22" ry="26" fill="none" stroke="#FAF5EF" stroke-width="1.6"/><ellipse cx="32" cy="32" rx="19.5" ry="23.5" fill="none" stroke="#FAF5EF" stroke-width=".9"/><text x="32" y="44" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#FAF5EF">R</text></svg>`
