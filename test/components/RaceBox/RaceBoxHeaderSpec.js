'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import RaceBoxHeader from 'components/RaceBox/RaceBoxHeader';

describe('RaceBoxHeader', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RaceBoxHeader time={1439972500} title="test" country="GB"/>);
  });

  it('format country and time', () => {
    expect(wrapper.find('Flag').props().country).to.be.equal('gb');
    expect(wrapper.find('.race-box-header__time').text()).to.be.equal('33 min')
  });
});
