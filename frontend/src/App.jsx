
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/homepage/Navbar";
import Homepage from "./components/homepage/Homepage";
import Footer from "./components/homepage/Footer";
import LoginForm from "./components/homepage/LoginForm";
import RegisterForm from "./components/homepage/RegisterForm";
import Dashboard from "./components/user/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./components/user/Profile";
import ViewProfile from "./components/user/ViewProfile";
import ChatRoom from "./components/user/ChatRoom";
import { useUser } from "@clerk/clerk-react";

const App = () => {
  const location = useLocation();
  const hideLayout = ["/login", "/register"].includes(location.pathname);
const { user, isLoaded } = useUser();
  return (
    <div className="font-[Inter] bg-gradient-to-tr from-indigo-100 to-purple-100 text-gray-800 min-h-screen flex flex-col">
      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/view-profile/:clerkId" element={<ViewProfile />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={isLoaded && user ? <ChatRoom /> : null}
          />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;
