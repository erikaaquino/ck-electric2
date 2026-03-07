// WordPress GraphQL API configuration and fetch function

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://your-wordpress-site.com/graphql';

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: Array<string | number>;
  }>;
  extensions?: Record<string, any>;
}

export async function fetchWordPressGraphQL<T>(query: string, variables?: Record<string, any>): Promise<GraphQLResponse<T>> {

  try {
    const response = await fetch(WORDPRESS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });


    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ GraphQL HTTP Error:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ GraphQL fetch error:', error);
    throw error;
  }
}
