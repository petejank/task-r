'use strict';

import './assets/race-box-list.scss';
import './assets/race-box-list-container.scss';
import './assets/race-box-list-entry.scss';

import React, {PropTypes} from 'react';
import numeral from 'numeral';

import * as Constants from './Constants';
import Silk from 'components/Silk/Silk';

export default React.createClass({
  propTypes: {
    idRace: PropTypes.number.isRequired,
    runners: PropTypes.array.isRequired
  },
  render() {
    return (
      <div className="race-box-list-container">
        <ul className="race-box-list">
          {
            this.props.runners.map((runner, index) => {
              const silk = runner.silk ? runner.silk[0] : null;
              return (
                <li key={index} className="race-box-list-entry">
                  {
                    silk && <div className="race-box-list-entry__silk"><Silk silkType={silk}/></div>
                  }
                  <div className="race-box-list-entry__name">
                    {runner.name}
                  </div>
                  <div className="race-box-list-entry__odds">
                    <a href={`RACE_BETS_URL${this.props.idRace}`}
                      className="race-box-list-entry__odds-link">
                      {numeral(runner.odds).format('0.0')}
                    </a>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
});
