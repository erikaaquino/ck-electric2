import type { LandingPageData } from '../lib/wordpress-types';

interface Props {
  landingPageData: LandingPageData | null;
}

export default function HomeStatsSection({ landingPageData }: Props) {
  const heroFooter = landingPageData?.page.landingPage.heroFooter;

  return (
    <div className="relative z-30 -mt-16 skew-panel bg-neutral-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 skew-content">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {heroFooter ? (
            <>
              <div>
                <p className="text-primary-500 text-small-upper mb-2">{heroFooter.feature1.title}</p>
                <p className="text-display-4 text-white italic">{heroFooter.feature1.subtitle}</p>
              </div>
              <div>
                <p className="text-primary-500 text-small-upper mb-2">{heroFooter.feature2.title}</p>
                <p className="text-display-4 text-white italic">{heroFooter.feature2.subtitle}</p>
              </div>
              <div>
                <p className="text-primary-500 text-small-upper mb-2">{heroFooter.feature3.title}</p>
                <p className="text-display-4 text-white italic">{heroFooter.feature3.subtitle}</p>
              </div>
              <div>
                <p className="text-primary-500 text-small-upper mb-2">Licensed</p>
                <p className="text-display-4 text-white italic">Direct</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-primary-500 text-small-upper mb-2">Experience</p>
                <p className="text-display-4 text-white italic">25+ Yrs</p>
              </div>
              <div>
                <p className="text-primary-500 text-small-upper mb-2">Response</p>
                <p className="text-display-4 text-white italic">&lt;24 Hrs</p>
              </div>
              <div>
                <p className="text-primary-500 text-small-upper mb-2">Satisfied</p>
                <p className="text-display-4 text-white italic">1.2k+</p>
              </div>
              <div>
                <p className="text-primary-500 text-small-upper mb-2">Licensed</p>
                <p className="text-display-4 text-white italic">Direct</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
