/**
 * Promote curated assets from `origin/dev-asset` staging folder to `public/`.
 *
 * Usage:
 *   git checkout origin/dev-asset -- assets/
 *   node scripts/promote-assets.mjs [--check] [--go]
 *
 * --check : list what WOULD happen, no writes (default)
 * --go    : copy + optimize with sharp, write to public/
 *
 * Rules (from docs/03-asset-playbook.md §4-5):
 * - Only keepers in KEEPERS are promoted. haha.jpg + 4 huge SVGs are excluded.
 * - Destinations use kebab-case, underscores between tokens, no spaces/@.
 * - JPGs: resize long-edge to 1920 (hero/gallery) or 1200 (cards/posters/speakers),
 *   never upscale, mozjpeg q82, sRGB, progressive. Writes .jpg only (Frame uses <img>).
 * - Logo PNG: copied as-is to public/brand/ (already 2000x2000). SVG trace is WF-A4 follow-up.
 * - Small SVGs: copied as-is (run SVGOMG manually before commit).
 *
 * Excluded on purpose:
 * - retro-style branch (new UI) — never touched by this script.
 * - assets/workflow-assets/general-assets/{1,2,7,8}.svg (20M/4.2M/9.5M/8.8M PDF-exports,
 *   would kill build + Lighthouse. Re-export as JPG/WebP or drop.)
 * - assets/{core-team,event-photos,project-showcase}/haha.jpg (same md5, placeholder).
 */
import { mkdir, copyFile, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const go = process.argv.includes('--go');

// [staging source, public dest, { kind }]
// kind: hero|gallery|poster|speaker|partner|brand|vector
const KEEPERS = [
  // Brand — unblocks press-kit WF-A4. TODO: light/dark SVG variants.
  ['assets/workflow-assets/logo/official-logo.png', 'public/brand/official-logo.png', { kind: 'brand' }],
  // Echelon 2026 pilot — showcase/echelon-philippines-2026.mdx (draft full)
  ['assets/partnership-post/event-partnership/echelonph2026_officialpubmat.jpg', 'public/images/events/2026-02-01_echelon-philippines_poster_01.jpg', { kind: 'poster', w: 1200 }],
  // Remaining event pubmats → archive rows / future full pages. No showcase entry yet.
  ['assets/partnership-post/event-partnership/agorahackathon_officialpubmat.jpg', 'public/images/events/2026_agora-hackathon_poster_01.jpg', { kind: 'poster', w: 1200 }],
  ['assets/partnership-post/event-partnership/awsugenovatorsphonboarding_officialpumat .jpg', 'public/images/events/2026_aws-ug-novators-onboarding_poster_01.jpg', { kind: 'poster', w: 1200 }],
  ['assets/partnership-post/event-partnership/cryptitapalysbuildershowcase@wocee2026_officialpubmat.jpg', 'public/images/events/2026_cryptita-builders-showcase-wocee_poster_01.jpg', { kind: 'poster', w: 1200 }],
  ['assets/partnership-post/event-partnership/frostbytehackathon_officialpubmat.jpg', 'public/images/events/2026_frostbyte-hackathon_poster_01.jpg', { kind: 'poster', w: 1200 }],
  ['assets/partnership-post/event-partnership/philippineblockchainweek_officialpubmat.jpg', 'public/images/events/2026_philippine-blockchain-week_poster_01.jpg', { kind: 'poster', w: 1200 }],
  // Long-term partners — pubmats, NOT vector logos. Use as partner feature images,
  // never trace. Real SVG request still open per playbook §6.
  ['assets/partnership-post/long-term-partners/innobytetechnologysolutions_officialpubmat.jpg', 'public/images/partners/partner_innobyte-technology-solutions_01.jpg', { kind: 'partner', w: 1200 }],
  ['assets/partnership-post/long-term-partners/n8nphug_officialpubmat.jpg', 'public/images/partners/partner_n8n-ph_01.jpg', { kind: 'partner', w: 1200 }],
  ['assets/partnership-post/long-term-partners/whitecloakjiatalentvaultnetwork_officialpubmat.jpg', 'public/images/partners/partner_jia-talent-vault_01.jpg', { kind: 'partner', w: 1200 }],
  // Documentation photos — need consent register row + credit before publish (§7).
  ['assets/documentation-photos/Pijin/stellarphapac_3rd-place.jpg', 'public/images/events/2026_stellar-hackathon_gallery_01.jpg', { kind: 'gallery', w: 1920 }],
  ['assets/documentation-photos/Pijin/stellarphapac_hackathon.jpg', 'public/images/events/2026_stellar-hackathon_gallery_02.jpg', { kind: 'gallery', w: 1920 }],
  ['assets/documentation-photos/Pijin/stellarphapac_presentation-hackathon.jpg', 'public/images/events/2026_stellar-hackathon_gallery_03.jpg', { kind: 'gallery', w: 1920 }],
  ['assets/documentation-photos/Pijin/stellarphapac_top-10-finalist.jpg', 'public/images/events/2026_stellar-hackathon_gallery_04.jpg', { kind: 'gallery', w: 1920 }],
  ['assets/documentation-photos/Pijin/stellarphapac_top-10-finalist-1.jpg', 'public/images/events/2026_stellar-hackathon_gallery_05.jpg', { kind: 'gallery', w: 1920 }],
  ['assets/documentation-photos/eGovibes/eGov_TeamPic1.jpg', 'public/images/events/2026_egovibes_gallery_01.jpg', { kind: 'gallery', w: 1920 }],
  ['assets/documentation-photos/eGovibes/eGov_TeamPic2.jpg', 'public/images/events/2026_egovibes_gallery_02.jpg', { kind: 'gallery', w: 1920 }],
  ['assets/documentation-photos/eGovibes/eGov_TeamPic3.jpg', 'public/images/events/2026_egovibes_gallery_03.jpg', { kind: 'gallery', w: 1920 }],
  ['assets/documentation-photos/eGovibes/eGov_TeamPic4.jpg', 'public/images/events/2026_egovibes_gallery_04.jpg', { kind: 'gallery', w: 1920 }],
  ['assets/documentation-photos/eGovibes/eGov_Top10TeamPic.jpg', 'public/images/events/2026_egovibes_gallery_05.jpg', { kind: 'gallery', w: 1920 }],
  // Speakers — 590x332 source, too small for hero. Gallery/thumb only until full-res arrives.
  ['assets/event-speaker/eventspeaker/agoraxworkflow-hackathon/agoraxworkfow_speaker1.jpg', 'public/images/events/2026_agora-hackathon_speaker_01.jpg', { kind: 'speaker', w: 1200 }],
  ['assets/event-speaker/eventspeaker/agoraxworkflow-hackathon/agoraxworkfow_speaker2.jpg', 'public/images/events/2026_agora-hackathon_speaker_02.jpg', { kind: 'speaker', w: 1200 }],
  ['assets/event-speaker/eventspeaker/agoraxworkflow-hackathon/agoraxworkfow_speaker3.jpg', 'public/images/events/2026_agora-hackathon_speaker_03.jpg', { kind: 'speaker', w: 1200 }],
  // Small vectors only. Verify visually + SVGOMG before commit.
  ['assets/workflow-assets/general-assets/3.svg', 'public/brand/general-03.svg', { kind: 'vector' }],
  ['assets/workflow-assets/general-assets/5.1.svg', 'public/brand/general-05.svg', { kind: 'vector' }],
  ['assets/workflow-assets/general-assets/6.1.svg', 'public/brand/general-06.svg', { kind: 'vector' }],
];

const EXCLUDED = [
  'assets/workflow-assets/general-assets/1.svg (20M PDF-export, reject)',
  'assets/workflow-assets/general-assets/2.svg (4.2M PDF-export, reject)',
  'assets/workflow-assets/general-assets/7.svg (9.5M PDF-export, reject)',
  'assets/workflow-assets/general-assets/8.svg (8.8M PDF-export, reject)',
  'assets/workflow-assets/general-assets/4.svg (985K, review manually — likely same export issue)',
  'assets/core-team/haha.jpg + assets/event-photos/haha.jpg + assets/project-showcase/haha.jpg (same md5, placeholder)',
];

let ok = 0, missing = 0;
for (const [src, dest, opts] of KEEPERS) {
  const absSrc = path.join(ROOT, src);
  const absDest = path.join(ROOT, dest);
  let exists = true;
  try { await stat(absSrc); } catch { exists = false; }
  if (!exists) {
    console.log(`MISSING  ${src}`);
    missing++;
    continue;
  }
  console.log(`${go ? 'WRITE' : 'PLAN'}  ${src}  ->  ${dest}`);
  if (!go) { ok++; continue; }
  await mkdir(path.dirname(absDest), { recursive: true });
  if (opts.kind === 'brand' || opts.kind === 'vector') {
    await copyFile(absSrc, absDest);
  } else {
    await sharp(absSrc, { failOnError: false })
      .rotate()
      .resize({ width: opts.w ?? 1920, withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(absDest);
  }
  ok++;
}

console.log(`\n${ok} keepers ${go ? 'written' : 'planned'}, ${missing} missing (run: git checkout origin/dev-asset -- assets/)`);
console.log('Excluded (do NOT promote):');
for (const e of EXCLUDED) console.log(`  - ${e}`);
console.log(go ? '' : '\nRe-run with --go to write.');
