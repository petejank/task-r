'use strict';

import './assets/race-box-info.scss';

import React, {PropTypes} from 'react';
import numeral from 'numeral';

import RaceType from 'components/RaceType/RaceType';

export default React.createClass({
  propTypes: {
    runners: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    raceType: PropTypes.string.isRequired
  },
  render() {
    return (
      <div className="race-box-info">
        {this.props.runners} runners
        <span className="race-box-info__seperator">|</span>
        {formatNumber(this.props.distance)} m
        <span className="race-box-info__seperator">|</span>
        {formatNumber(this.props.amount)} {this.props.currency}
        <div className="race-box-info__rate-type">
          <RaceType type={this.props.raceType}/>
        </div>
      </div>
    );
  }
});

function formatNumber(value) {
  return numeral(value).format('0,0');
}
