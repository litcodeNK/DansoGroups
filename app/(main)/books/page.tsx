import { PageHero } from '@/components/PageHero';
import { Books } from '@/components/Books';

export default function BooksPage() {
  return (
    <>
      <PageHero
        title="Our Bookshop"
        breadcrumb="Books"
        image="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1920&auto=format&fit=crop"
      />
      <Books />
    </>
  );
}
