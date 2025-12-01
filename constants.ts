
import { Holiday, BookingLink } from './types';

export const APP_NAME = "ResmiGunler.com";

const COMMON_LINKS: BookingLink[] = [
  { title: 'Ucuz Uçak Bileti Bul', url: 'https://www.enuygun.com/ucak-bileti/', icon: 'plane' },
  { title: 'Otel Fırsatlarını İncele', url: 'https://www.etstur.com/', icon: 'hotel' },
  { title: 'Otobüs Bileti Al', url: 'https://www.obilet.com/', icon: 'bus' }
];

export const HOLIDAYS: Holiday[] = [
  // --- 2024 Holidays (Mevcut yıl referans) ---
  {
    id: 'yilbasi-2024',
    name: 'Yılbaşı',
    date: '2024-01-01',
    type: 'resmi_tatil',
    description: 'Yeni yılın ilk günü.',
    history: 'Miladi takvimin başlangıcı olarak kutlanır.',
    keywords: ['yılbaşı', '1 ocak', 'tatil', 'kayak', 'kış tatili'],
    imageUrl: 'https://images.unsplash.com/photo-1546768292-fb12f6c92568?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Yılbaşı tatili kısa olduğu için şehir içi etkinliklere katılabilir veya yakınlarda günübirlik kayak turu yapabilirsiniz.',
    activitySuggestions: [
      'Uludağ Kayak Merkezi turu',
      'Şehir merkezinde yılbaşı pazarlarını gez',
      'Evde sevdiklerinle kutlama yemeği'
    ],
    bookingLinks: COMMON_LINKS
  },
  {
    id: 'ramazan-bayrami-2024',
    name: 'Ramazan Bayramı',
    date: '2024-04-10',
    endDate: '2024-04-12',
    type: 'dini_tatil',
    description: '3 gün süren Ramazan Bayramı tatili.',
    history: 'Ramazan ayının bitimini kutlayan dini bayram.',
    keywords: ['ramazan', 'şeker bayramı', 'bayram', 'ege turu'],
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Nisan ayında havalar ısınmaya başlar. Antalya ve çevresi deniz tatili için açılışı yapmak adına harika bir fırsat olabilir.',
    activitySuggestions: [
      'Aile büyüklerini ziyaret et',
      'Kapadokya balon turuna katıl',
      'Antalya\'da sezonun ilk denizine gir'
    ],
    bookingLinks: COMMON_LINKS
  },
  {
    id: '23-nisan-2024',
    name: 'Ulusal Egemenlik ve Çocuk Bayramı',
    date: '2024-04-23',
    type: 'resmi_tatil',
    description: 'TBMM\'nin açılışı ve Atatürk\'ün çocuklara armağanı.',
    history: '23 Nisan 1920 tarihinde Türkiye Büyük Millet Meclisi açılmıştır.',
    keywords: ['23 nisan', 'çocuk bayramı', 'atatürk', 'anıtkabir', 'ankara'],
    imageUrl: 'https://images.unsplash.com/photo-1618237936173-1f630018f6d2?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Bu özel günde Ankara Anıtkabir ziyareti en anlamlı aktivitedir.',
    activitySuggestions: [
      'Anıtkabir ziyareti',
      'Çocuk şenliklerine katılım',
      'Eskişehir günübirlik gezi'
    ],
    bookingLinks: COMMON_LINKS
  },
  {
    id: '1-mayis-2024',
    name: 'Emek ve Dayanışma Günü',
    date: '2024-05-01',
    type: 'resmi_tatil',
    description: 'İşçi bayramı olarak kutlanır.',
    history: 'Dünya genelinde işçi sınıfının birlik, mücadele ve dayanışma günü.',
    keywords: ['1 mayıs', 'işçi bayramı', 'bahar tatili'],
    imageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Baharın en güzel zamanı. Polonezköy, Sapanca veya Maşukiye gibi doğa ile iç içe yerlerde kahvaltı ve yürüyüş planlayabilirsiniz.',
    activitySuggestions: [
      'Doğa yürüyüşü (Trekking)',
      'Sapanca gölü kenarında kahvaltı',
      'Şehir parklarında piknik'
    ],
    bookingLinks: COMMON_LINKS
  },
  {
    id: '19-mayis-2024',
    name: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı',
    date: '2024-05-19',
    type: 'resmi_tatil',
    description: 'Milli mücadelenin başlangıcı.',
    history: 'Mustafa Kemal Atatürk\'ün Samsun\'a çıkarak Kurtuluş Savaşı\'nı başlattığı gün.',
    keywords: ['19 mayıs', 'gençlik bayramı', 'samsun'],
    imageUrl: 'https://images.unsplash.com/photo-1622303038370-5f2129759d57?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Gençlik bayramında Samsun Bandırma Vapuru Müzesi ziyareti yapılabilir.',
    activitySuggestions: [
      'Samsun Bandırma Vapuru gezisi',
      'Gençlik festivalleri',
      'Bozcaada gezisi'
    ],
    bookingLinks: COMMON_LINKS
  },
  {
    id: 'kurban-bayrami-2024',
    name: 'Kurban Bayramı',
    date: '2024-06-16',
    endDate: '2024-06-19',
    type: 'dini_tatil',
    description: '4 gün süren Kurban Bayramı tatili.',
    history: 'İslam aleminde kutlanan en büyük iki bayramdan biri.',
    keywords: ['kurban', 'bayram', 'yaz tatili', 'deniz'],
    imageUrl: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Yazın tam ortası! Bu uzun tatilde Bodrum, Çeşme veya Kaş gibi popüler tatil beldeleri çok yoğun olabilir.',
    activitySuggestions: [
      'Mavi tur (Tekne tatili)',
      'Dalyan ve İztuzu plajı gezisi',
      'Köy ziyaretleri ve bayramlaşma'
    ],
    bookingLinks: COMMON_LINKS
  },
  {
    id: '15-temmuz-2024',
    name: 'Demokrasi ve Milli Birlik Günü',
    date: '2024-07-15',
    type: 'resmi_tatil',
    description: 'Darbe girişimine karşı direnişin anısına.',
    history: '2016 askeri darbe girişiminin bastırılması anısına ilan edilmiştir.',
    keywords: ['15 temmuz', 'demokrasi', 'şehitler köprüsü'],
    imageUrl: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Temmuz sıcağında Karadeniz yaylaları (Ayder, Pokut) serinlemek için mükemmel bir kaçış rotasıdır.',
    activitySuggestions: [
      'İstanbul Boğaz turu',
      'Karadeniz yayla turu',
      'Şehitlik ziyaretleri'
    ],
    bookingLinks: COMMON_LINKS
  },
  {
    id: '30-agustos-2024',
    name: 'Zafer Bayramı',
    date: '2024-08-30',
    type: 'resmi_tatil',
    description: 'Büyük Taarruz\'un zaferle sonuçlanması.',
    history: '1922 yılında Dumlupınar\'da Atatürk\'ün başkumandanlığında zaferle sonuçlanan Büyük Taarruz.',
    keywords: ['30 ağustos', 'zafer bayramı', 'kütahya', 'afyon'],
    imageUrl: 'https://images.unsplash.com/photo-1596313463564-98c9f5f0883d?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Yaz sezonunun kapanışı. Fethiye Ölüdeniz veya Kabak Koyu\'nda kamp yapmak için harika bir zaman.',
    activitySuggestions: [
      'Dumlupınar Şehitliği ziyareti',
      'Fethiye yamaç paraşütü',
      'Kamp tatili'
    ],
    bookingLinks: COMMON_LINKS
  },
  {
    id: '29-ekim-2024',
    name: 'Cumhuriyet Bayramı',
    date: '2024-10-29',
    type: 'resmi_tatil',
    description: 'Cumhuriyetin ilanı.',
    history: '29 Ekim 1923\'te TBMM\'nin Cumhuriyeti ilan etmesi anısına kutlanır.',
    keywords: ['29 ekim', 'cumhuriyet', 'fener alayı'],
    imageUrl: 'https://images.unsplash.com/photo-1596313463665-d4c2079cc744?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Sonbaharın tadını çıkarmak için Yedigöller veya Abant Gölü turu planlayabilirsiniz.',
    activitySuggestions: [
      'Fener alayı yürüyüşlerine katıl',
      'Yedigöller sonbahar fotoğraf turu',
      'Ankara I. Meclis ziyareti'
    ],
    bookingLinks: COMMON_LINKS
  },

  // --- 2025 Holidays (GÜNCELLENMİŞ & FOTOĞRAFLI) ---
  {
    id: 'yilbasi-2025',
    name: 'Yılbaşı',
    date: '2025-01-01',
    type: 'resmi_tatil',
    description: 'Yeni yılın ilk günü. 2025 yılına merhaba!',
    history: 'Miladi takvimin başlangıcı.',
    keywords: ['yılbaşı', '1 ocak', 'kar', 'kış'],
    imageUrl: 'https://images.unsplash.com/photo-1482517967863-00e15c9b4499?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Kış turizmi için Erciyes veya Palandöken\'de kayak tatili planlayabilirsiniz. Hafta sonu ile birleştirip uzun bir kış tatili yapın.',
    activitySuggestions: ['Kayak tatili', 'Termal otel keyfi', 'Sinema gecesi', 'Şömine başı sohbeti'],
    bookingLinks: COMMON_LINKS,
    recommendation: {
      leaveDates: ['2025-01-02', '2025-01-03'],
      totalHolidayDays: 5,
      startPeriod: '2025-01-01',
      endPeriod: '2025-01-05',
      description: 'Yılbaşı Çarşamba gününe denk geliyor. Perşembe ve Cuma günleri 2 gün izin alarak hafta sonu ile birleştirip 5 gün tatil yapabilirsiniz!'
    }
  },
  {
    id: 'ramazan-bayrami-2025',
    name: 'Ramazan Bayramı',
    date: '2025-03-30',
    endDate: '2025-04-01',
    type: 'dini_tatil',
    description: 'Ramazan Bayramı tatili. (Pazar - Salı)',
    history: 'Ramazan ayının sonunu işaret eden bayram. (Arife günü 29 Mart Cumartesi)',
    keywords: ['ramazan', 'bayram', 'tatlı', 'ziyaret'],
    imageUrl: 'https://images.unsplash.com/photo-1542261777421-500e4e28a58f?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Erken bahar dönemi. Kıbrıs otelleri bu dönemde hem sıcak hem de eğlenceli konser programları sunar. Aile ziyaretleri için ideal.',
    activitySuggestions: ['Kıbrıs tatili', 'Güneydoğu Anadolu GAP turu', 'Aile kahvaltıları', 'Mezarlık ziyaretleri'],
    bookingLinks: COMMON_LINKS,
    recommendation: {
      leaveDates: ['2025-04-02', '2025-04-03', '2025-04-04'],
      totalHolidayDays: 9,
      startPeriod: '2025-03-29',
      endPeriod: '2025-04-06',
      description: 'Bayram Salı günü bitiyor. Çarşamba, Perşembe ve Cuma günleri için 3 gün izin alırsanız, önceki ve sonraki hafta sonlarıyla toplam 9 gün tatil sizi bekliyor!'
    }
  },
  {
    id: '23-nisan-2025',
    name: 'Ulusal Egemenlik ve Çocuk Bayramı',
    date: '2025-04-23',
    type: 'resmi_tatil',
    description: 'TBMM açılışı ve dünyadaki tek çocuk bayramı.',
    history: '23 Nisan 1920\'de TBMM açılmıştır.',
    keywords: ['23 nisan', 'çocuk', 'bayrak', 'tören'],
    imageUrl: 'https://images.unsplash.com/photo-1596313463567-c6b70a7904e5?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Hafta ortasına (Çarşamba) denk geliyor. Çocuklarla birlikte Anıtkabir\'i ziyaret etmek veya doğa parklarına gitmek harika bir fikir.',
    activitySuggestions: ['Alaçatı ot festivali (döneme denk gelirse)', 'Çocuk parkları', 'Anıtkabir ziyareti', 'Uçurtma şenlikleri'],
    bookingLinks: COMMON_LINKS,
    recommendation: {
      leaveDates: ['2025-04-24', '2025-04-25'],
      totalHolidayDays: 5,
      startPeriod: '2025-04-23',
      endPeriod: '2025-04-27',
      description: 'Çarşamba günü tatil. Perşembe ve Cuma günleri 2 gün izin alarak hafta sonu ile birleştirip 5 gün kafa dinleyebilirsiniz.'
    }
  },
  {
    id: '1-mayis-2025',
    name: 'Emek ve Dayanışma Günü',
    date: '2025-05-01',
    type: 'resmi_tatil',
    description: 'İşçi ve emekçi bayramı.',
    history: 'Dünya genelinde kutlanan birlik günü.',
    keywords: ['1 mayıs', 'bahar', 'işçi', 'doğa'],
    imageUrl: 'https://images.unsplash.com/photo-1516214104703-d87074435963?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Perşembe gününe denk geliyor. Doğa uyanıyor! Kamp yapmak veya bungalov evlerde kalmak için ideal bir zaman.',
    activitySuggestions: ['Kampçılık', 'Bungalov tatili', 'Piknik', 'Doğa fotoğrafçılığı'],
    bookingLinks: COMMON_LINKS,
    recommendation: {
      leaveDates: ['2025-05-02'],
      totalHolidayDays: 4,
      startPeriod: '2025-05-01',
      endPeriod: '2025-05-04',
      description: 'Perşembe günü resmi tatil. Sadece Cuma günü (1 gün) izin alarak 4 günlük harika bir hafta sonu tatili yapabilirsiniz.'
    }
  },
  {
    id: '19-mayis-2025',
    name: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı',
    date: '2025-05-19',
    type: 'resmi_tatil',
    description: 'Gençlik ve spor bayramı. Milli Mücadele\'nin başlangıcı.',
    history: '19 Mayıs 1919 Atatürk\'ün Samsun\'a çıkışı.',
    keywords: ['19 mayıs', 'gençlik', 'samsun', 'spor'],
    imageUrl: 'https://images.unsplash.com/photo-1622303038370-5f2129759d57?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Pazartesi gününe denk geliyor, hafta sonu ile birleşen 3 günlük hazır tatil! Gençlik festivalleri veya kısa bir Ege turu için harika.',
    activitySuggestions: ['Spor etkinlikleri', 'Bisiklet turu', 'Gençlik konserleri', 'Samsun gezisi'],
    bookingLinks: COMMON_LINKS,
    recommendation: {
      leaveDates: [],
      totalHolidayDays: 3,
      startPeriod: '2025-05-17',
      endPeriod: '2025-05-19',
      description: 'Pazartesi gününe denk geliyor, otomatik olarak 3 gün hafta sonu ile birleşik tatil! İzin almanıza gerek yok.'
    }
  },
  {
    id: 'kurban-bayrami-2025',
    name: 'Kurban Bayramı',
    date: '2025-06-06',
    endDate: '2025-06-09',
    type: 'dini_tatil',
    description: '4 gün süren Kurban Bayramı tatili. (Cuma - Pazartesi)',
    history: 'İslam dünyasının ikinci büyük bayramı.',
    keywords: ['kurban', 'deniz', 'yaz', 'tatil'],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Cuma başlayıp Pazartesi bitiyor. Zaten hafta sonuna denk geliyor ancak öncesindeki Perşembe (Arife) yarım günü tam güne tamamlayarak erken kaçabilirsiniz.',
    activitySuggestions: ['Deniz tatili', 'Su sporları', 'Aquapark eğlencesi', 'Akraba ziyareti'],
    bookingLinks: COMMON_LINKS
  },
   {
    id: '15-temmuz-2025',
    name: 'Demokrasi ve Milli Birlik Günü',
    date: '2025-07-15',
    type: 'resmi_tatil',
    description: '15 Temmuz Demokrasi ve Milli Birlik Günü.',
    history: 'Milli iradenin zaferi.',
    keywords: ['15 temmuz', 'şehitler', 'köprü', 'bayrak'],
    imageUrl: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Salı gününe denk geliyor. Sıcaklardan kaçmak için Karadeniz yaylaları veya serin sular harika bir seçenek.',
    activitySuggestions: ['Yayla şenlikleri', 'Boğaz turu', 'Müze gezisi', 'Şehitlik ziyareti'],
    bookingLinks: COMMON_LINKS,
    recommendation: {
      leaveDates: ['2025-07-14'],
      totalHolidayDays: 4,
      startPeriod: '2025-07-12',
      endPeriod: '2025-07-15',
      description: 'Tatil Salı günü. Pazartesi günü (1 gün) izin alarak Cumartesi\'den Salı\'ya 4 gün blok tatil yapabilirsiniz.'
    }
  },
  {
    id: '30-agustos-2025',
    name: 'Zafer Bayramı',
    date: '2025-08-30',
    type: 'resmi_tatil',
    description: '30 Ağustos Zafer Bayramı.',
    history: 'Büyük Taarruz zaferinin yıl dönümü.',
    keywords: ['30 ağustos', 'zafer', 'asker', 'tören'],
    imageUrl: 'https://images.unsplash.com/photo-1596313463564-98c9f5f0883d?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Cumartesi gününe denk geliyor. Yaz biterken son bir deniz tatili veya hafta sonu kampı için Kaş veya Kalkan villaları değerlendirilebilir.',
    activitySuggestions: ['Villa kiralama', 'Tekne turu', 'Tarihi yarımada gezisi', 'Zafer törenlerini izleme'],
    bookingLinks: COMMON_LINKS
  },
  {
    id: '29-ekim-2025',
    name: 'Cumhuriyet Bayramı',
    date: '2025-10-29',
    type: 'resmi_tatil',
    description: 'Cumhuriyetin kuruluş yıl dönümü.',
    history: 'Türkiye Cumhuriyeti\'nin ilanı.',
    keywords: ['29 ekim', 'cumhuriyet', 'atatürk', 'balon'],
    imageUrl: 'https://images.unsplash.com/photo-1596313463665-d4c2079cc744?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Çarşamba gününe denk geliyor. Kültür turları için en uygun zaman. Şanlıurfa, Mardin, Göbeklitepe turları bu mevsimde çok keyiflidir.',
    activitySuggestions: ['GAP Turu', 'Anıtkabir ziyareti', 'Cumhuriyet balosu/konserleri', 'Fener alayı'],
    bookingLinks: COMMON_LINKS,
    recommendation: {
      leaveDates: ['2025-10-27', '2025-10-28'],
      totalHolidayDays: 5,
      startPeriod: '2025-10-25',
      endPeriod: '2025-10-29',
      description: 'Bayram Çarşamba. Pazartesi ve Salı günleri 2 gün izin alarak 29 Ekim coşkusunu 5 günlük bir tatile dönüştürün.'
    }
  },

  // --- 2026 Holidays (Projected) ---
  {
    id: 'yilbasi-2026',
    name: 'Yılbaşı',
    date: '2026-01-01',
    type: 'resmi_tatil',
    description: 'Yeni yıl tatili.',
    keywords: ['yılbaşı'],
    imageUrl: 'https://images.unsplash.com/photo-1482517967863-00e15c9b4499?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Yeni yıla karlar altında girmek için Kartalkaya veya Uludağ otellerine bakın.',
    bookingLinks: COMMON_LINKS
  },
  {
    id: 'ramazan-bayrami-2026',
    name: 'Ramazan Bayramı',
    date: '2026-03-20',
    endDate: '2026-03-22',
    type: 'dini_tatil',
    description: 'Ramazan Bayramı.',
    keywords: ['ramazan'],
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Bahar başlangıcı, doğa yürüyüşleri için ideal.',
    bookingLinks: COMMON_LINKS
  },
  {
    id: '23-nisan-2026',
    name: 'Ulusal Egemenlik ve Çocuk Bayramı',
    date: '2026-04-23',
    type: 'resmi_tatil',
    description: '23 Nisan Çocuk Bayramı.',
    keywords: ['23 nisan'],
    imageUrl: 'https://images.unsplash.com/photo-1596313463567-c6b70a7904e5?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Çocuklarla birlikte Anıtkabir ziyareti planlayın.',
    bookingLinks: COMMON_LINKS
  },
  {
    id: '1-mayis-2026',
    name: 'Emek ve Dayanışma Günü',
    date: '2026-05-01',
    type: 'resmi_tatil',
    description: '1 Mayıs İşçi Bayramı.',
    keywords: ['1 mayıs'],
    imageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Şehirden uzaklaşıp doğaya kaçmak için bir fırsat.',
    bookingLinks: COMMON_LINKS
  },
  {
    id: '19-mayis-2026',
    name: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı',
    date: '2026-05-19',
    type: 'resmi_tatil',
    description: '19 Mayıs Gençlik Bayramı.',
    keywords: ['19 mayıs'],
    imageUrl: 'https://images.unsplash.com/photo-1622303038370-5f2129759d57?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Gençlik festivallerine göz atın.',
    bookingLinks: COMMON_LINKS
  },
  {
    id: 'kurban-bayrami-2026',
    name: 'Kurban Bayramı',
    date: '2026-05-27',
    endDate: '2026-05-30',
    type: 'dini_tatil',
    description: 'Kurban Bayramı.',
    keywords: ['kurban'],
    imageUrl: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Yaz sezonu açılıyor, Ege ve Akdeniz rezervasyonlarını erken yapın.',
    bookingLinks: COMMON_LINKS
  },
  {
    id: '15-temmuz-2026',
    name: 'Demokrasi ve Milli Birlik Günü',
    date: '2026-07-15',
    type: 'resmi_tatil',
    description: '15 Temmuz.',
    keywords: ['15 temmuz'],
    imageUrl: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Sıcak günlerde Karadeniz yaylaları ferah bir seçenek.',
    bookingLinks: COMMON_LINKS
  },
  {
    id: '30-agustos-2026',
    name: 'Zafer Bayramı',
    date: '2026-08-30',
    type: 'resmi_tatil',
    description: '30 Ağustos.',
    keywords: ['30 ağustos'],
    imageUrl: 'https://images.unsplash.com/photo-1596313463564-98c9f5f0883d?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Zafer Bayramı coşkusunu Ankara veya Dumlupınar\'da yaşayın.',
    bookingLinks: COMMON_LINKS
  },
  {
    id: '29-ekim-2026',
    name: 'Cumhuriyet Bayramı',
    date: '2026-10-29',
    type: 'resmi_tatil',
    description: '29 Ekim.',
    keywords: ['29 ekim'],
    imageUrl: 'https://images.unsplash.com/photo-1596313463665-d4c2079cc744?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Cumhuriyet coşkusunu en iyi hissedebileceğiniz yer Ankara\'dır.',
    bookingLinks: COMMON_LINKS
  },
];
