// Script para verificar datos completos de un proyecto
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

const testSlugs = ['gensco-kirkland', 'otro-proyecto', 'proyecto-test'];

async function testProject(slug) {
  console.log(`\n🔍 Probando proyecto: ${slug}`);
  console.log('=' .repeat(50));
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { slug } }),
    });

    const data = await response.json();
    
    if (data.errors) {
      console.log('❌ Errores GraphQL:', data.errors);
      return;
    }

    const project = data.data.project;
    
    if (!project) {
      console.log('❌ Proyecto no encontrado');
      return;
    }

    console.log('✅ Proyecto encontrado:', project.title);
    console.log('📋 Specifications:');
    
    if (project.projectFields?.specifications) {
      console.log('  📍 Coverage Area:', project.projectFields.specifications.coverageArea);
      console.log('  ⏰ Response Time:', project.projectFields.specifications.responseTime);
      console.log('  🛡️ Warranty:', project.projectFields.specifications.warranty);
    } else {
      console.log('  ❌ No specifications disponibles');
    }
    
    console.log('🖼️ Tiene imagen:', !!project.featuredImage?.node?.sourceUrl);
    console.log('📝 Content length:', project.projectFields?.mainContentSection?.length || 0);
    
  } catch (error) {
    console.error('❌ Error en la llamada:', error.message);
  }
}

// Probar todos los slugs
testSlugs.forEach(testProject);
