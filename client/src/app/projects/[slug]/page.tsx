import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import DetailView from '@/components/DetailView';
import { fetchWordPressGraphQL } from '@/lib/wordpress-ssr';
import { GET_PROJECT_BY_SLUG, GET_ALL_PROJECTS } from '@/lib/wordpress-queries';
import type { ProjectsResponse } from '@/lib/wordpress-types';

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

interface ProjectDetailResponse {
  project: ProjectNode;
}

export async function generateStaticParams() {
  const data = await fetchWordPressGraphQL<ProjectsResponse>(GET_ALL_PROJECTS);
  return (data?.projects?.nodes || []).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await fetchWordPressGraphQL<ProjectDetailResponse>(GET_PROJECT_BY_SLUG, { slug });
    const project = data?.project;

    if (!project) {
      return { title: 'Project Not Found' };
    }

    const seoTitle = project.seo?.title || project.title;
    const seoDescription =
      project.seo?.metaDesc ||
      project.projectFields?.mainContentSection?.substring(0, 160)?.replace(/<[^>]*>/g, '') ||
      `${project.title} — electrical project completed by CK Electric in ${project.projectFields?.specifications?.coverageArea || 'Puget Sound'}.`;

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: project.seo?.metaKeywords || '',
      robots: {
        index: project.seo?.metaRobotsNoindex !== 'noindex',
        follow: project.seo?.metaRobotsNofollow !== 'nofollow',
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
      alternates: {
        canonical: project.seo?.canonical || `/projects/${slug}`,
      },
      openGraph: {
        title: project.seo?.opengraphTitle || seoTitle,
        description: project.seo?.opengraphDescription || seoDescription,
        type: 'article',
        url: project.seo?.opengraphUrl || `https://ck-electric.com/projects/${slug}`,
        siteName: project.seo?.opengraphSiteName || 'CK Electric',
        publishedTime: project.seo?.opengraphPublishedTime,
        modifiedTime: project.seo?.opengraphModifiedTime,
        images: project.featuredImage?.node?.sourceUrl
          ? [{ url: project.featuredImage.node.sourceUrl, width: 1200, height: 630, alt: project.featuredImage.node.altText || project.title }]
          : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: project.seo?.opengraphTitle || seoTitle,
        description: project.seo?.opengraphDescription || seoDescription,
        images: project.featuredImage?.node?.sourceUrl ? [project.featuredImage.node.sourceUrl] : [],
      },
    };
  } catch {
    return {
      title: 'Project | CK Electric',
      description: 'View our project details.',
    };
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [data, allProjectsData] = await Promise.all([
    fetchWordPressGraphQL<ProjectDetailResponse>(GET_PROJECT_BY_SLUG, { slug }),
    fetchWordPressGraphQL<ProjectsResponse>(GET_ALL_PROJECTS),
  ]);

  const project = data?.project;

  if (!project) {
    notFound();
  }

  const allProjects = allProjectsData?.projects?.nodes || [];

  const relatedProjects = allProjects
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      title: p.title,
      description: 'Professional electrical project completed with precision and quality.',
      image: p.featuredImage?.node?.mediaItemUrl || 'https://images.unsplash.com/photo-1603796826034-2a34491c3b2e?w=400&h=300&fit=crop',
      link: `/projects/${p.slug}`,
      category: p.projectFields?.specifications?.coverageArea || 'Project',
      readTime: '5 min read',
    }));

  return (
    <DetailView
      title={project.title}
      subtitle={`Professional electrical project completed in ${project.projectFields?.specifications?.coverageArea || 'Puget Sound'} with precision and quality workmanship.`}
      backgroundImage={project.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1603796826034-2a34491c3b2e?w=1920&h=1080&fit=crop'}
      primaryButtonText="View Project Details"
      primaryButtonHref="#details"
      contentTitle="Project Overview"
      content={project.projectFields?.mainContentSection || 'This project showcases our commitment to excellence in electrical services.'}
      specifications={[
        { label: 'Location', value: project.projectFields?.specifications?.coverageArea || 'Puget Sound' },
        { label: 'Duration', value: project.projectFields?.specifications?.responseTime || '2-4 weeks' },
        { label: 'Warranty', value: project.projectFields?.specifications?.warranty || '5 Years' },
      ]}
      ctaText="Get a Free Estimate"
      ctaHref="/request-estimate"
      relatedTitle="Related Projects"
      relatedSectionType="projects"
      relatedItems={relatedProjects}
    />
  );
}
