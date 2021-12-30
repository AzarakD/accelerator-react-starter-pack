import {
  render,
  screen
} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../../../services/api';
import GuitarCard from './guitar-card';
import { makeFakeGuitar } from '../../../../mocks/guitar-data';
import { State } from '../../../../types/state';

const fakeGuitar = makeFakeGuitar();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore();
const history = createMemoryHistory();

const fakeGuitarCard = (
  <Provider store={store}>
    <Router history={history}>
      <GuitarCard guitar={fakeGuitar} />
    </Router>
  </Provider>
);

describe('Component: GuitarCard', () => {
  it('should render correctly', () => {
    render(fakeGuitarCard);

    expect(screen.getByAltText(`${fakeGuitar.type} ${fakeGuitar.name}`)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });
});
