import Image from 'next/image';
import { AgoButton } from '@/components/ui/button';

type Point = { icon: string; title: string; text: string };

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  points: Point[];
  image: string;
  alt: string;
  tagIcon: string;
  tagText: string;
  cardIcon: string;
  cardNum: string;
  cardText: string;
  mediaFirst?: boolean;
};

export function AboutBlock({
  id,
  eyebrow,
  title,
  paragraphs,
  points,
  image,
  alt,
  tagIcon,
  tagText,
  cardIcon,
  cardNum,
  cardText,
  mediaFirst = false,
}: Props) {
  const media = (
    <div className="about-media-block">
      <span aria-hidden="true" className="about-media-glow" />
      <div className="about-media-shell">
        <Image src={image} alt={alt} width={636} height={600} sizes="(min-width: 1024px) 560px, 332px" className="about-media-image" />
      </div>
      <div className="about-media-tag">
        <i className={tagIcon} aria-hidden="true" /> {tagText}
      </div>
      <div className="about-media-card">
        <span className="about-media-card-icon">
          <i className={cardIcon} aria-hidden="true" />
        </span>
        <div>
          <span className="about-media-card-num">{cardNum}</span>
          <span className="about-media-card-text">{cardText}</span>
        </div>
      </div>
    </div>
  );

  const copy = (
    <div className="about-copy-block">
      <span className="about-copy-kicker">{eyebrow}</span>
      <h2 className="about-copy-title">{title}</h2>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={`about-copy-paragraph ${index === 1 ? 'about-copy-paragraph-last' : ''}`}>
          {paragraph}
        </p>
      ))}
      <ul className="about-points-list">
        {points.map((point) => (
          <li key={point.title} className="about-point-item">
            <span className="about-point-icon">
              <i className={point.icon} aria-hidden="true" />
            </span>
            <div>
              <strong>{point.title}</strong>
              <small>{point.text}</small>
            </div>
          </li>
        ))}
      </ul>
      <div className="about-copy-button">
        <AgoButton href="/contact" variant="primary">
          Request a Quote
        </AgoButton>
      </div>
    </div>
  );

  return (
    <div id={id} className="about-block-section">
      <span aria-hidden="true" className="about-block-glow" />
      <div className="about-block-wrap">
        <div className="about-block-grid">
          {mediaFirst ? (
            <>
              {media}
              {copy}
            </>
          ) : (
            <>
              {copy}
              {media}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
