import { render, screen } from '@testing-library/react';
import App from './App';

test('renders wedding storytelling hero', () => {
  render(<App />);
  expect(screen.getAllByText(/save the date/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/roksana & błażej/i).length).toBeGreaterThan(0);
});
