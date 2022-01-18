import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import ReactRouter from 'react-router';
import { Router } from 'react-router-dom';
import Product from './product';
import { makeFakeGuitar } from '../../mocks/guitar-data';

const fakeGuitar = makeFakeGuitar();
const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Product', () => {
  it('should render correctly', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(fakeGuitar.id) });

    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(jest.fn());

    const store = mockStore({
      guitar: fakeGuitar,
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Product />,
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText(`${fakeGuitar.type} ${fakeGuitar.name}`)).toBeInTheDocument();
  });
});
