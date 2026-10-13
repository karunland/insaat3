import { getCollection, type CollectionEntry } from 'astro:content';
import { isLang, langs, type Lang } from '@/i18n/config';
import { projectPath, routes, type Alternates } from '@/i18n/routes';

type Entry = CollectionEntry<'projects'>;

export type Project = Entry & {
  /** URL'deki kısa ad; klasör adıyla aynı. */
  slug: string;
  lang: Lang;
};

/** Diller arasında aynı olması gereken alanlar. */
const SHARED_FIELDS = ['category', 'status', 'year', 'isExample'] as const;

function parseId(entry: Entry): Project {
  const [slug, lang] = entry.id.split('/');
  if (!slug || !isLang(lang)) {
    throw new Error(
      `Proje dosyası beklenen yapıda değil: "${entry.id}". Beklenen: src/content/projects/<slug>/<tr|en>.md`,
    );
  }
  return { ...entry, slug, lang };
}

/**
 * TR ve EN dosyalarındaki ortak alanlar (kategori, durum, yıl…) farklıysa
 * build'i durdurur. Böylece bir dilde güncellenip diğerinde unutulan alanlar yakalanır.
 */
function assertTranslationsInSync(all: Project[]): void {
  const bySlug = new Map<string, Project[]>();
  for (const project of all) {
    bySlug.set(project.slug, [...(bySlug.get(project.slug) ?? []), project]);
  }
  const problems: string[] = [];

  for (const [slug, versions] of bySlug) {
    const [first, ...rest] = versions;
    for (const other of rest) {
      for (const field of SHARED_FIELDS) {
        if (first.data[field] !== other.data[field]) {
          problems.push(
            `  ${slug}: "${field}" ${first.lang}=${String(first.data[field])}, ${other.lang}=${String(other.data[field])}`,
          );
        }
      }
    }
  }

  if (problems.length > 0) {
    throw new Error(`Proje çevirileri arasında tutarsızlık var:\n${problems.join('\n')}`);
  }
}

function byNewest(a: Project, b: Project): number {
  // Örnek içerik her zaman sonda.
  if (a.data.isExample !== b.data.isExample) return a.data.isExample ? 1 : -1;
  if (a.data.year !== b.data.year) return b.data.year - a.data.year;
  // Aynı yıl içinde devam edenler önce.
  if (a.data.status !== b.data.status) return a.data.status === 'ongoing' ? -1 : 1;
  return a.data.title.localeCompare(b.data.title, a.lang);
}

let cache: Promise<Project[]> | undefined;

async function getAllProjects(): Promise<Project[]> {
  cache ??= getCollection('projects').then((entries) => {
    const all = entries.map(parseId);
    assertTranslationsInSync(all);
    return all;
  });
  return cache;
}

export async function getProjects(
  lang: Lang,
  filter: (project: Project) => boolean = () => true,
): Promise<Project[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.lang === lang && filter(p)).sort(byNewest);
}

/**
 * Bir projenin diğer dillerdeki adresleri. Çevirisi olmayan dil için
 * o dilin proje listesine düşer.
 */
export async function getProjectAlternates(slug: string): Promise<Alternates> {
  const all = await getAllProjects();
  const available = new Set(all.filter((p) => p.slug === slug).map((p) => p.lang));
  return Object.fromEntries(
    langs.map((lang) => [lang, available.has(lang) ? projectPath(slug, lang) : routes.projects[lang]]),
  ) as Alternates;
}

/** Projelerde geçen benzersiz işveren adları (Hakkımızda > Referanslar). */
export function uniqueClients(projects: Project[]): string[] {
  const names = projects
    .filter((p) => !p.data.isExample)
    .map((p) => p.data.client?.trim())
    .filter((name): name is string => Boolean(name));
  return [...new Set(names)];
}

const RELATED_COUNT = 3;

/** Proje detay route'ları için ortak getStaticPaths gövdesi. */
export async function getProjectStaticPaths(lang: Lang) {
  const projects = await getProjects(lang);
  return Promise.all(
    projects.map(async (project) => {
      // Önce aynı faaliyet alanından, yetmezse diğerlerinden tamamla.
      const others = projects.filter((p) => p.slug !== project.slug);
      const related = [
        ...others.filter((p) => p.data.category === project.data.category),
        ...others.filter((p) => p.data.category !== project.data.category),
      ].slice(0, RELATED_COUNT);

      return {
        params: { slug: project.slug },
        props: { project, related, alternates: await getProjectAlternates(project.slug) },
      };
    }),
  );
}
