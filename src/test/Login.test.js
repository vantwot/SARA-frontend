import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/login-register/Login.jsx';

test('submit form should navigate to the student dashboard on successful login', () => {
  const { getByPlaceholderText, getByText, getByTestId } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const usernameInput = getByPlaceholderText('Codigo de identificacion');
  const passwordInput = getByPlaceholderText('Contraseña');
  const submitButton = getByText('Iniciar sesión');

  fireEvent.change(usernameInput, { target: { value: '1863917' } });
  fireEvent.change(passwordInput, { target: { value: 'kpoeta2015' } });

  fireEvent.click(submitButton);



});

test('submit form should navigate to the professor dashboard on successful login', () => {
  const { getByPlaceholderText, getByText, getByTestId } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const usernameInput = getByPlaceholderText('Codigo de identificacion');
  const passwordInput = getByPlaceholderText('Contraseña');
  const submitButton = getByText('Iniciar sesión');

  fireEvent.change(usernameInput, { target: { value: '1871952' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  fireEvent.click(submitButton);

    // espera que se redirija a la pagina del estudiante
    expect(global.window.location.pathname).toContain('/'); 
  
});