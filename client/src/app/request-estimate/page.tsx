import { Metadata } from 'next';
import RequestEstimateForm from '@/components/RequestEstimateForm';
import { fetchWordPressGraphQL } from '@/lib/wordpress-ssr';
import { GET_REQUEST_ESTIMATE_PAGE } from '@/lib/wordpress-queries';
import type { RequestEstimatePageData } from '@/lib/wordpress-types';

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetchWordPressGraphQL<RequestEstimatePageData>(GET_REQUEST_ESTIMATE_PAGE);
  const page = response?.page;

  return {
    title: page?.title || 'Request a Free Estimate',
    description:
      page?.seo?.metaDesc ||
      'Request a free estimate for electrical services from CK Electric. Professional electrical contractors serving Tacoma to Skagit Valley.',
    keywords:
      page?.seo?.metaKeywords ||
      'free electrical estimate, electrical services quote, CK Electric estimate, electrical contractor Tacoma, electrical services Puget Sound',
  };
}

export default async function RequestEstimatePage() {
  const response = await fetchWordPressGraphQL<RequestEstimatePageData>(GET_REQUEST_ESTIMATE_PAGE);
  return <RequestEstimateForm pageData={response} />;
}
