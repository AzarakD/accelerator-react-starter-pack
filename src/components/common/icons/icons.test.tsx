import {
  render,
  screen
} from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import Icons from './icons';

describe('Component: Icons', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Icons />
      </Router>,
    );

    expect(screen.getByTitle('svg-icons')).toBeInTheDocument();
  });
});
