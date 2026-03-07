import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import BlogArticle from '@/components/BlogArticle';
import CtaBox from '@/components/CtaBox';
import RelatedArticles from '@/components/RelatedArticles';
import { ArrowRightAlt } from '@mui/icons-material';
import { GET_BLOG_BY_SLUG, BlogDetailData, GET_LANDING_PAGE } from '@/lib/wordpress-queries';
import { fetchWordPressGraphQL } from '@/lib/wordpress-ssr';
import { renderRichTextSSR } from '@/lib/render-rich-text';

// Generate metadata for blog article page - SSR
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    // Await the params promise for Next.js 15+
    const resolvedParams = await params;
    
    const response = await fetchWordPressGraphQL<BlogDetailData>(
      GET_BLOG_BY_SLUG,
      { slug: resolvedParams.slug }
    );

    const blogData = response?.blog;

    return {
      title: blogData?.seo?.title || blogData?.title || 'Blog | CK Electric - Puget Sound',
      description: blogData?.seo?.metaDesc || 'Electrical tips, industry insights, and project highlights from CK Electric professionals serving Puget Sound.',
      keywords: blogData?.seo?.metaKeywords || 'electrical blog, electrical tips, electrical safety, electrical projects, Puget Sound electrical contractor',
    };
  } catch (error) {
    console.error('Error generating blog metadata:', error);
    return {
      title: 'Blog | CK Electric - Puget Sound',
      description: 'Electrical tips, industry insights, and project highlights from CK Electric professionals serving Puget Sound.',
    };
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params promise for Next.js 15+
  const resolvedParams = await params;
  
  // Basic debugging
  console.log('=== BLOG DETAIL PAGE DEBUG ===');
  console.log('params object:', JSON.stringify(resolvedParams, null, 2));
  console.log('params.slug:', resolvedParams.slug);
  console.log('typeof params.slug:', typeof resolvedParams.slug);
  
  if (!resolvedParams.slug) {
    console.log('❌ No slug provided');
    return <div>Error: No slug parameter provided</div>;
  }

  // Fetch header data to get contact phone
  let contactPhone = "2062956363"; // fallback
  try {
    const headerResponse = await fetchWordPressGraphQL<any>(GET_LANDING_PAGE);
    if (headerResponse?.data?.page?.landingPage?.headerInfo?.contactPhoneNumber) {
      contactPhone = headerResponse.data.page.landingPage.headerInfo.contactPhoneNumber;
    }
  } catch (error) {
    console.error('Error fetching header data:', error);
  }
  
  try {
    // Fetch blog data from WordPress
    const variables = { slug: resolvedParams.slug };
    console.log('GraphQL variables:', JSON.stringify(variables, null, 2));
    
    const response = await fetchWordPressGraphQL<BlogDetailData>(
      GET_BLOG_BY_SLUG,
      variables
    );

    console.log('🔍 BlogArticlePage - GraphQL Response:', response);
    const blogData = response?.blog;
    
    if (!blogData) {
      // Handle not found case
      return <div>Blog post not found</div>;
    }

    // Format date
    const date = new Date(blogData.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });

    // Extract categories
    const categories = blogData?.blogEntry.categories.nodes.map((cat: any) => cat.name) || [];
    
    // Author info
    const authorName = `${blogData.blogEntry.authorFirstName} ${blogData.blogEntry.authorLastName}`;
    const authorInitials = `${blogData.blogEntry.authorFirstName.charAt(0)}${blogData.blogEntry.authorLastName.charAt(0)}`;
    
    // Reading time
    const readingTime = `${blogData.seo.readingTime} min read`;
    
    // Hero image (use featured image or fallback)
    const heroImage = blogData?.featuredImage?.node?.mediaItemUrl || 
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBy5eF_MA3ugvzaD0FOYPHtoMmx-f1jyyBVb5ba42qOaIkVaWGymVEeD7iuIZ0fjCm-rPUwkujJ2HPqOTtLFYdCu4nDVOCNSx_l9RkkF6bnIGLRi9FXOo9kV1T_Az9Ook_1WHhk0GdL1-H50s9mnV8PAiHPu_DESQOj8a2CQKeW75_MrxRy26IPKx2XUDOVYabgQ3AlRv22ZYQqrslzWZVF60-Thws_urQQmJOnDI-mSJ_xBa9_BhGm5SRngWQzS1jY3JzIgMX7Io";

    const breadcrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: blogData.title }
    ];

    // Render rich text content
    const articleContent = renderRichTextSSR(blogData.content);

    // Related articles - for now, keep the hardcoded ones or fetch related blogs
    const relatedArticles = [
      {
        id: 1,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaPFv-MSHmmobQf6nePbACO0-2mi8aZY8wuNn-v38TDSkWAiLkOq2EM2GxZXMV4tcb4OIkqtHKg_rDiIO3bdYNbwjkkBbjozXjM_nFiRXIBeeXyY9kRgwLck_imRH0QtNLJsbUrIVg13qS6yWaXyh8--Vk-X0-MEcd3cy_C2zVAQq6T5DNiZAu1XpwL8fDR_WJuEy7Yd8L79E74Jpe020-Hoc5int3vbJ1IJPv7vtTy1DixOdbeWSYcw7KjJWpGT6XZBpWpyuci2Y",
        category: "Lighting Solutions",
        readTime: "5 min read",
        title: "Smart Lighting: Beyond to Convenience",
        description: "Custom LED design, landscape lighting, and smart home lighting controls for security and ambiance.",
        link: "/blog"
      },
      {
        id: 2,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDA0c3daGabx-bogL9ld6mfxeFI4qWj-bJNk0Ctgj8gaJOodWSi86UYxUH7HzbUf_hnaQnz7y-QVvKXLlFwT7dVtZ4jvEpH5TEKyXwapzNNGLq7ox2zxeMmqArR-BgwEnXjWrwDh0GXcKoYxrEyZpzX6qx97ak5ZUpqGX2Sy_7NvyeC62czOQJaJQbIiwNRN9hR-cu_vFJeLwC-IHoIVbJFEPT8QOu0_9YMla4orQVE9WuEiLLDLyI1YyxYDodiOIU5FXs4MLMRRI",
        category: "EV Charging",
        readTime: "4 min read",
        title: "Preparing Your Home for an Electric Vehicle",
        description: "Fast, certified installation of Tesla, JuiceBox, and ChargePoint residential chargers for your garage.",
        link: "/blog"
      },
      {
        id: 3,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAV3zEVZEX5mZ2EuGgc5oA0WtJhqQ-N8eiA4aoj67LeekVlyiRZ-TQHWi_uDX01vMCG_AItcJB0TygGHnU672WZ3HBB53XdM_m3eZjBJUaAdp1s9mYxIP6xFhlb6vgtjxBkjvqWZOVkUFIi0s8J3fyoU7_959eTIVmkaVWdd0rhMGaOyQRhA0diL5JeGLOKAgmBI1QlgpfPqr29Cgh8mMOIVZjCLbT4fmfNKDB_q-9E_wyDmadYO19Ryouz_kDYqNGAsTAr1mzrsxE",
        category: "Safety",
        readTime: "7 min read",
        title: "Industrial Standards for Residential Safety",
        description: "Why we bring industrial-grade quality and commercial precision to every residential circuit we touch.",
        link: "/blog"
      }
    ];

    // CTA section data
    const ctaSection = blogData.blogEntry.ctaSection;

    return (
      <>
        <Breadcrumbs items={breadcrumbs} />
        
        <main>
          <BlogArticle
            title={blogData.title}
            content={articleContent}
            author={{
              name: authorName,
              initials: authorInitials
            }}
            publishedDate={formattedDate}
            readingTime={readingTime}
            categories={categories}
            heroImage={heroImage}
          />
        </main>
        
        <CtaBox
          title={ctaSection.ctaText || "Ready to start your electrical project?"}
          primaryButtonText={ctaSection.primaryCtaText || "Get a Free Estimate"}
          primaryButtonHref={ctaSection.primaryCtaLink || "/request-estimate"}
          secondaryButtonText={ctaSection.secondaryCtaText || "Call Now"}
          secondaryButtonHref={ctaSection.secondaryCtaLink || `tel:${contactPhone}`}
        />
        
        <RelatedArticles articles={relatedArticles} />
      </>
    );
  } catch (error) {
    console.error('Error loading blog article:', error);
    return <div>Error loading blog article. Please try again later.</div>;
  }
}
