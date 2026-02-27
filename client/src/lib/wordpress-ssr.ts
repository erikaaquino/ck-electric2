// Server-side WordPress GraphQL fetch for SSR
interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function fetchWordPressGraphQL<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T | null> {
  const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  
  console.log('🔍 [GraphQL] Iniciando llamada...');
  console.log('📍 [GraphQL] Endpoint:', endpoint);
  console.log('📝 [GraphQL] Variables:', variables);
  console.log('📋 [GraphQL] Query:', query.substring(0, 200) + '...');
  
  if (!endpoint) {
    console.error('❌ [GraphQL] WordPress GraphQL endpoint not configured');
    return null;
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Next.js SSR Client',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      // Important for SSR: use revalidate instead of cache options
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    console.log('📡 [GraphQL] Response Status:', response.status);

    if (!response.ok) {
      console.error('❌ [GraphQL] Request failed:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('❌ [GraphQL] Error response:', errorText);
      return null;
    }

    const result: GraphQLResponse<T> = await response.json();
    
    if (result.errors) {
      console.error('❌ [GraphQL] Errors:', result.errors);
      return null;
    }

    console.log('✅ [GraphQL] Success! Data keys:', Object.keys(result.data || {}));
    console.log('📊 [GraphQL] Data preview:', JSON.stringify(result.data, null, 2));
    
    return result.data || null;
  } catch (error) {
    console.error('❌ [GraphQL] Exception:', error);
    return null;
  }
}
