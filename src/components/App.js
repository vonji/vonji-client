import React from 'react';
import VonjiHero from './VonjiHero/main';

global.jQuery = require('jquery');
require('bootstrap-loader');

const App = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <VonjiHero />
      </div>
    </div>
  </div>
);

export default App;
