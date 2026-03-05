import Image from 'next/image';

interface ClientLogoProps {
  title: string;
  imageUrl: string;
  clientUrl: string | null;
}

export default function ClientLogo({ title, imageUrl, clientUrl }: ClientLogoProps) {
  if (clientUrl) {
    return (
      <a 
        href={clientUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
        aria-label={`Visit ${title} website`}
      >
        <div className="relative overflow-hidden rounded-lg bg-white p-6 animate-pulse-subtle flex items-center justify-center">
          <img
            src={imageUrl}
            alt={`${title} logo`}
            className="w-full h-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
          />
        </div>
      </a>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-lg bg-white p-6 animate-pulse-subtle flex items-center justify-center">
      <img
        src={imageUrl}
        alt={`${title} logo`}
        className="w-full h-auto object-contain filter grayscale"
      />
    </div>
  );
}
