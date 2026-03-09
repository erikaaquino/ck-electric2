import { GET_SERVICES_PAGE, GET_ALL_SERVICES, GET_LANDING_PAGE } from '@/lib/wordpress-queries';
import { ServicesPageData, ServicesResponse } from '@/lib/wordpress-types';
import { fetchWordPressGraphQL } from '@/lib/wordpress-ssr';
import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import ServicesSearch from '@/components/ServicesSearch';

function stripHtml(html: string | undefined): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchWordPressGraphQL<ServicesPageData>(GET_SERVICES_PAGE);
  const page = pageData?.page;

  return {
    title: page?.title || 'Electrical Services',
    description:
      page?.seo?.metaDesc ||
      'Professional electrical services including commercial TIs, wiring, panel upgrades, EV charger installation, and emergency repair across Puget Sound.',
    keywords:
      page?.seo?.metaKeywords ||
      'electrical services, commercial electrical, residential electrical, EV charger installation, panel upgrades, emergency repair, Puget Sound',
    openGraph: {
      title: page?.title || 'Electrical Services | CK Electric',
      description: page?.seo?.opengraphDescription || page?.seo?.metaDesc || '',
      type: 'website',
      images: (page?.seo as any)?.opengraphImage?.mediaItemUrl
        ? [{ url: (page?.seo as any).opengraphImage.mediaItemUrl, width: 1200, height: 630, alt: 'CK Electric Services' }]
        : [],
    },
  };
}

export default async function ServicesPage() {
  const [pageData, servicesData, headerData] = await Promise.all([
    fetchWordPressGraphQL<ServicesPageData>(GET_SERVICES_PAGE),
    fetchWordPressGraphQL<ServicesResponse>(GET_ALL_SERVICES),
    fetchWordPressGraphQL<{ page: { landingPage: { headerInfo: { contactPhoneNumber: string } } } }>(GET_LANDING_PAGE),
  ]);

  const page = pageData?.page;
  const services = servicesData?.services?.nodes || [];
  const contactPhone = headerData?.page?.landingPage?.headerInfo?.contactPhoneNumber || '2062956363';
  const cleanContent = stripHtml(page?.content);

  return (
    <>
      <HeroSection
        title={page?.title || 'Professional Electrical Services'}
        subtitle={
          cleanContent ||
          'From commercial tenant improvements to residential rewiring, our licensed electricians deliver quality workmanship across Puget Sound.'
        }
        primaryButtonText={page?.ctaButtonsHero?.primaryCtaText || 'Get a Free Estimate'}
        primaryButtonHref={page?.ctaButtonsHero?.primaryCtaLink || '/request-estimate'}
        secondaryButtonText={page?.ctaButtonsHero?.secondaryCtaText || 'Call Us Now'}
        secondaryButtonHref={page?.ctaButtonsHero?.secondaryCtaLink || `tel:${contactPhone}`}
        backgroundImage={
          page?.featuredImage?.node?.mediaItemUrl ||
          'https://images.unsplash.com/photo-1621905492509-7d1729c5be18?w=1920&h=1080&fit=crop'
        }
      />

      <section className="py-20 bg-neutral-50" aria-label="All services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesSearch services={services} />
        </div>
      </section>
    </>
  );
}
