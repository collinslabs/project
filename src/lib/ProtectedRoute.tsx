// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
  allowedEmail: string;
}

export const ProtectedRoute = ({ element, allowedEmail }: ProtectedRouteProps) => {
  // Mock authentication logic
  const userEmail = localStorage.getItem("userEmail"); // Replace with your actual auth logic

  if (userEmail === allowedEmail) {
    return element; // Render the protected component
  } else {
    return <Navigate to="/signin" replace />; // Redirect to SignIn if not authorized
  }
};
