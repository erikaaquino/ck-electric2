import { GET_POST_BY_SLUG } from '@/lib/wordpress-queries';
import { fetchWordPressGraphQL } from '@/lib/wordpress-ssr';
import Link from 'next/link';
import { Metadata } from 'next';

interface GraphQLPost {
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
  categories?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  tags?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  heroSection?: {
    title: string;
    subtitle: string;
  };
}

interface PostResponse {
  post: GraphQLPost;
}

// Generate metadata for the post - SSR
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const data = await fetchWordPressGraphQL<PostResponse>(
      GET_POST_BY_SLUG,
      { slug: resolvedParams.slug }
    );

    const post = data?.post;

    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The post you are looking for does not exist.',
      };
    }

    const seoTitle = post.title;
    const seoDescription = post.excerpt?.replace(/<[^>]*>/g, '') || 
      post.content?.substring(0, 160)?.replace(/<[^>]*>/g, '') || 
      `Read about ${post.title} and discover more insights.`;

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: post.categories?.nodes.map(cat => cat.name).join(', ') || 'blog post, article',
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        type: 'article',
        url: `/posts/${post.slug}`,
        images: post.featuredImage?.node?.sourceUrl ? [
          {
            url: post.featuredImage.node.sourceUrl,
            width: 1200,
            height: 630,
            alt: post.featuredImage.node.altText || post.title,
          },
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: seoTitle,
        description: seoDescription,
        images: post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : [],
      },
    };
  } catch (error) {
    console.error('Error generating post metadata:', error);
    return {
      title: 'Post',
      description: 'Read our blog post content.',
    };
  }
}

// Page component - SSR
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  try {
    const data = await fetchWordPressGraphQL<PostResponse>(
      GET_POST_BY_SLUG,
      { slug: resolvedParams.slug }
    );

    const post = data?.post;

    if (!post) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Post Not Found</h2>
            <p className="text-gray-600 mb-4">The post you are looking for does not exist.</p>
            <Link
              href="/posts"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Posts
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
              href="/posts"
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Posts
            </Link>
          </nav>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {post.featuredImage && (
              <div className="w-full">
                <img
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  className="w-full h-64 md:h-96 object-cover"
                  loading="eager"
                />
              </div>
            )}

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="text-sm text-gray-500 mb-4">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                
                {post.heroSection && (
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-blue-600 mb-2">{post.heroSection.title}</h2>
                    {post.heroSection.subtitle && (
                      <p className="text-lg text-gray-600">{post.heroSection.subtitle}</p>
                    )}
                  </div>
                )}
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>
                
                {post.categories && post.categories.nodes.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {post.categories.nodes.map((category) => (
                      <span
                        key={category.slug}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {post.tags && post.tags.nodes.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.nodes.map((tag) => (
                      <span
                        key={tag.slug}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="text-sm text-gray-500 text-center">
                  Last updated: {new Date(post.modified).toLocaleDateString('en-US', {
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
              href="/posts"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading post:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Post</h2>
          <p className="text-gray-600 mb-4">There was an error loading this post. Please try again later.</p>
          <Link
            href="/posts"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }
}
