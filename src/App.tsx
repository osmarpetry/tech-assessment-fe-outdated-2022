import { Routes, Route, Navigate } from 'react-router-dom';

import TrialsListingPage from './pages/TrialsListingPage/TrialsListingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import EnrollmentForm from './pages/EnrollmentForm/EnrollmentForm';
import ParticipantsListingPage from './pages/ParticipantsListingPage/ParticipantsListingPage';
import EnrollmentResult from './pages/EnrollmentResult/EnrollmentResult';

const App = () => {
  return (
    <Dashboard>
      <Routes>
        <Route path="/" element={<Navigate to="/trials" />} />
        <Route path="/trials/:id" element={<ParticipantsListingPage />} />
        <Route path="/trials" element={<TrialsListingPage />} />
        <Route
          path="/trials/:id/enroll-a-participant"
          element={<EnrollmentForm />}
        />
        <Route
          path="/trials/:id/enroll-a-participant-result"
          element={<EnrollmentResult />}
        />
      </Routes>
    </Dashboard>
  );
};

export default App;
