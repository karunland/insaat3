/**
 * Galeri lightbox'ı. İşaretleme: src/components/projects/Gallery.astro
 *
 * Yerel <dialog> kullanır: odak tuzağı, Esc ile kapanma ve arka planın
 * etkileşime kapanması tarayıcıdan gelir. Kapanınca odak, açan bağlantıya döner.
 */
const SWIPE_THRESHOLD = 50;

export function initLightbox(): void {
  for (const root of document.querySelectorAll<HTMLElement>('[data-gallery]')) {
    const dialog = root.querySelector<HTMLDialogElement>('[data-lightbox]');
    const image = root.querySelector<HTMLImageElement>('[data-lightbox-image]');
    const caption = root.querySelector<HTMLElement>('[data-lightbox-caption]');
    const counter = root.querySelector<HTMLElement>('[data-lightbox-counter]');
    const links = [...root.querySelectorAll<HTMLAnchorElement>('[data-lightbox-item]')];
    if (!dialog || !image || links.length === 0) continue;

    let index = 0;
    let opener: HTMLElement | null = null;

    function preload(i: number) {
      const link = links[(i + links.length) % links.length];
      const img = new Image();
      img.sizes = '100vw';
      img.srcset = link.dataset.srcset ?? '';
      img.src = link.href;
    }

    function show(i: number) {
      index = (i + links.length) % links.length;
      const link = links[index];
      image!.srcset = link.dataset.srcset ?? '';
      image!.src = link.href;
      image!.alt = link.dataset.alt ?? '';
      if (caption) caption.textContent = link.dataset.alt ?? '';
      if (counter) {
        counter.textContent = (counter.dataset.template ?? '{current} / {total}')
          .replace('{current}', String(index + 1))
          .replace('{total}', String(links.length));
      }
      preload(index + 1);
      preload(index - 1);
    }

    links.forEach((link, i) => {
      link.addEventListener('click', (event) => {
        // Yeni sekmede açma gibi değiştirici tuşlu tıklamalara karışma.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        opener = link;
        show(i);
        dialog.showModal();
        document.documentElement.style.overflow = 'hidden';
      });
    });

    root.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => show(index - 1));
    root.querySelector('[data-lightbox-next]')?.addEventListener('click', () => show(index + 1));
    root.querySelector('[data-lightbox-close]')?.addEventListener('click', () => dialog.close());

    // Sadece tek görsel varsa önceki/sonraki düğmelerine gerek yok.
    if (links.length < 2) {
      root.querySelectorAll<HTMLElement>('[data-lightbox-prev], [data-lightbox-next]').forEach((b) => (b.hidden = true));
    }

    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') show(index - 1);
      else if (event.key === 'ArrowRight') show(index + 1);
    });

    // Görselin dışındaki koyu alana tıklayınca kapat.
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog || (event.target as HTMLElement).tagName === 'FIGURE') dialog.close();
    });

    dialog.addEventListener('close', () => {
      document.documentElement.style.overflow = '';
      image.removeAttribute('srcset');
      image.removeAttribute('src');
      opener?.focus();
    });

    // Dokunmatik kaydırma
    let startX: number | null = null;
    dialog.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'mouse') startX = event.clientX;
    });
    dialog.addEventListener('pointerup', (event) => {
      if (startX === null) return;
      const delta = event.clientX - startX;
      startX = null;
      if (Math.abs(delta) > SWIPE_THRESHOLD) show(delta < 0 ? index + 1 : index - 1);
    });
  }
}
