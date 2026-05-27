import { PageHero } from '@/components/PageHero';
import { Services } from '@/components/Services';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { CaseStudies } from '@/components/CaseStudies';
import { Partners } from '@/components/Partners';

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Our Services" breadcrumb="Services" />
      <Services />
      <WhyChooseUs />
      <CaseStudies />
      <Partners />
    </>
  );
}
