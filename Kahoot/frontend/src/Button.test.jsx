import React from 'react';
import { shallow } from 'enzyme';
import { LogoutButton } from './LogoutButton';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Component test - 1', () => {
  it('has button', () => {
    const wrapper = shallow(<LogoutButton />);
    expect(wrapper.find('button'));
  });
  it('log out successfully', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<LogoutButton onSubmit={onSubmit} />);
    wrapper.simulate('submit');
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
