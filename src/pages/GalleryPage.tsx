import { useEffect } from 'react';
import GalleryLayout from '../components/Gallery/GalleryLayout';
import ProfileSidebarSection from '../components/Gallery/ProfileSidebarSection';
import GalleryGridSection from '../components/Gallery/GalleryGridSection';

export default function GalleryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <GalleryLayout>
      <ProfileSidebarSection />
      <GalleryGridSection />
    </GalleryLayout>
  );
}
