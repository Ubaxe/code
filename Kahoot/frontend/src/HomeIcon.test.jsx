import React from 'react';
import { shallow } from 'enzyme';
import { Homeicon } from './Homeicon';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Component test - 2', () => {
  it('HomeIcon click successfully', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Homeicon onClick={onClick} />);
    wrapper.simulate('click');
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard');
  });
});
