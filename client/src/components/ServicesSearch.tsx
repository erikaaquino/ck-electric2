'use client';

import { useState } from 'react';
import { Search } from '@mui/icons-material';
import ServiceCard from './ServiceCard';
import { ElectricBolt } from '@mui/icons-material';
import { ServiceNode } from '@/lib/wordpress-types';

interface ServicesSearchProps {
  services: ServiceNode[];
}

export default function ServicesSearch({ services }: ServicesSearchProps) {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? services.filter((s) =>
        s.title.toLowerCase().includes(query.toLowerCase())
      )
    : services;

  return (
    <div className="space-y-8">
      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services…"
          className="w-full bg-primary-50 border-transparent focus:border-primary-500 focus:ring-0 text-neutral-950 text-sm p-4 pl-12 rounded-xl"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-neutral-600 py-8">No services match &ldquo;{query}&rdquo;.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              icon={<ElectricBolt className="text-4xl" />}
            />
          ))}
        </div>
      )}
    </div>
  );
}
