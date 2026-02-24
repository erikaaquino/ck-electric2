import Link from 'next/link';
import Image from 'next/image';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    author: {
      node: {
        name: string;
      };
    };
    featuredImage?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
    categories: {
      nodes: Array<{
        name: string;
        slug: string;
      }>;
    };
  };
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {post.featuredImage && (
        <div className="relative h-48 w-full">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{post.author.node.name}</span>
        </div>
        
        {post.categories.nodes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.nodes.map((category) => (
              <span
                key={category.slug}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}
        
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-blue-600 transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h2>
        
        <div 
          className="text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
        
        <Link
          href={`/posts/${post.slug}`}
          className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 font-medium"
        >
          Read more
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
