# Mèo té nước - Lagoon & honey

## Direction and research

A calm lagoon garden, navy puzzle tray, light cream cells and amber controls. Pink stays in the existing cat and cushion sprites. The board and pieces are the visual focus.

Our interpretation of the published [Royal Match](https://www.dreamgames.com/games) and [Toon Blast](https://www.peak.com/games) artwork: use chunky bevels, confident outlines and clear piece/background separation. These are visual references; no game artwork was copied.

Choose a **blue/teal-orange complementary axis**, with analogous aqua surroundings and neutral cream surfaces. [Adobe Color](https://color.adobe.com/create/color-wheel) and [Sherwin-Williams](https://industrial.sherwin-williams.com/na/us/en/coil-extrusion/media-center/articles/color-harmony.html) explain complementary, split-complementary and triadic harmonies. A full triad or split complement would add competing UI accents here.

Apply [60-30-10](https://www.isbe.net/CTEDocuments/BMCE-780008.pdf) as a hierarchy: 60% quiet surroundings, 30% board/surfaces, 10% warm actions/highlights. This is approximate; the playable board takes more space on phones.

## Final palette

| Role | Hex |
| --- | --- |
| Pale sky / fallback gradient top | `#C9E8DD` |
| Quiet aqua / page fallback | `#8EC9C2` |
| Distant lagoon / gradient bottom | `#4F969C` |
| Navy tray and header | `#245361` |
| Deep edge, text and tray shadow | `#183E4B` |
| Gold board rim | `#E8BD69` |
| Rim highlight | `#FFE6A6` |
| Cream surface base | `#FFF3D5` |
| Alternating cell gradients | `#FFFAE9` → `#FAECCB`, `#FFF5DC` → `#F5E5C1` |
| Tile grout | `#CBB380` |
| Amber button face | `#F7AD37` |
| Orange button base | `#EC8A26` |
| Button edge / text outline | `#875020` |
| Button highlight | `#FFF0B7` |
| Button/icon text | `#FFFDF4` |
| Secondary text | `#31555C` |
| Lagoon border / supporting UI | `#709B93` |

Value hierarchy: the navy tray is darker than both the scene and cells. Gold edges trace irregular boards and holes. Cream cell bevels stay subtle. Action text/icons use white with dark edging; body text is dark on cream.

## Cats and assets

All eight saturated cat colours and all 16 transparent PNG roles/filenames remain. The fallback outline contrast against the darkest cell is red 6.92:1, yellow 3.91:1, orange 5.22:1, pink 6.03:1, blue 9.20:1, purple 9.30:1, white 3.45:1, black 14.35:1. White/yellow fur depends on its dark silhouette. These are sRGB fallback-palette calculations, not per-pixel bitmap or colour-blindness guarantees.

Built-in Image Generation created assets/lagoon-garden.jpg (941 x 1672, about 73 KB). The exact direction/prompt is recorded in [ART.md](ART.md). Vietnamese title text and SVG icons use code. CSS gradients and original canvas painters remain as fallbacks. Total assets: about 1.48 MB.

## Verification

Run node verify-art.cjs: inline script extracted outside the project and checked with node --check; all 50 levels drawn at 280/368/520 px with loaded/failed sprites; canvas stack and eight outline contrasts checked. A virtual clock exercises pointer aim, animation, splash, win/lose, restart, mute and all 50 level buttons. Static HTTP returned 200 for every runtime resource.

logic.js/level data retain their original SHA-256; UNLOCK_ALL remains true. Mechanics, input and animation timings are preserved.

Browser visual QA is unverified: automatic approval review rejected live Chrome access; isolated Chrome/Edge could not render in this environment. Responsive CSS covers phone, desktop and short landscape; VM checks validate canvas geometry, not browser layout.
