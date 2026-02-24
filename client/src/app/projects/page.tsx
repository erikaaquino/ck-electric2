import { GET_ALL_PROJECTS } from '@/lib/wordpress-queries';
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
  projects: {
    nodes: ProjectNode[];
  };
}

// Generate metadata for the projects page - SSR
export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await fetchWordPressGraphQL<ProjectsResponse>(
      GET_ALL_PROJECTS
    );

    const projects = data?.projects?.nodes || [];
    const projectCount = projects.length;

    return {
      title: projectCount > 0 
        ? `Our Projects - ${projectCount} Industrial Electrical Projects`
        : 'Our Projects - Industrial Electrical Solutions',
      description: projectCount > 0
        ? `Browse our portfolio of ${projectCount} completed industrial electrical projects. See our work in lighting, electrical installations, and more.`
        : 'Discover our industrial electrical projects and solutions. From lighting installations to electrical systems, we deliver quality work.',
      keywords: 'industrial electrical projects, electrical installations, lighting projects, commercial electrical',
      openGraph: {
        title: 'Our Projects - Industrial Electrical Solutions',
        description: 'Browse our portfolio of completed industrial electrical projects',
        type: 'website',
        url: '/projects',
        images: projects.length > 0 && projects[0].featuredImage?.node?.sourceUrl ? [
          {
            url: projects[0].featuredImage.node.sourceUrl,
            width: 1200,
            height: 630,
            alt: 'Industrial Electrical Projects',
          },
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Our Projects - Industrial Electrical Solutions',
        description: 'Browse our portfolio of completed industrial electrical projects',
        images: projects.length > 0 && projects[0].featuredImage?.node?.sourceUrl ? [projects[0].featuredImage.node.sourceUrl] : [],
      },
    };
  } catch (error) {
    console.error('Error generating projects metadata:', error);
    return {
      title: 'Our Projects',
      description: 'Browse our industrial electrical projects and solutions.',
    };
  }
}

// Page component - SSR
export default async function ProjectsPage() {
  try {
    const data = await fetchWordPressGraphQL<ProjectsResponse>(
      GET_ALL_PROJECTS
    );

    const projects = data?.projects?.nodes || [];

    if (projects.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Projects
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Discover our latest work and see how we've helped clients achieve their goals
              </p>
              
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Found</h3>
                <p className="text-gray-600">Check back soon for our latest projects!</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our latest work and see how we've helped clients achieve their goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {project.featuredImage?.node?.sourceUrl && (
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={project.featuredImage.node.sourceUrl}
                      alt={project.featuredImage.node.altText || project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  
                  {project.projectFields?.specifications && (
                    <div className="mb-4">
                      <div className="space-y-2 text-sm">
                        {project.projectFields.specifications.coverageArea && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium">{project.projectFields.specifications.coverageArea}</span>
                          </div>
                        )}
                        {project.projectFields.specifications.responseTime && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">{project.projectFields.specifications.responseTime}</span>
                          </div>
                        )}
                        {project.projectFields.specifications.warranty && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Warranty:</span>
                            <span className="font-medium">{project.projectFields.specifications.warranty}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {project.projectFields?.mainContentSection && (
                    <div className="mb-4">
                      <p className="text-gray-600 text-sm line-clamp-3" 
                         dangerouslySetInnerHTML={{ 
                           __html: project.projectFields.mainContentSection.substring(0, 150) + '...' 
                         }} 
                      />
                    </div>
                  )}

                  <div className="mt-6">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium text-center block"
                    >
                      View Project Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading projects:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Projects</h2>
          <p className="text-gray-600 mb-4">There was an error loading projects. Please try again later.</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
}
