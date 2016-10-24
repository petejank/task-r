'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import RaceFiltersInject from 'inject!components/RaceFilters/RaceFilters';

describe('RaceFilters', () => {
  let connectMock, componentPropBindMock, storeDispatchMock, RaceFilters;

  beforeEach(() => {
    RaceFiltersInject({
      'react-redux': {
        connect: connectMock = sinon.stub().returns(componentPropBindMock = sinon.stub())
      },
      'store/store': {
        dispatch: storeDispatchMock = sinon.stub()
      }
    }).default;
    RaceFilters = componentPropBindMock.args[0][0];
  })

  it('connect component to filterState on initial call', () => {
    expect(connectMock).to.be.calledOnce;
    expect(componentPropBindMock).to.be.calledOnce;

    const testState = {filterState: {filterState: null}};
    expect(connectMock.args[0][0](testState)).to.be.deep.equal(testState);
  });

  it('render component structure based on state entries', () => {
    const wrapper = shallow(<RaceFilters filterState={getDefaultState()}/>);
    expect(wrapper.find('a').length).to.be.equal(4);
  });

  it('click on button triggers store event dispatch', () => {
    const wrapper = shallow(<RaceFilters filterState={getDefaultState()}/>);
    wrapper.find('a').at(0).simulate('click');
    expect(storeDispatchMock).to.be.calledWith({
      type: 'TOGGLE_FILTER',
      raceType: 'gallop'
    });
    storeDispatchMock.reset();

    wrapper.find('a').at(1).simulate('click');
    expect(storeDispatchMock).to.be.calledWith({
      type: 'TOGGLE_FILTER',
      raceType: 'jumping'
    });
    storeDispatchMock.reset();

    wrapper.find('a').at(2).simulate('click');
    expect(storeDispatchMock).to.be.calledWith({
      type: 'TOGGLE_FILTER',
      raceType: 'trot'
    });
    storeDispatchMock.reset();

    wrapper.find('a').at(3).simulate('click');
    expect(storeDispatchMock).to.be.calledWith({
      type: 'TOGGLE_FILTER',
      raceType: 'dogs'
    });
    storeDispatchMock.reset();
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
