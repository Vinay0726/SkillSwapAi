import { Route, Routes } from "react-router-dom";
import Navbar from "./components/homepage/Navbar";
import Homepage from "./components/homepage/Homepage";
import Footer from "./components/homepage/Footer";

const App = () => {
  return (
    <>
      <div className="font-[Inter] bg-gradient-to-tr from-indigo-100 to-purple-100 text-gray-800">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Homepage />} />
          <Route path="/register" element={<Homepage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
