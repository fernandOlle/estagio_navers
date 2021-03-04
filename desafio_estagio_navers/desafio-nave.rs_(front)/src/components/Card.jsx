import React from 'react';

const Card = ({ name, role, image }) => {
  return (
    <div className='card'>
      <div className='image' style={{ backgroundImage: `url(${image})` }}></div>
      <h4>{name}</h4>
      {role}
    </div>
  );
};

export default Card;
