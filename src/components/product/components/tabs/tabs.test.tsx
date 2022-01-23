import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { makeFakeGuitar } from '../../../../mocks/guitar-data';
import Tabs from './tabs';

const TIME_OUT = 1000;

const fakeGuitar = makeFakeGuitar();
const history = createMemoryHistory();

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Tabs
          vendorCode={fakeGuitar.vendorCode}
          type={fakeGuitar.type}
          stringCount={fakeGuitar.stringCount}
          description={fakeGuitar.description}
        />
      </Router>,
    );

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toHaveClass('button button--medium tabs__button button--black-border');
  });

  it('should change active tab when link clicked', () => {
    render(
      <Router history={history}>
        <Tabs
          vendorCode={fakeGuitar.vendorCode}
          type={fakeGuitar.type}
          stringCount={fakeGuitar.stringCount}
          description={fakeGuitar.description}
        />
      </Router>,
    );

    setTimeout(() => {
      screen.getAllByRole('link').forEach((elem) => {
        userEvent.click(elem);
        expect(elem).toHaveClass('button button--medium tabs__button button--black-border');
        expect(elem).not.toHaveClass('button button--medium tabs__button');
      });
    }, TIME_OUT);
  });
});
