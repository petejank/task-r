'use strict';

import './assets/flag.scss';

import React, {PropTypes} from 'react';
import classNames from 'classnames';

export default React.createClass({
  propTypes: {
    country: PropTypes.string.isRequired
  },
  render() {
    const silkClass = classNames({
      [`Flag-${this.props.country}`]: true
    });

    return (
      <div className={silkClass}></div>
    );
  }
});
