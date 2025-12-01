import React, { useState } from 'react';

const FORM_ENDPOINT = 'https://formspree.io/f/xzzbldwj';

type FeedbackType = 'like' | 'idea' | 'issue';

interface FeedbackPanelProps {
  context: string;
}

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ context }) => {
  const [type, setType] = useState<FeedbackType>('like');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type,
          message,
          email,
          context
        })
      });
      if (!res.ok) throw new Error('Gönderilemedi');
      setStatus('sent');
      setMessage('');
      setEmail('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 mt-12" aria-labelledby="feedback-title">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <p className="text-xs uppercase text-slate-500 font-semibold tracking-wide">Geribildirim</p>
          <h3 id="feedback-title" className="text-2xl font-bold text-slate-900">Sizden duymak istiyoruz</h3>
          <p className="text-sm text-slate-600">Beğendim / Önerim var / Problem var seçeneklerinden birini işaretleyin.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-full border border-slate-200">
          <span>Statik uyumlu (Formspree)</span>
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden></span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Geri bildirim tipi">
          {[
            { id: 'like', label: 'Beğendim' },
            { id: 'idea', label: 'Önerim var' },
            { id: 'issue', label: 'Problem var' }
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setType(option.id as FeedbackType)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                type === option.id ? 'bg-red-100 text-red-700 border-red-200' : 'border-slate-200 hover:border-red-300 hover:text-red-600'
              }`}
              aria-pressed={type === option.id}
            >
              {option.label}
            </button>
          ))}
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Mesaj</span>
          <textarea
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Kısa ve net bir not bırakın."
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">E-posta (isteğe bağlı)</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="İletişim için e-posta bırakabilirsiniz."
          />
        </label>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-500">Form çalışmazsa <a className="text-red-600 underline" href="mailto:info@resmigunler.com?subject=Geri%20Bildirim">info@resmigunler.com</a> adresine e-posta atabilirsiniz.</p>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Gönderiliyor…' : 'Gönder'}
          </button>
        </div>

        {status === 'sent' && <p className="text-emerald-600 text-sm" role="status">Teşekkürler! Geri bildiriminiz alındı.</p>}
        {status === 'error' && <p className="text-red-600 text-sm" role="alert">Form gönderilemedi. Lütfen e-posta ile iletin.</p>}
      </form>
    </section>
  );
};

export default FeedbackPanel;
