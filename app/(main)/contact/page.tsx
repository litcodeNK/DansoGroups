import { PageHero } from '@/components/PageHero';
import { Contact } from '@/components/Contact';

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" breadcrumb="Contact Us" />
      <Contact />
    </>
  );
}
