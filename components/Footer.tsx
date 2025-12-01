import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">ResmiGunler.com</h3>
          <p className="text-sm text-slate-400">
            Türkiye'deki resmi tatilleri, dini bayramları ve özel günleri takip etmenin en kolay yolu. Akıllı izin hesaplayıcımız ile tatilinizi planlayın.
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Hızlı Bağlantılar</h4>
          <ul className="space-y-2 text-sm">
            <li><button className="hover:text-red-400">2024 Resmi Tatiller</button></li>
            <li><button className="hover:text-red-400">2025 Resmi Tatiller</button></li>
            <li><button className="hover:text-red-400">İzin Hesaplama</button></li>
            <li><button className="hover:text-red-400">Sitemap</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">İletişim</h4>
          <p className="text-sm text-slate-400 mb-2">
            Öneri ve görüşleriniz için:
          </p>
          <a href="mailto:info@resmigunler.com" className="text-red-400 hover:text-red-300 transition-colors">info@resmigunler.com</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} ResmiGunler.com. Tüm hakları saklıdır.
      </div>
    </footer>
  );
};

export default Footer;
