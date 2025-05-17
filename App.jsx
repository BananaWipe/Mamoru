import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { toast } from 'react-toastify';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Page Components
import Home from './pages/Home';
import Verify from './pages/Verify';
import Report from './pages/Report';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import NotFound from './pages/NotFound';

// Authentication & Services
import { AuthContext } from './context/AuthContext';
import { fetchUserProfile } from './services/api';

const App = () => {
  const location = useLocation();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  
  // Authentication state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(localStorage.getItem('auth_token'));
  
  // Check authentication status when wallet changes
  useEffect(() => {
    const checkAuth = async () => {
      if (isConnected && address) {
        try {
          // If we have a token, verify it's still valid
          if (authToken) {
            const profile = await fetchUserProfile(authToken);
            if (profile) {
              setUser(profile);
            } else {
              // Token invalid, clear it
              handleLogout();
            }
          }
        } catch (error) {
          console.error('Authentication error:', error);
          handleLogout();
        }
      } else {
        // Not connected, clear user
        setUser(null);
      }
      setLoading(false);
    };
    
    checkAuth();
  }, [isConnected, address, authToken]);
  
  // Handle wallet connection status changes
  useEffect(() => {
    if (!isConnected && user) {
      handleLogout();
    }
  }, [isConnected]);
  
  // Login handler
  const handleLogin = async (userData, token) => {
    setUser(userData);
    setAuthToken(token);
    localStorage.setItem('auth_token', token);
    toast.success('Successfully connected!');
  };
  
  // Logout handler
  const handleLogout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('auth_token');
    disconnect();
  };
  
  // Authentication context value
  const authContextValue = {
    user,
    authToken,
    isLoggedIn: !!user,
    isLoading: loading,
    login: handleLogin,
    logout: handleLogout,
  };
  
  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="loading-spinner"></div>
        </div>
      );
    }
    
    if (!user) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    
    return children;
  };
  
  return (
    <AuthContext.Provider value={authContextValue}>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/report" element={<Report />} />
            <Route path="/about" element={<About />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};

export default App;