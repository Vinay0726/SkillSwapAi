import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();

  // Optional: wait for Clerk to finish loading
  if (!isLoaded) return <div>Loading...</div>;

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
