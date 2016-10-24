'use strict';

import StoreInject from 'inject!store/store';

describe('store', () => {
  let reduxMock, filterReducerMock;

  beforeEach(() => {
    reduxMock = {
      createStore: sinon.stub(),
      combineReducers: sinon.stub().returns('combineReducers')
    };

    filterReducerMock = sinon.stub();
  });

  it('creates store with player state reducer', () => {
    const store = StoreInject({
      'redux': reduxMock,
      './Filter/FilterReducer': filterReducerMock
    }).default;

    expect(reduxMock.combineReducers).to.be.calledOnce;
    expect(reduxMock.combineReducers).to.be.calledWith({filterState: filterReducerMock});

    expect(reduxMock.createStore).to.be.calledOnce;
    expect(reduxMock.createStore).to.be.calledWith('combineReducers');
  });
});
