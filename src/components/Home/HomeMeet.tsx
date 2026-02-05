import React from 'react';
import MeetSection from '../MeetSection';

interface Props {
  imageSrc: string;
  imageAlt?: string;
}

const HomeMeet: React.FC<Props> = ({ imageSrc, imageAlt }) => {
  return (
    <section>
      <MeetSection
        imageSrc={imageSrc}
        imageAlt={imageAlt}
      />
    </section>
  );
};

export default React.memo(HomeMeet);
