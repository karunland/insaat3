/**
 * Proje listesi filtreleri. İşaretleme: src/components/projects/ProjectList.astro
 *
 * Her filtre grubu bir radyo grubudur; `name` değeri hem kartlardaki
 * `data-<name>` özniteliğini hem de URL parametresini belirtir.
 * Boş değer ("") = Tümü.
 */
export function initProjectFilters(): void {
  for (const root of document.querySelectorAll<HTMLElement>('[data-project-filter]')) {
    const controls = root.querySelector<HTMLElement>('[data-filter-controls]');
    if (!controls) continue;

    const items = [...root.querySelectorAll<HTMLElement>('[data-project]')];
    const radios = [...controls.querySelectorAll<HTMLInputElement>('input[type="radio"]')];
    const groupNames = [...new Set(radios.map((r) => r.name))];
    const count = root.querySelector<HTMLElement>('[data-filter-count]');
    const empty = root.querySelector<HTMLElement>('[data-filter-empty]');
    const reset = root.querySelector<HTMLButtonElement>('[data-filter-reset]');

    const selected = (name: string) => radios.find((r) => r.name === name && r.checked)?.value ?? '';

    function apply(updateUrl: boolean) {
      let visible = 0;
      for (const item of items) {
        const match = groupNames.every((name) => {
          const value = selected(name);
          return value === '' || item.dataset[name] === value;
        });
        item.hidden = !match;
        if (match) visible++;
      }

      if (count) count.textContent = (count.dataset.template ?? '{count}').replace('{count}', String(visible));
      if (empty) empty.hidden = visible > 0;

      if (updateUrl) {
        const url = new URL(location.href);
        for (const name of groupNames) {
          const value = selected(name);
          if (value) url.searchParams.set(name, value);
          else url.searchParams.delete(name);
        }
        history.replaceState(history.state, '', url);
      }
    }

    // URL'deki filtreleri uygula (?category=kentsel-donusum gibi).
    const params = new URLSearchParams(location.search);
    for (const name of groupNames) {
      const value = params.get(name);
      const radio = radios.find((r) => r.name === name && r.value === value);
      if (radio) radio.checked = true;
    }

    controls.addEventListener('change', () => apply(true));
    reset?.addEventListener('click', () => {
      for (const radio of radios) radio.checked = radio.value === '';
      apply(true);
      controls.querySelector<HTMLInputElement>('input:checked')?.focus();
    });

    apply(false);
  }
}
