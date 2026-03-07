import Link from 'next/link';
import { Phone, Mail, LocationOn, Facebook } from '@mui/icons-material';
import SocialLinks from './SocialLinks';
import { fetchWordPressGraphQL } from '@/lib/wordpress-ssr';
import { GET_HEADER_DATA, GET_FOOTER_SERVICES } from '@/lib/wordpress-queries';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  headerData?: any;
  servicesData?: any;
}

export default async function Footer({ headerData, servicesData }: FooterProps) {
  // If data not passed as props, fetch it
  const headerResponse = headerData || await fetchWordPressGraphQL(GET_HEADER_DATA);
  const servicesResponse = servicesData || await fetchWordPressGraphQL(GET_FOOTER_SERVICES);
  
  const headerInfo = headerResponse?.page?.landingPage?.headerInfo;
  const services = servicesResponse?.services?.nodes || [];
  
  const companyLinks: FooterLink[] = [
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
  ];

  const servicesLinks: FooterLink[] = services.map((service: any) => ({
    label: service.title,
    href: `/services/${service.slug}`,
  }));

  const socialLinks = headerInfo?.facebookLink
    ? [{ icon: <Facebook className="text-xl" />, href: headerInfo.facebookLink, label: "Facebook" }]
    : [];

  return (
    <footer className="bg-neutral-950 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-display-5 text-primary-500 font-bold">
                CK ELECTRIC
              </h3>
              <p className="text-small text-neutral-400 leading-relaxed">
                {headerInfo?.slogan || "Professional electrical services across Puget Sound. Licensed, bonded, and committed to excellence."}
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-small text-neutral-300">
                <Phone className="text-primary-500 text-lg" />
                <a href={`tel:${headerInfo?.contactPhoneNumber || "5550123456"}`} className="hover:text-primary-500 transition-colors">
                  {headerInfo?.contactPhoneNumber || "(555) 012-3456"}
                </a>
              </div>
              <div className="flex items-center gap-3 text-small text-neutral-300">
                <Mail className="text-primary-500 text-lg" />
                <a href={`mailto:${headerInfo?.contactEmail || "hello@ckelectric.com"}`} className="hover:text-primary-500 transition-colors">
                  {headerInfo?.contactEmail || "hello@ckelectric.com"}
                </a>
              </div>
              <div className="flex items-center gap-3 text-small text-neutral-300">
                <LocationOn className="text-primary-500 text-lg" />
                <span>{headerInfo?.serviceArea || "Tacoma to Skagit Valley, WA"}</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h4 className="text-base-bold text-white">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-small text-neutral-400 hover:text-primary-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-6">
            <h4 className="text-base-bold text-white">Services</h4>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-small text-neutral-400 hover:text-primary-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <SocialLinks socialLinks={socialLinks} />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-center">
            <p className="text-small text-neutral-400">
              © 2026 CK Electric. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
