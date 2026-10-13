import '../style.css'
import { gallery } from '../data/gallery'
import { photos, pick } from '../data/photos'
import { setMain } from '../core/dom'
import { scene, tessBand } from '../core/art'
import { boot } from '../core/shell'
import { pageHero, reserveBand, mountLightbox, photoFigure, photoImg } from '../core/ui'

// The six former « Emplacement photo » tiles now carry an illustrative photo (until real photos arrive).
const slotPhotos = pick('salle-soir', 'tablee', 'planche', 'vitrine-nuit', 'micro-scene', 'lampes-comptoir')
let k = 0
const items = gallery.map((g) => (g.photoSlot ? { ...g, img: slotPhotos[k++ % slotPhotos.length] } : g))

setMain(`
${pageHero({ label: 'Galerie', title: 'Velours, cannage et lumière basse.', lead: 'Des photos d\'ambiance et vingt scènes illustrées. Les vraies photos de la salle et des assiettes viendront avec l\'accord de la maison.', art: scene('mosaic', 300, '') })}
${tessBand(60, 2)}
<section class="section" aria-labelledby="ph-title">
  <div class="wrap">
    <h2 id="ph-title" data-reveal style="font-size:clamp(1.8rem,4vw,2.8rem)">L'ambiance, en photos.</h2>
    <p class="muted" data-reveal>${photos.length} photos d'illustration (Unsplash) pour donner le ton : lumière basse, comptoir, cave, assiettes de saison. Ce ne sont pas des photos de la maison.</p>
    <div class="masonry ph-masonry" style="margin-top:22px">${photos.map(photoFigure).join('')}</div>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="masonry">${items.map((g, i) => {
      const h = Math.round(400 / g.ratio)
      return 'img' in g && g.img
        ? `<figure class="tile tile--photo" data-reveal><button type="button" data-lb="${i}" style="display:block;width:100%;border:0;padding:0;background:none;position:relative" aria-label="Agrandir : ${g.title}">${photoImg(g.img)}<span class="ph__tag ph__tag--over">Photo d'illustration</span></button><figcaption>${g.title}</figcaption></figure>`
        : `<figure class="tile" data-reveal><button type="button" data-lb="${i}" style="display:block;width:100%;border:0;padding:0;background:none" aria-label="Agrandir : ${g.title}">${scene(g.kind, h, g.alt)}</button><figcaption>${g.title}</figcaption></figure>`
    }).join('')}</div>
    <p class="note" style="margin-top:24px">Illustrations originales créées pour ce site de démonstration. Les photos ci-dessus sont des photos d'illustration Unsplash : aucune photo de la maison n'est utilisée.</p>
  </div>
</section>
${reserveBand()}`)
boot()
mountLightbox(items)
