'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import Silk from 'components/Silk/Silk';

describe('Silk', () => {
  it('add {props.silkType} as class', () => {
    const wrapper = shallow(<Silk silkType="testClass"/>);
    expect(wrapper.hasClass('Silk-testClass')).to.be.true;
  });
});
