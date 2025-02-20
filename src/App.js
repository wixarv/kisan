import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout';
import CompanyExecutive from './pages/profileOfCompany/company';
import OnBoardEnquiry from './pages/Enquiries/onbordedenquiry';
import LoginPage from './auth/login';
import ForgotPass from './auth/forgot';
import FarmerEnquiries from './pages/Enquiries/farmerEnquiries';
import AddFarmers from './pages/profileOfFarmers/addFarmers';
import ChangePassword from './auth/changePass';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<CompanyExecutive />} />
                <Route path="/OnBoard-enquiry" element={<OnBoardEnquiry />} />
                <Route path="/farmer-enquiry" element={<FarmerEnquiries />} />
                <Route path="/add-farmers" element={<AddFarmers />} />
                <Route path="/change-password" element={<ChangePassword />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
