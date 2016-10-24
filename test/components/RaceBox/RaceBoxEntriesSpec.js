'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import RaceBoxEntriesInject from 'inject!components/RaceBox/RaceBoxEntries';

describe('RaceBoxEntries', () => {
  let wrapper, numeralStub, formatStub;

  beforeEach(() => {
    numeralStub = sinon.stub();
    formatStub = sinon.stub();
    const RaceBoxEntries = RaceBoxEntriesInject({
      numeral: numeralStub.returns({
        format: formatStub
      })
    }).default;

    wrapper = shallow(<RaceBoxEntries idRace={123} runners={getRunners()}/>);
  });

  it('render runners list', () => {
    expect(wrapper.find('.race-box-list-entry').length).to.be.equal(3);
  });

  it('render silk only when runner has one', () => {
    expect(wrapper.find('.race-box-list-entry').at(0).find('.race-box-list-entry__silk').length).to.be.equal(1);
    expect(wrapper.find('.race-box-list-entry').at(1).find('.race-box-list-entry__silk').length).to.be.equal(1);
    expect(wrapper.find('.race-box-list-entry').at(2).find('.race-box-list-entry__silk').length).to.be.equal(0);
  });

  it('format odds', () => {
    expect(numeralStub).to.be.calledThrice;
    expect(numeralStub).to.be.calledWith(4.7);
    expect(numeralStub).to.be.calledWith(3);
    expect(numeralStub).to.be.calledWith(4);
    expect(formatStub).to.be.calledThrice;
    expect(formatStub).to.be.calledWith('0.0');
  });

  function getRunners() {
    return [
      {
        "id_runner": 15717421,
        "name": "Triumphant Knight",
        "odds": 4.7,
        "silk": "a"
      },
      {
        "id_runner": 15717423,
        "name": "My Aliyana",
        "odds": 3,
        "silk": "b"
      },
      {
        "id_runner": 15717425,
        "name": "Badjellys Courage",
        "odds": 4,
        "silk": ""
      }
    ];
  }
});
