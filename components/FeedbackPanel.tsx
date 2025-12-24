import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const FORM_ENDPOINT = 'https://formspree.io/f/mrbnjywa';

// Profanity filter - Turkish bad words
const PROFANITY_LIST = [
  'amk', 'amq', 'aq', 'orospu', 'oç', 'piç', 'sik', 'yarrak', 'göt', 'am',
  'amcık', 'amına', 'ananı', 'sikerim', 'sikeyim', 'siktir', 'pezevenk',
  'kahpe', 'sürtük', 'fahişe', 'ibne', 'puşt', 'götveren', 'amcuk', 'amk',
  'mk', 'mq', 'aq', 'sg', 'salak', 'gerizekalı', 'mal', 'aptal'
];

const containsProfanity = (text: string): boolean => {
  const lowerText = text.toLowerCase()
    .replace(/[^a-zçğıöşü0-9\s]/gi, '') // Remove special chars
    .replace(/\s+/g, ' '); // Normalize spaces

  return PROFANITY_LIST.some(word => {
    const regex = new RegExp(`\\b${ word } \\b | ${ word } `, 'i');
    return regex.test(lowerText);
  });
};

interface Comment {
  id: number;
  name: string;
  date: string;
  content: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

interface FeedbackPanelProps {
  context: string;
}

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ context }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Comments State
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [expandedReplies, setExpandedReplies] = useState<Set<number>>(new Set());
  const [replyName, setReplyName] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [replyTurnstileToken, setReplyTurnstileToken] = useState('');
  const itemsPerPage = 10;

  const turnstileRef = useRef<HTMLDivElement>(null);
  const replyTurnstileRef = useRef<HTMLDivElement>(null);

  // Fetch comments from Supabase
  const fetchComments = async () => {
    try {
      setLoading(true);
      
      // Fetch parent comments
      const { data: parentComments, error: parentError } = await supabase
        .from('comments')
        .select('*')
        .is('parent_id', null)
        .order('created_at', { ascending: false });

      if (parentError) throw parentError;

      // Fetch all replies
      const { data: allReplies, error: repliesError } = await supabase
        .from('comments')
        .select('*')
        .not('parent_id', 'is', null)
        .order('created_at', { ascending: true });

      if (repliesError) throw repliesError;

      // Group replies by parent_id
      const repliesMap: { [key: number]: any[] } = {};
      allReplies?.forEach(reply => {
        if (!repliesMap[reply.parent_id]) {
          repliesMap[reply.parent_id] = [];
        }
        repliesMap[reply.parent_id].push({
          id: reply.id,
          name: reply.name,
          date: new Date(reply.created_at).toLocaleDateString('tr-TR', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          content: reply.message,
          likes: 0,
          dislikes: 0
        });
      });

      // Combine parents with their replies
      const formattedComments = parentComments?.map(comment => ({
        id: comment.id,
        name: comment.name,
        date: new Date(comment.created_at).toLocaleDateString('tr-TR', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        content: comment.message,
        likes: 0,
        dislikes: 0,
        replies: repliesMap[comment.id] || []
      })) || [];

      setComments(formattedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
  // Sorting: Newest first logic usually implies ID descending for mock data
  // But let's assume MOCK_COMMENTS is already sorted or we sort it.
  const sortedComments = [...comments].sort((a, b) => b.id - a.id);

  // Pagination Logic (comments already sorted from DB)
  const totalPages = Math.ceil(comments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComments = comments.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleReplies = (commentId: number) => {
    const newExpanded = new Set(expandedReplies);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedReplies(newExpanded);
  };

  useEffect(() => {
    if (turnstileRef.current && (window as any).turnstile) {
      try {
        (window as any).turnstile.render(turnstileRef.current, {
          sitekey: '0x4AAAAAACGfU51g1lZBAfSN',
          callback: (token: string) => {
            setTurnstileToken(token);
          },
        });
      } catch (e) {
        console.error('Turnstile render error:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (replyingTo !== null && replyTurnstileRef.current && (window as any).turnstile) {
      try {
        (window as any).turnstile.render(replyTurnstileRef.current, {
          sitekey: '0x4AAAAAACGfU51g1lZBAfSN',
          callback: (token: string) => {
            setReplyTurnstileToken(token);
          },
        });
      } catch (e) {
        console.error('Reply Turnstile render error:', e);
      }
    }
  }, [replyingTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      alert('Lütfen robot olmadığınızı doğrulayın.');
      return;
    }

    // Check for profanity
    if (containsProfanity(message) || containsProfanity(name)) {
      alert('Yorumunuz uygunsuz içerik barındırıyor. Lütfen düzenleyip tekrar deneyin.');
      return;
    }

    setStatus('sending');
    try {
      // 1. Send to Formspree (for notification)
      const formData = new FormData();
      formData.append('name', name);
      formData.append('message', message);
      formData.append('context', `Yorum: ${ context } `);
      formData.append('cf-turnstile-response', turnstileToken);
      formData.append('_subject', `${ name } kişisinden yeni yorum`);

      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      // 2. Save to Supabase
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            name: name,
            message: message,
            context: context,
            parent_id: null
          }
        ]);

      if (error) throw error;

      // 3. Refresh comments list
      await fetchComments();
      
      setStatus('sent');
      setMessage('');
      setName('');
      setTurnstileToken('');
      if ((window as any).turnstile) {
        (window as any).turnstile.reset();
      }
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      alert(`Hata: ${ err.message || 'Bir sorun oluştu' } `);
    }
  };

  const handleReplySubmit = async (parentId: number) => {
    if (!replyTurnstileToken) {
      alert('Lütfen robot olmadığınızı doğrulayın.');
      return;
    }

    // Check for profanity in reply
    if (containsProfanity(replyMessage) || containsProfanity(replyName)) {
      alert('Cevabınız uygunsuz içerik barındırıyor. Lütfen düzenleyip tekrar deneyin.');
      return;
    }

    try {
      // 1. Send to Formspree (for notification)
      const formData = new FormData();
      formData.append('name', replyName);
      formData.append('message', replyMessage);
      formData.append('context', `Cevap(Parent ID: ${ parentId }): ${ context } `);
      formData.append('cf-turnstile-response', replyTurnstileToken);
      formData.append('_subject', `${ replyName } kişisinden yeni cevap`);

      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      // 2. Save to Supabase
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            name: replyName,
            message: replyMessage,
            context: context,
            parent_id: parentId
          }
        ]);

      if (error) throw error;

      // 3. Refresh comments list
      await fetchComments();
      
      // 4. Auto-expand the replies for this comment
      const newExpanded = new Set(expandedReplies);
      newExpanded.add(parentId);
      setExpandedReplies(newExpanded);

      setReplyName('');
      setReplyMessage('');
      setReplyTurnstileToken('');
      setReplyingTo(null);
      if ((window as any).turnstile) {
        (window as any).turnstile.reset();
      }
    } catch (err: any) {
      console.error(err);
      alert(`Hata: ${ err.message || 'Bir sorun oluştu' } `);
    }
  };

  const PaginationControls = () => (
    <div className="flex items-center justify-center gap-2 my-6">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm border rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Önceki
      </button>
      <span className="text-sm font-medium text-slate-600">
        Sayfa {currentPage} / {totalPages || 1}
      </span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className="px-3 py-1 text-sm border rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sonraki
      </button>
    </div>
  );

  return (
    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm mt-12 mb-12 overflow-hidden" aria-labelledby="comments-title">

      {/* Form Section */}
      <div className="p-6 md:p-8 border-b border-slate-100">
        <div className="mb-6">
          <h3 id="comments-title" className="text-2xl font-bold text-slate-900 mb-2">Yorumlar ({comments.length})</h3>
          <p className="text-sm text-slate-600">Düşüncelerinizi paylaşın.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Adınız Soyadınız</span>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Adınız Soyadınız"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Yorumunuz</span>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Yorumunuzu buraya yazın..."
            />
          </label>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div ref={turnstileRef} className="cf-turnstile" data-sitekey="0x4AAAAAACGfU51g1lZBAfSN"></div>
            <div className="flex-grow"></div>
            <button
              type="submit"
              disabled={status === 'sending' || !turnstileToken}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
            >
              {status === 'sending' ? 'Gönderiliyor...' : 'Yorumu Gönder'}
            </button>
          </div>

          {status === 'sent' && (
            <div className="bg-emerald-50 text-emerald-700 p-4 rounded-lg mt-4 border border-emerald-100 text-sm">
              Yorumunuz başarıyla gönderildi ve listeye eklendi!
            </div>
          )}
        </form>
      </div>

      {/* Comments List Section */}
      <div className="bg-slate-50 p-6 md:p-8">
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <p className="text-slate-500 text-sm mt-4">Yorumlar yükleniyor...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-sm">Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
          </div>
        ) : (
          <>
            {totalPages > 1 && <PaginationControls />}

            <div className="space-y-6">
              {currentComments.map((comment) => (
                <div key={comment.id} className="bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-5">
                    <div className="flex gap-3">
                      {/* Avatar placeholder */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold text-sm">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <h4 className="font-semibold text-slate-900 text-sm">{comment.name}</h4>
                          <span className="text-xs text-slate-400">{comment.date}</span>
                        </div>

                        <p className="text-slate-700 text-sm leading-relaxed mb-3">
                          {comment.content}
                        </p>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                            className="text-xs font-semibold text-slate-600 hover:text-red-600 transition-colors px-3 py-1.5 rounded-full hover:bg-slate-50"
                          >
                            Yanıtla
                          </button>
                        </div>

                        {/* Reply Form - Inline */}
                        {replyingTo === comment.id && (
                          <div className="mt-4 space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <input
                              required
                              type="text"
                              value={replyName}
                              onChange={(e) => setReplyName(e.target.value)}
                              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                              placeholder="Adınız Soyadınız"
                            />
                            <textarea
                              required
                              rows={2}
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                              placeholder="Yanıtınızı yazın..."
                            />
                            <div className="flex items-center justify-between gap-3">
                              <div ref={replyTurnstileRef} className="cf-turnstile" data-sitekey="0x4AAAAAACGfU51g1lZBAfSN"></div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setReplyingTo(null)}
                                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 font-medium"
                                >
                                  İptal
                                </button>
                                <button
                                  onClick={() => handleReplySubmit(comment.id)}
                                  disabled={!replyTurnstileToken || !replyName || !replyMessage}
                                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Yanıtla
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Replies Toggle & List */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="border-t border-slate-100">
                      <button
                        onClick={() => toggleReplies(comment.id)}
                        className="w-full px-5 py-3 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:bg-slate-50 transition-colors"
                      >
                        <svg
                          className={`w - 4 h - 4 transition - transform ${ expandedReplies.has(comment.id) ? 'rotate-180' : '' } `}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        {comment.replies.length} yanıt
                      </button>

                      {expandedReplies.has(comment.id) && (
                        <div className="bg-slate-50/50 px-5 py-4 space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white font-bold text-xs">
                                {reply.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline gap-2 mb-1">
                                  <h5 className="font-semibold text-slate-800 text-sm">{reply.name}</h5>
                                  <span className="text-xs text-slate-400">{reply.date}</span>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {totalPages > 1 && <PaginationControls />}
          </>
        )}

        <div className="mt-8 p-4 bg-blue-50 text-blue-800 rounded-lg text-xs border border-blue-100">
          ✓ Yorumlar otomatik olarak yayınlanır. Uygunsuz içerik tespit edilirse gönderim engellenir.
        </div>
      </div>
    </section>
  );
};

export default FeedbackPanel;
