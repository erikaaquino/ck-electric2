import { GET_SERVICES_PAGE, ServicesPageData } from '@/lib/wordpress-queries';
import { fetchWordPressGraphQL } from '@/lib/wordpress-ssr';
import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import ServiceCard from '@/components/ServiceCard';

// Helper function to strip HTML tags and decode entities
function stripHtml(html: string | undefined): string {
  if (!html) return '';
  
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  const decoded = text
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
    .replace(/&nbsp;/g, ' ');
  
  // Clean up extra whitespace
  return decoded.replace(/\s+/g, ' ').trim();
}

// Generate metadata for the services page - SSR
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Fetch services page data from WordPress
    const pageDataResponse = await fetchWordPressGraphQL<ServicesPageData>(
      GET_SERVICES_PAGE
    );

    const pageData = pageDataResponse?.page;

    return {
      title: pageData?.title || 'Services | CK Electric - Puget Sound',
      description: pageData?.seo?.metaDesc || 'Professional electrical services including commercial TIs, wiring, panel upgrades, EV chargers, and emergency repair across Puget Sound.',
      keywords: pageData?.seo?.metaKeywords || 'electrical services, commercial electrical, residential electrical, EV charger installation, panel upgrades, emergency repair, Puget Sound',
    };
  } catch (error) {
    console.error('Error generating services metadata:', error);
    return {
      title: 'Services | CK Electric - Puget Sound',
      description: 'Professional electrical services including commercial TIs, wiring, panel upgrades, EV chargers, and emergency repair across Puget Sound.',
    };
  }
}

export default async function ServicesPage() {
  try {
    // Fetch services page data from WordPress
    const pageDataResponse = await fetchWordPressGraphQL<ServicesPageData>(
      GET_SERVICES_PAGE
    );

    const pageData = pageDataResponse?.page;

    // Clean the content for display
    const cleanContent = stripHtml(pageData?.content);

    const services = [
      {
        id: 1,
        title: "Commercial Electrical",
        description: "Complete electrical solutions for businesses including tenant improvements, new construction, and system upgrades.",
        icon: "⚡",
        link: "/services/commercial-electrical"
      },
      {
        id: 2,
        title: "Residential Electrical",
        description: "Expert electrical services for homeowners including rewiring, panel upgrades, and safety inspections.",
        icon: "🏠",
        link: "/services/residential-electrical"
      },
      {
        id: 3,
        title: "EV Charger Installation",
        description: "Professional electric vehicle charger installation for homes and businesses with certified electricians.",
        icon: "�",
        link: "/services/ev-charger-installation"
      },
      {
        id: 4,
        title: "Emergency Electrical",
        description: "24/7 emergency electrical services for power outages, wiring issues, and electrical emergencies.",
        icon: "�",
        link: "/services/emergency-electrical"
      },
      {
        id: 5,
        title: "Panel Upgrades",
        description: "Modern electrical panel upgrades to handle today's power demands and improve safety.",
        icon: "⚙️",
        link: "/services/panel-upgrades"
      },
      {
        id: 6,
        title: "Lighting Installation",
        description: "Professional lighting solutions for commercial and residential properties with energy-efficient options.",
        icon: "💡",
        link: "/services/lighting-installation"
      }
    ];

    return (
      <>
        <HeroSection
          title={pageData?.title || "Professional Electrical Services"}
          subtitle={cleanContent || "From commercial tenant improvements to residential rewiring, our licensed electricians deliver quality workmanship across Puget Sound."}
          primaryButtonText={pageData?.ctaButtonsHero?.primaryCtaText || "Get a Free Estimate"}
          primaryButtonHref={pageData?.ctaButtonsHero?.primaryCtaLink || "/request-estimate"}
          secondaryButtonText={pageData?.ctaButtonsHero?.secondaryCtaText || "Call Us Now"}
          secondaryButtonHref={pageData?.ctaButtonsHero?.secondaryCtaLink || "/contact"}
          backgroundImage={pageData?.featuredImage?.node?.mediaItemUrl || "https://images.unsplash.com/photo-1621905492509-7d1729c5be18?w=1920&h=1080&fit=crop"}
        />
        
        <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
              />
            ))}
          </div>
        </div>
      </section>
      </>
    );
  } catch (error) {
    console.error('Error loading services page:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Services</h2>
          <p className="text-gray-600 mb-4">There was an error loading services. Please try again later.</p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }
}
