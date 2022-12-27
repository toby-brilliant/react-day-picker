import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  getMonthCaption,
  getMonthGrid,
  getPrevButton
} from 'react-day-picker/test/selectors';
import { freezeBeforeAll } from 'react-day-picker/test/utils';

import Example from '@examples/multiple-months';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);
const user = userEvent.setup();
beforeEach(() => {
  render(<Example />).container;
});

describe('when rendering November 2021', () => {
  test('should render 2 tables', () => {
    expect(getMonthGrid(0)).toBeInTheDocument();
    expect(getMonthGrid(1)).toBeInTheDocument();
  });

  test('the first month should be November', () => {
    expect(getMonthCaption(0)).toHaveTextContent('November 2021');
  });

  test('the first month should be December', () => {
    expect(getMonthCaption(1)).toHaveTextContent('December 2021');
  });
  // Test pagination
  describe('when the previous month button is clicked', () => {
    beforeEach(async () => user.click(getPrevButton()));
    test('the first month should be October', () => {
      expect(getMonthCaption(0)).toHaveTextContent('October 2021');
    });

    test('the first month should be November', () => {
      expect(getMonthCaption(1)).toHaveTextContent('November 2021');
    });
  });
});
