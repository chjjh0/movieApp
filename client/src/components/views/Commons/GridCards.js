import React from 'react';
import { Col } from 'antd';

export default function GridCards({ landingPage, image, movieId, movieName, characterName }) {
  let landingPageEle = null;
  let movieDetailEle = null;

  if (landingPage && movieName) {
    landingPageEle = (
      <a href={`/movie/${movieId}`}>
        <img style={{ width: '100%', height: '320px' }} src={image} alt={movieName} />
      </a>
    );
  }

  if (image && characterName) {
    movieDetailEle = <img style={{ width: '100%', height: '320px' }} src={image} alt={characterName} />;
  }

  return (
    <Col lg={6} md={8} xs={24}>
      <div style={{ position: 'relative' }}>{landingPageEle ? landingPageEle : movieDetailEle}</div>
    </Col>
  );
}
