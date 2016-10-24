'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import Flag from 'components/Flag/Flag';

describe('Flag', () => {
  it('add {props.country} as class', () => {
    const wrapper = shallow(<Flag country="gb"/>);
    expect(wrapper.hasClass('Flag-gb')).to.be.true;
  });
});
