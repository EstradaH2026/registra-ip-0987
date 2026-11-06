import { Navigate, Outlet } from 'react-router-dom';

export default function RutaProtegida() {
  const usuario = localStorage.getItem('registraInUsuario');

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}