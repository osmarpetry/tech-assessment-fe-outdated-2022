import { Routes, Route, Outlet, Link } from 'react-router-dom';

import TrialsListingPage from './pages/TrialsListingPage/TrialsListingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import EnrollmentForm from './pages/EnrollmentForm/EnrollmentForm.tsx';
import ParticipantsListingPage from './pages/ParticipantsListingPage/ParticipantsListingPage.tsx';
import EnrollmentResult from './pages/EnrollmentForm/EnrollmentResult.tsx';

const App = () => {
  return (
    <Dashboard>
      <Routes>
        {/* <Route path="/" element={<ParticipantsListingPage />}></Route> */}
        <Route path="/trials" element={<TrialsListingPage />}></Route>
        {/* <Route
          path="/enroll-a-participant"
          element={<EnrollmentForm />}
        ></Route>
        <Route
          path="/enroll-a-participant-result"
          element={<EnrollmentResult />}
        ></Route> */}
      </Routes>
    </Dashboard>
  );
};

export default App;
