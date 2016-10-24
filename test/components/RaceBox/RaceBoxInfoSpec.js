'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import RaceBoxInfoInject from 'inject!components/RaceBox/RaceBoxInfo';

describe('RaceBoxInfo', () => {
  it('format distance and amount', () => {
    const numeralStub = sinon.stub();
    const formatStub = sinon.stub();
    const RaceBoxInfo = RaceBoxInfoInject({
      numeral: numeralStub.returns({
        format: formatStub
      })
    }).default;

    const wrapper = shallow(<RaceBoxInfo runners={1} distance={2000} amount={10000} currency="testCurrency" raceType="testRace"/>);
    expect(numeralStub).to.be.calledTwice;
    expect(numeralStub).to.be.calledWith(2000);
    expect(numeralStub).to.be.calledWith(10000);
    expect(formatStub).to.be.calledTwice;
    expect(formatStub).to.be.calledWith('0,0');
  });
});
