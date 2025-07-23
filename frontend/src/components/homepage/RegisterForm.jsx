import { SignUp } from "@clerk/clerk-react";


const RegisterForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white pt-16 ">
      <SignUp routing="path" path="/register" />
    </div>
  );
};

export default RegisterForm;
