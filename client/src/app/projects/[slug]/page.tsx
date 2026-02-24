import { GET_PROJECT_BY_SLUG } from '@/lib/wordpress-queries';
import { fetchWordPressGraphQL } from '@/lib/wordpress-ssr';
import Link from 'next/link';
import { Metadata } from 'next';

interface ProjectNode {
  id: string;
  title: string;
  slug: string;
  featuredImage: {
    node: {
      id: string;
      sourceUrl?: string;
      altText?: string;
    };
  };
  seo: {
    canonical?: string;
    cornerstone?: boolean;
    focuskw?: string;
    fullHead?: string;
    metaDesc?: string;
    metaKeywords?: string;
    metaRobotsNofollow?: string;
    metaRobotsNoindex?: string;
    opengraphAuthor?: string;
    opengraphDescription?: string;
    opengraphModifiedTime?: string;
    opengraphPublishedTime?: string;
    opengraphPublisher?: string;
    opengraphSiteName?: string;
    opengraphTitle?: string;
    opengraphType?: string;
    opengraphUrl?: string;
    readingTime?: number;
    title?: string;
  };
  projectFields: {
    fieldGroupName: string;
    specifications: {
      coverageArea: string;
      fieldGroupName: string;
      responseTime: string;
      warranty: string;
    };
    mainContentSection: string;
  };
}

interface ProjectsResponse {
  project: ProjectNode;
}

// Generate metadata for the project - SSR
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  console.log(`🎯 [METADATA] Generando metadata para slug: ${resolvedParams.slug}`);
  
  try {
    // Server-side GraphQL fetch
    const data = await fetchWordPressGraphQL<ProjectsResponse>(
      GET_PROJECT_BY_SLUG,
      { slug: resolvedParams.slug }
    );

    const project = data?.project;

    if (!project) {
      console.log('❌ [METADATA] Proyecto no encontrado');
      return {
        title: 'Project Not Found',
        description: 'The project you are looking for does not exist.',
      };
    }

    console.log('✅ [METADATA] Proyecto encontrado:', project.title);
    console.log('📋 [METADATA] SEO disponible:', !!project.seo);

    // SEO Data with fallbacks
    const seoTitle = project.seo?.title || project.title;
    const seoDescription = project.seo?.metaDesc || 
      project.projectFields?.mainContentSection?.substring(0, 160)?.replace(/<[^>]*>/g, '') || 
      `Read about ${project.title} project and our industrial electrical solutions.`;
    const canonicalUrl = project.seo?.canonical || `/projects/${project.slug}`;
    const ogTitle = project.seo?.opengraphTitle || seoTitle;
    const ogDescription = project.seo?.opengraphDescription || seoDescription;
    const ogUrl = project.seo?.opengraphUrl || canonicalUrl;
    const ogType = project.seo?.opengraphType || 'article';
    const metaKeywords = project.seo?.metaKeywords || '';
    const robotsIndex = project.seo?.metaRobotsNoindex || 'index';
    const robotsFollow = project.seo?.metaRobotsNofollow || 'follow';

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: metaKeywords,
      robots: {
        index: robotsIndex === 'index',
        follow: robotsFollow === 'follow',
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        type: (ogType as 'article' | 'website') || 'article',
        url: ogUrl,
        siteName: project.seo?.opengraphSiteName || '',
        publishedTime: project.seo?.opengraphPublishedTime || undefined,
        modifiedTime: project.seo?.opengraphModifiedTime || undefined,
        images: project.featuredImage?.node?.sourceUrl ? [
          {
            url: project.featuredImage.node.sourceUrl,
            width: 1200,
            height: 630,
            alt: project.featuredImage.node.altText || project.title,
          },
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: ogTitle,
        description: ogDescription,
        images: project.featuredImage?.node?.sourceUrl ? [project.featuredImage.node.sourceUrl] : [],
      },
      other: {
        'focus_keyword': project.seo?.focuskw || '',
        'est_reading_time': project.seo?.readingTime ? `${project.seo.readingTime} minute${project.seo.readingTime !== 1 ? 's' : ''}` : '',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Project',
      description: 'View our project details.',
    };
  }
}

// Page component - SSR
export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  console.log(`🖼️ [PAGE] Renderizando página para slug: ${resolvedParams.slug}`);
  
  try {
    // Server-side GraphQL fetch
    const data = await fetchWordPressGraphQL<ProjectsResponse>(
      GET_PROJECT_BY_SLUG,
      { slug: resolvedParams.slug }
    );

    const project = data?.project;

    if (!project) {
      console.log('❌ [PAGE] Proyecto no encontrado');
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Project Not Found</h2>
            <p className="text-gray-600 mb-4">The project you're looking for doesn't exist.</p>
            <Link
              href="/projects"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      );
    }

    console.log('✅ [PAGE] Proyecto encontrado:', project.title);
    console.log('🏗️ [PAGE] Fields disponibles:', !!project.projectFields);
    console.log('🖼️ [PAGE] Imagen:', !!project.featuredImage?.node?.sourceUrl);
    console.log('📝 [PAGE] Content length:', project.projectFields?.mainContentSection?.length || 0);
    
    // Logging específico de specifications
    if (project.projectFields?.specifications) {
      console.log('📋 [PAGE] Specifications completas:', project.projectFields.specifications);
      console.log('📍 [PAGE] Coverage Area:', project.projectFields.specifications.coverageArea);
      console.log('⏰ [PAGE] Response Time:', project.projectFields.specifications.responseTime);
      console.log('🛡️ [PAGE] Warranty:', project.projectFields.specifications.warranty);
    } else {
      console.log('❌ [PAGE] No specifications encontradas');
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>
          </div>

          {/* Project Header */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {project.featuredImage?.node?.sourceUrl && (
              <div className="h-64 md:h-96 w-full overflow-hidden">
                <img
                  src={project.featuredImage.node.sourceUrl}
                  alt={project.featuredImage.node.altText || project.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            )}
            
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {project.title}
              </h1>

              {/* Specifications */}
              {project.projectFields?.specifications && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Specifications</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.projectFields.specifications.coverageArea && (
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Location</div>
                        <div className="font-semibold text-gray-900">{project.projectFields.specifications.coverageArea}</div>
                      </div>
                    ) || (
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Location</div>
                        <div className="font-semibold text-gray-900">Not specified</div>
                      </div>
                    )}
                    {project.projectFields.specifications.responseTime && (
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Duration</div>
                        <div className="font-semibold text-gray-900">{project.projectFields.specifications.responseTime}</div>
                      </div>
                    ) || (
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Duration</div>
                        <div className="font-semibold text-gray-900">Not specified</div>
                      </div>
                    )}
                    {project.projectFields.specifications.warranty && (
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Warranty</div>
                        <div className="font-semibold text-gray-900">{project.projectFields.specifications.warranty}</div>
                      </div>
                    ) || (
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Warranty</div>
                        <div className="font-semibold text-gray-900">Not specified</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Main Content */}
              {project.projectFields?.mainContentSection && (
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: project.projectFields.mainContentSection }} 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-blue-600 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Interested in This Project?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Contact us to learn more about how we can help with your next project. Our team is ready to discuss your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                Request a Quote
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading project:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Project</h2>
          <p className="text-gray-600 mb-4">There was an error loading this project. Please try again later.</p>
          <Link
            href="/projects"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }
}
