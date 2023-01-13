import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import CrearCuenta from './pages/CrearCuenta';
import RecuperarCuenta from './pages/RecuperarCuenta';
import InicioLayout from './layout/InicioLayout';
import Tareas from './pages/principal/Tareas';
import { AuthProvider } from './context/AuthProvider';
import { TareasProvider } from './context/TareasProvider';
import Perfil from './pages/principal/Perfil';
function App() {
 
  return (
    <BrowserRouter>
      <AuthProvider>
        <TareasProvider>
        

       
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />

              <Route path="recuperar" element={<RecuperarCuenta />} />
              <Route path="registrar" element={<CrearCuenta />} />
            </Route>

            <Route path="/inicio" element={<InicioLayout />}>
              <Route index path="tareas" element={<Tareas />} />
              <Route path="perfil" element={<Perfil/>}/>
            </Route>
          </Routes>
          
          </TareasProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
