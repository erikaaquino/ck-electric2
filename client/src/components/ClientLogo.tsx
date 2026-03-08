import Image from 'next/image';

interface ClientLogoProps {
  title: string;
  imageUrl: string;
  clientUrl: string | null;
  tabIndex?: number;
}

export default function ClientLogo({ title, imageUrl, clientUrl, tabIndex }: ClientLogoProps) {
  const logo = (
    <div className="relative overflow-hidden rounded-lg bg-white p-6 animate-pulse-subtle flex items-center justify-center">
      <Image
        src={imageUrl}
        alt={`${title} logo`}
        width={160}
        height={80}
        className="w-full h-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
        sizes="(max-width: 768px) 80px, 160px"
        loading="lazy"
      />
    </div>
  );

  if (clientUrl) {
    return (
      <a
        href={clientUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
        aria-label={`Visit ${title} website`}
        tabIndex={tabIndex}
      >
        {logo}
      </a>
    );
  }

  return logo;
}
