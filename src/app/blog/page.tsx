import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - AGO Aviation',
  description:
    'Latest news, technical insights, and updates about gas turbine parts, maintenance, and power generation from AGO Aviation.',
};

const posts = [
  {
    title: 'Top 5 GE LM2500 Gas Turbine Spare Parts in Demand',
    excerpt:
      'A look at the most requested LM2500 components for power plant operators and industrial gas turbine maintenance teams.',
    date: '2026-10-15',
    href: '#',
  },
  {
    title: 'How to Identify Genuine Siemens Turbine Spares',
    excerpt:
      'Tips for verifying authentic Siemens turbine components and avoiding counterfeit parts in the supply chain.',
    date: '2026-09-22',
    href: '#',
  },
  {
    title: 'Atlas Copco Compressor Maintenance Checklist',
    excerpt:
      'Preventive maintenance schedule for Atlas Copco compressor parts to minimize downtime and extend equipment life.',
    date: '2026-08-10',
    href: '#',
  },
  {
    title: 'AGO Aviation Expands Gas Turbine Parts Inventory',
    excerpt:
      'New stock of GE, Siemens, and Solar Turbines spares now available for immediate worldwide shipment.',
    date: '2026-07-03',
    href: '#',
  },
];

export default function BlogPage() {
  return (
    <main className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-[#0b3d6b] tracking-tight">Blog</h1>
        <p className="mt-2 text-slate-600">Industry insights and updates from AGO Aviation.</p>
      </header>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.title} className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition">
            <time className="text-xs text-[#0b3d6b] font-medium">{post.date}</time>
            <h2 className="mt-2 text-xl font-bold text-[#0b3d6b] hover:underline">
              <Link href={post.href}>{post.title}</Link>
            </h2>
            <p className="mt-2 text-slate-600">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
