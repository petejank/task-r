'use strict';

import './assets/race-box-header.scss';

import React, {PropTypes} from 'react';
import Flag from 'components/Flag/Flag';
import * as Constants from './Constants';
import window from 'other/window';

export default React.createClass({
  propTypes: {
    country: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired
  },
  render() {
    return (
      <h2 className="race-box-header">
        <div className="race-box-header__flag">
          <Flag country={this.props.country.toLowerCase()}/>
        </div>
        <span className="race-box-header__name">
          {this.props.title}
        </span>
        <span className="race-box-header__time">
          {window.Math.floor((this.props.time - Constants.BASE_TIME) / 60)} min
        </span>
      </h2>
    );
  }
});
