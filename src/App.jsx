
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
