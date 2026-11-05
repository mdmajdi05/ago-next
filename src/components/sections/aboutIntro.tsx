import Image from 'next/image';
import styles from './aboutIntro.module.css';

export function AboutIntro() {
  return (
    <div id="trust" className={styles.section}>
      <span aria-hidden="true" className={styles.mediaGlow} />
      <div className={styles.wrap}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <span className={styles.tag}>
              <i className="fa-solid fa-circle-info" aria-hidden="true" /> About Ago Aviation
            </span>

            <h2 className={styles.title}>
              Precision Gas Turbine Parts,
              <span className={styles.accent}>Delivered Worldwide</span>
            </h2>

            <p className={styles.lead}>
              <span className={styles.highlight}>Ago Aviation is a trusted gas turbine parts manufacturer and supplier</span>{' '}
              serving customers across the world. We help power plants, oil and gas facilities, industrial operators and
              service companies source the components they need to keep their turbines running safely and efficiently.
            </p>

            <p className={styles.text}>
              Gas turbine components work in some of the harshest conditions in engineering: extreme heat, high
              pressure, constant vibration and repeated thermal cycling. A part that is slightly off specification does not
              simply wear out faster. It can reduce efficiency, cause an unplanned shutdown or put the entire machine at
              risk. That is why we treat precision, material integrity and documentation as the foundation of every order,
              not an add-on.
            </p>

            <p className={styles.text}>
              Ago Aviation is operated by WS Turbomar Private Limited. Whether you need a single critical spare for an
              urgent repair or a planned set of parts for a major inspection, our team works with your engineers and
              procurement staff to make sure the right part reaches the right site.
            </p>
          </div>

          <div className={styles.media}>
            <span aria-hidden="true" className={styles.mediaGlow} />
            <div className={styles.imageShell}>
              <Image
                src="/images/lm-2500-turbine.webp"
                alt="Gas turbine parts manufacturer and supplier"
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 576px, 342px"
                className={styles.image}
              />
              <span aria-hidden="true" className={styles.imageFrame} />
            </div>

            <div className={styles.badge}>
              <i className="fa-solid fa-globe" aria-hidden="true" /> Delivered Worldwide
            </div>

            <div className={styles.panel}>
              <span className={styles.panelIcon}>
                <i className="fa-solid fa-microchip" aria-hidden="true" />
              </span>
              <div>
                <span className={styles.panelTitle}>Precision</span>
                <span className={styles.panelText}>Material integrity &amp; documentation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
