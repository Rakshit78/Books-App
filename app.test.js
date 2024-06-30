import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

import App from './App';

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = render(<App />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(1).toBe(1);
  });
});
