'use strict';

import './assets/silk.scss';

import React, {PropTypes} from 'react';
import classNames from 'classnames';

export default React.createClass({
  propTypes: {
    silkType: PropTypes.string.isRequired
  },
  render() {
    const silkClass = classNames({
      [`Silk-${this.props.silkType}`]: true
    });

    return (
      <div className={silkClass}></div>
    );
  }
});
