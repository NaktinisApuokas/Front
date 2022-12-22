import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Input from "./components/Input";
import Otherpage from "./components/Otherpage";


export const NameContext = createContext();


export default function App() {
  const [name, setName] = useState();
  const [className, setClassName] = useState();
  return (
    <NameContext.Provider value={{ name, setName, className, setClassName }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Input />} />
          <Route path="/styles/yourname" element={<Otherpage />} />
        </Routes>
      </BrowserRouter>
    </NameContext.Provider>
  );
}
