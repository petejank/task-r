'use strict';

import './assets/race-filters.scss';
import './assets/race-filters-button.scss';

import React from 'react';
import {connect} from 'react-redux';
import store from 'store/store';

import classNames from 'classnames';
import RaceType from 'components/RaceType/RaceType';
import * as filterActions from 'store/Filter/FilterActions';

const stateToProps = (store) => ({
  filterState: store.filterState
});

const RaceFilters = React.createClass({
  handleClick(raceType) {
    store.dispatch({
      type: filterActions.TOGGLE_FILTER,
      raceType: raceType
    });
  },
  render() {
    return (
      <div className="race-filters">
        {
          this.props.filterState.map((filter, index) => {
            return (
              <a key={index} className="race-filters-button" onClick={() => this.handleClick(filter.name)}>
                <div className={getToggleClasses(filter.name, filter.active)}></div>
                <RaceType type={filter.symbol + '-dark'} size="large" enabled={filter.active}/>
              </a>
            );
          })
        }
      </div>
    );
  }
});

export default connect(stateToProps)(RaceFilters);

function getToggleClasses(raceType, active) {
  return classNames({
    [`race-filters-button__toggle race-filters-button__toggle--${raceType}`]: true,
    'race-filters-button__toggle--inactive': !active
  });
}
