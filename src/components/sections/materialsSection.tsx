import { AboutBlock } from './aboutBlock';

export function MaterialsSection() {
  return (
    <AboutBlock
      id="materials"
      mediaFirst
      eyebrow="Materials & Tolerances"
      title="Built for Demanding Materials and Tight Tolerances"
      paragraphs={[
        'Hot section components are typically made from nickel and cobalt-based superalloys and heat-resistant stainless steels. These materials are chosen because they hold their strength at high temperature, but they are also difficult to machine. Cutting forces, tool wear and heat build-up all make precision harder to achieve.',
        'That is why material grade, heat treatment and final dimensions matter as much as the part drawing itself. On every quote we state the material and the key specifications, so your engineers can review them before an order is placed. If something does not match your requirement, you can catch it at the quote stage rather than at installation.',
      ]}
      points={[
        { icon: 'fa-solid fa-atom', title: 'Superalloys', text: 'Nickel and cobalt-based grades' },
        { icon: 'fa-solid fa-shield-halved', title: 'Heat-Resistant Steels', text: 'Stainless steels for hot sections' },
        { icon: 'fa-solid fa-fire-flame-curved', title: 'Heat Treatment', text: 'Stated on every quote' },
        { icon: 'fa-solid fa-ruler-combined', title: 'Final Dimensions', text: 'Checked against your drawing' },
      ]}
      image="/images/cfm-56-turbine.webp"
      alt="Hot section turbine components in demanding materials"
      tagIcon="fa-solid fa-temperature-high"
      tagText="Built for hot section conditions"
      cardIcon="fa-solid fa-ruler-combined"
      cardNum="SPEC"
      cardText="Tight tolerances, stated on the quote"
    />
  );
}
