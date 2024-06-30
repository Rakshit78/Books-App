import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

import FavList from '../components/FavList';

describe('Render favList Component', () => {
  it('render FavList component without error and taking snapshot', () => {
    const tree = render(<FavList />).toJSON();
    expect(tree).toMatchSnapshot();
    let modal = screen.getByText('Favourite Books');
    screen.getByText('Favourite Books');
    expect(modal).toMatchSnapshot();
  });
});
