// Core game logic (shared by game + solver). Pure functions, no DOM.
// Tiles: '.' empty, 'B' ball (each can be shot once), 'C' cat, 'R' rock (breaks when hit),
//        'S'/'1'/'2'/'3' spring (ball bounces back n cells, no burst), 'A'/'a','P'/'p' portal pairs, 'D' cushion block (stops ball, no burst), 'M' slow carpet, '_' void (not part of the board; acts like the edge)
const LEVELS = [
  { name: "Bắn thử", rows: [
    ".....",
    "..C..",
    ".....",
    ".....",
    "..B.."] },
  { name: "Hai quả bóng", rows: [
    "C....",
    ".....",
    "....C",
    ".....",
    "B...B"] },
  { name: "Đá chắn đường", rows: [
    "..C...",
    "..R...",
    "......",
    "......",
    ".....C",
    "..B..B",
    "..B..."] },
  { name: "Lò xo", rows: [
    "1.3...",
    "......",
    ".....C",
    "......",
    ".....C",
    "B.B..D"] },
  { name: "Cổng dịch chuyển", rows: [
    "C...DC",
    "....Da",
    "A...D.",
    "....D.",
    "....D.",
    "BB..D."] },
  { name: "Tổng hợp", rows: [
    "...R...",
    "..2A...",
    "....B..",
    "3......",
    ".C....R",
    ".Ca.B.C",
    "...C..."] },
  { name: "Bóng chặn bóng", rows: [
    ".C.B..",
    "....D.",
    ".CBB.D",
    "......",
    ".....C",
    "......"] },
  { name: "Thảm làm chậm", rows: [
    "...CB.",
    "...C..",
    "C.M.M.",
    "R.....",
    "..B.M.",
    "......"] },
  { name: "Thử thách", rows: [
    "B.B....",
    ".MM.aC.",
    "..R.D..",
    ".......",
    "CB.....",
    ".AC.2..",
    "..C...."] },
  { name: "Bàn vuông", rows: [
    ".....B",
    "..C...",
    ".R..C.",
    ".....B",
    "....C.",
    "...R.."] },
  { name: "Bàn vuông", rows: [
    "..CC..",
    ".B..B.",
    "......",
    "......",
    "......",
    "CR...."] },
  { name: "Bàn vuông", rows: [
    ".3.B...",
    ".......",
    ".BC.C..",
    ".......",
    "....CR.",
    "......."] },
  { name: "Kim cương", rows: [
    "__..__",
    "_..C._",
    "2....B",
    ".CB...",
    "_C..._",
    "__RR__"] },
  { name: "Chữ U", rows: [
    "..__B2",
    "a.__..",
    ".C__..",
    ".A....",
    ".....C",
    ".R.C.B"] },
  { name: "Khung rỗng", rows: [
    ".......",
    "..B...a",
    "2.___A.",
    "B.___.C",
    ".1..CC.",
    "......C"] },
  { name: "Chữ T", rows: [
    "B.C.D.",
    "R.....",
    "__C.B_",
    "__..._",
    "__C.C_",
    "__..._"] },
  { name: "Đồng hồ cát", rows: [
    "C.B....",
    "_.C.C._",
    "__...__",
    "__RC.__",
    "__...__",
    "_D...._",
    "B..B..."] },
  { name: "Ziczac", rows: [
    "__.MC...",
    "__DB..B.",
    "__...M..",
    "__......",
    "C...C.__",
    "CB....__",
    "......__"] },
  { name: "Bàn vuông", rows: [
    ".......",
    ".....CC",
    "......C",
    "..M.B..",
    "C......",
    "..M....",
    "...B1.."] },
  { name: "Chữ L", rows: [
    "..C.___",
    "....___",
    "...B___",
    ".C.....",
    ".A.B...",
    "..CB...",
    "MC..Ma."] },
  { name: "Chữ thập", rows: [
    "__..B.__",
    "__..C.__",
    ".ACC....",
    "....RC.a",
    "..B.M...",
    "__...M__",
    "__..BM__"] },
  { name: "Kim cương", rows: [
    "__...__",
    "_B.B.._",
    "....C..",
    "...MCC.",
    "...R...",
    "_.BC.._",
    "__M..__"] },
  { name: "Chữ U", rows: [
    "..___CC",
    "..___.a",
    "..___..",
    "..___..",
    ".B.CA..",
    "B.MM...",
    "B.C...."] },
  { name: "Khung rỗng", rows: [
    "........",
    "B..BC.C.",
    "...__...",
    "...__..M",
    "C..__...",
    "CM......",
    "..B...DM"] },
  { name: "Chữ T", rows: [
    "B..B.BC",
    "..CM...",
    "__M.C__",
    "__..D__",
    "__.C.__",
    "__.C.__",
    "__...__"] },
  { name: "Đồng hồ cát", rows: [
    ".CM.B.C",
    "_C..C._",
    "__...__",
    "__...__",
    "__BC.__",
    "_.M..._",
    ".....B2"] },
  { name: "Ziczac", rows: [
    "__.1M.CC",
    "__.AC...",
    "__..BM..",
    "__...B..",
    "..a.C2__",
    "....MB__",
    "....C.__"] },
  { name: "Bàn vuông", rows: [
    ".CM....",
    ".......",
    ".C.C...",
    "....B..",
    "....M.D",
    "....CC.",
    "..B.B.."] },
  { name: "Chữ L", rows: [
    ".AMM___",
    ".B..___",
    "...C___",
    "CC.....",
    ".....CB",
    "....C..",
    "B....a."] },
  { name: "Chữ thập", rows: [
    "___...___",
    "___..B___",
    "..D.C.C..",
    "..B...C..",
    "aDCMB....",
    "B......A.",
    "___C.M___",
    "___.M.___"] },
  { name: "Kim cương", rows: [
    "___C.___",
    "__....__",
    "_BM...._",
    "B....C..",
    "MD.C.B..",
    "_M..AB._",
    "__.CaC__",
    "___.D___"] },
  { name: "Chữ U", rows: [
    "CB____..",
    ".C____..",
    "BA____..",
    "..____B.",
    "..____C.",
    "aMC.....",
    "...MB.CM",
    "........"] },
  { name: "Khung rỗng", rows: [
    "BBB.D....",
    "..DM.....",
    "...C.....",
    ".CC___..M",
    "...___...",
    "....C..MC",
    "B........",
    "........."] },
  { name: "Chữ T", rows: [
    ".B.BB...",
    "RC.RBC..",
    "___C3.__",
    "___.M.__",
    "___M.M__",
    "___.C.__",
    "___..C__",
    "___...__"] },
  { name: "Đồng hồ cát", rows: [
    "M.CR..D.",
    "_..CCMB_",
    "__.BBC__",
    "___..___",
    "___.D___",
    "__..R.__",
    "_....C._",
    "CM.B...."] },
  { name: "Ziczac", rows: [
    "__..B..C.",
    "__.......",
    "__R..C.B.",
    "__.M.B...",
    "...MB..__",
    ".C...1.__",
    "...C.C.__",
    "RC.....__"] },
  { name: "Bàn vuông", rows: [
    "..D.B...",
    "B.D.M..C",
    "C....a..",
    ".CM.....",
    "C.......",
    "....CC..",
    "........",
    ".M.B.BA."] },
  { name: "Chữ L", rows: [
    "..CM____",
    ".C..____",
    ".B3C____",
    ".C..____",
    "BC.M....",
    ".....C..",
    "..MB....",
    "..B1...."] },
  { name: "Chữ thập", rows: [
    "___...___",
    "___...___",
    ".CCR...BR",
    ".MD.C...B",
    "...MC....",
    "B.M..B.C.",
    "___.C.___",
    "___...___"] },
  { name: "Kim cương", rows: [
    "___..___",
    "__.C.M__",
    "_.CCCBC_",
    "D...C.B.",
    ".D..M...",
    "_...M.._",
    "__..B.__",
    "___.B___"] },
  { name: "Chữ U", rows: [
    "..____.B",
    "..____..",
    "..____.C",
    "..____..",
    "..____BB",
    "C.MBC...",
    ".a....AD",
    "CM.CC..."] },
  { name: "Khung rỗng", rows: [
    "......CC.",
    ".C.B.....",
    "..B....C.",
    "C..___2..",
    "..a___...",
    "B..MCM...",
    "....B....",
    "....M..A."] },
  { name: "Chữ T", rows: [
    "C..C....",
    "..MM..B.",
    "___CC.__",
    "___D.B__",
    "___...__",
    "___.B.__",
    "___B.C__",
    "___C..__"] },
  { name: "Đồng hồ cát", rows: [
    "........C",
    "_......._",
    "__.CB..__",
    "___.M.___",
    "___ABC___",
    "___...___",
    "__.....__",
    "_C.C..M._",
    "B.BCa...."] },
  { name: "Ziczac", rows: [
    "__.C.B.C.",
    "__..B.B..",
    "__.......",
    "__..M....",
    "__.......",
    "....ACC__",
    ".a...BC__",
    "...C..C__",
    "..M....__"] },
  { name: "Bàn vuông", rows: [
    ".........",
    "C........",
    "M........",
    "....MBC..",
    "...B..C..",
    "...C.B...",
    "....C.C..",
    "...B.3.C.",
    "........."] },
  { name: "Chữ L", rows: [
    "C....____",
    "...BC____",
    "....D____",
    ".....____",
    "CC...B..C",
    "......C..",
    ".C.M....B",
    ".....B...",
    "M........"] },
  { name: "Chữ thập", rows: [
    "___..B___",
    "___..B___",
    "___...___",
    "C.C....C.",
    "..CC..MCM",
    "...C.BBD.",
    "___...___",
    "___...___",
    "___...___"] },
  { name: "Kim cương", rows: [
    "___...___",
    "__.....__",
    "_...B..._",
    "....MC...",
    ".3CB...B.",
    ".C.M.....",
    "_..C..C._",
    "__...C.__",
    "___BC.___"] },
  { name: "Chữ U", rows: [
    ".._____..",
    ".._____C.",
    ".._____..",
    "C._____BC",
    ".._____BC",
    ".._____..",
    "..C..B..M",
    "..CMC....",
    "...3B...."] },
];

const DIRS = [[0,-1],[1,0],[0,1],[-1,0]]; // up,right,down,left

// Balls live in the grid as 'B'. Every ball can be shot once; a shot ball is gone afterwards.
function parseLevel(lv) {
  return { w: lv.rows[0].length, h: lv.rows.length, grid: lv.rows.map(r => r.split('')) };
}
function cloneState(s) { return { w: s.w, h: s.h, grid: s.grid.map(r => r.slice()) }; }
// 'B' = ball on an empty cell, 'm' = ball resting on a slow carpet 'M'
const isBall = ch => ch === 'B' || ch === 'm';
function ballsOf(s) { const b = []; for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) if (isBall(s.grid[y][x])) b.push({ x, y }); return b; }

function isPortal(ch) { return ch === 'A' || ch === 'a' || ch === 'P' || ch === 'p'; }
function findPartner(s, ch, x, y) {
  const t = ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase();
  for (let yy = 0; yy < s.h; yy++) for (let xx = 0; xx < s.w; xx++)
    if (s.grid[yy][xx] === t) return { x: xx, y: yy };
  return null;
}
const isSpring = ch => ch === 'S' || ch === '1' || ch === '2' || ch === '3';
const springPower = ch => ch === 'S' ? 1 : +ch;

// Simulate one shot.
// Speed: a ball starts FAST (3). Each slow carpet 'M' it crosses lowers speed by 1:
//   speed 2 -> stops after at most 3 more cells, speed 1 -> at most 1 more cell, speed 0 -> stops on the carpet.
// The ball BURSTS (splash wets cats in the 3x3 around it) when it hits the board edge, a cat or a rock
// (rock breaks too) -- but only while speed >= 2. A slow ball (speed <= 1) just bumps and rests.
// Spring '1'/'2'/'3' (or 'S'=1): bounces the ball back n cells, no burst.
// Cushion block 'D' (and legacy wall '#') or another ball: the ball stops and rests, no burst.
// If the ball comes to rest it stays on the board and can be shot again.
// events: move{slow} | tp | rock | spring | carpet | bump | splash{cats} | rest
function shoot(s0, ball, dir) {
  const s = cloneState(s0);
  s.grid[ball.y][ball.x] = s.grid[ball.y][ball.x] === 'm' ? 'M' : '.';
  let [dx, dy] = dir, { x, y } = ball, left = Infinity, burst = false, speed = 3;
  const ev = [];
  for (let guard = 0; guard < 300; guard++) {
    if (left <= 0) break;
    const nx = x + dx, ny = y + dy;
    const out = nx < 0 || ny < 0 || nx >= s.w || ny >= s.h || s.grid[ny][nx] === '_'; // '_' = hole / outside a shaped board
    const ch = out ? null : s.grid[ny][nx];
    if (out || ch === 'C' || ch === 'R') {
      if (speed >= 2) {
        if (ch === 'R') { s.grid[ny][nx] = '.'; ev.push({ t: 'rock', x: nx, y: ny }); }
        burst = true;
      } else ev.push({ t: 'bump', x: out ? x + dx : nx, y: out ? y + dy : ny });
      break;
    }
    if (isSpring(ch)) { ev.push({ t: 'spring', x: nx, y: ny }); dx = -dx; dy = -dy; left = springPower(ch); continue; }
    if (isBall(ch) || ch === 'D' || ch === '#') { ev.push({ t: 'bump', x: nx, y: ny }); break; }
    x = nx; y = ny; left--; ev.push({ t: 'move', x, y, speed });
    if (ch === 'M') {
      speed = Math.max(0, speed - 1);
      ev.push({ t: 'carpet', x, y, speed });
      left = Math.min(left, [0, 1, 3, Infinity][speed]);
    }
    if (isPortal(ch)) {
      const p = findPartner(s, ch, x, y);
      if (p) { x = p.x; y = p.y; ev.push({ t: 'tp', x, y, dx, dy }); }
    }
  }
  if (!burst) {
    const here = s.grid[y][x];
    if (isPortal(here)) burst = true; // a ball can't rest on a portal: it pops
    else { s.grid[y][x] = here === 'M' ? 'm' : 'B'; ev.push({ t: 'rest', x, y }); return { state: s, events: ev }; }
  }
  const wet = [];
  for (let oy = -1; oy <= 1; oy++) for (let ox = -1; ox <= 1; ox++) {
    const cx = x + ox, cy = y + oy;
    if (cx < 0 || cy < 0 || cx >= s.w || cy >= s.h) continue;
    if (s.grid[cy][cx] === 'C') { s.grid[cy][cx] = '.'; wet.push({ x: cx, y: cy }); }
  }
  ev.push({ t: 'splash', x, y, cats: wet });
  return { state: s, events: ev };
}

function catsLeft(s) { let n = 0; for (const r of s.grid) for (const c of r) if (c === 'C') n++; return n; }
function key(s) { return s.grid.map(r => r.join('')).join('/'); }

// BFS for minimum shots. Path entries: { x, y, d } (ball position + DIRS index)
function solve(s0, maxDepth = 12) {
  let frontier = [{ s: s0, path: [] }];
  const seen = new Set([key(s0)]);
  for (let depth = 0; depth < maxDepth && frontier.length; depth++) {
    const next = [];
    for (const { s, path } of frontier) for (const b of ballsOf(s)) for (let d = 0; d < DIRS.length; d++) {
      const r = shoot(s, b, DIRS[d]).state, p = path.concat({ x: b.x, y: b.y, d });
      if (catsLeft(r) === 0) return p;
      const k = key(r);
      if (!seen.has(k)) { seen.add(k); next.push({ s: r, path: p }); }
    }
    frontier = next;
  }
  return null;
}

if (typeof module !== 'undefined') module.exports = { LEVELS, DIRS, parseLevel, shoot, catsLeft, solve, ballsOf, isSpring, springPower, isBall };
