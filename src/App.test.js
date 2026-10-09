import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import Login from './pages/login';
import { MemoryRouter } from 'react-router-dom';

test('navigates to services and feedback pages', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /grounded in craft/i })).toBeInTheDocument();

  userEvent.click(screen.getByRole('link', { name: 'Services' }));
  expect(screen.getByRole('heading', { name: /built for the/i })).toBeInTheDocument();

  userEvent.click(screen.getByRole('link', { name: 'Feedback' }));
  expect(screen.getByRole('heading', { name: /good work is/i })).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'Great communication' }));
  expect(screen.getByText(/10 appreciation points/i)).toBeInTheDocument();
});

test('shows the login form and password visibility control', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
  const password = screen.getByLabelText(/password/i);
  expect(password).toHaveAttribute('type', 'password');

  userEvent.click(screen.getByRole('button', { name: /show password/i }));
  expect(password).toHaveAttribute('type', 'text');
});

test('navigates between login and registration from the account links', () => {
  render(<App />);

  userEvent.click(screen.getByRole('link', { name: 'Log in' }));
  expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();

  userEvent.click(screen.getByRole('link', { name: /create one/i }));
  expect(screen.getByRole('heading', { name: /make yourself at home/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
});
