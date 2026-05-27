import Image from 'next/image';
import { User, MessageCircle } from 'lucide-react';
import { PageHero } from '@/components/PageHero';

const posts = [
  {
    day: '10',
    month: 'Dec',
    title: 'Necessity May Give us Best Virtual Court',
    img: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=700&auto=format&fit=crop',
    comments: '0 Comments',
  },
  {
    day: '12',
    month: 'Dec',
    title: 'Tackling the Changes of Retail Industry',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=700&auto=format&fit=crop',
    comments: '0 Comments',
  },
  {
    day: '15',
    month: 'Dec',
    title: 'Easy and Most Powerful Server and Platform',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=700&auto=format&fit=crop',
    comments: '0 Comments',
  },
  {
    day: '18',
    month: 'Dec',
    title: 'What is Holding Back the IT Solution Industry',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=700&auto=format&fit=crop',
    comments: '0 Comments',
  },
  {
    day: '20',
    month: 'Dec',
    title: 'Technology and the Future of Modern Workspace',
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=700&auto=format&fit=crop',
    comments: '0 Comments',
  },
  {
    day: '24',
    month: 'Dec',
    title: 'Digital Transformation for Growing Businesses',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=700&auto=format&fit=crop',
    comments: '0 Comments',
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero title="Blog" breadcrumb="Blog" />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <article
                key={i}
                className="rounded-xl overflow-hidden group transition-shadow hover:shadow-lg"
                style={{ border: '1px solid #E2E8F0' }}
              >
                {/* Image + date badge */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute top-4 left-4 w-14 text-center py-2 text-white"
                    style={{ backgroundColor: '#2D5BE3' }}
                  >
                    <p className="text-2xl font-extrabold leading-none">{post.day}</p>
                    <p className="text-[11px] font-semibold mt-0.5">{post.month}</p>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <div className="flex items-center gap-5 mb-4">
                    <span
                      className="flex items-center gap-1.5 text-xs font-medium"
                      style={{ color: '#64748B' }}
                    >
                      <User size={12} /> By Admin
                    </span>
                    <span
                      className="flex items-center gap-1.5 text-xs font-medium"
                      style={{ color: '#64748B' }}
                    >
                      <MessageCircle size={12} /> {post.comments}
                    </span>
                  </div>
                  <hr style={{ borderColor: '#E2E8F0' }} className="mb-4" />
                  <h3
                    className="font-bold text-base leading-snug mb-5 line-clamp-2"
                    style={{ color: '#0D1B2A' }}
                  >
                    {post.title}
                  </h3>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-60"
                    style={{ color: '#0D1B2A' }}
                  >
                    Read More <span>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
