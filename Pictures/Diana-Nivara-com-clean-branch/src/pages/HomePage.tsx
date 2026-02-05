import { useEffect } from 'react';
import HomeHero from '../components/Home/HomeHero';
import HomeMeet from '../components/Home/HomeMeet';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      <HomeHero
        imageSrc="images/Diana-Nivara-Hero.webp"
        imageAlt="Diana Nivara"
      />

      <HomeMeet
        imageSrc="images/Diana-Nivara-Homepage.webp"
        imageAlt="Diana Nivara"
      />
    </div>
  );
}
