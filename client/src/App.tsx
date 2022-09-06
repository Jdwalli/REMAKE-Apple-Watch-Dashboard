import React from "react";
import { Sidebar } from "./components/navigation/Sidebar";
import { Header } from "./components/navigation/Header";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="h-screen w-screen bg-gray-800">
        <Header />
        <Sidebar />
        <div className="h-screen bg-primary ml-24"></div>
      </div>
    </Router>
  );
}

export default App;
