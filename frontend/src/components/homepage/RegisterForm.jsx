import { SignUp } from "@clerk/clerk-react";


const RegisterForm = () => {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white pt-16 ">
      <SignUp afterSignUpUrl="/dashboard" />
    </div>
  );
};

export default RegisterForm;
