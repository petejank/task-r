'use strict';

import './assets/page-context.scss';

import React from 'react';
import RaceBoxContainer from 'components/RaceBox/RaceBoxContainer';

export default React.createClass({
  render() {
    return (
      <main className="page-context">
        <RaceBoxContainer/>
      </main>
    );
  }
});
