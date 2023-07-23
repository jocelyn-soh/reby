import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { AuthContextProvider } from '../context/AuthContext';
import SignIn from '../components/SignIn';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('renders SignIn component', () => {
  render(
    <AuthContextProvider>
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    </AuthContextProvider>
  );

  const signInText = screen.getByText('SIGN IN');
  expect(signInText).toBeInTheDocument();
});

test('user can sign in', async () => {
  const mockSignIn = jest.fn();
  const loginButton = screen.getByText('Login');

  render(
    <AuthContextProvider value={{ signIn: mockSignIn }}>
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    </AuthContextProvider>
  );

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

  await act(async () => {
    fireEvent.click(loginButton);
    await mockSignIn('test@example.com', 'testpassword'); 
  });

  expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'testpassword');
});
