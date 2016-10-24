'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import RaceType from 'components/RaceType/RaceType';

describe('RaceType', () => {
  it('add {props.type} and {props.size} as class', () => {
    const wrapperNoSize = shallow(<RaceType type="testClass"/>);
    expect(wrapperNoSize.hasClass('race-type race-type--testClass')).to.be.true;

    const wrapperSize = shallow(<RaceType type="testClass" size="sizeTest"/>);
    expect(wrapperSize.hasClass('race-type race-type--testClass race-type--sizeTest')).to.be.true;
  });

  it('toggle disabled class', () => {
    const wrapperDisabledByDefault = shallow(<RaceType type="testClass"/>);
    expect(wrapperDisabledByDefault.hasClass('race-type--disabled')).to.be.true;

    const wrapperEnabled = shallow(<RaceType type="testClass" enabled={true}/>);
    expect(wrapperEnabled.hasClass('race-type--disabled')).to.not.be.true;
  });
});
