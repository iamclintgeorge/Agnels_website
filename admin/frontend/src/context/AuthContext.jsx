import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3663';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        console.log('Checking authentication status...');
        const response = await axios.get('/api/check-auth');
        console.log('Auth check response:', response.data);
        if (response.data.user) {
          console.log('User is authenticated:', response.data.user);
          setUser(response.data.user);
        } else {
          console.log('No user in auth check response');
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error.response?.data || error.message);
        setUser(null);
      } finally {
        setLoading(false);
        setAuthChecked(true);
      }
    };

    checkAuthentication();
  }, []);

  const login = async (emailId, password) => {
    try {
      console.log('Attempting login with:', emailId);
      
      const response = await axios.post('/api/login', { emailId, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      
      console.log('Login response:', response.data);
      
      if (response.data.user) {
        console.log('Setting user state from login response');
        setUser(response.data.user);
        
        // Check if cookies are being set
        console.log('Cookies after login:', document.cookie);
        
        return true;
      } else {
        console.warn('No user object in login response');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post('/api/logout', {}, {
        withCredentials: true
      });
      console.log('Logout response:', response.data);
      setUser(null);
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
    }
  };

  // Render loading state if authentication status is being checked
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const contextValue = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    authChecked,
    loading
  };

  console.log('Auth context state:', { 
    isAuthenticated: !!user, 
    userExists: !!user, 
    authChecked 
  });

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 