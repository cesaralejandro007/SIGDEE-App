import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../vistas/LoginView';

describe('App', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    // Verificar que la vista se renderiza correctamente
    expect(getByText('SIGDEE')).toBeTruthy();
    expect(getByPlaceholderText('Nombre de Usuario')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
  });

  test('displays selected role after selection', () => {
    const { getByText, getByTestId } = render(<App />);

    // Verificar que no se muestra ningún rol seleccionado inicialmente
    expect(getByText('Rol seleccionado:')).toBeTruthy();

    // Seleccionar un rol y verificar que se muestra correctamente
    fireEvent.changeText(getByTestId('role-selector'), 'Super Usuario');
    expect(getByText('Rol seleccionado: Super Usuario')).toBeTruthy();
  });

  test('calls IniciarSesion on login button click', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<App />);

    // Simular la entrada de datos
    fireEvent.changeText(getByPlaceholderText('Nombre de Usuario'), 'usuario');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'contrasena');
    fireEvent.changeText(getByTestId('role-selector'), 'Super Usuario');

    // Simular el clic en el botón de inicio de sesión
    fireEvent.press(getByText('Iniciar Sesión'));

    // Verificar que la función IniciarSesion se llamó con los parámetros correctos
    await waitFor(() => {
      expect(mockIniciarSesion).toHaveBeenCalledWith('usuario', 'contrasena', 'Super Usuario');
    });
  });
});
