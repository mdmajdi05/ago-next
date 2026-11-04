interface WhyFeature {
  icon: string;
  title: string;
  desc: string;
}

const whyFeatures: WhyFeature[] = [
  {
    icon: 'fa-file-invoice',
    title: 'Clarity before you buy',
    desc: 'Our quotes spell out the part, the material, the quantity and the lead time. There are no vague descriptions to decode, and your team can compare our offer against OEM or other supplier quotes on equal terms.',
  },
  {
    icon: 'fa-folder-open',
    title: 'Documentation you can use',
    desc: 'Turbine parts need paperwork as much as they need precision. We provide the documentation your quality and audit teams expect so that parts can be accepted at your site without delay.',
  },
  {
    icon: 'fa-comments',
    title: 'Responsive, engineer-friendly communication',
    desc: 'Plant managers and maintenance engineers do not have time for slow replies. We keep communication direct and technical, and we answer your questions about fit, material and delivery in plain language.',
  },
  {
    icon: 'fa-ship',
    title: 'Export-ready supply',
    desc: 'We ship worldwide and prepare consignments for international transit, including protective packaging and the shipping documents your customs team will ask for. You deal with one team from enquiry to delivery.',
  },
];

export function WhyUsSection() {
  return (
    <section id="why" className="why-us py-16 lg:py-24 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]">
        <div className="product-title text-center mb-12 lg:mb-16">
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-2 block">
            Why Ago Aviation
          </h3>
          <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-0">
            Why Operators Choose Ago Aviation
          </h2>
        </div>
        <div className="why-grid is-four grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {whyFeatures.map((feature) => (
            <article
              key={feature.title}
              className="why-card border border-line rounded-lg p-6 bg-white hover:border-primary/40 transition-colors"
            >
              <span className="why-ico inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white mb-5">
                <i className={`fa-solid ${feature.icon}`} />
              </span>
              <h3 className="text-lg font-bold text-ink mb-3">{feature.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{feature.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
