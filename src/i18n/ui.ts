/**
 * Arayüz ve sayfa metinleri — tek çeviri dosyası.
 *
 * Türkçe sözlük kaynak kabul edilir; İngilizce sözlük `Dictionary` tipine
 * uymak zorundadır. Yani TR'ye eklenen bir anahtar EN'de yoksa `astro check`
 * hata verir.
 *
 * Proje içerikleri burada DEĞİL, src/content/projects/<slug>/{tr,en}.md
 * dosyalarındadır.
 *
 * `{count}` gibi yer tutucular `format()` ile doldurulur.
 */
import type { Lang } from './config';

const tr = {
  meta: {
    siteName: 'MAKSEF',
    defaultTitle: 'MAKSEF — Yapım, Büyük Onarım ve Kentsel Dönüşüm',
    defaultDescription:
      "MAKSEF, İstanbul'da kamu ve özel sektöre yapım, büyük onarım ve bakım-onarım işleri ile kentsel dönüşüm projeleri yürüten bir inşaat firmasıdır.",
  },

  a11y: {
    skipToContent: 'İçeriğe geç',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    mainNav: 'Ana menü',
    footerNav: 'Alt menü',
    langSwitch: 'Dil seçimi',
    breadcrumb: 'Sayfa konumu',
    homeLink: 'MAKSEF ana sayfa',
    opensInNewTab: '(yeni sekmede açılır)',
  },

  nav: {
    home: 'Ana Sayfa',
    about: 'Hakkımızda',
    contracting: 'Taahhüt',
    urbanRenewal: 'Kentsel Dönüşüm',
    projects: 'Projeler',
    contact: 'İletişim',
    cta: 'İletişime Geçin',
  },

  categories: {
    taahhut: 'Taahhüt',
    'kentsel-donusum': 'Kentsel Dönüşüm',
  },

  statuses: {
    completed: 'Tamamlanan',
    ongoing: 'Devam Eden',
  },

  /** Tekil proje için durum etiketi (kartlar ve detay sayfası). */
  statusLabel: {
    completed: 'Tamamlandı',
    ongoing: 'Devam ediyor',
  },

  common: {
    viewProject: 'Projeyi incele',
    allProjects: 'Tüm projeler',
    learnMore: 'Ayrıntılı bilgi',
    exampleBadge: 'Örnek',
    exampleNotice:
      'Bu sayfa örnek içeriktir ve gerçek bir projeyi temsil etmez. Kentsel dönüşüm projeleri eklendikçe güncellenecektir.',
    projectCount: '{count} proje',
  },

  filters: {
    legend: 'Projeleri filtrele',
    category: 'Faaliyet alanı',
    status: 'Durum',
    all: 'Tümü',
    showing: '{count} proje gösteriliyor',
    empty: 'Bu ölçütlere uyan proje bulunamadı.',
    reset: 'Filtreleri temizle',
  },

  project: {
    specTitle: 'Proje künyesi',
    client: 'İdare / İşveren',
    year: 'Yıl',
    location: 'Konum',
    category: 'Faaliyet alanı',
    status: 'Durum',
    overview: 'Proje hakkında',
    scope: 'İş kapsamı',
    gallery: 'Fotoğraf galerisi',
    photoCount: '{count} fotoğraf',
    galleryHint: 'Büyük görmek için bir fotoğrafa dokunun.',
    photoAlt: '{title} — fotoğraf {index}',
    beforeAfter: 'Önce / Sonra',
    beforeAfterHint: 'Karşılaştırmak için çizgiyi sürükleyin veya ok tuşlarını kullanın.',
    before: 'Önce',
    after: 'Sonra',
    sliderLabel: 'Önce ve sonra görsellerini karşılaştır',
    relatedTitle: 'Diğer projeler',
    back: 'Tüm projelere dön',
    ctaContractingTitle: 'Benzer bir iş için görüşelim',
    ctaContractingText:
      'Yapım, büyük onarım veya bakım-onarım işinizle ilgili teknik ekibimizle iletişime geçin.',
    ctaRenewalTitle: 'Binanız için dönüşüm sürecini başlatın',
    ctaRenewalText:
      'Bina veya arsa sahibiyseniz kısa başvuru formunu doldurun; ön değerlendirme için size dönelim.',
    ctaRenewalButton: 'Başvuru formuna git',
  },

  lightbox: {
    label: 'Fotoğraf görüntüleyici',
    close: 'Kapat',
    prev: 'Önceki fotoğraf',
    next: 'Sonraki fotoğraf',
    counter: '{current} / {total}',
  },

  home: {
    heroEyebrow: 'İnşaat · Taahhüt · Kentsel Dönüşüm — İstanbul',
    heroTitle: 'Kamuya ve kente kalıcı yapılar.',
    heroLead:
      "MAKSEF, İstanbul'da kamu ve özel sektöre yapım, büyük onarım ve bakım-onarım işleri yürütür; bina ve arsa sahipleriyle kentsel dönüşüm projeleri geliştirir.",
    heroPrimary: 'Projelerimizi inceleyin',
    heroSecondary: 'Kentsel dönüşüm başvurusu',
    heroImageCaption: 'Son proje',

    areasEyebrow: 'Faaliyet alanları',
    areasTitle: 'İki ayrı uzmanlık, tek bir mühendislik disiplini',
    contractingTitle: 'Taahhüt İşleri',
    contractingText:
      'Kamu ihaleleriyle üstlenilen yapım, büyük onarım ve bakım-onarım işleri. Okul spor salonlarından üniversite yerleşkelerine, idarelerin teknik şartnamelerine uygun uygulama.',
    contractingLink: 'Taahhüt projeleri',
    renewalTitle: 'Kentsel Dönüşüm',
    renewalText:
      'Riskli yapıların güvenli, modern konutlara dönüşümü. Bina ve arsa sahipleriyle ilk görüşmeden anahtar teslimine kadar şeffaf bir süreç.',
    renewalLink: 'Kentsel dönüşüm',

    sheetEyebrow: 'Teknik föy',
    sheetTitle: 'Rakamlarla',
    statCompleted: 'Tamamlanan proje',
    statOngoing: 'Devam eden proje',
    statYears: 'Yıl aralığı',

    featuredEyebrow: 'Seçili işler',
    featuredTitle: 'Son projeler',

    processEyebrow: 'Kentsel dönüşüm',
    processTitle: 'Binanızın dönüşümü adım adım',
    processLead:
      'Bina veya arsa sahibi olarak ilk adımı atmanız yeterli. Süreci baştan sona planlıyor, her aşamada sizi bilgilendiriyoruz.',
  },

  cta: {
    eyebrow: 'İletişim',
    title: 'Projeniz için bir görüşme planlayalım.',
    text: 'Kamu ihalesi, büyük onarım veya kentsel dönüşüm — ihtiyacınızı anlatın, teknik ekibimiz size dönsün.',
    primary: 'İletişim formu',
    secondary: 'Kentsel dönüşüm başvurusu',
    callUs: 'Bizi arayın',
    writeUs: 'E-posta gönderin',
  },

  about: {
    title: 'Hakkımızda',
    description:
      "MAKSEF; İstanbul'da kamu ve özel sektöre yapım, büyük onarım, bakım-onarım ve kentsel dönüşüm işleri yürüten bir inşaat firmasıdır.",
    eyebrow: 'Firma',
    lead: "MAKSEF, İstanbul'da kamu kurumları ve özel sektör için yapım, büyük onarım ve bakım-onarım işleri üstlenen bir inşaat ve taahhüt firmasıdır.",
    // TODO: Kuruluş yılı, ekip ve firma geçmişi gibi gerçek bilgilerle genişlet.
    body: [
      'Kamu ihaleleriyle üstlendiğimiz işlerde idarelerin teknik şartnamelerine, iş programına ve kalite beklentilerine uygun uygulama yapıyoruz. Okul spor salonlarından üniversite yerleşkelerine, altyapı idarelerinin hizmet binalarından kent mobilyalarına kadar farklı ölçekte işler yürütüyoruz.',
      'Kentsel dönüşüm tarafında ise bina ve arsa sahipleriyle doğrudan çalışıyoruz. Riskli yapıların yerine güvenli ve çağdaş yapılar inşa ederken maliklerle açık ve izlenebilir bir süreç yürütmeyi önceliğimiz sayıyoruz.',
    ],
    servicesEyebrow: 'Hizmetler',
    servicesTitle: 'Neler yapıyoruz',
    services: [
      {
        title: 'Yapım işleri',
        text: 'Kamu ve özel sektör için yeni bina ve tesis inşaatı; prefabrik ek binalardan eğitim yapılarına.',
      },
      {
        title: 'Büyük onarım',
        text: 'Mevcut yapıların taşıyıcı olmayan bölümleri, cephe, çatı, tesisat ve iç mekânlarının kapsamlı yenilenmesi.',
      },
      {
        title: 'Bakım-onarım',
        text: 'Okul spor salonları ve belediye mülkleri gibi yapı stoklarında yıllık bakım ve onarım programları.',
      },
      {
        title: 'Kentsel dönüşüm',
        text: 'Bina ve arsa sahipleriyle riskli yapıların yeniden inşası; planlamadan teslime kadar.',
      },
    ],
    principlesEyebrow: 'Çalışma ilkeleri',
    principlesTitle: 'Nasıl çalışıyoruz',
    principles: [
      {
        title: 'Şartnameye sadakat',
        text: 'Teknik şartname, proje ve iş programı işin referansıdır; sahadaki her karar buna göre alınır.',
      },
      {
        title: 'Şeffaf raporlama',
        text: 'İşveren ve maliklerle düzenli ilerleme bilgisi paylaşır, sürpriz yerine öngörü sunarız.',
      },
      {
        title: 'Sahada güvenlik',
        text: 'İş sağlığı ve güvenliği, iş programının ayrılmaz bir parçasıdır.',
      },
    ],
    clientsEyebrow: 'Referanslar',
    clientsTitle: 'Birlikte çalıştığımız idareler',
    clientsNote: 'Projelerimizde işveren olarak yer alan kurumlardan bazıları.',
  },

  contracting: {
    title: 'Taahhüt Projeleri',
    description:
      'MAKSEF taahhüt işleri: kamu ihaleleriyle üstlenilen yapım, büyük onarım ve bakım-onarım projeleri.',
    eyebrow: 'Faaliyet alanı 01',
    lead: 'Kamu kurumlarının açtığı ihalelerle üstlendiğimiz yapım, büyük onarım ve bakım-onarım işleri. Her projede idarenin şartnamesine, iş programına ve kabul süreçlerine uygun çalışıyoruz.',
    scopeTitle: 'Üstlendiğimiz iş türleri',
    scope: [
      'Yeni bina ve tesis yapım işleri',
      'Kamu binalarında büyük onarım',
      'Yıllık bakım-onarım programları',
      'Spor salonu ve eğitim yapıları',
      'Prefabrik ve ek bina uygulamaları',
      'Açık alan yapıları ve kent donatıları',
    ],
    listTitle: 'Taahhüt projeleri',
  },

  urbanRenewal: {
    title: 'Kentsel Dönüşüm',
    description:
      'Bina ve arsa sahipleri için MAKSEF kentsel dönüşüm süreci ve başvuru formu.',
    eyebrow: 'Faaliyet alanı 02',
    lead: 'Riskli yapınızı güvenli ve çağdaş bir yapıya dönüştürmek için bina ve arsa sahipleriyle doğrudan çalışıyoruz. İlk görüşmeden anahtar teslimine kadar her adım planlı ve şeffaf.',
    applyButton: 'Ön başvuru yapın',
    processTitle: 'Süreç nasıl işler?',
    // TODO: Süreç adımlarını firmanın gerçek iş akışına göre gözden geçir.
    process: [
      {
        title: 'Ön başvuru',
        text: 'Formu doldurun; binanızın konumu, yaşı ve bağımsız bölüm sayısı gibi temel bilgileri alalım.',
      },
      {
        title: 'Yerinde inceleme',
        text: 'Mülkü yerinde inceler, imar durumunu ve olası proje senaryolarını değerlendiririz.',
      },
      {
        title: 'Riskli yapı tespiti',
        text: 'Tespit henüz yapılmadıysa, lisanslı kuruluşlarla yürütülecek süreç hakkında yol gösteririz.',
      },
      {
        title: 'Malik görüşmeleri ve sözleşme',
        text: 'Maliklerle bilgilendirme toplantıları yapar, teklifimizi açık ve karşılaştırılabilir biçimde sunarız.',
      },
      {
        title: 'Proje ve ruhsat',
        text: 'Mimari, statik ve tesisat projeleri hazırlanır; yapı ruhsatı alınır.',
      },
      {
        title: 'Yapım ve teslim',
        text: 'Yıkım, yapım ve iskân süreçleri tamamlanır; daireler maliklerine teslim edilir.',
      },
    ],
    projectsTitle: 'Kentsel dönüşüm projeleri',
    faqTitle: 'Sık sorulan sorular',
    // TODO: Yanıtları firmanın uygulamasına göre doğrula.
    faq: [
      {
        q: 'Başvuru için hangi bilgiler gerekli?',
        a: 'İlk aşamada mülkün ilçesi ve adresi, yaklaşık yapım yılı, kat ve bağımsız bölüm sayısı yeterlidir. Tapu (ada/parsel) bilgisi ve varsa riskli yapı raporu değerlendirmeyi hızlandırır.',
      },
      {
        q: 'Binamın riskli olup olmadığını bilmiyorum. Yine de başvurabilir miyim?',
        a: 'Evet. Ön değerlendirme sırasında riskli yapı tespiti sürecinin nasıl işlediğini anlatır, gerekli adımlarda yol gösteririz.',
      },
      {
        q: 'Başvuruyu tüm maliklerin birlikte yapması mı gerekiyor?',
        a: 'Hayır. Bir malik, arsa sahibi veya bina yöneticisi ilk başvuruyu yapabilir. Sonraki aşamada tüm maliklerin katılacağı bir bilgilendirme görüşmesi planlanır.',
      },
    ],
    formEyebrow: 'Başvuru',
    formTitle: 'Bina / arsa sahibi ön başvuru formu',
    formLead:
      'Üç kısa adımda bilgilerinizi iletin. Başvurunuz bağlayıcı değildir; ön değerlendirme için sizinle iletişime geçeriz.',
  },

  projects: {
    title: 'Projeler',
    description:
      'MAKSEF taahhüt ve kentsel dönüşüm projeleri: tamamlanan ve devam eden işler.',
    eyebrow: 'Proje arşivi',
    lead: 'Taahhüt ve kentsel dönüşüm alanlarındaki tamamlanan ve devam eden işlerimiz. Faaliyet alanı ve duruma göre filtreleyebilirsiniz.',
  },

  contact: {
    title: 'İletişim',
    description: 'MAKSEF ile iletişime geçin: teklif, iş birliği ve kentsel dönüşüm başvuruları.',
    eyebrow: 'İletişim',
    lead: 'Projeniz, ihale işleriniz veya kentsel dönüşüm hakkında bize yazın. Mesajınızı ilgili ekibe iletip en kısa sürede dönüş yapıyoruz.',
    detailsTitle: 'İletişim bilgileri',
    phone: 'Telefon',
    email: 'E-posta',
    address: 'Adres',
    map: 'Haritada görüntüle',
    formTitle: 'Mesaj gönderin',
    renewalBoxTitle: 'Bina veya arsa sahibi misiniz?',
    renewalBoxText: 'Kentsel dönüşüm için hazırladığımız adım adım başvuru formunu kullanın.',
  },

  forms: {
    required: 'zorunlu',
    optional: 'isteğe bağlı',
    select: 'Seçiniz',
    send: 'Gönder',
    sending: 'Gönderiliyor…',
    next: 'İleri',
    back: 'Geri',
    stepOf: 'Adım {current} / {total}',
    success: 'Teşekkürler, mesajınız bize ulaştı. En kısa sürede size dönüş yapacağız.',
    error: 'Mesaj gönderilemedi. Lütfen tekrar deneyin veya bizi telefonla arayın.',
    notConfigured: 'Form henüz yapılandırılmadı. Lütfen bizi telefon veya e-posta ile arayın.',
    consent: 'Kişisel verilerimin, talebime yanıt verilmesi amacıyla işlenmesine onay veriyorum.',
    // Genel iletişim formu
    name: 'Ad soyad',
    company: 'Kurum / firma',
    email: 'E-posta',
    phone: 'Telefon',
    topic: 'Konu',
    topics: {
      contracting: 'Taahhüt / ihale işleri',
      renewal: 'Kentsel dönüşüm',
      partnership: 'İş birliği / tedarik',
      other: 'Diğer',
    },
    message: 'Mesajınız',
    // Kentsel dönüşüm başvuru formu
    renewal: {
      step1: 'Mülk',
      step2: 'Yapı',
      step3: 'İletişim',
      role: 'Başvuru sahibi olarak',
      roles: {
        owner: 'Kat maliki',
        landowner: 'Arsa sahibi',
        manager: 'Bina yöneticisi',
        other: 'Diğer',
      },
      propertyType: 'Mülk türü',
      propertyTypes: {
        building: 'Mevcut bina',
        land: 'Boş arsa',
      },
      district: 'İlçe',
      outsideIstanbul: 'İstanbul dışı',
      address: 'Mahalle / adres',
      parcel: 'Ada / parsel',
      parcelHint: 'Tapuda yazar; bilmiyorsanız boş bırakın.',
      buildingAge: 'Yapım yılı (yaklaşık)',
      ages: {
        before1980: '1980 öncesi',
        '1980-1999': '1980–1999',
        '2000-2009': '2000–2009',
        after2010: '2010 ve sonrası',
        unknown: 'Bilmiyorum',
      },
      floors: 'Kat sayısı',
      units: 'Bağımsız bölüm sayısı',
      unitsHint: 'Daire ve dükkânların toplamı.',
      riskReport: 'Riskli yapı raporu',
      riskReports: {
        yes: 'Var',
        inProgress: 'Süreçte',
        no: 'Yok',
        unknown: 'Bilmiyorum',
      },
      consensus: 'Maliklerin dönüşüme bakışı',
      consensusOptions: {
        all: 'Tümü istekli',
        majority: 'Çoğunluk istekli',
        notDiscussed: 'Henüz konuşulmadı',
      },
      preferredContact: 'Size nasıl ulaşalım?',
      contactOptions: {
        phone: 'Telefon',
        email: 'E-posta',
      },
      note: 'Eklemek istedikleriniz',
    },
  },

  thankYou: {
    title: 'Teşekkürler',
    description: 'Mesajınız alındı.',
    text: 'Mesajınız bize ulaştı. Talebinizi inceleyip en kısa sürede size dönüş yapacağız.',
    back: 'Ana sayfaya dön',
  },

  footer: {
    tagline: "İstanbul'da yapım, büyük onarım, bakım-onarım ve kentsel dönüşüm.",
    sheet: 'Pafta',
    scale: 'Ölçek',
    date: 'Tarih',
    rights: 'Tüm hakları saklıdır.',
  },
};

export type Dictionary = typeof tr;

const en: Dictionary = {
  meta: {
    siteName: 'MAKSEF',
    defaultTitle: 'MAKSEF — Construction, Major Repair and Urban Renewal',
    defaultDescription:
      'MAKSEF is an Istanbul-based construction company delivering new-build, major repair and maintenance works for public and private clients, as well as urban renewal projects.',
  },

  a11y: {
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main navigation',
    footerNav: 'Footer navigation',
    langSwitch: 'Language',
    breadcrumb: 'Breadcrumb',
    homeLink: 'MAKSEF home',
    opensInNewTab: '(opens in a new tab)',
  },

  nav: {
    home: 'Home',
    about: 'About',
    contracting: 'Contracting',
    urbanRenewal: 'Urban Renewal',
    projects: 'Projects',
    contact: 'Contact',
    cta: 'Get in touch',
  },

  categories: {
    taahhut: 'Contracting',
    'kentsel-donusum': 'Urban Renewal',
  },

  statuses: {
    completed: 'Completed',
    ongoing: 'Ongoing',
  },

  statusLabel: {
    completed: 'Completed',
    ongoing: 'In progress',
  },

  common: {
    viewProject: 'View project',
    allProjects: 'All projects',
    learnMore: 'Learn more',
    exampleBadge: 'Example',
    exampleNotice:
      'This page is sample content and does not represent a real project. It will be replaced as urban renewal projects are added.',
    projectCount: '{count} projects',
  },

  filters: {
    legend: 'Filter projects',
    category: 'Field',
    status: 'Status',
    all: 'All',
    showing: 'Showing {count} projects',
    empty: 'No projects match these filters.',
    reset: 'Clear filters',
  },

  project: {
    specTitle: 'Project data',
    client: 'Client / Authority',
    year: 'Year',
    location: 'Location',
    category: 'Field',
    status: 'Status',
    overview: 'About the project',
    scope: 'Scope of work',
    gallery: 'Photo gallery',
    photoCount: '{count} photos',
    galleryHint: 'Tap a photo to view it larger.',
    photoAlt: '{title} — photo {index}',
    beforeAfter: 'Before / After',
    beforeAfterHint: 'Drag the divider or use the arrow keys to compare.',
    before: 'Before',
    after: 'After',
    sliderLabel: 'Compare before and after images',
    relatedTitle: 'More projects',
    back: 'Back to all projects',
    ctaContractingTitle: "Let's talk about a similar job",
    ctaContractingText:
      'Contact our technical team about your construction, major repair or maintenance works.',
    ctaRenewalTitle: 'Start the renewal process for your building',
    ctaRenewalText:
      "If you own a building or a plot, fill in the short application form and we'll get back to you for a preliminary assessment.",
    ctaRenewalButton: 'Go to the application form',
  },

  lightbox: {
    label: 'Photo viewer',
    close: 'Close',
    prev: 'Previous photo',
    next: 'Next photo',
    counter: '{current} / {total}',
  },

  home: {
    heroEyebrow: 'Construction · Contracting · Urban Renewal — Istanbul',
    heroTitle: 'Lasting structures for the public and the city.',
    heroLead:
      'MAKSEF delivers new-build, major repair and maintenance works for public and private clients in Istanbul, and develops urban renewal projects together with building and land owners.',
    heroPrimary: 'Explore our projects',
    heroSecondary: 'Urban renewal application',
    heroImageCaption: 'Latest project',

    areasEyebrow: 'What we do',
    areasTitle: 'Two distinct fields, one engineering discipline',
    contractingTitle: 'Public Contracting',
    contractingText:
      "New-build, major repair and maintenance works won through public tenders. From school sports halls to university campuses, delivered to each authority's technical specifications.",
    contractingLink: 'Contracting projects',
    renewalTitle: 'Urban Renewal',
    renewalText:
      'Turning at-risk buildings into safe, modern homes. A transparent process with building and land owners, from the first meeting to handover.',
    renewalLink: 'Urban renewal',

    sheetEyebrow: 'Data sheet',
    sheetTitle: 'In numbers',
    statCompleted: 'Completed projects',
    statOngoing: 'Ongoing projects',
    statYears: 'Year range',

    featuredEyebrow: 'Selected work',
    featuredTitle: 'Recent projects',

    processEyebrow: 'Urban renewal',
    processTitle: 'Your building’s renewal, step by step',
    processLead:
      'As a building or land owner, all you need to do is take the first step. We plan the process end to end and keep you informed at every stage.',
  },

  cta: {
    eyebrow: 'Contact',
    title: "Let's schedule a meeting about your project.",
    text: 'Public tender, major repair or urban renewal — tell us what you need and our technical team will get back to you.',
    primary: 'Contact form',
    secondary: 'Urban renewal application',
    callUs: 'Call us',
    writeUs: 'Send an email',
  },

  about: {
    title: 'About',
    description:
      'MAKSEF is an Istanbul-based construction company delivering new-build, major repair, maintenance and urban renewal works for public and private clients.',
    eyebrow: 'Company',
    lead: 'MAKSEF is a construction and contracting company in Istanbul, delivering new-build, major repair and maintenance works for public institutions and the private sector.',
    body: [
      "On projects won through public tenders, we build to each authority's technical specifications, work schedule and quality expectations. Our work ranges in scale from school sports halls and university campuses to utility service buildings and urban amenities.",
      'In urban renewal, we work directly with building and land owners. While replacing at-risk buildings with safe, contemporary structures, we prioritise an open and traceable process with every owner.',
    ],
    servicesEyebrow: 'Services',
    servicesTitle: 'What we do',
    services: [
      {
        title: 'New-build works',
        text: 'New buildings and facilities for public and private clients, from prefabricated annexes to educational buildings.',
      },
      {
        title: 'Major repair',
        text: 'Comprehensive renewal of existing buildings: non-structural elements, façades, roofs, building services and interiors.',
      },
      {
        title: 'Maintenance & repair',
        text: 'Annual maintenance and repair programmes for building stocks such as school sports halls and municipal properties.',
      },
      {
        title: 'Urban renewal',
        text: 'Rebuilding at-risk structures with building and land owners, from planning to handover.',
      },
    ],
    principlesEyebrow: 'Principles',
    principlesTitle: 'How we work',
    principles: [
      {
        title: 'True to specification',
        text: 'The technical specification, drawings and work schedule are the reference; every decision on site follows them.',
      },
      {
        title: 'Transparent reporting',
        text: 'We share regular progress updates with clients and owners — foresight instead of surprises.',
      },
      {
        title: 'Safety on site',
        text: 'Occupational health and safety is an integral part of every work schedule.',
      },
    ],
    clientsEyebrow: 'References',
    clientsTitle: 'Authorities we have worked with',
    clientsNote: 'Some of the institutions that appear as clients on our projects.',
  },

  contracting: {
    title: 'Contracting Projects',
    description:
      'MAKSEF contracting: new-build, major repair and maintenance projects delivered through public tenders.',
    eyebrow: 'Field 01',
    lead: "New-build, major repair and maintenance works awarded to us through public tenders. On every project we work to the authority's specification, work schedule and acceptance procedures.",
    scopeTitle: 'Types of work',
    scope: [
      'New buildings and facilities',
      'Major repair of public buildings',
      'Annual maintenance & repair programmes',
      'Sports halls and educational buildings',
      'Prefabricated buildings and annexes',
      'Open-space structures and urban amenities',
    ],
    listTitle: 'Contracting projects',
  },

  urbanRenewal: {
    title: 'Urban Renewal',
    description: 'The MAKSEF urban renewal process and application form for building and land owners.',
    eyebrow: 'Field 02',
    lead: 'We work directly with building and land owners to turn at-risk buildings into safe, contemporary structures. Every step, from the first meeting to handover, is planned and transparent.',
    applyButton: 'Apply now',
    processTitle: 'How does it work?',
    process: [
      {
        title: 'Preliminary application',
        text: 'Fill in the form so we have the basics: location, age and number of units of your building.',
      },
      {
        title: 'Site visit',
        text: 'We inspect the property, review its zoning status and evaluate possible project scenarios.',
      },
      {
        title: 'Risk assessment',
        text: 'If the building has not yet been assessed, we guide you through the process carried out by licensed institutions.',
      },
      {
        title: 'Owner meetings & contract',
        text: 'We hold briefings with the owners and present our offer clearly and comparably.',
      },
      {
        title: 'Design & permits',
        text: 'Architectural, structural and MEP designs are prepared and the building permit is obtained.',
      },
      {
        title: 'Construction & handover',
        text: 'Demolition, construction and occupancy procedures are completed and the units are handed over to their owners.',
      },
    ],
    projectsTitle: 'Urban renewal projects',
    faqTitle: 'Frequently asked questions',
    faq: [
      {
        q: 'What information do I need to apply?',
        a: "At first, the district and address, approximate construction year, and number of floors and units are enough. Title deed (block/parcel) details and the risk assessment report, if available, speed up the evaluation.",
      },
      {
        q: "I don't know whether my building is at risk. Can I still apply?",
        a: 'Yes. During the preliminary assessment we explain how the risk assessment process works and guide you through the necessary steps.',
      },
      {
        q: 'Do all owners have to apply together?',
        a: 'No. A single owner, landowner or building manager can make the first application. A briefing for all owners is scheduled in the next stage.',
      },
    ],
    formEyebrow: 'Application',
    formTitle: 'Building / land owner application form',
    formLead:
      "Share your details in three short steps. The application is non-binding; we'll contact you for a preliminary assessment.",
  },

  projects: {
    title: 'Projects',
    description: 'MAKSEF contracting and urban renewal projects: completed and ongoing work.',
    eyebrow: 'Project archive',
    lead: 'Our completed and ongoing work in public contracting and urban renewal. Filter by field and status.',
  },

  contact: {
    title: 'Contact',
    description: 'Contact MAKSEF for quotes, partnerships and urban renewal applications.',
    eyebrow: 'Contact',
    lead: "Write to us about your project, tender works or urban renewal. We'll forward your message to the right team and reply as soon as possible.",
    detailsTitle: 'Contact details',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    map: 'View on map',
    formTitle: 'Send a message',
    renewalBoxTitle: 'Do you own a building or a plot?',
    renewalBoxText: 'Use our step-by-step urban renewal application form.',
  },

  forms: {
    required: 'required',
    optional: 'optional',
    select: 'Select',
    send: 'Send',
    sending: 'Sending…',
    next: 'Next',
    back: 'Back',
    stepOf: 'Step {current} of {total}',
    success: "Thank you, we've received your message. We'll get back to you shortly.",
    error: 'Your message could not be sent. Please try again or give us a call.',
    notConfigured: 'This form is not configured yet. Please contact us by phone or email.',
    consent: 'I consent to my personal data being processed in order to respond to my request.',
    name: 'Full name',
    company: 'Organisation / company',
    email: 'Email',
    phone: 'Phone',
    topic: 'Subject',
    topics: {
      contracting: 'Contracting / tenders',
      renewal: 'Urban renewal',
      partnership: 'Partnership / supply',
      other: 'Other',
    },
    message: 'Your message',
    renewal: {
      step1: 'Property',
      step2: 'Building',
      step3: 'Contact',
      role: 'I am applying as',
      roles: {
        owner: 'Unit owner',
        landowner: 'Landowner',
        manager: 'Building manager',
        other: 'Other',
      },
      propertyType: 'Property type',
      propertyTypes: {
        building: 'Existing building',
        land: 'Vacant plot',
      },
      district: 'District',
      outsideIstanbul: 'Outside Istanbul',
      address: 'Neighbourhood / address',
      parcel: 'Block / parcel',
      parcelHint: "Shown on the title deed; leave blank if you don't know.",
      buildingAge: 'Construction year (approx.)',
      ages: {
        before1980: 'Before 1980',
        '1980-1999': '1980–1999',
        '2000-2009': '2000–2009',
        after2010: '2010 or later',
        unknown: "I don't know",
      },
      floors: 'Number of floors',
      units: 'Number of units',
      unitsHint: 'Flats and shops combined.',
      riskReport: 'Risk assessment report',
      riskReports: {
        yes: 'Available',
        inProgress: 'In progress',
        no: 'None',
        unknown: "I don't know",
      },
      consensus: "Owners' stance on renewal",
      consensusOptions: {
        all: 'All in favour',
        majority: 'Majority in favour',
        notDiscussed: 'Not discussed yet',
      },
      preferredContact: 'How should we reach you?',
      contactOptions: {
        phone: 'Phone',
        email: 'Email',
      },
      note: 'Anything else to add',
    },
  },

  thankYou: {
    title: 'Thank you',
    description: 'Your message has been received.',
    text: "We've received your message. We'll review your request and get back to you shortly.",
    back: 'Back to home',
  },

  footer: {
    tagline: 'New-build, major repair, maintenance and urban renewal in Istanbul.',
    sheet: 'Sheet',
    scale: 'Scale',
    date: 'Date',
    rights: 'All rights reserved.',
  },
};

export const ui: Record<Lang, Dictionary> = { tr, en };
