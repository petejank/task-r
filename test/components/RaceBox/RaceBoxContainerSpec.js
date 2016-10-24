'use strict';

import React from 'react';
import {shallow, mount} from 'enzyme';
import RaceBoxContainerInject from 'inject!components/RaceBox/RaceBoxContainer';

import $ from 'jquery';

describe('RaceBoxContainer', () => {
  let connectMock, componentPropBindMock, storeSubscribe, RaceBoxContainer;

  beforeEach(() => {
    RaceBoxContainerInject({
      'react-redux': {
        connect: connectMock = sinon.stub().returns(componentPropBindMock = sinon.stub())
      },
      'store/store': {
        getState: () => ({
          filterState: getDefaultState()
        }),
        subscribe: storeSubscribe = sinon.stub()
      },
      'components/RaceFilters/RaceFilters': React.createClass({
        displayName: 'RaceFilters',
        render: () => <div></div>
      })
    }).default;

    RaceBoxContainer = componentPropBindMock.args[0][0];
  })

  it('connect component to filterState on initial call', () => {
    expect(connectMock).to.be.calledOnce;
    expect(componentPropBindMock).to.be.calledOnce;

    const testState = {filterState: {filterState: null}};
    expect(connectMock.args[0][0](testState)).to.be.deep.equal(testState);
  });

  it('set initial state on init', () => {
    const wrapper = shallow(<RaceBoxContainer/>);
    expect(wrapper.state()).to.be.deep.equal({
      dataFetched: false,
      race: null
    });
  });

  it('display loader when data not fetched', () => {
    const wrapper = shallow(<RaceBoxContainer/>);
    expect(wrapper.hasClass('race-loader')).to.be.true;
  });

  it('display race box structure when data fetched and race available', () => {
    const wrapper = shallow(<RaceBoxContainer/>);
    wrapper.setState({
      dataFetched: true,
      race: getRaces().data.races[0]
    });

    expect(wrapper.find('RaceFilters').length).to.be.equal(1);
    expect(wrapper.find('RaceBoxHeader').length).to.be.equal(1);
    expect(wrapper.find('RaceBoxInfo').length).to.be.equal(1);
    expect(wrapper.find('RaceBoxEntries').length).to.be.equal(1);
  });

  describe('on componentDidMount', () => {
    let wrapper, whenMock, getJSONMock, getJSONReturn;
    beforeEach(() => {
      whenMock = sinon.stub($, 'when').returns({
        then: fn => fn([getRaces()], [getRates()])
      });

      getJSONReturn = sinon.stub();
      getJSONMock = sinon.stub($, 'getJSON').returns(getJSONReturn);
      wrapper = mount(<RaceBoxContainer filterState={getDefaultState()}/>);
    });

    afterEach(() => {
      $.when.restore();
      $.getJSON.restore();
    });

    it('fetch races and rates data', () => {
      expect(whenMock).to.be.calledOnce;
      expect(whenMock).to.be.calledWith(getJSONReturn, getJSONReturn);
      expect(getJSONMock).to.be.calledTwice;
      expect(getJSONMock.args[0][0]).to.be.equal('/data/next_races.json');
      expect(getJSONMock.args[1][0]).to.be.equal('/data/rates.json');
    });

    it('after data fetch set select highest purse race', () => {
      expect(wrapper.state().dataFetched).to.be.true;
      expect(wrapper.state().race).to.be.deep.equal(getRaces().data.races[1]);
    });

    it('after data fetch subscribe update function to store change', () => {
      expect(storeSubscribe).to.be.calledOnce;
      const setStateStub = sinon.stub(wrapper.instance(), 'setState');
      // Call on subscribe function
      expect(storeSubscribe.args[0][0]());
      expect(setStateStub).to.be.calledOnce;
      expect(setStateStub).to.be.calledWith({
        race: getRaces().data.races[1]
      });
    });
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

  function getRates() {
    return {
      "EUR": 1.1242
    };
  }

  function getRaces() {
    return {
      data: {
        races: [
          {
            "id_race": 1647215,
            "event": {
              "title": "Redcliffe",
              "country": "IE"
            },
            "race_type": "T",
            "post_time": 1439970900,
            "num_runners": 9,
            "distance": 1780,
            "purse": {
              "amount": 250,
              "currency": "GBP"
            },
            "runners": [
              {
                "id_runner": 15717421,
                "name": "Triumphant Knight",
                "odds": 4.7,
                "silk": ""
              },
              {
                "id_runner": 15717423,
                "name": "My Aliyana",
                "odds": 3,
                "silk": ""
              },
              {
                "id_runner": 15717425,
                "name": "Badjellys Courage",
                "odds": 4,
                "silk": ""
              }
            ]
          },
          {
            "id_race": 1647142,
            "event": {
              "title": "Belmont",
              "country": "GB"
            },
            "race_type": "G",
            "post_time": 1439972700,
            "num_runners": 7,
            "distance": 1650,
            "purse": {
              "amount": 20000,
              "currency": "EUR"
            },
            "runners": [
              {
                "id_runner": 15716705,
                "name": "Alvares",
                "odds": 5,
                "silk": "1.png"
              },
              {
                "id_runner": 15716710,
                "name": "Successful Spin",
                "odds": 6.5,
                "silk": "2.png"
              },
              {
                "id_runner": 15716712,
                "name": "Sixth Legion",
                "odds": 9.5,
                "silk": "3.png"
              }
            ]
          }
        ]
      }
    };
  }
});
