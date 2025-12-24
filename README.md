# 📅 Resmi Günler ve İzin Hesaplama

Türkiye'deki resmi tatilleri takip edebileceğiniz, izinlerinizi akıllıca planlayarak tatil sürenizi maksimize etmenizi sağlayan modern bir web uygulaması.

## 🚀 Özellikler

### 🗓️ Resmi Tatiller Listesi
- 2025 ve gelecek yıllar için güncel resmi tatil listesi
- Her tatil için detaylı bilgi ve grafikler
- Kalan gün sayacı ("Ramazan Bayramı'na ne kadar kaldı?")

### 🏖️ Akıllı İzin Hesaplayıcı
- **Tatil Birleştirme**: Mevcut resmi tatilleri hafta sonları ile birleştirerek en uzun tatil kombinasyonlarını hesaplar.
- **İzin Önerileri**: "3 gün izin alarak 9 gün tatil yapın" gibi stratejik öneriler sunar.
- **Görsel Takvim**: İzin planınızı takvim üzerinde görselleştirir.

### 💡 Blog ve Rehberler
- Tatil rotaları ve önerileri
- "Hangi bayramda nereye gidilir?" rehberleri
- Resmi günler hakkında tarihçe ve bilgiler

## 🛠️ Teknolojiler

Bu proje, yüksek performans ve modern geliştirme deneyimi için en güncel teknolojilerle geliştirilmiştir:

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) - Ultra hızlı geliştirme ve build süreci.
- **Dil**: [TypeScript](https://www.typescriptlang.org/) - Tip güvenliği ve ölçeklenebilir kod yapısı.
- **Stil**: [Tailwind CSS](https://tailwindcss.com/) - Hızlı ve modern UI tasarımı.
- **Backend/Veritabanı**: [Supabase](https://supabase.com/) - Gerçek zamanlı veritabanı ve güvenli API (BaaS).
- **Hosting**: Vercel / Netlify / VPS uyumlu statik build.
- **PWA**: Progressive Web App desteği (Mobil uyumlu).

## 📂 Proje Yapısı

```
resmigunler/
├── 📁 public/            # Statik dosyalar (Görseller, ikonlar)
├── 📁 lib/               # Yardımcı kütüphaneler (Supabase client vb.)
├── 📁 pages/             # Uygulama sayfaları (Route'lar)
│   ├── Home.tsx          # Ana sayfa
│   ├── HolidaysList.tsx  # Tatil listesi görünümü
│   └── ...
├── 📁 components/        # Yeniden kullanılabilir UI bileşenleri
├── 📁 hooks/             # Custom React Hooks
├── 📄 App.tsx            # Ana uygulama bileşeni
├── 📄 index.css          # Global stiller ve Tailwind direktifleri
└── 📄 vite.config.ts     # Vite konfigürasyonu
```

## 🚀 Kurulum ve Çalıştırma

Local ortamınızda geliştirmeye başlamak için:

1. **Repoyu klonlayın:**
   ```bash
   git clone https://github.com/mmeekh/resmigunler.git
   cd resmigunler
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```
   Tarayıcınızda `http://localhost:5173` adresine gidin.

## 🔧 Canlıya Alma (Build)

Production için optimize edilmiş build almak için:

```bash
npm run build
```
Bu komut `dist/` klasörüne statik dosyaları oluşturur.

## 🤝 Katkıda Bulunma

1. Forklayın
2. Feature branch oluşturun (`git checkout -b feature/yeniozellik`)
3. Commit atın (`git commit -m 'Yeni özellik: X eklendi'`)
4. Pushlayın (`git push origin feature/yeniozellik`)
5. Pull Request açın

## 📝 Lisans

MIT License
