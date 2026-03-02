import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation component', () => {
  render(<App />);
  const navbar = screen.getByRole('navigation');
  expect(navbar).toBeInTheDocument();
});

test('renders home page on initial load', () => {
  render(<App />);
  const homeSection = screen.getByText(/Where Little Minds Grow/i);
  expect(homeSection).toBeInTheDocument();
});