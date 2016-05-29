import React from 'react';
const vonjiHeroImgSrc = require('./vonji.hero.png');
require('./vonji.hero.style.sass');

const VonjiHero = () => (
  <div id="vonji-hero">
    <img src={vonjiHeroImgSrc} alt="vonji hero" />
  </div>
);

export default VonjiHero;
