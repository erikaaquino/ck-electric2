import { NextResponse } from 'next/server';
import { fetchWordPressGraphQL } from '@/lib/wordpress-ssr';
import { GET_ALL_SERVICES, GET_ALL_PROJECTS, GET_BLOGS, GET_SERVICE_AREAS } from '@/lib/wordpress-queries';

export async function GET() {
  const baseUrl = 'https://ck-electric.com';
  const currentDate = new Date().toISOString();

  try {
    // Fetch all dynamic content from WordPress
    const [servicesResponse, projectsResponse, blogsResponse, areasResponse] = await Promise.all([
      fetchWordPressGraphQL(GET_ALL_SERVICES),
      fetchWordPressGraphQL(GET_ALL_PROJECTS),
      fetchWordPressGraphQL(GET_BLOGS),
      fetchWordPressGraphQL(GET_SERVICE_AREAS)
    ]);

    const services = (servicesResponse as any)?.services?.nodes || [];
    const projects = (projectsResponse as any)?.projects?.nodes || [];
    const blogs = (blogsResponse as any)?.blogs?.nodes || [];
    const areas = (areasResponse as any)?.serviceAreas?.nodes || [];

    // Static pages
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/services', priority: '0.9', changefreq: 'weekly' },
      { url: '/projects', priority: '0.8', changefreq: 'weekly' },
      { url: '/blog', priority: '0.7', changefreq: 'daily' },
      { url: '/contact', priority: '0.8', changefreq: 'monthly' },
      { url: '/request-estimate', priority: '0.9', changefreq: 'monthly' },
    ];

    // Dynamic pages
    const servicePages = services.map((service: any) => ({
      url: `/services/${service.slug}`,
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: service.modified || currentDate
    }));

    const projectPages = projects.map((project: any) => ({
      url: `/projects/${project.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: project.modified || currentDate
    }));

    const blogPages = blogs.map((blog: any) => ({
      url: `/blog/${blog.slug}`,
      priority: '0.6',
      changefreq: 'weekly',
      lastmod: blog.modified || currentDate
    }));

    const areaPages = areas.map((area: any) => ({
      url: `/service-areas/${area.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: area.modified || currentDate
    }));

    // Combine all pages
    const allPages = [
      ...staticPages,
      ...servicePages,
      ...projectPages,
      ...blogPages,
      ...areaPages
    ];

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return basic sitemap with static pages only
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/services', priority: '0.9', changefreq: 'weekly' },
      { url: '/projects', priority: '0.8', changefreq: 'weekly' },
      { url: '/blog', priority: '0.7', changefreq: 'daily' },
      { url: '/contact', priority: '0.8', changefreq: 'monthly' },
      { url: '/request-estimate', priority: '0.9', changefreq: 'monthly' },
    ];

    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(basicSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=3600',
      },
    });
  }
}
