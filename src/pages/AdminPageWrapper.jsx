import { Navigate } from "react-router-dom";
import { AdminPage } from "../components/page";

export function AdminPageWrapper({
  isLoggedIn,
  currentUser,
  onLogout
}) {
  // Redirect if not admin
  if (!isLoggedIn || currentUser?.userType !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <AdminPage currentUser={currentUser} onLogout={onLogout} />;
}