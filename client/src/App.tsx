import React, { useState, useEffect } from "react";
import { Sidebar } from "./components/navigation/Sidebar";
import { Header } from "./components/navigation/Header";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import ExportUpload from "./components/common/ExportUpload";

// Routes
import WorkoutPage from "./pages/WorkoutPage";

function App() {
  const showUploadModal = useSelector(
    (state: RootState) => state.uploadModal.isOpen
  );

  return (
    <Router>
      <div className="h-screen w-screen bg-gray-800">
        <Header />
        <Sidebar />
        {showUploadModal ? (
          <div className="flex h-screen">
            <div className="m-auto">
              <ExportUpload open={showUploadModal} />
            </div>
          </div>
        ) : (
          <div className="h-screen bg-primary ml-24">
            <Routes>
              <Route path="/workouts" element={<WorkoutPage />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
