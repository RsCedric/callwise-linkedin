# Brand-Bausteine für LinkedIn-Bilder

- `logo.svg`: offizielles Callwise-Logo, unverändert verwenden.
- `bg.js`: einheitlicher three.js-Hintergrund (Partikelwelle in Pink-Violett) für ALLE Posts.
  Einbinden per importmap `{"imports":{"three":"./node_modules/three/build/three.module.js"}}`,
  dann `import {renderBg} from './bg.js'; renderBg(canvas, {seed: 0});`
  Canvas 1080x1350 hinter dem Inhalt (z-index 0), Inhalt darüber. `seed` (0, 1, 2 ...) variiert die Welle leicht pro Post.
  Rendern in Chromium mit `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader`.
- Layout-Regel: Die Welle muss sichtbar bleiben (Bereich zwischen Headline und Inhalt frei lassen), Inhalt nicht vollflächig darüberlegen. Fusszeile mit ruhigem Off-White-Verlauf, damit Text lesbar bleibt.
