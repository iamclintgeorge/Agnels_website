import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, isAuthenticated, loading, authChecked } = useAuth();

  console.log('PrivateRoute state:', { 
    isAuthenticated, 
    userExists: !!user, 
    loading, 
    authChecked 
  });

  // Show loading state while checking authentication
  if (loading || !authChecked) {
    console.log('Still loading or checking authentication...');
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/login" />;
  }

  // Render children if authenticated
  console.log('User authenticated, rendering protected content');
  return children;
};

export default PrivateRoute; 