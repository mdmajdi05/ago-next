export interface StatItem {
  label: string;
  value: string;
}

export interface StatsProps {
  title?: string;
  subtitle?: string;
  stats: StatItem[];
}

export function Stats({ title, subtitle, stats }: StatsProps) {
  return (
    <section className="section-padding bg-primary">
      <div className="ago-container">
        {title || subtitle ? (
          <div className="section-title mb-10">
            {title && <h2 className="text-2xl lg:text-3xl font-bold text-secondary-light mb-2">{title}</h2>}
            {subtitle && <p className="text-secondary-light/80 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        ) : null}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="legacy-service-card p-6 sm:p-8 text-center"
            >
              <div className="card-content">
                <span
                  className="text-3xl lg:text-5xl font-bold text-secondary block mb-2"
                >
                  {stat.value}
                </span>
                <p className="text-secondary-light text-sm font-medium leading-none">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
