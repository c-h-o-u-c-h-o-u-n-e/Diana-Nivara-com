import React from 'react';
import HeroSection from '../HeroSection';

interface Props {
  imageSrc: string;
  imageAlt?: string;
}

const HomeHero: React.FC<Props> = ({ imageSrc, imageAlt }) => {
  // Create srcSet for responsive images
  const srcSet = `
    images/Diana-Nivara-Hero-Mobile.webp 768w,
    images/Diana-Nivara-Hero-Tablet.webp 1024w,
    ${imageSrc} 1920w
  `;

  return (
    <section>
      <HeroSection
        imageSrc={imageSrc}
        imageSrcSet={srcSet}
        imageAlt={imageAlt}
      />
    </section>
  );
};

export default React.memo(HomeHero);
