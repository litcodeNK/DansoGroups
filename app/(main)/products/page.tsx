import { PageHero } from '@/components/PageHero';
import { Products } from '@/components/Products';

export default function ProductsPage() {
  return (
    <>
      <PageHero title="Our Products" breadcrumb="Products" />
      <Products />
    </>
  );
}
