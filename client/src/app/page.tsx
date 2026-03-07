import { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { fetchWordPressGraphQL } from '@/lib/wordpress-ssr';
import {
  GET_LANDING_PAGE,
  GET_OWNERS,
  GET_SERVICE_AREAS,
  GET_TESTIMONIALS,
  GET_CLIENTS,
  GET_ALL_SERVICES,
  GET_ALL_PROJECTS,
} from '@/lib/wordpress-queries';
import type {
  LandingPageData,
  OwnersData,
  TestimonialsData,
  ClientsData,
  ServicesResponse,
  ProjectsResponse,
} from '@/lib/wordpress-types';

export async function generateMetadata(): Promise<Metadata> {
  const landingPage = await fetchWordPressGraphQL<LandingPageData>(GET_LANDING_PAGE);
  const page = landingPage?.page;

  return {
    title: page?.seo?.title || 'CK Electric | Premier Electrical Contractor Puget Sound',
    description:
      page?.seo?.metaDesc ||
      'Talk directly with licensed electricians. No call centers, no middlemen. Fast response and industrial-grade quality for every project in the Puget Sound.',
    keywords:
      page?.seo?.metaKeywords ||
      'electrical contractor, licensed electrician, commercial electrical, residential electrical, EV charger installation, panel upgrades, Puget Sound',
    openGraph: {
      title: page?.seo?.opengraphTitle || 'CK Electric | Premier Electrical Contractor Puget Sound',
      description:
        page?.seo?.opengraphDescription ||
        'Talk directly with licensed electricians. No call centers, no middlemen. Fast response and industrial-grade quality for every project.',
      type: 'website',
      url: 'https://ck-electric.com',
      images: page?.seo?.opengraphImage?.mediaItemUrl
        ? [{ url: page.seo.opengraphImage.mediaItemUrl, width: 1200, height: 630, alt: 'CK Electric - Premier Electrical Contractor' }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: page?.seo?.opengraphTitle || 'CK Electric | Premier Electrical Contractor Puget Sound',
      description:
        page?.seo?.opengraphDescription ||
        'Talk directly with licensed electricians. No call centers, no middlemen. Fast response and industrial-grade quality.',
      images: page?.seo?.opengraphImage?.mediaItemUrl
        ? [page.seo.opengraphImage.mediaItemUrl]
        : [],
    },
  };
}

export default async function Home() {
  const [
    landingPageData,
    ownersData,
    serviceAreasData,
    testimonialsData,
    clientsData,
    servicesData,
    projectsData,
  ] = await Promise.all([
    fetchWordPressGraphQL<LandingPageData>(GET_LANDING_PAGE),
    fetchWordPressGraphQL<OwnersData>(GET_OWNERS),
    fetchWordPressGraphQL<{ serviceAreas: { nodes: unknown[] } }>(GET_SERVICE_AREAS),
    fetchWordPressGraphQL<TestimonialsData>(GET_TESTIMONIALS),
    fetchWordPressGraphQL<ClientsData>(GET_CLIENTS),
    fetchWordPressGraphQL<ServicesResponse>(GET_ALL_SERVICES),
    fetchWordPressGraphQL<ProjectsResponse>(GET_ALL_PROJECTS),
  ]);

  const contactPhone =
    landingPageData?.page?.landingPage?.headerInfo?.contactPhoneNumber || '2062956363';

  return (
    <HomePage
      landingPageData={landingPageData}
      ownersData={ownersData}
      serviceAreasData={serviceAreasData}
      testimonialsData={testimonialsData}
      clientsData={clientsData}
      servicesData={servicesData}
      projectsData={projectsData}
      contactPhone={contactPhone}
    />
  );
}
