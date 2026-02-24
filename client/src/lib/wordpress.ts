import axios from 'axios';

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://your-wordpress-site.com';
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';

// Use query parameter format for REST API to avoid permalink issues
const REST_API_BASE = `${WORDPRESS_URL}/index.php?rest_route=/wp/v2`;

export interface WordPressPage {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  modified: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  modified: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface WordPressTag {
  id: number;
  name: string;
  slug: string;
}

class WordPressAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = REST_API_BASE;
  }

  async getPosts(page: number = 1, perPage: number = 10): Promise<WordPressPost[]> {
    try {
      const response = await axios.get(`${this.baseURL}/posts/`, {
        params: {
          page,
          per_page: perPage,
          _embed: true,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  async getPages(page: number = 1, perPage: number = 10): Promise<WordPressPage[]> {
    try {
      const response = await axios.get(`${this.baseURL}/pages/`, {
        params: {
          page,
          per_page: perPage,
          _embed: true,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  }

  async getPage(slug: string): Promise<WordPressPage> {
    try {
      const response = await axios.get(`${this.baseURL}/pages/`, {
        params: {
          slug,
          _embed: true,
        },
      });
      return response.data[0];
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  }

  async getPost(slug: string): Promise<WordPressPost> {
    try {
      const response = await axios.get(`${this.baseURL}/posts/`, {
        params: {
          slug,
          _embed: true,
        },
      });
      return response.data[0];
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }

  async getCategories(): Promise<WordPressCategory[]> {
    try {
      const response = await axios.get(`${this.baseURL}/categories/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async getTags(): Promise<WordPressTag[]> {
    try {
      const response = await axios.get(`${this.baseURL}/tags/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  }

  async getPostsByCategory(categoryId: number, page: number = 1, perPage: number = 10): Promise<WordPressPost[]> {
    try {
      const response = await axios.get(`${this.baseURL}/posts/`, {
        params: {
          categories: categoryId,
          page,
          per_page: perPage,
          _embed: true,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      throw error;
    }
  }

  async getPostsByTag(tagId: number, page: number = 1, perPage: number = 10): Promise<WordPressPost[]> {
    try {
      const response = await axios.get(`${this.baseURL}/posts/`, {
        params: {
          tags: tagId,
          page,
          per_page: perPage,
          _embed: true,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching posts by tag:', error);
      throw error;
    }
  }
}

export const wordpressAPI = new WordPressAPI();
