'use strict';

import * as actions from './FilterActions';
import R from 'ramda';

const DEFAULT_STATE = [
  {
    name: 'gallop',
    active: true,
    symbol: 'G'
  },
  {
    name: 'jumping',
    active: true,
    symbol: 'J'
  },
  {
    name: 'trot',
    active: true,
    symbol: 'T'
  },
  {
    name: 'dogs',
    active: false,
    symbol: 'D'
  }
];

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case actions.TOGGLE_FILTER: {
      const raceType = R.find(R.propEq('name', action.raceType), state);
      return R.update(state.indexOf(raceType), R.merge(raceType, {active: !raceType.active}), state);
    }
    default: {
      return state;
    }
  }
};
