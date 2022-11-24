import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Layout from "./layout/layout";
import ExportUpload from "./components/common/ExportUpload";

// Routes
import WorkoutPage from "./pages/WorkoutPage";

function App() {
  const showUploadModal = useSelector(
    (state: RootState) => state.uploadModal.isOpen
  );

  return (
    <Router>
      <Layout>
      {showUploadModal ? (
          <div className="flex h-screen">
            <div className="m-auto">
              <ExportUpload open={showUploadModal} />
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/workouts" element={<WorkoutPage />} />
            <Route path="/workouts" element={<WorkoutPage />} />
          </Routes>
        )}
      </Layout>
    </Router>
  );
}

export default App;
