import React from 'react';
import { shallow } from 'enzyme';
import { CountDown } from './CountDown';

describe('Component test - 3', () => {
  it('Time Remaining', () => {
    const time = 100;
    const wrapper = shallow(<CountDown value={time} />);
    expect(wrapper.find('.countdown').text()).toEqual(`Time Remaining: ${time}`);
  });
  it('Time Remaining', () => {
    const time = 0;
    const wrapper = shallow(<CountDown value={time} />);
    expect(wrapper.find('.countdown').text()).toEqual('Time is Up');
  });
});
