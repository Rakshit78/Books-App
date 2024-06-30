import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

import Boolist from '../components/Booklist';

describe('render Booklist component', () => {
  it('render component without error with snapshot', () => {
    const tree = render(<Boolist />).toJSON();
    expect(tree).toMatchSnapshot();
    screen.getByText('Search for Books');
  });
});
