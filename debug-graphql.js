// Script para probar GraphQL directamente
const endpoint = 'http://testing2.local/graphql';

const query = `
  query GetProjectBySlug($slug: ID!) {
    project(id: $slug, idType: SLUG) {
      id
      title
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      projectFields {
        specifications {
          coverageArea
          responseTime
          warranty
        }
        mainContentSection
      }
    }
  }
`;

const variables = { slug: 'gensco-kirkland' };

fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query, variables }),
})
.then(response => response.json())
.then(data => {
  console.log('Respuesta GraphQL:', JSON.stringify(data, null, 2));
})
.catch(error => {
  console.error('Error:', error);
});
