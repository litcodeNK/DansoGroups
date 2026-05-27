import { Hero } from '@/components/Hero';
import { BookAds } from '@/components/BookAds';
import { Partners } from '@/components/Partners';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { CaseStudies } from '@/components/CaseStudies';
import { Testimonials } from '@/components/Testimonials';
import { BlogNews } from '@/components/BlogNews';
import { Team } from '@/components/Team';
import { FAQ } from '@/components/FAQ';
import { CTABanner } from '@/components/CTABanner';

export default function Home() {
  return (
    <>
      <Hero />
      <BookAds />
      <Partners />
      <About />
      <Services />
      <WhyChooseUs />
      <CaseStudies />
      <Testimonials />
      <BlogNews />
      <Team />
      <FAQ />
      <CTABanner />
    </>
  );
}
