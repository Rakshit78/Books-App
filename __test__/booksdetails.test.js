import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

import BooksDetails from '../components/BooksDetails';

describe('Render Books detail', () => {
  it('render booksdetails component without error', () => {
    const tree = render(<BooksDetails modal='hello' setModal={() => {}} />);
    expect(tree).toMatchSnapshot();
  });
});
