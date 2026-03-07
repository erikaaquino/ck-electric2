import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { fetchWordPressGraphQL } from '@/lib/wordpress-ssr';
import { GET_CONTACT_PAGE } from '@/lib/wordpress-queries';

interface ContactPageData {
  page: {
    title: string;
    content: string;
    seo: {
      metaDesc: string;
      metaKeywords: string;
    };
    contactInformation: {
      businessHours: string;
      facebookLink: string;
      location: string;
      mattPhoneNumber: string;
      principalEmail: string;
      robPhoneNumber: string;
      extraInfo: { subtitle: string; title: string };
      forwardedTo: { mattEmail: string; robEmail: string };
      googleMapsRating: { locationLink: string; rating: string };
    };
    slug: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchWordPressGraphQL<ContactPageData>(GET_CONTACT_PAGE);
  const page = data?.page;

  return {
    title: page?.title || 'Contact Us',
    description:
      page?.seo?.metaDesc ||
      'Contact CK Electric for expert commercial and residential electrical services across Puget Sound. Licensed, bonded, and ready to help.',
    keywords: page?.seo?.metaKeywords || 'contact electrician, hire electrician Puget Sound, CK Electric contact',
  };
}

export default async function ContactPage() {
  const data = await fetchWordPressGraphQL<ContactPageData>(GET_CONTACT_PAGE);
  return <ContactForm pageData={data?.page ?? null} />;
}
