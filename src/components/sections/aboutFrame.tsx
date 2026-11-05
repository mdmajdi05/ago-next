import { AboutBlock } from './aboutBlock';

export function AboutFrame() {
  return (
    <AboutBlock
      id="frame"
      eyebrow="Frame & Stage"
      title="Parts Matched to Your Turbine Frame"
      paragraphs={[
        'No two turbine fleets are identical. A part that fits one frame or stage will not necessarily fit another, even within the same OEM family. To avoid costly mistakes, we ask for the OEM, turbine model, frame and stage, along with any part number or drawing you have.',
        'From there, we confirm the specification with you, flag any questions about material or tolerance, and only then issue a quote. If a part is not something we can supply, you will hear that early, so you can look elsewhere without losing time.',
      ]}
      points={[
        { icon: 'fa-solid fa-industry', title: 'OEM & Turbine Model', text: 'We confirm the machine first' },
        { icon: 'fa-solid fa-layer-group', title: 'Frame & Stage', text: 'Fit confirmed for your unit' },
        { icon: 'fa-solid fa-barcode', title: 'Part Number or Drawing', text: 'Share whatever detail you have' },
      ]}
      image="/images/lm-5000-turbine.webp"
      alt="Gas turbine matched to frame and stage"
      tagIcon="fa-solid fa-circle-check"
      tagText="Specification confirmed before quote"
      cardIcon="fa-solid fa-gears"
      cardNum="OEM"
      cardText="Frame & stage confirmed"
    />
  );
}
