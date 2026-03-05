import { Metadata } from 'next';
import RequestEstimateForm from '@/components/RequestEstimateForm';
import { fetchWordPressGraphQL } from '@/lib/wordpress-graphql';
import { GET_REQUEST_ESTIMATE_PAGE } from '@/lib/wordpress-queries';
import type { RequestEstimatePageData } from '@/lib/wordpress-types';

// Generate metadata for the request estimate page - SSR
export async function generateMetadata(): Promise<Metadata> {
  // Fetch page data to get SEO information
  const pageDataResponse = await fetchWordPressGraphQL<RequestEstimatePageData>(GET_REQUEST_ESTIMATE_PAGE);
  const pageData = pageDataResponse?.data || null;

  return {
    title: pageData?.page?.seo?.metaDesc || 'Request a Free Estimate | CK Electric - Puget Sound',
    description: pageData?.page?.seo?.metaDesc || 'Request a free estimate for electrical services from CK Electric. Professional electrical contractors serving Tacoma to Skagit Valley.',
    keywords: pageData?.page?.seo?.metaKeywords || 'free electrical estimate, electrical services quote, CK Electric estimate, electrical contractor Tacoma, electrical services Puget Sound',
  };
}

export default async function RequestEstimatePage() {
  // Fetch request estimate page data from WordPress
  const pageDataResponse = await fetchWordPressGraphQL<RequestEstimatePageData>(GET_REQUEST_ESTIMATE_PAGE);
  const pageData = pageDataResponse?.data || null;

  return <RequestEstimateForm pageData={pageData} />;
}
