import Button from './Button';
import FeaturedProjectCard from './FeaturedProjectCard';
import type { ProjectsResponse } from '../lib/wordpress-types';

interface Props {
  projectsData: ProjectsResponse | null;
}

export default function HomeProjectsSection({ projectsData }: Props) {
  const featured = projectsData?.projects?.nodes
    .filter((p) =>
      p.projectFields?.tags?.nodes?.some((t) => t.name.toLowerCase() === 'featured')
    )
    .slice(0, 3);

  const positions = ['top', 'center', 'bottom'] as const;

  return (
    <section className="py-32 bg-neutral-950" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-primary-500 font-black text-xs tracking-[0.4em] uppercase mb-4 md:text-sm lg:text-base">Our Portfolio</h2>
          <h3 className="portfolio-title text-white italic text-lg md:text-2xl lg:text-3xl">Featured Work</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-0">
          {featured && featured.length > 0
            ? featured.map((project, index) => (
                <FeaturedProjectCard
                  key={project.id}
                  title={project.title}
                  location={`${project.projectFields?.specifications?.coverageArea || 'Puget Sound'}, WA`}
                  imageUrl={project.featuredImage?.node?.mediaItemUrl || ''}
                  position={positions[index]}
                  hasBackground={index === 1}
                  slug={project.slug}
                />
              ))
            : (
              <>
                <FeaturedProjectCard title="Gensco Kirkland" location="Kirkland, WA" imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDMPhChpecZb34tbGDC_MtSdQdv7FiRj4-Mcy5_YPcUql2ypcjlHq90UNrzx3kyQ8BUmvbQeo5KIQqT7udbCYUg3g4F1nFdgoCDrwOgpkuyTZUTv8nu5NHEcpII5IMzh39AVSoqoj83Zlgzx-Egi0zLZIO28wYPe6XWXmGa0pbyyqEx2dbHIr--yJkiJ4aRQapx3Hjkcu524qcTkpWt7u4xuEKecz8cvj_1bCAWvpv0Zg9s_IeTWDaNFNyMmNSb2JsoPIhIIQjGKVM" position="top" />
                <FeaturedProjectCard title="Gensco Everett" location="Everett, WA" imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAY5Ivnp3HE7wzwBozpfZIERQdtojYsnWyPrawkT9Ouko2tLOS5-zprr_BXQ1S6jlHAD0QA5gyXwHHtDDCG1zGX70BcVic1SXzapft9SQW1OvSBT-fuvlG0bYPwAjQyyzzMseMLXb_WgBIlg8j0G9QmsisWu6Q3DxESoMtTZ7w3kQir4UN50XUywDuoy81EZ4wBNFxnk02PH0Q2Sox67oc-NNHeT_skMrQ5VypSEcfBKjYxZKheOpW_PHe0DMBLU3hdOxhbtdxjldg" position="center" hasBackground />
                <FeaturedProjectCard title="Park 120" location="Regional WA" imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuB53L9qUBIZfx03xe17JAgCVkqjb8llm-Fwb5K_YB291P5kAD3Sa4RCx1ZQ_lGoZlX76pkTzTyi835SIN622OzekfGmjnfddjo_wRi3k4_tTyqt-mCBwvJWr3N5tBoPpXv8p4q3oZ-975-734XLmktT4VIxDCDjfNntXr4K-7QL5Bq1ISNn-dE_ns_rXqZ0xd1o7ikpXid4vYqyTBhFMmyXRZbYPR_oBOMuEXB4xZ_dyi0gmXbj0exwrVb7TtFskiwLsbKN78313ic" position="bottom" />
              </>
            )}
        </div>

        <div className="text-center mt-16">
          <Button label="See Full Portfolio" variant="secondary" href="/projects" />
        </div>
      </div>
    </section>
  );
}
