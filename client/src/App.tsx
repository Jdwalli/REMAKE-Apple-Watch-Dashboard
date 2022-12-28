import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Layout from "./layout/layout";
import ExportUpload from "./components/common/ExportUpload";

// Routes
import HomePage from "./pages/HomePage/Home";
import ActivityPage from "./pages/ActivityPage";
import VitalsPage from "./pages/VitalsPage";
import WorkoutPage from "./pages/WorkoutPage/WorkoutPage";
import SleepPage from "./pages/SleepPage";
import ReportsPage from "./pages/ReportsPage";

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
            <Route path="/" element={<HomePage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/vitals" element={<VitalsPage />} />
            <Route path="/workouts" element={<WorkoutPage />} />
            <Route path="/sleep" element={<SleepPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        )}
      </Layout>
    </Router>
  );
}

export default App;
