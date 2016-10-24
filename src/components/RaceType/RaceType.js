'use strict';

import './assets/race-type.scss';

import React, {PropTypes} from 'react';
import classNames from 'classnames';

export default React.createClass({
  propTypes: {
    type: PropTypes.string.isRequired,
    size: PropTypes.string,
    enabled: PropTypes.bool
  },
  render() {
    const raceTypeClass = classNames({
      'race-type': true,
      [`race-type--${this.props.type}`]: true,
      [`race-type--${this.props.size}`]: this.props.size,
      'race-type--disabled': !this.props.enabled
    });

    return (
      <span className={raceTypeClass}></span>
    );
  }
});
