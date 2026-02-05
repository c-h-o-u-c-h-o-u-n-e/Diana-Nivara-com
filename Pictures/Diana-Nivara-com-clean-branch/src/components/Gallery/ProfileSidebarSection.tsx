import React from 'react';
import ProfileSidebar from '../ProfileSidebar';

const ProfileSidebarSection = React.memo(() => {
  return (
    <div 
      id="profile-section" 
      className="profile-section" 
      style={{ 
        position: 'sticky', 
        top: '100px', 
        alignSelf: 'flex-start' 
      }}
    >
      <ProfileSidebar />

      {/* Responsive Styles */}
      <style>{`
        /* Tablet - ≤1024px */
        @media (max-width: 1024px) {
          .profile-section {
            position: static !important; /* Remove sticky positioning on tablet */
          }
        }
      `}</style>
    </div>
  );
});

ProfileSidebarSection.displayName = 'ProfileSidebarSection';

export default ProfileSidebarSection;
