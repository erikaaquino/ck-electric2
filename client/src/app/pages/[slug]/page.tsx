import { GET_PAGE_BY_SLUG } from '@/lib/wordpress-queries';
import { fetchWordPressGraphQL } from '@/lib/wordpress-ssr';
import Link from 'next/link';
import { Metadata } from 'next';

interface GraphQLPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

interface PageResponse {
  page: GraphQLPage;
}

// Generate metadata for the page - SSR
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const data = await fetchWordPressGraphQL<PageResponse>(
      GET_PAGE_BY_SLUG,
      { slug: resolvedParams.slug }
    );

    const page = data?.page;

    if (!page) {
      return {
        title: 'Page Not Found',
        description: 'The page you are looking for does not exist.',
      };
    }

    const seoTitle = page.title;
    const seoDescription = page.excerpt?.replace(/<[^>]*>/g, '') || 
      page.content?.substring(0, 160)?.replace(/<[^>]*>/g, '') || 
      `Read about ${page.title} and discover more information.`;

    return {
      title: seoTitle,
      description: seoDescription,
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        type: 'article',
        url: `/pages/${page.slug}`,
        images: page.featuredImage?.node?.sourceUrl ? [
          {
            url: page.featuredImage.node.sourceUrl,
            width: 1200,
            height: 630,
            alt: page.featuredImage.node.altText || page.title,
          },
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: seoTitle,
        description: seoDescription,
        images: page.featuredImage?.node?.sourceUrl ? [page.featuredImage.node.sourceUrl] : [],
      },
    };
  } catch (error) {
    console.error('Error generating page metadata:', error);
    return {
      title: 'Page',
      description: 'View our page content.',
    };
  }
}

// Page component - SSR
export default async function PageView({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  try {
    const data = await fetchWordPressGraphQL<PageResponse>(
      GET_PAGE_BY_SLUG,
      { slug: resolvedParams.slug }
    );

    const page = data?.page;

    if (!page) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-4">The page you are looking for does not exist.</p>
            <Link
              href="/pages"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Pages
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-8">
            <Link
              href="/pages"
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Pages
            </Link>
          </nav>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {page.featuredImage && (
              <div className="w-full">
                <img
                  src={page.featuredImage.node.sourceUrl}
                  alt={page.featuredImage.node.altText || page.title}
                  className="w-full h-64 md:h-96 object-cover"
                  loading="eager"
                />
              </div>
            )}

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="text-sm text-gray-500 mb-4">
                  {new Date(page.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {page.title}
                </h1>
              </div>

              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-700"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />

              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="text-sm text-gray-500 text-center">
                  Last updated: {new Date(page.modified).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </article>

          <div className="mt-12 text-center">
            <Link
              href="/pages"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              View All Pages
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading page:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Page</h2>
          <p className="text-gray-600 mb-4">There was an error loading this page. Please try again later.</p>
          <Link
            href="/pages"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Pages
          </Link>
        </div>
      </div>
    );
  }
}
