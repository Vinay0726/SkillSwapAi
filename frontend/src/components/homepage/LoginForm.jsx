import { SignIn } from "@clerk/clerk-react";

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <SignIn afterSignInUrl="/dashboard" />
    </div>
  );
};

export default LoginForm;
