import React from 'react';
// добавляем библиотеку для того, что бы анимировать ракету
import RellaxWrapper from 'react-rellax-wrapper';
import './features.css';
import Main from '../Main/Main';
import falcon1 from '../../img/falcon-1.png';
import falcon9 from '../../img/falcon-9.png';
import falconHeavy from '../../img/falcon-heavy.png';
import starship from '../../img/starship.png';

const images = {
  'Falcon 1': falcon1,
  'Falcon 9': falcon9,
  'Falcon Heavy': falconHeavy,
  other: starship,
};

const Features = props => {
  const {
    name,
    height,
    diameter,
    mass,
    payload_weights: pyloadWeights,
    description,
  } = props;

  return (
    <>
      <Main rocket={name} />
      <section className="features">
        <h2 className="features-title">
          {name} <br />
          Overview
        </h2>
        <div className="overview">
          <table className="table">
            <caption className="table-title">Size</caption>
            <thead>
              <tr>
                <td className="table-column">HEIGHT</td>
                <td className="table-column">
                  {height.meters} m / {height.feet} ft
                </td>
              </tr>
              <tr>
                <td className="table-column">DIAMETER</td>
                <td className="table-column">
                  {diameter.meters} m / {diameter.feet} ft
                </td>
              </tr>
              <tr>
                <td className="table-column">MASS</td>
                <td className="table-column">
                  {mass.kg} kg / {mass.lb} lb
                </td>
              </tr>

              {/* у некоторых ракет несколько вариантов полёта, так что делаем перебор для того, что бы захватить все варинаты */}
              {pyloadWeights.map(item => (
                <tr key={item.id}>
                  <td className="table-column">
                    PAYLOAD TO {item.id.toUpperCase()}
                  </td>
                  <td className="table-column">
                    {item.kg} kg / {item.lb} lb
                  </td>
                </tr>
              ))}
            </thead>
          </table>

          <RellaxWrapper speed={14}>
            <img
              src={`${
                images.hasOwnProperty(name) ? images[name] : images.other
              }`}
              alt="rocket"
              className="rocket"
            />
          </RellaxWrapper>

          <article>
            <h3 className="features-subtitle">DESCRIPTION</h3>
            <p className="features-text">{description}</p>
          </article>
        </div>
      </section>
    </>
  );
};

export default Features;
