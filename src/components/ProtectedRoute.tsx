import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireProfile?: boolean;
  requireAssessment?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireProfile = false, 
  requireAssessment = false 
}) => {
  const location = useLocation();
  const user = authService.getCurrentUser();

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if profile is required and completed
  if (requireProfile && !user.profileComplete) {
    return <Navigate to="/signup?step=2" replace />;
  }

  // Check if assessment is required and not completed
  if (requireAssessment && user.assessmentCompleted) {
    return <Navigate to="/results" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
