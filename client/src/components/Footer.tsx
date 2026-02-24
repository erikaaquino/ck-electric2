import { Phone, Mail, LocationOn, Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export default function Footer() {
  const companyLinks: FooterLink[] = [
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "#blog" },
  ];

  const servicesLinks: FooterLink[] = [
    { label: "Commercial TIs", href: "#commercial-tis" },
    { label: "Wiring & Rewiring", href: "#wiring-rewiring" },
    { label: "Panel Upgrades", href: "#panel-upgrades" },
    { label: "EV Chargers", href: "#ev-chargers" },
    { label: "Emergency Repair", href: "#emergency-repair" },
  ];

  const legalLinks: FooterLink[] = [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "License Information", href: "#license" },
  ];

  const socialLinks = [
    { icon: <Facebook className="text-xl" />, href: "#facebook", label: "Facebook" },
    { icon: <Twitter className="text-xl" />, href: "#twitter", label: "Twitter" },
    { icon: <LinkedIn className="text-xl" />, href: "#linkedin", label: "LinkedIn" },
    { icon: <Instagram className="text-xl" />, href: "#instagram", label: "Instagram" },
  ];

  return (
    <footer className="bg-neutral-950 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-display-5 text-primary-500 font-bold">
                CK ELECTRIC
              </h3>
              <p className="text-small text-neutral-400 leading-relaxed">
                Professional electrical services across Puget Sound. Licensed, bonded, and committed to excellence.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-small text-neutral-300">
                <Phone className="text-primary-500 text-lg" />
                <a href="tel:5550123456" className="hover:text-primary-500 transition-colors">
                  (555) 012-3456
                </a>
              </div>
              <div className="flex items-center gap-3 text-small text-neutral-300">
                <Mail className="text-primary-500 text-lg" />
                <a href="mailto:hello@ckelectric.com" className="hover:text-primary-500 transition-colors">
                  hello@ckelectric.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-small text-neutral-300">
                <LocationOn className="text-primary-500 text-lg" />
                <span>Tacoma to Skagit Valley, WA</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h4 className="text-base-bold text-white">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-small text-neutral-400 hover:text-primary-500 transition-colors"
                  >
                    {link.label}
                  </a>
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
                  <a 
                    href={link.href}
                    className="text-small text-neutral-400 hover:text-primary-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="space-y-6">
            <h4 className="text-base-bold text-white">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-small text-neutral-400 hover:text-primary-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-base-bold text-white">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-neutral-800 text-neutral-400 hover:bg-primary-500 hover:text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-small text-neutral-400">
              © 2026 CK Electric. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-small text-neutral-400">
              <span>Licensed & Bonded in Washington State</span>
              <span>•</span>
              <span>Fully Insured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
