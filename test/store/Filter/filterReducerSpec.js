'use strict';

import filterReducer from 'store/Filter/FilterReducer';

describe('filterReducer', () => {
  it('return default player state when no state passed', () => {
    expect(filterReducer(undefined, {})).to.be.deep.equal(getDefaultState());
  });

  it('current state is returned when action type is unknown', () => {
    expect(filterReducer({someKey: 'someData'}, {type: 'unknownType'})).to.be.deep.equal({someKey: 'someData'});
  });

  it('toggle filter state on TOGGLE_FILTER', () => {
    const state = getDefaultState();
    state[2].active = false;

    const newState = filterReducer(undefined, {type: 'TOGGLE_FILTER', raceType: 'trot'});
    expect(newState).to.be.deep.equal(state);
  });

  function getDefaultState() {
    return [
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
  }
});
