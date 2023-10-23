import { Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/navbar/Navbar";
import Home from "./components/home/Home";
import Error from "./components/error/Error";

import "./App.scss";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
