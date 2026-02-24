import React from 'react';
import { ArrowRightAlt } from '@mui/icons-material';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  borderColor?: 'primary-500' | 'primary-400';
}

export default function ServiceCard({
  icon,
  title,
  description,
  link,
  borderColor = 'primary-500',
}: ServiceCardProps) {
  return (
    <div className={`group relative bg-white p-10 hover:-translate-y-2 transition-all duration-300 border-b-8 border-${borderColor}`}>
      <div className="w-16 h-16 bg-neutral-950 text-primary-500 flex items-center justify-center mb-8">
        {icon}
      </div>
      <h4 className="text-display-4 text-neutral-950 mb-4">{title}</h4>
      <p className="text-neutral-700 text-small leading-relaxed mb-8">{description}</p>
      <a className="inline-flex items-center gap-3 text-base-upper text-neutral-950 group-hover:text-primary-500 transition-colors" href={link}>
        Learn More <ArrowRightAlt className="text-sm" />
      </a>
    </div>
  );
}
