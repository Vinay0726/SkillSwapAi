import { SignIn } from "@clerk/clerk-react";

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
     <SignIn routing="path" path="/login" />
    </div>
  );
};

export default LoginForm;
