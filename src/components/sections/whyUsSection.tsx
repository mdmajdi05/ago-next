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
    <section id="why" className="why-us">
      <div className="why-wrap">
        <div className="product-title">
          <h3>Why Ago Aviation</h3>
          <h2>Why Operators Choose Ago Aviation</h2>
        </div>
        <div className="why-grid is-four">
          {whyFeatures.map((feature) => (
            <article key={feature.title} className="why-card">
              <span className="why-ico">
                <i className={`fa-solid ${feature.icon}`} />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
