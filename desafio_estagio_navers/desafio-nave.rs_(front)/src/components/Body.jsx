import React, { useState, useEffect } from 'react';
import Card from './Card';

import Getter from '../api/Getter';

const Body = () => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    setData(await Getter());
  }, []);

  return (
    <div className='container'>
      <div className='logo'>
        <img src='/logo.png' width='' />
      </div>
      <h1> Navers </h1>
      <div className='cards'>
        {data.map((value, key) => {
          return (
            <Card
              name={value.name}
              role={value.job_role}
              image={value.image_url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
