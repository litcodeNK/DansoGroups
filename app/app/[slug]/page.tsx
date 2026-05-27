'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, Download, ExternalLink } from 'lucide-react';
import { items } from '@/lib/items';
import { Toaster } from 'sonner';

export default function AppDetail() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const item = items.find((i) => i.slug === slug);

  if (!item) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Not Found</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-accent text-white px-6 py-3 rounded-full font-bold"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      <Toaster position="bottom-right" richColors />

      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-dark/80 backdrop-blur px-4 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded text-xs font-bold uppercase tracking-widest mb-4">
              {item.type}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4">{item.name}</h1>
            {item.author && (
              <p className="text-xl text-white/70 font-serif italic">By {item.author}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <p className="text-white/70 leading-relaxed text-lg mb-8">
              {item.longDescription || item.description}
            </p>

            {item.features && item.features.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                <ul className="space-y-4">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Sidebar CTA */}
          <div className="md:col-span-1">
            <div className="sticky top-8 bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-white/60 text-sm">{item.description}</p>

              {item.type === 'book' && item.externalUrl && (
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold py-3 px-6 rounded-full transition-colors"
                >
                  <ExternalLink size={16} />
                  Buy Now
                </a>
              )}

              {item.type === 'app' && (
                <>
                  {item.playStoreUrl && (
                    <a
                      href={item.playStoreUrl}
                      className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold py-3 px-6 rounded-full transition-colors"
                    >
                      <Download size={16} />
                      Google Play
                    </a>
                  )}
                  {item.appStoreUrl && (
                    <a
                      href={item.appStoreUrl}
                      className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-full transition-colors"
                    >
                      <Download size={16} />
                      App Store
                    </a>
                  )}
                </>
              )}

              <button
                onClick={() => {
                  router.push('/#contact');
                }}
                className="w-full border border-white/20 hover:border-accent text-white/70 hover:text-white font-medium py-3 px-6 rounded-full transition-colors text-sm"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
