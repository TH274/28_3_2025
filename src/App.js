import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from './redux/actions/authActions';
import GlobalStyles from './styles/GlobalStyles';
import { Header, Footer, PrivateRoute } from './components';
import { publicRoutes, privateRoutes } from './routes/Routes';

function AppContent() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await dispatch(checkAuthStatus());
        console.log('Auth check result:', result);
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (!authChecked) {
    return <div className="app-loading">Loading...</div>;
  }

  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route element={<PrivateRoute />}>
          {privateRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
