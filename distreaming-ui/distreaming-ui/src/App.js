import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import MovieDetail from './pages/MovieDetail';
import AddMovie from './pages/AddMovie';

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route 
              path="/users" 
              element={
                  <ProtectedRoute>
                      <UserList />
                  </ProtectedRoute>
              } 
          />
          <Route 
                path="/users/:id" 
                element={
                    <ProtectedRoute>
                        <UserDetail />
                    </ProtectedRoute>
                } 
            />
          <Route 
                path="/movie/:id" 
                element={
                    <ProtectedRoute>
                        <MovieDetail />
                    </ProtectedRoute>
                } 
            />
           <Route 
                path="/add-movie" 
                element={
                    <ProtectedRoute>
                        <AddMovie />
                    </ProtectedRoute>
                } 
            />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;