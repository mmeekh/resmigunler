
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
    imageUrl: 'https://images.pexels.com/photos/1708601/pexels-photo-1708601.jpeg?auto=compress&cs=tinysrgb&w=1000',
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
    description: 'Yeni yılın ilk günü. Geçmişin yorgunluğunu geride bırakıp, taze umutlarla 2025 yılına "Merhaba" dediğimiz o büyülü gün!',
    history: 'Miladi takvimin başlangıcı olmasının ötesinde, geçen yılın muhasebesini yapıp yeni hedefler belirlediğimiz, sevdiklerimizle bir araya gelerek iyi dileklerde bulunduğumuz evrensel bir kutlama ve yenilenme günüdür.',
    keywords: ['yılbaşı', '1 ocak', 'kış tatili', 'kayak', 'kapadokya', 'yenilenme'],
    imageUrl: '/images/yilbasi.png',
    vacationTips: 'Yılın bu en büyüleyici zamanında, karlar altındaki Kapadokya\'da balonları izlemek veya Uludağ, Kartalkaya, Palandöken gibi kayak merkezlerinde beyazın keyfini çıkarmak ruhunuzu yenileyecektir. Şömine başında sıcak bir atmosfer arayanlar için Sapanca veya Abant bungalovları da harika bir seçenektir.',
    activitySuggestions: [
      'Erciyes veya Palandöken\'de Kayak ve Snowboard Heyecanı',
      'Termal Otellerde SPA ve Yenilenme',
      'Evde Sevdiklerle Sıcak Bir Yılbaşı Yemeği',
      'Kapadokya\'da Karlar Altında Balon Turu'
    ],
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
    description: 'Manevi huzurun, birliğin ve beraberliğin zirveye çıktığı; küslerin barıştığı, sofraların şenlendiği 3 günlük Ramazan Bayramı tatili. (Pazar - Salı)',
    history: 'On bir ayın sultanı Ramazan ayının manevi ikliminden sonra gelen, sabrın mükafatı olarak görülen, büyüklerin ziyaret edildiği, çocukların sevindirildiği, paylaşma ve dayanışmanın en yoğun yaşandığı mübarek günlerdir.',
    keywords: ['ramazan bayramı', 'şeker bayramı', 'aile ziyareti', 'gap turu', 'ege tatili'],
    imageUrl: '/images/ramazan.png',
    vacationTips: 'Baharın en taze zamanına denk gelen bu bayramda, doğanın uyanışına şahit olacağınız Ege köyleri (Şirince, Adatepe) veya Akdeniz\'in sakin koyları (Kaş, Kalkan) huzur dolu bir tatil vadediyor. Ayrıca vizesiz gidilebilen Balkan turları veya Kıbrıs, hem kültür hem eğlence arayanlar için ideal.',
    activitySuggestions: [
      'Güneydoğu Anadolu (GAP) Lezzet ve Kültür Turu',
      'Aile Büyüklerini Ziyaret ve Bayramlaşma',
      'Kıbrıs\'ta Bahar Konserleri ve Eğlence',
      'Ege Köylerinde Doğa Yürüyüşleri ve Kahvaltı'
    ],
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
    description: 'Dünya çocuklarına armağan edilen tek bayram! Geleceğimizin teminatı çocuklarımızın neşesi, egemenliğimizin simgesi.',
    history: 'Türkiye Büyük Millet Meclisi\'nin açıldığı, milli egemenliğin ilan edildiği ve Ulu Önder Atatürk\'ün bu kutlu günü dünya çocuklarına armağan ettiği, dünyadaki ilk ve tek çocuk bayramıdır. Bağımsızlığın çocuk masumiyetiyle taçlandığı gündür.',
    keywords: ['23 nisan', 'çocuk bayramı', 'anıtkabir', 'eskişehir', 'tema park'],
    imageUrl: '/images/23nisan.png',
    vacationTips: 'Baharın tam ortasında, çocuklarınızla birlikte Ankara\'da Anıtkabir ve İlk Meclis ziyareti yaparak milli bilinci pekiştirebilirsiniz. Ardından Eskişehir Sazova Parkı (Bilim Sanat ve Kültür Parkı) veya İstanbul\'daki tema parklar (Vialand, Miniatürk) çocuklara unutulmaz bir gün yaşatacaktır.',
    activitySuggestions: [
      'Anıtkabir ve I. TBMM Müzesi Ziyareti',
      'Eskişehir Sazova Parkı\'nda Masalsı Bir Gün',
      'Şehir Parklarında Uçurtma Şenlikleri ve Piknik',
      'Çocuk Tiyatroları ve Atölye Çalışmaları'
    ],
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
    description: 'Emeğin, alın terinin, üretimin ve dayanışmanın küresel çapta kutlandığı; baharın coşkusunun işçi bayramıyla birleştiği gün.',
    history: 'Tüm dünyada işçilerin, emekçilerin birlik, dayanışma ve haksızlıklara karşı mücadele günü olarak kutlanan; emeğin, alın terinin ve üretimin kutsallığının hatırlandığı evrensel bir gündür.',
    keywords: ['1 mayıs', 'işçi bayramı', 'kamp', 'doğa yürüyüşü', 'yedigöller'],
    imageUrl: '/images/1mayis.png',
    vacationTips: 'Perşembe gününe denk gelen bu tatili Cuma ile birleştirerek 4 günlük harika bir bahar kampına dönüştürebilirsiniz. İğneada Longoz Ormanları, Kaz Dağları veya Bolu Yedigöller, doğanın binbir tonunu görmek ve şehrin stresinden arınmak için sizi bekliyor.',
    activitySuggestions: [
      'Doğa ile Baş Başa: Kamp ve Bungalov Tatili',
      'Yedigöller veya Polonezköy\'de Doğa Yürüyüşü (Trekking)',
      'Sahil Kasabalarında Huzurlu Bir Hafta Sonu',
      'Sanat Atölyeleri ve Kişisel Gelişim Seminerleri'
    ],
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
    description: 'Bir milletin uyanışı! Milli Mücadele\'nin ilk adımı, gençliğin enerjisi ve sporun birleştirici gücü.',
    history: 'Gazi Mustafa Kemal Atatürk\'ün Samsun\'a çıkarak Milli Mücadele meşalesini yaktığı, Türkiye Cumhuriyeti\'nin kuruluşuna giden yolda ilk adımın atıldığı; gençliğe, spora ve dinamizme adanmış tarihi bir gündür.',
    keywords: ['19 mayıs', 'gençlik ve spor', 'samsun', 'olympos', 'festival'],
    imageUrl: '/images/19mayis.png',
    vacationTips: 'Pazartesi gününe denk gelen bu günde, Kurtuluş Savaşı rotası olan Samsun, Amasya ve Sivas\'ı kapsayan bir kültür turu çok anlamlı olacaktır. Alternatif olarak, gençlik festivallerinin başladığı üniversite şehirleri veya Olympos, Kabak Koyu gibi gençlerin tercih ettiği dinamik tatil beldeleri tercih edilebilir.',
    activitySuggestions: [
      'Samsun Bandırma Vapuru ve Milli Mücadele Müzeleri',
      'Gençlik Festivalleri ve Açık Hava Konserleri',
      'Olympos veya Fethiye\'de Yamaç Paraşütü ve Dalış',
      'Bisiklet Turları ve Doğa Sporları'
    ],
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
    description: 'Paylaşmanın, yardımlaşmanın ve teslimiyetin bayramı. Yazın başlangıcında 4 günlük uzun bir tatil fırsatı. (Cuma - Pazartesi)',
    history: 'Teslimiyetin, fedakarlığın ve yardımlaşmanın sembolü olan; yoksulların gözetildiği, sofraların paylaşıldığı, İslam aleminin en büyük ve mübarek iki bayramından biridir.',
    keywords: ['kurban bayramı', 'mavi tur', 'bodrum', 'yaz tatili', 'deniz'],

    vacationTips: 'Yaz sezonunun açılışı! Okulların da kapanmasıyla birlikte uzun bir yaz tatili fırsatı. Ege ve Akdeniz\'in masmavi sularında (Bodrum, Marmaris, Fethiye) "Mavi Yolculuk" yapmak veya Antalya\'nın her şey dahil otellerinde ailecek dinlenmek için en doğru zaman. Erken rezervasyon şart!',
    activitySuggestions: [
      'Ege ve Akdeniz Koylarında Mavi Yolculuk (Tekne Turu)',
      'Antalya veya Bodrum\'da Deniz, Kum, Güneş Tatili',
      'Aquapark ve Su Sporları Eğlencesi',
      'Akraba Ziyaretleri ve Geleneksel Bayram Sofraları'
    ],
    bookingLinks: COMMON_LINKS
  },
  {
    id: '15-temmuz-2025',
    name: 'Demokrasi ve Milli Birlik Günü',
    date: '2025-07-15',
    type: 'resmi_tatil',
    description: 'Milli iradenin zaferi! Demokrasiye sahip çıkan kahraman milletimizin yazdığı destan.',
    history: 'Milletimizin demokrasisine, bağımsızlığına ve milli iradesine sahip çıktığı; vatan sevgisinin tanklara ve silahlara galip geldiği, şehitlerimizin rahmetle, gazilerimizin minnetle anıldığı onurlu bir gündür.',
    keywords: ['15 temmuz', 'karadeniz yayla', 'demokrasi', 'milli birlik'],
    imageUrl: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&q=80&w=1000',
    vacationTips: 'Yaz sıcağının en yoğun olduğu bu dönemde, serinlemek için Karadeniz\'in yemyeşil yaylaları (Ayder, Pokut, Gito) mükemmel bir kaçış rotasıdır. Oksijen deposu yaylalarda huzur bulabilir, yerel lezzetleri tadabilirsiniz.',
    activitySuggestions: [
      'Karadeniz Yayla Turu (Rize, Artvin, Trabzon)',
      'İstanbul Boğazı\'nda Tarihi Yarımada ve Şehitler Abidesi Gezisi',
      'Ayasofya ve Sultanahmet Meydanı Ziyareti',
      'Serinletici Şelale ve Kanyon Yürüyüşleri'
    ],
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
    description: 'Bağımsızlığımızın mührü! Büyük Taarruz\'un zaferle sonuçlandığı, vatanın kurtarıldığı şanlı gün.',
    history: 'Türk ordusunun Başkomutan Mustafa Kemal Atatürk önderliğinde kazandığı, vatan topraklarının düşman işgalinden tamamen temizlendiği ve bağımsızlığımızın tüm dünyaya ilan edildiği Büyük Zafer\'in yıl dönümüdür.',
    keywords: ['30 ağustos', 'zafer bayramı', 'kaş tatili', 'dumlupınar'],
    imageUrl: '/images/30agustos.png',
    vacationTips: 'Yazın son demleri! Sezon kapanmadan önceki son deniz tatili fırsatı. Kaş, Kalkan veya Datça gibi deniz suyu sıcaklığının hala yüksek olduğu yerlerde, kalabalıktan uzak, sakin ve keyifli bir hafta sonu geçirebilirsiniz.',
    activitySuggestions: [
      'Dumlupınar ve Kocatepe Zafer Anıtları Ziyareti',
      'Kaş, Kalkan veya Datça\'da Sezon Sonu Deniz Keyfi',
      'Likya Yolu\'nda Tarihi ve Doğal Yürüyüş',
      'Açık Hava Sineması ve Yaz Konserleri'
    ],
    bookingLinks: COMMON_LINKS
  },
  {
    id: '29-ekim-2025',
    name: 'Cumhuriyet Bayramı',
    date: '2025-10-29',
    type: 'resmi_tatil',
    description: 'En büyük bayramımız! Egemenliğin kayıtsız şartsız millete verildiği, Cumhuriyetin ilan edildiği gurur günü.',
    history: 'Türkiye Büyük Millet Meclisi\'nin 29 Ekim 1923\'te Cumhuriyeti ilan etmesiyle Türk milletinin bağımsızlık mücadelesinin taçlandığı, kul olmaktan çıkıp vatandaş olma onuruna eriştiğimiz; aydınlık yarınların teminatı olan en büyük milli bayramımızdır.',
    keywords: ['29 ekim', 'cumhuriyet bayramı', 'gap turu', 'göbeklitepe', 'anıtkabir'],
    imageUrl: '/images/29ekim.png',
    vacationTips: 'Sonbaharın romantik atmosferinde Kapadokya, Mardin veya Şanlıurfa turları için yılın en ideal zamanı. Özellikle GAP turu ile tarihin sıfır noktası Göbeklitepe\'yi keşfetmek veya Ankara\'da Anıtkabir\'deki o muazzam atmosferi solumak paha biçilemez.',
    activitySuggestions: [
      'Tarihin Sıfır Noktası: Kapsamlı GAP ve Göbeklitepe Turu',
      'Ankara\'da Anıtkabir ve Cumhuriyet Müzesi (II. TBMM) Ziyareti',
      'Kapadokya\'da Peribacalari ve Gün Batımı',
      'Şehir Meydanlarında Fener Alayı ve Cumhuriyet Konserleri'
    ],
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
