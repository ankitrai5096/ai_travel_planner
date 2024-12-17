import React from 'react';
import InitialsAvatar from 'react-initials-avatar';

const UserProfileImage = ({ name }) => {
  const colors = [
    '#4285f4',
    '#34a853',
    '#fbbc05',
    '#ea4335',
    '#f4b400',
    '#0f9d58',
    '#db4437',
    '#c13584',
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const avatarContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: randomColor,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '40px',
    height: '40px',
  };

  const avatarStyle = {
    borderRadius: '50%',
    fontWeight: 'bold',
    color: 'white',
  };

  return (
    <div style={avatarContainerStyle}>
      <InitialsAvatar name={name} size={100} style={avatarStyle} />
    </div>
  );
};

export default UserProfileImage;
