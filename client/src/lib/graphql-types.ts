// Shared GraphQL TypeScript interfaces for WordPress data

export interface GraphQLFeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
  };
}

export interface GraphQLAuthor {
  node: {
    name: string;
    avatar?: {
      url: string;
    };
  };
}

export interface GraphQLTerm {
  name: string;
  slug: string;
}

export interface GraphQLPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage?: GraphQLFeaturedImage;
}

export interface GraphQLPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  author?: GraphQLAuthor;
  featuredImage?: GraphQLFeaturedImage;
  categories?: {
    nodes: GraphQLTerm[];
  };
  tags?: {
    nodes: GraphQLTerm[];
  };
}

export interface GraphQLCategory {
  name: string;
  slug: string;
  count: number;
}

// Query response interfaces
export interface PagesData {
  pages: {
    nodes: GraphQLPage[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface PostsData {
  posts: {
    nodes: GraphQLPost[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface PageData {
  page: GraphQLPage;
}

export interface PostData {
  post: GraphQLPost;
}

export interface GraphQLHeroSection {
  subtitle: string;
  title: string;
}

export interface GraphQLPostWithHero {
  id: string;
  heroSection?: GraphQLHeroSection;
}

export interface PostsHeroData {
  posts: {
    nodes: GraphQLPostWithHero[];
  };
}
