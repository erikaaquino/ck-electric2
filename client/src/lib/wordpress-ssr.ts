// Server-side WordPress GraphQL fetch for SSR
interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function fetchWordPressGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T | null> {
  const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  if (!endpoint) {
    console.error('[GraphQL] NEXT_PUBLIC_WORDPRESS_API_URL is not configured');
    return null;
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Next.js SSR Client',
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      console.error('[GraphQL] Request failed:', response.status, response.statusText);
      return null;
    }

    const result: GraphQLResponse<T> = await response.json();

    if (result.errors) {
      console.error('[GraphQL] Errors:', result.errors);
      return null;
    }

    return result.data || null;
  } catch (error) {
    console.error('[GraphQL] Exception:', error);
    return null;
  }
}
