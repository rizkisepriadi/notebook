import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { openDB } from "./database/db";
import Home from "./pages/Home";
import Calender from "./pages/Calender";

export default function App() {
  useEffect(() => {
    openDB().catch((error) => {
      console.error("Failed to open database:", error);
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calender" element={<Calender />} />
    </Routes>
  );
}
