import React from 'react';
// все стили идут отдельными файлами для оптимизации - когда элемент не отображается, его стили не загружаются
import './main.css';

import earth from '../../video/earth.mp4';
import mars from '../../video/mars.mp4';
import moon from '../../video/moon.mp4';
import space from '../../video/space.mp4';

const video = {
  'Falcon 1': moon,
  'Falcon 9': earth,
  'Falcon Heavy': mars,
  other: space,
};

const Main = ({ rocket, name }) => (
  <section className="main">
    {/*  динамический тайтл, принимает пропс c App.js   */}
    <h1 className="title">{name || rocket}</h1>

    {rocket && (
      <div className="video-container">
        <video
          className="video"
          autoPlay
          loop
          muted
          src={`${video.hasOwnProperty(rocket) ? video[rocket] : video.other}`}
        />
      </div>
    )}
  </section>
);

export default Main;
