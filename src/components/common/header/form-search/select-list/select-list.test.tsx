import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SelectList from './select-list';
import { makeFakeGuitarList } from '../../../../../mocks/guitar-data';
import { AppRoute } from '../../../../../const';

const GUITAR_COUNT = 10;

const fakeGuitars = makeFakeGuitarList(GUITAR_COUNT);
const history = createMemoryHistory();

describe('Component: SelectList', () => {
  it('should render correctly if closed', () => {
    const isOpened = false;

    render(
      <Router history={history}>
        <SelectList
          isOpened = {isOpened}
          shownItems = {fakeGuitars}
        />,
      </Router>,
    );

    const itemList = screen.getByTitle('select-list');

    expect(itemList).toBeInTheDocument();
    expect(itemList).toHaveClass('form-search__select-list hidden');
  });

  it('should render correctly if opened', () => {
    const isOpened = true;

    render(
      <Router history={history}>
        <SelectList
          isOpened = {isOpened}
          shownItems = {fakeGuitars}
        />,
      </Router>,
    );

    const itemList = screen.getByTitle('select-list');

    expect(itemList).toBeInTheDocument();
    expect(itemList).toHaveClass('form-search__select-list list-opened');
  });

  it('should redirect to "Product" when item clicked', () => {
    const isOpened = true;

    render(
      <Router history={history}>
        <Route path={AppRoute.Product.replace(':id', fakeGuitars[0].id.toString())} exact>
          <h1>This is Fake Product page</h1>
        </Route>
        <Route>
          <SelectList
            isOpened = {isOpened}
            shownItems = {fakeGuitars}
          />,
        </Route>,
      </Router>);

    const selectItem = screen.getByText(fakeGuitars[0].name);

    expect(selectItem).toBeInTheDocument();
    expect(selectItem).toHaveClass('form-search__select-item');

    expect(screen.queryByText(/This is Fake Product page/i)).not.toBeInTheDocument();
    fireEvent.click(selectItem);
    expect(screen.getByText(/This is Fake Product page/i)).toBeInTheDocument();
  });
});
